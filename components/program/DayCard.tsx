import React, { Dispatch, SetStateAction, useState } from "react";
import { Day } from "@prisma/client";
import { Button, Flex } from "@chakra-ui/react";
import EditableField from "../EditableField";

interface Props {
  day: Day;
  index: number;
  setDayData: React.Dispatch<React.SetStateAction<Day[]>>;
  dayData: Day[];
}

function DayCard({ day, index, setDayData, dayData }: Props) {
  const handleTitleChange = (e: string) => {
    const newDayData: Day[] = dayData.map((d) => {
      if (d.id === day.id) {
        return { ...d, name: e };
      }
      return d;
    });
    setDayData(newDayData);
  };

  return (
    <Flex
      direction={"column"}
      bgColor={"gray.700"}
      minW={"30rem"}
      rounded={"lg"}
      boxShadow={"lg"}
      align={"center"}
      justify={"center"}
    >
      <EditableField
        title={dayData[index].name || ""}
        onChange={handleTitleChange}
      />
      <Button colorScheme={"purple"}>Add Exercise</Button>
    </Flex>
  );
}

export default DayCard;
