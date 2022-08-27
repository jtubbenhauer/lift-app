import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaClient";
import { getSession } from "next-auth/react";
import { Program } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const programId = req.query.id;
  const session = await getSession();

  if (req.method === "DELETE") {
    await handleDelete(programId, res);
  }

  if (req.method === "GET") {
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });
    res.json(program);
  }
}

async function handleDelete(
  programId: string | undefined | string[],
  res: NextApiResponse
) {
  const program: Program = await prisma.program.delete({
    where: {
      id: programId,
    },
  });
  res.json(program);
}
