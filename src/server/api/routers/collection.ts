import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getUserCollection } from "~/server/lib/collection";

export const collectionRouter = createTRPCRouter({
  createCollection: publicProcedure.input(z.object({
    name: z.string(),
    description: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    const newCollection = await ctx.prisma.collection.create({
      data: {
        ...input,
        admin_user_id: user.id,
      },
    });
    return newCollection.id;
  }),

  getCollection: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const userCollection = await ctx.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      include: {
        personal_collection: {
          orderBy: {
            created_at: "desc",
          },
        },
        collections: {
          orderBy: {
            created_at: "desc",
          },
          include: {
            Collection: true,
          },
        },
      },
    });

    if (!userCollection) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    const collections = [
      ...userCollection.collections.map((collection) => {
        return collection.Collection;
      }),
      ...userCollection.personal_collection,
    ];

    return collections;
  }),

  getCollectionById: publicProcedure.input(z.object({
    id: z.string(),
  })).query(async ({ ctx, input }) => {
    const user = ctx.user;
    const prisma = ctx.prisma;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const collection = await getUserCollection(
      prisma,
      user.id,
      input.id,
    );

    if (!collection) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return collection;
  }),
});
