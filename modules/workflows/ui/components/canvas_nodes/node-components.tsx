import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/modules/workflows/interfaces";
import { TaskRegistry } from "../../tasks/registry";
import NodeInputs from "./node-inputs";
import NodeInput from "./node-input";

export const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});
