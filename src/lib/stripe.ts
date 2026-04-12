import Stripe from "stripe";
import { env } from "@/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-03-25.dahlia",
});

export async function createCheckoutSession(userId: string, userEmail: string) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: env.STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${env.NEXT_PUBLIC_URL}/billing?success=true`,
        cancel_url: `${env.NEXT_PUBLIC_URL}/billing?canceled=true`,
        customer_email: userEmail,
        client_reference_id: userId,
        metadata: {
            userId,
        },
    });
    return session;
}
