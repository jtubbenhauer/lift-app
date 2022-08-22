import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Program: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Box>{id}</Box>;
};

export default Program;
