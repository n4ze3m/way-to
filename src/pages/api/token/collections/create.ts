import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { access_token, name } = req.body;

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

    const newCollection = await prisma.collection.create({
        data: {
            name,
            admin_user_id: user.id,
        }
    });

    res.status(200).json({ 
        id: newCollection.id,
        name: newCollection.name,
     });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
