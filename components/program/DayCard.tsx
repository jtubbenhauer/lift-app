import React from "react";
import { Day } from "@prisma/client";
import { Flex } from "@chakra-ui/react";

interface Props {
  day: Day;
  numDay: number;
}

function DayCard({ day, numDay }: Props) {
  return <Flex direction={"column"}>Day {numDay}</Flex>;
}

export default DayCard;
