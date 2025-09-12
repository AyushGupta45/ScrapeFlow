"use client";

import { Input } from "@/components/ui/input";
import {
  AppNode,
  TaskParam,
  TaskTypesParams,
} from "@/modules/workflows/interfaces";
import React, { useCallback } from "react";
import StringParamInput from "./string-param-input";
import { useReactFlow } from "@xyflow/react";

interface Props {
  input: TaskParam;
  nodeId: string;
}

const NodeParamInput = ({ input, nodeId }: Props) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[input.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [input.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, input.name, node?.data.inputs]
  );

  switch (input.type) {
    case TaskTypesParams.STRING:
      return (
        <StringParamInput
          input={input}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamInput;
