import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        access_token,
      },
    });


    if (isUserExist) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(401).json({ message: "Invalid token" }); 
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
