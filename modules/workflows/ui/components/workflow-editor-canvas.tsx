import React, { useCallback, useEffect } from "react";
import { AppNode, TaskType } from "../../interfaces";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NodeComponent } from "./canvas_nodes/node-components";
import { WorkflowGetOne } from "../../types";
import { on } from "events";
import { CreateFlowNode } from "./canvas_nodes/create-node-flow";
import { DeletableEdge } from "./canvas_edges/deletable-edge";

interface Props {
  workflow: WorkflowGetOne;
}

const nodeTypes = {
  ScrapeFlowNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const WorkflowEditorCanvas = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();
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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const tasktype = event.dataTransfer.getData("application/reactflow");
    if (typeof tasktype === undefined || !tasktype) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode({
      nodetype: tasktype as TaskType,
      position,
    });
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  }, []);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Background />
        <Controls position="top-left" fitViewOptions={{ padding: 0.1 }} />
      </ReactFlow>
    </main>
  );
};

export default WorkflowEditorCanvas;
