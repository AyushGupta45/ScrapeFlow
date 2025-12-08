"use client";

import { WorkflowGetExecution } from "@/modules/workflows/types";
import React from "react";

interface Props {
  workflowExecution: WorkflowGetExecution;
  selectedPhaseId: string | null;
}

const ExecutionViewer = ({ workflowExecution, selectedPhaseId }: Props) => {
  const selectedPhase = selectedPhaseId
    ? workflowExecution.phases.find((p) => p.id === selectedPhaseId)
    : null;

  return (
    <main className="h-full w-full overflow-auto p-6">
      <pre className="">
        {JSON.stringify(selectedPhase, null, 2)}
      </pre>
    </main>
  );
};

export default ExecutionViewer;
