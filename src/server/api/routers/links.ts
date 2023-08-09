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

  editLink: publicProcedure
    .input(z.object({
      id: z.string(),
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

      // check link exist

      const isLinkExist = await prisma.collectionUrl.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!isLinkExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      await prisma.collectionUrl.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return "OK";
    }),

  deleteLink: publicProcedure
    .input(z.object({
      id: z.string(),
      collection_id: z.string(),
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

      // check link exist

      const isLinkExist = await prisma.collectionUrl.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!isLinkExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      await prisma.collectionUrl.delete({
        where: {
          id: input.id,
        },
      });

      return "OK";
    }),
});
