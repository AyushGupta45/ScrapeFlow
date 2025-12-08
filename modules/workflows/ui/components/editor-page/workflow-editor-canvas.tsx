import React, { useCallback, useEffect } from "react";
import { AppNode, TaskType } from "../../../types";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NodeComponent } from "./canvas_nodes/node-components";
import { WorkflowGetOne } from "../../../types";
import { CreateFlowNode } from "./canvas_nodes/create-node-flow";
import { DeletableEdge } from "./canvas_nodes/deletable-edge";
import { TaskRegistry } from "../../tasks/registry";
import { get } from "http";

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
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();
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

  const onDrop = useCallback(
    (event: React.DragEvent) => {
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
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

      if (!connection.targetHandle) return;
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      if (connection.source === connection.target) return false;

      const source = nodes.find((n) => n.id === connection.source);
      const target = nodes.find((n) => n.id === connection.target);
      if (!source || !target) return false;

      const sourceTask =
        TaskRegistry[source.data.type as keyof typeof TaskRegistry];
      const targetTask =
        TaskRegistry[target.data.type as keyof typeof TaskRegistry];

      if (!sourceTask || !targetTask) return false;

      const output = sourceTask.outputs.find(
        (o: any) => o.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (i: any) => i.name === connection.targetHandle
      );

      if (input?.type !== output?.type) {
        console.log("Invalid connection: type mismatch");
        return false;
      }
      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(target);
      return !detectedCycle;
    },
    [nodes, edges]
  );

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
        isValidConnection={isValidConnection}
      >
        <Background />
        <Controls position="top-left" fitViewOptions={{ padding: 0.1 }} />
      </ReactFlow>
    </main>
  );
};

export default WorkflowEditorCanvas;
