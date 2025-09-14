"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
}

const NodeCard = ({ children, nodeId, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();
  const centerNode = () => {
    const node = getNode(nodeId);
    if (!node?.position || !node?.measured) return;

    const { x: posX, y: posY } = node.position;
    const { width = 0, height = 0 } = node.measured;

    setCenter(posX + width / 2, posY + height / 2, {
      zoom: 1,
      duration: 500,
    });
  };
  return (
    <div
      onDoubleClick={centerNode}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
