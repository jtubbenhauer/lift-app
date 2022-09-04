import { Day, Exercise, Program, Set } from "../prisma/prisma/client";

export interface ProgramState extends Program {
  days: DayState[];
}

export interface DayState extends Day {
  exercises: ExerciseState[];
}

export interface ExerciseState extends Exercise {
  sets: Set[];
}
