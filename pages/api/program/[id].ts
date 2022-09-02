import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prismaClient";
import { ProgramState } from "../../../types/propTypes";

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
    const program: ProgramState = req.body;

    console.log(program);

    const updateProgram = await prisma.program.update({
      where: {
        id: program.id,
      },
      data: { name: program.name },
    });

    for (const day of program.days) {
      await prisma.day.upsert({
        where: {
          id: day.id,
        },
        update: {
          name: day.name,
        },
        create: {
          id: day.id,
          programId: day.programId,
          name: day.name,
        },
      });
      if (day.exercises.length) {
        for (const exercise of day.exercises) {
          await prisma.exercise.upsert({
            where: {
              id: exercise.id,
            },
            update: {
              name: exercise.name,
            },
            create: {
              id: exercise.id,
              name: exercise.name,
              dayId: day.id,
            },
          });
          if (exercise.sets.length) {
            for (const set of exercise.sets) {
              await prisma.set.upsert({
                where: {
                  id: set.id,
                },
                update: {
                  weight: set.weight,
                  reps: set.reps,
                },
                create: {
                  id: set.id,
                  exerciseId: exercise.id,
                  weight: set.weight,
                  reps: set.reps,
                },
              });
            }
          }
        }
      }
    }

    res.json(updateProgram);
  }
}
