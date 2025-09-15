import { cn } from "@/lib/utils";
import { ColorForHandle, TaskParam } from "@/modules/workflows/interfaces";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./node-param-field";

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
  return (
    <div className="flex justify-start relative p-3 bg-muted rounded-b-sm w-full">
      <NodeParamField input={input} nodeId={nodeId} />
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
