import { prisma } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (id) {
    if (req.method === "DELETE") {
      await handleDelete(id, res);
    }
  }
}

const handleDelete = async (id: string, res: NextApiResponse) => {
  const deletedSet = await prisma.set
    .delete({
      where: { id: id },
    })
    .catch(() => console.log("Set doesn't exist"));

  res.json(deletedSet);
};
