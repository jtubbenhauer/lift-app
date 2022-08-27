import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaClient";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const programId = req.query.id;
  console.log(programId);
  const session = await getSession();

  if (session) {
    const program = await prisma.program.findUnique({
      // @ts-ignore

      where: { id: programId },
    });
    res.json(program);
  }
}
