import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await prisma.user.findFirst({
      where: {
        access_token,
      },
      include: {
        personal_collection: true,
        collections: {
          include: {
            Collection: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const collections = [
      ...user.collections.map((collection) => {
        return {
          id: collection.Collection.id,
          name: collection.Collection.name,
        };
      }),

      ...user.personal_collection.map((collection) => {
        return {
          id: collection.id,
          name: collection.name,
        };
      }),
    ];

    res.status(200).json({ collections });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
