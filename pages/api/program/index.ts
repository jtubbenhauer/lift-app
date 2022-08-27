import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/prismaClient";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { programName, numDays, isActive } = req.body;

  const session = await getSession({ req });
  let result;

  if (session) {
    let email = session.user?.email;

    if (email) {
      result = await prisma.program.create({
        data: {
          name: programName,
          numDays: numDays,
          isActive: isActive,
          user: { connect: { email: email } },
        },
      });
    }
    res.status(200).json({ result });
  }
}
