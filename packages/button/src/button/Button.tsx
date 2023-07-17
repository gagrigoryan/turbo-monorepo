import React from "react";

type ButtonProps = {
  color?: string;
};

export const Button: React.FC<ButtonProps> = ({ color = "aqua" }) => {
  return <button style={{ background: color }}>Rollup Button</button>;
};
