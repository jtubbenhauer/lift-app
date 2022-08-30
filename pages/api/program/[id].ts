import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaClient";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (req.method === "DELETE") {
    if (id) {
      await handleDelete(id, res);
    }
  }

  if (req.method === "PUT") {
    if (id) {
      await handleUpdate(id, res, req);
    }
  }

  if (req.method === "GET") {
    const program = await prisma.program.findUnique({
      where: { id: id },
    });
    res.json(program);
  }

  async function handleDelete(id: string, res: NextApiResponse) {
    const program = await prisma.program.delete({
      where: {
        id: id,
      },
    });

    res.json(program);
  }

  async function handleUpdate(
    id: string,
    res: NextApiResponse,
    req: NextApiRequest
  ) {
    const { program, days } = req.body;

    const updateProgram = await prisma.program.update({
      where: {
        id: program.id,
      },
      data: { name: program.name },
    });

    for (let i = 0; i < days.length; i++) {
      await prisma.day.update({
        where: {
          id: days[i].id,
        },
        data: {
          name: days[i].name,
        },
      });
    }
    res.json(updateProgram);
  }
}
