import React, { useState } from "react";
import { WorkflowGetExecution, WorkflowGetOne } from "../../../types";
import WorkflowExecutorHeader from "./workflow-executor-header";
import ExecutionViewer from "./execution-viewer";
import { SidebarProvider } from "@/components/ui/sidebar";
import WorkflowExecutorSidebar from "./workflow-execution-sidebar";

interface Props {
  workflowExecution: WorkflowGetExecution;
  workflowData: WorkflowGetOne;
  executionId: string;
}

const WorkflowExecutor = ({
  workflowExecution,
  workflowData,
  executionId,
}: Props) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  return (
    <SidebarProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <WorkflowExecutorSidebar
            selectedPhaseId={selectedPhaseId}
            setSelectedPhaseId={setSelectedPhaseId}
            initialData={workflowExecution}
          />
          <div className="flex flex-1 flex-col">
            <WorkflowExecutorHeader
              workflowData={workflowData}
              executionId={executionId}
            />
            <ExecutionViewer
              workflowExecution={workflowExecution}
              selectedPhaseId={selectedPhaseId}
            />
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
};

export default WorkflowExecutor;
