import React, { useState } from "react";
import { Day } from "@prisma/client";
import { Button, Flex } from "@chakra-ui/react";
import EditableField from "../EditableField";

interface Props {
  day: Day;
  numDay: number;
}

function DayCard({ day, numDay }: Props) {
  const [title, setTitle] = useState(`Day ${numDay}`);
  console.log(day);
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
      <EditableField title={title} setTitle={setTitle} />
      <Button colorScheme={"purple"}>Add Exercise</Button>
    </Flex>
  );
}

export default DayCard;
