import React from "react";
import { TaskType } from "../../interfaces";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NodeComponent } from "./canvas_nodes/node-components";
import { CreateFlowNode } from "./canvas_nodes/create-node-flow";
import { WorkflowGetOne } from "../../types";

interface Props {
  workflow: WorkflowGetOne;
}

const nodeTypes = {
  ScrapeFlowNode: NodeComponent,
};

const WorkflowEditorCanvas = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode({ nodetype: TaskType.LAUNCH_BROWSER }),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[50, 50]}
        fitView
        fitViewOptions={{ padding: 1 }}
      >
        <Background />
        <Controls position="top-left" fitViewOptions={{ padding: 1 }} />
      </ReactFlow>
    </main>
  );
};

export default WorkflowEditorCanvas;
