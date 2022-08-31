import React, { Dispatch, SetStateAction, useState } from "react";
import { Day, Exercise } from "@prisma/client";
import { Box, Button, Flex } from "@chakra-ui/react";
import EditableField from "../EditableField";
import ExerciseCard from "./ExerciseCard";

interface Props {
  index: number;
  day: Day;
  programState: any;
  setProgramState: Dispatch<any>;
}

function DayCard({ index, programState, setProgramState, day }: Props) {
  const handleTitleChange = (e: string) => {
    const newDays = programState.days.map((item: Day) => {
      if (item.id === day.id) {
        return { ...item, name: e };
      }
      return item;
    });

    setProgramState((programState: any) => ({
      ...programState,
      days: newDays,
    }));
  };

  const handleAddExercise = () => {};

  return (
    <Flex
      direction={"column"}
      bgColor={"gray.700"}
      rounded={"lg"}
      boxShadow={"lg"}
      align={"center"}
      gap={6}
      p={6}
    >
      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <EditableField
          title={programState.days[index].name}
          onChange={handleTitleChange}
        />
        <Button colorScheme={"purple"} onClick={handleAddExercise}>
          Add Exercise
        </Button>

        {programState.days[index].exercises.map((exercise: Exercise) => (
          <ExerciseCard exercise={exercise} key={exercise.id} />
        ))}
      </Flex>
      <Flex direction={"column"}></Flex>
    </Flex>
  );
}

export default DayCard;
