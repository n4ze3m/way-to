import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getUserCollection } from "~/server/lib/collection";

export const collectionRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
          include: {
            User: true,
            url: true,
            _count: {
              select: {
                url: true,
                users: true,
              },
            },
          },
        },
        collections: {
          orderBy: {
            created_at: "desc",
          },
          include: {
            Collection: {
              include: {
                User: true,
                url: true,
                _count: {
                  select: {
                    url: true,
                    users: true,
                  },
                },
              },
            },
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
        return {
          ...collection.Collection,
          User: null,
          url: null,
          type: "shared",
          url_count: collection.Collection._count.url,
          user_count: collection.Collection._count.users,
        };
      }),
      ...userCollection.personal_collection.map((collection) => {
        return {
          ...collection,
          User: null,
          url: null,
          type: "personal",
          url_count: collection._count.url,
          user_count: collection._count.users,
        };
      }),
    ];

    return collections;
  }),

  getCollectionById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const collection = await getUserCollection(prisma, user.id, input.id);

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return {
        ...collection,
        is_owner: collection.admin_user_id === user.id,
      };
    }),

  collectionMembers: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const collection = await getUserCollection(prisma, user.id, input.id);

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      const members = await prisma.collectionUser.findMany({
        where: {
          collection_id: collection.id,
        },
        include: {
          User: true,
        },
      });

      return {
        is_editable: collection.admin_user_id === user.id,
        members: members.map((member) => {
          return {
            id: member.User.id,
            email: member.User.email,
            joined_at: member.created_at,
          };
        }),
      };
    }),

  inviteAUserToCollection: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;
      const supabase = ctx.supabase;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const collection = await getUserCollection(prisma, user.id, input.id);

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      if (collection.admin_user_id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to invite users to this collection",
        });
      }

      const invitedUser = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!invitedUser) {
        const {
          data: { user: invitedUser },
          error: inviteError,
        } = await supabase.auth.admin.inviteUserByEmail(input.email, {
          data: {
            collection_name: collection.name,
            invited_by: user.email,
          },
        });

        if (inviteError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: inviteError.message,
          });
        }

        if (!invitedUser) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User not found",
          });
        }

        await prisma.collectionUser.create({
          data: {
            collection_id: collection.id,
            user_id: invitedUser.id,
          },
        });

        return "User added to collection";
      }

      const collectionUser = await prisma.collectionUser.findFirst({
        where: {
          collection_id: collection.id,
          user_id: invitedUser.id,
        },
      });

      if (collectionUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is already a member of this collection",
        });
      }

      await prisma.collectionUser.create({
        data: {
          collection_id: collection.id,
          user_id: invitedUser.id,
        },
      });

      return "New user added to collection";
    }),

  removeUserFromCollection: publicProcedure
    .input(
      z.object({
        id: z.string(),
        user_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const collection = await getUserCollection(prisma, user.id, input.id);

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      if (collection.admin_user_id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to remove users from this collection",
        });
      }

      const isUserInCollection = await prisma.collectionUser.findFirst({
        where: {
          collection_id: collection.id,
          user_id: input.user_id,
        },
      });

      if (!isUserInCollection) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is not a member of this collection",
        });
      }

      await prisma.collectionUser.delete({
        where: {
          id: isUserInCollection.id,
        },
      });

      return "User removed from collection";
    }),

  updateCollection: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const collection = await getUserCollection(prisma, user.id, input.id);

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      if (collection.admin_user_id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to update this collection",
        });
      }

      await prisma.collection.update({
        where: {
          id: collection.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });

      return "Collection updated";
    }),

  deleteCollection: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const prisma = ctx.prisma;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const collection = await getUserCollection(prisma, user.id, input.id);

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      if (collection.admin_user_id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete this collection",
        });
      }

      await prisma.collectionUser.deleteMany({
        where: {
          collection_id: collection.id,
        },
      });

      await prisma.collectionUrl.deleteMany({
        where: {
          collection_id: collection.id,
        },
      });

      await prisma.collection.delete({
        where: {
          id: collection.id,
        },
      });

      return "Collection deleted";
    }),
});
