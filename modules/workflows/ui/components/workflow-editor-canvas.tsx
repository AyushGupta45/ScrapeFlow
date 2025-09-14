import React, { useEffect } from "react";
import { TaskType } from "../../interfaces";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NodeComponent } from "./canvas_nodes/node-components";
import { WorkflowGetOne } from "../../types";

interface Props {
  workflow: WorkflowGetOne;
}

const nodeTypes = {
  ScrapeFlowNode: NodeComponent,
};

const WorkflowEditorCanvas = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (e) {}
  }, [workflow.definition, setViewport, setNodes, setEdges]);

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
