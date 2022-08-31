import { Day, Exercise, Program } from "@prisma/client";

interface DayState extends Day {
  exercises: Exercise[];
}

export interface ProgramState extends Program {
  days: DayState[];
}
