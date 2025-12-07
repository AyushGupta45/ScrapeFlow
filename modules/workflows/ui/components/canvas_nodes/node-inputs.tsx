import { cn } from "@/lib/utils";
import { ColorForHandle, TaskParam } from "@/modules/workflows/types";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";
import { useFlowValidation } from "@/modules/workflows/hooks/use-flow-validation";

interface NodeInputsProps {
  children: React.ReactNode;
}

interface NodeInputProps {
  input: TaskParam;
  nodeId: string;
}

export const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({ input, nodeId }: NodeInputProps) => {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const { invalidInputs } = useFlowValidation();
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-muted rounded-b-sm w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField input={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandler && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};
