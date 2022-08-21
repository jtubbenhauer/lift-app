import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";

function NewProgramForm() {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [isActive, setIsActive] = useState(false);

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
            onChange={(e) => setDays(e.target.value)}
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
      </Stack>
    </form>
  );
}

export default NewProgramForm;
