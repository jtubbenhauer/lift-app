import { Day, Exercise, Program } from "@prisma/client";

export interface ProgramState extends Program {
  days: DayState[];
}

interface DayState extends Day {
  exercises: Exercise[];
}
