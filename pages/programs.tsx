import { NextPage } from "next";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

const Programs: NextPage = () => {
  return (
    <Box>
      <Link href={"/program/new"}>
        <Button>New Program</Button>
      </Link>
    </Box>
  );
};

export default Programs;
