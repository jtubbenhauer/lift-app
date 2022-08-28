import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { programProps } from "../../pages/program/new";

interface Props {
  createProgram: ({}: programProps) => void;
}

function NewProgramForm({ createProgram }: Props) {
  const [programName, setName] = useState("");
  const [numDays, setDays] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    createProgram({ programName, numDays, isActive });
  }

  return (
    <form>
      <Stack spacing={5} mt={5}>
        <FormControl>
          <FormLabel>Program name</FormLabel>
          <Input type="text" onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Days per week</FormLabel>
          <Select
            placeholder={"Select # of days"}
            onChange={(e) => setDays(parseInt(e.target.value))}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Set as current active program?</FormLabel>
          <Switch onChange={() => setIsActive(!isActive)} />
        </FormControl>
        <Button type={"submit"} onClick={handleSubmit}>
          Create Program
        </Button>
      </Stack>
    </form>
  );
}

export default NewProgramForm;
