"use client";
import { TaskType } from "@/modules/workflows/interfaces";
import React from "react";
import { TaskRegistry } from "../../tasks/registry";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  taskType: TaskType;
}

const NodeHeader = ({ taskType }: Props) => {
  const task = TaskRegistry[taskType as keyof typeof TaskRegistry];
  return (
    <div className="flex items-center gap-2 p-2 drag-handle cursor-grab">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row items-center gap-1">
          <task.icon size={16} />
          <p className="text-xs font-bold uppercase text-muted-foreground">
            {task.label}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && (
            <Badge className="rounded-full px-3">Entry Point</Badge>
          )}
          <Badge className="gap-2 rounded-full flex items-center text-xs px-3">
            <CoinsIcon size={16} />
            TODO
          </Badge>
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
