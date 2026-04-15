import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/welcome(.*)",
  "/api/webhooks(.*)",
  "/api/trpc(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  // If user is not logged in and on the root page, redirect to welcome
  if (!userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
