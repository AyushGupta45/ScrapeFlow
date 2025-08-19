"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { NewWorkflowDialog } from "./new-workflow-dialog";

const WorkflowViewHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewWorkflowDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold">WorkFlows</h1>
            <p className="text-xs text-muted-foreground">
              Mange your Workflows
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Workflow
          </Button>
        </div>
      </div>
    </>
  );
};

export default WorkflowViewHeader;
