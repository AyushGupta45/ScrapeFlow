import React from "react";
import { WorkflowGetOne } from "../../../types";
import { ReactFlowProvider } from "@xyflow/react";
import WorkflowEditorCanvas from "./workflow-editor-canvas";
import WorkflowEditorHeader from "./workflow-editor-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FlowValidationContextProvider } from "../flow-validation-context";
import WorkflowEditorSidebar from "./workflow-editor-sidebar";

interface Props {
  workflow: WorkflowGetOne;
}

const WorkflowEditor = ({ workflow }: Props) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <SidebarProvider>
          <div className="flex flex-col h-full w-full overflow-hidden">
            <section className="flex h-full overflow-auto">
              <WorkflowEditorSidebar />
              <div className="flex flex-1 flex-col">
                <WorkflowEditorHeader workflow={workflow} />
                <WorkflowEditorCanvas workflow={workflow} />
              </div>
            </section>
          </div>
        </SidebarProvider>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default WorkflowEditor;
