import { Day, Exercise, Program } from "@prisma/client";

export interface ProgramState extends Program {
  days: DayState[];
}

export interface DayState extends Day {
  exercises: Exercise[];
}
