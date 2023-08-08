import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getUserCollection } from "~/server/lib/collection";

export const linksRouter = createTRPCRouter({
  createLink: publicProcedure
    .input(z.object({
      url: z.string(),
      collection_id: z.string(),
      to_path: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const isCollectionExist = await getUserCollection(
        prisma,
        user.id,
        input.collection_id,
      );

      if (!isCollectionExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      const newLink = await prisma.collectionUrl.create({
        data: {
          ...input,
          user_id: user.id,
        },
      });

      return newLink.id;
    }),
});
