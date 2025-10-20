"use client";

import { Input } from "@/components/ui/input";
import { AppNode, TaskParam, TaskTypesParams } from "@/modules/workflows/types";
import React, { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import StringParam from "./string-param";
import BrowserInstanceParam from "./browser-instance-param";

interface Props {
  input: TaskParam;
  nodeId: string;
  disabled: boolean;
}

const NodeParamField = ({ input, nodeId, disabled }: Props) => {
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
        <StringParam
          input={input}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskTypesParams.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          input={input}
          value={""}
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

export default NodeParamField;
