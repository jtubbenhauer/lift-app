import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaClient";
import { Program } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  if (req.method === "DELETE") {
    await handleDelete(id, res);
  }

  if (req.method === "GET") {
    const program = await prisma.program.findUnique({
      where: { id: id },
    });
    res.json(program);
  }
}

async function handleDelete(id: string, res: NextApiResponse) {
  const program: Program = await prisma.program.delete({
    where: {
      id: id,
    },
  });

  res.json(program);
}
