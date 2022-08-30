import React, { Dispatch, SetStateAction, useState } from "react";
import { Day, Exercise } from "@prisma/client";
import { Box, Button, Flex } from "@chakra-ui/react";
import EditableField from "../EditableField";
import ExerciseCard from "./ExerciseCard";

interface Props {
  day: Day;
  index: number;
  setDayData: Dispatch<
    SetStateAction<(Day & { exercises: Exercise[] })[] | undefined>
  >;
  dayData: (Day & { exercises: Exercise[] })[] | undefined;
}

function DayCard({ day, index, setDayData, dayData }: Props) {
  const handleTitleChange = (e: string) => {
    const newDayData = dayData?.map((d) => {
      if (d.id === day.id) {
        return { ...d, name: e };
      }
      return d;
    });
    setDayData(newDayData);
  };

  const handleAddExercise = () => {
    console.log(day.id);
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
        {dayData && (
          <EditableField
            title={dayData && dayData[index].name}
            onChange={handleTitleChange}
          />
        )}
        <Button colorScheme={"purple"} onClick={handleAddExercise}>
          Add Exercise
        </Button>
      </Flex>
      <Flex direction={"column"}></Flex>
    </Flex>
  );
}

export default DayCard;
