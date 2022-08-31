import React, { Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";

interface Props {
  exercise: Exercise;
  setExerciseData?: Dispatch<SetStateAction<Exercise[]>>;
}

function ExerciseCard({ exercise, setExerciseData }: Props) {
  return <Flex>{exercise.id}</Flex>;
}

export default ExerciseCard;
