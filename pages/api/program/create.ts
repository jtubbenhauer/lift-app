import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/prismaClient";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, days, isActive } = req.body;

  const session = await getSession({ req });

  if (session) {
    const result = await prisma.program.create({
      data: {
        name: name,
        numDays: days,
        isActive: isActive,
        //@ts-ignore
        user: { connect: { email: session.user?.email } },
      },
    });
    res.status(200).json({ result });
  }
}
