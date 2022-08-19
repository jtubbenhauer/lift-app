import React from "react";

type Props = {
  fontSize: number;
};

function Logo({ fontSize }: Props) {
  return (
    <h1 className="logo" style={{ fontSize: `${fontSize}px` }}>
      LIFT
    </h1>
  );
}

export default Logo;
