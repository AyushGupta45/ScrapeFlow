import { AppNode, TaskType } from "@/modules/workflows/interfaces";

interface Props {
  nodetype: TaskType;
  position?: { x: number; y: number };
}

export const CreateFlowNode = ({ nodetype, position }: Props): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: "ScrapeFlowNode",
    dragHandle: ".drag-handle",
    position: position ?? { x: 0, y: 0 },
    data: {
      type: nodetype,
      inputs: {},
    },
  };
};
