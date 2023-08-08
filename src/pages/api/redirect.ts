import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { getUserAllCollections } from "~/server/lib/collection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { access_token, path } = req.body;

    const ids = await getUserAllCollections(
      prisma,
      access_token,
    );

    if (!ids || ids.length === 0) {
      return res.json({
        "CODE": "EMPTY_COLLECTION",
        "redirect": `/dashboard/collections?to=${path}`,
      });
    }
    

    const link = await prisma.collectionUrl.findMany({
      where: {
        collection_id: {
          in: ids,
        },
        to_path: path,
      },
    });

    if (link.length === 0) {
      return res.json({
        "CODE": "NOT_FOUND",
        "redirect": `/dashboard/collections?to=${path}`,
      });
    }

    if (link.length === 1) {
      return res.json({
        "CODE": "FOUND",
        //@ts-ignore
        "redirect": link[0].url,
      });
    }
    res.status(200).json({ 
        "CODE": "TOO_MANY",
        "redirect": `/r/${path}`,
     });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
