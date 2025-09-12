import { cn } from "@/lib/utils";
import { TaskParam } from "@/modules/workflows/interfaces";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamInput from "./node-param-input";

interface Props {
  input: TaskParam;
  nodeId: string;
}

const NodeInput = ({ input, nodeId }: Props) => {
  return (
    <div className="flex justify-start relative p-3 bg-neutral-200 rounded-b-sm w-full">
      <NodeParamInput input={input} nodeId={nodeId} />
      {!input.hideHandler && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
