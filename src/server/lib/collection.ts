import { PrismaClient } from "@prisma/client";

export const getUserCollection = async (
  prisma: PrismaClient,
  user_id: string,
  collection_id: string,
) => {
  const isShareCollection = await prisma.collectionUser.findFirst({
    where: {
      collection_id: collection_id,
      user_id: user_id,
    },
    include: {
      Collection: {
        include: {
          url: {
            include: {
              User: {
                select: {
                  id: true,
                  email: true,
                },
              },
            },
            orderBy: {
              created_at: "desc",
            },
          },
        },
      },
    },
  });

  if (isShareCollection) {
    return isShareCollection.Collection;
  }

  const isPersonalCollection = await prisma.collection.findFirst({
    where: {
      id: collection_id,
      admin_user_id: user_id,
    },
    include: {
      url: {
        include: {
          User: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (isPersonalCollection) {
    return isPersonalCollection;
  }

  return null;
};

export const getUserAllCollections = async (
  prisma: PrismaClient,
  access_token: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      access_token: access_token,
    },
    include: {
      collections: true,
      personal_collection: true,
    },
  });

  if (!user) {
    return null;
  }

  const ids = [
    ...user.collections.map((collection) => collection.collection_id),
    ...user.personal_collection.map((collection) => collection.id),
  ];

  return ids;
};
