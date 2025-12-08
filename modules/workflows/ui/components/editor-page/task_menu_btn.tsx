import React from "react";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "../../tasks/registry";
import { TaskType } from "@/modules/workflows/types";

interface Props {
  taskType: TaskType;
}

const TaskMenuItem = ({ taskType }: Props) => {
  const task = TaskRegistry[taskType as keyof typeof TaskRegistry];
  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center border w-full"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex justify-center items-center gap-1.5 ">
        <task.icon size={20} />
        <p>{task.label}</p>
      </div>
    </Button>
  );
};

export default TaskMenuItem;
