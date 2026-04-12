import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // placeholder: post model doesn't exist in schema
      return { id: "placeholder", name: input.name, createdAt: new Date() };
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    // placeholder: post model doesn't exist in schema
    return null;
  }),
});
