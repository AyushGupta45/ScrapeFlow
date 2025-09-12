import React from "react";

interface Props {
  children: React.ReactNode;
}

const NodeInputs = ({ children }: Props) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export default NodeInputs;
