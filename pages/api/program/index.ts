import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/prismaClient";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { programName, numDays, isActive } = req.body;

  const session = await getSession({ req });
  let newProgram;
  let newDays;

  if (session) {
    let email = session.user?.email;

    if (email) {
      newProgram = await prisma.program.create({
        data: {
          name: programName,
          numDays: numDays,
          isActive: isActive,
          user: { connect: { email: email } },
        },
      });
    }

    if (newProgram) {
      let daysArr = [];
      for (let i = 0; i < numDays; i++) {
        daysArr.push({ programId: newProgram.id, name: `Day ${i + 1}` });
      }
      newDays = await prisma.day.createMany({ data: daysArr });
    }
    res.status(200).json({ newProgram, newDays });
  }
}
