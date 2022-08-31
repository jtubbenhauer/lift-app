import React, { Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";

interface Props {
  exercise: Exercise;
}

function ExerciseCard({ exercise }: Props) {
  return <Flex>{exercise.id}</Flex>;
}

export default ExerciseCard;
