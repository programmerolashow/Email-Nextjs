import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/env";
import { db } from "@/server/db";
import type Stripe from "stripe";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return typeof error === "string" ? error : "Unknown error";
};

const isCheckoutSessionEvent = (
  event: Stripe.Event
): event is Stripe.Event & { data: { object: Stripe.Checkout.Session } } => {
  return event.type === "checkout.session.completed";
};

const isInvoicePaymentSucceededEvent = (
  event: Stripe.Event
): event is Stripe.Event & { data: { object: Stripe.Invoice } } => {
  return event.type === "invoice.payment_succeeded";
};

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error: unknown) {
    return NextResponse.json({ error: `Webhook Error: ${getErrorMessage(error)}` }, { status: 400 });
  }

  if (isCheckoutSessionEvent(event)) {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const customerId = typeof session.customer === "string" ? session.customer : undefined;
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : undefined;

    if (!userId || !customerId || !subscriptionId) {
      return NextResponse.json({ error: "Missing checkout session metadata" }, { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    await db.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: customerId,
        subscriptionStatus: subscription.status,
      },
    });
  } else if (isInvoicePaymentSucceededEvent(event)) {
    const invoice = event.data.object as {
      subscription?: string | { id?: string } | null;
      customer?: string | { id?: string } | null;
    };
    const subscriptionValue = invoice.subscription;
    const customerValue = invoice.customer;

    let subscriptionId: string | undefined;
    if (typeof subscriptionValue === "string") {
      subscriptionId = subscriptionValue;
    } else if (
      subscriptionValue &&
      typeof subscriptionValue === "object" &&
      "id" in subscriptionValue &&
      typeof subscriptionValue.id === "string"
    ) {
      subscriptionId = subscriptionValue.id;
    }

    let customerId: string | undefined;
    if (typeof customerValue === "string") {
      customerId = customerValue;
    } else if (
      customerValue &&
      typeof customerValue === "object" &&
      "id" in customerValue &&
      typeof customerValue.id === "string"
    ) {
      customerId = customerValue.id;
    }

    if (!customerId || !subscriptionId) {
      return NextResponse.json({ error: "Missing invoice customer or subscription ID" }, { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    await db.user.update({
      where: { stripeCustomerId: customerId },
      data: {
        subscriptionStatus: subscription.status,
      },
    });
  }

  return NextResponse.json({ received: true });
};
