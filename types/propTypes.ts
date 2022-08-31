import { Day, Exercise, Program } from "@prisma/client";

export interface ProgramState {
  program: (Program & { days: (Day & { exercises: Exercise[] })[] }) | null;
}
