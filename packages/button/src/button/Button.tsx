import React from "react";
import styles from "./button.module.scss";

export type ButtonProps = {
  color?: string;
};

export const Button: React.FC<ButtonProps> = () => {
  return <button className={styles.container}>Rollup Button</button>;
};
