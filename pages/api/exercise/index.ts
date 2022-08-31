import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaClient";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dayId = req.body;

  await prisma.exercise.create({
    data: {
      name: "",
      dayId: dayId,
    },
  });
}
