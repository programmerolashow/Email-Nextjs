import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/trpc(.*)",
]);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default clerkMiddleware(async (auth: unknown, request: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!(isPublicRoute as (val: unknown) => boolean)(request)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await (await (auth as () => Promise<{ protect: () => Promise<void> }>)()).protect();
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
