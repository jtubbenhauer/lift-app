import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Day, Exercise } from "@prisma/client";
import { Box, Button, Flex } from "@chakra-ui/react";
import EditableField from "../EditableField";
import ExerciseCard from "./ExerciseCard";
import { ProgramState, DayState } from "../../types/propTypes";
import cuid from "cuid";
import { program } from "@babel/types";

interface Props {
  index: number;
  day: Day;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
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

  const handleAddExercise = async () => {
    const newExercise = {
      id: cuid(),
      name: "New Exercise",
      dayId: programState.days[index].id,
    };

    const newDays = programState.days.map((day) => {
      return day;
    });

    newDays[index].exercises.push(newExercise);

    setProgramState((programState) => ({
      ...programState,
      days: newDays,
    }));
  };

  const handleRemoveDay = async (e: SyntheticEvent) => {
    e.preventDefault();

    setProgramState((programState) => ({
      ...programState,
      days: programState.days.filter((d) => d.id !== day.id),
    }));
    await fetch(`/api/day/${day.id}`, {
      method: "DELETE",
    });
  };

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
      </Flex>
      {programState.days[index].exercises.map((exercise, index) => (
        <ExerciseCard exercise={exercise} key={exercise.id} index={index} />
      ))}
      <Button colorScheme={"red"} onClick={handleRemoveDay}>
        Remove Day
      </Button>
    </Flex>
  );
}

export default DayCard;
