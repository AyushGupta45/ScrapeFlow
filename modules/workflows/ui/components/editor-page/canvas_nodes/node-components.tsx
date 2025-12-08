import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/modules/workflows/types";
import { NodeInput, NodeInputs } from "./node-inputs";
import { NodeOutput, NodeOutputs } from "./node-outputs";
import { Badge } from "@/components/ui/badge";
import { TaskRegistry } from "../../../tasks/registry";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";

export const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type as keyof typeof TaskRegistry];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge className="w-full rounded-sm">DEV MODE: {props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />

      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} output={output} nodeId={props.id} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});
