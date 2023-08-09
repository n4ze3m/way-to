import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { getUserCollection } from "~/server/lib/collection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { access_token, url, collection_id, to_path } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        access_token,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const isCollectionExist = await getUserCollection(
      prisma,
      user.id,
      collection_id,
    );

    if (!isCollectionExist) {
      return res.status(401).json({ message: "Invalid collection" });
    }

    await prisma.collectionUrl.create({
      data: {
        user_id: user.id,
        collection_id,
        url,
        to_path,
      },
    });

    res.status(200).json({ message: "success" });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
