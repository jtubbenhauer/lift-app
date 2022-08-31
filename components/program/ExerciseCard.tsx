import React, { Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";

interface Props {
  exercise: Exercise;
  index: number;
}

function ExerciseCard({ exercise, index }: Props) {
  return <Flex direction={"column"}>{exercise.id}</Flex>;
}

export default ExerciseCard;
