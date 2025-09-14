"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkflowSaveButtonComponent from "./workflow-sav-btn";
import { WorkflowGetOne } from "../../types";

interface Props {
  workflow: WorkflowGetOne;
}

const TopBar = ({ workflow }: Props) => {
  const router = useRouter();
  return (
    <header className="flex p-2 border-b-2 border-separate items-center justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{workflow.name}</p>
          {workflow.description && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {workflow.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <WorkflowSaveButtonComponent workflow={workflow} />
      </div>
    </header>
  );
};

export default TopBar;
