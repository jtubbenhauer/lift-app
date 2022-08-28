import React from "react";

interface Props {
  day: number;
}

function DayCard({ day }: Props) {
  console.log(day);
  return <div>{day}</div>;
}

export default DayCard;
