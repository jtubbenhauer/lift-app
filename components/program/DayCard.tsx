import React, { Dispatch, SetStateAction, useState } from "react";
import { Day, Exercise } from "@prisma/client";
import { Box, Button, Flex } from "@chakra-ui/react";
import EditableField from "../EditableField";
import ExerciseCard from "./ExerciseCard";
import { ProgramState } from "../../types/propTypes";

interface Props {
  index: number;
  day: Day;
  programState: ProgramState;
  setProgramState: Dispatch<SetStateAction<ProgramState>>;
}

function DayCard({ index, programState, setProgramState, day }: Props) {
  console.log(programState.days[index].name);
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
    await fetch("/api/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(day.id),
    });
    // programState.days[index].exercises.push({
    //   id: "1",
    //   name: "asdsad",
    //   dayId: programState.days[index].id,
    // });
    //
    // const newExercise = {
    //   id: "",
    //   name: "asdsd",
    //   dayId: programState.days[index].id,
    // };
    //
    // const newDays = programState.days.map((day) => {
    //   return day;
    // });
    //
    // newDays[index].exercises.push(newExercise);
    //
    // setProgramState((programState) => ({
    //   ...programState,
    //   days: newDays,
    // }));
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
    </Flex>
  );
}

export default DayCard;
