import React, { Dispatch, SetStateAction, useState } from "react";
import { Day } from "@prisma/client";
import { Box, Button, Flex } from "@chakra-ui/react";
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
      rounded={"lg"}
      boxShadow={"lg"}
      align={"center"}
      gap={6}
      p={6}
    >
      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <EditableField
          title={dayData[index].name || ""}
          onChange={handleTitleChange}
        />
        <Button colorScheme={"purple"}>Add Exercise</Button>
      </Flex>
    </Flex>
  );
}

export default DayCard;
