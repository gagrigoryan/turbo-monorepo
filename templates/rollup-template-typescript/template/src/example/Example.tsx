import React from "react";

export type ExampleProps = {
  children: React.ReactNode;
};

export const Example: React.FC<ExampleProps> = ({ children }) => (
  <div>
    <p>Example Component</p>
    {children}
  </div>
);
