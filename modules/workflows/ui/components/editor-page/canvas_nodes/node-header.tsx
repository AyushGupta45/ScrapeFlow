"use client";
import { AppNode, TaskType } from "@/modules/workflows/types";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { CreateFlowNode } from "./create-node-flow";
import { TaskRegistry } from "../../../tasks/registry";

interface Props {
  taskType: TaskType;
  nodeId: string;
}

const NodeHeader = ({ taskType, nodeId }: Props) => {
  const task = TaskRegistry[taskType as keyof typeof TaskRegistry];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2 drag-handle cursor-grab">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row items-center gap-1">
          <task.icon size={16} />
          <p className="text-xs font-bold uppercase text-muted-foreground">
            {task.label}
          </p>
        </div>
        <div className="flex gap-0.5 items-center">
          {task.isEntryPoint && (
            <Badge className="rounded-full px-3">Entry Point</Badge>
          )}
          {/* <Badge className="gap-2 rounded-full flex items-center text-xs px-3">
            <CoinsIcon size={16} />
          </Badge> */}
          {!task.isEntryPoint && (
            <>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                }}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x;
                  const newY =
                    node.position.y + (node.measured?.height ?? 0) + 20;
                  const newNode = CreateFlowNode({
                    nodetype: node.data.type,
                    position: { x: newX, y: newY },
                  });
                  addNodes([newNode]);
                }}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
