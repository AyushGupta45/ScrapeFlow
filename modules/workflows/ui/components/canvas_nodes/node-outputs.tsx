import { cn } from "@/lib/utils";
import { ColorForHandle, TaskParam } from "@/modules/workflows/interfaces";
import { Handle, Position } from "@xyflow/react";
import React from "react";

interface NodeOutputsProps {
  children: React.ReactNode;
}

interface NodeOutputProps {
  output: TaskParam;
  nodeId: string;
}

export const NodeOutputs = ({ children }: NodeOutputsProps) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeOutput = ({ output, nodeId }: NodeOutputProps) => {
  return (
    <div className="flex justify-end relative p-3 bg-muted rounded-b-sm w-full">
      {/* <NodeParamOutput output={output} nodeId={nodeId} /> */}
      <p className="">{output.name}</p>

      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};
