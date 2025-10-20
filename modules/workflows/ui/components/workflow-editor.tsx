import React from "react";
import { WorkflowGetOne } from "../../types";
import { ReactFlowProvider } from "@xyflow/react";
import WorkflowEditorCanvas from "./workflow-editor-canvas";
import TaskMenu from "./task_menu_sidebar";
import WorkflowEditorHeader from "./workflow-editor-header";
import TaskMenuSidebar from "./task_menu_sidebar";
import { Sidebar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  workflow: WorkflowGetOne;
}

const WorkflowEditor = ({ workflow }: Props) => {
  return (
    <ReactFlowProvider>
      <SidebarProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <section className="flex h-full overflow-auto">
            <TaskMenuSidebar />
            <div className="flex flex-1 flex-col">
              <WorkflowEditorHeader workflow={workflow} />
              <WorkflowEditorCanvas workflow={workflow} />
            </div>
          </section>
        </div>
      </SidebarProvider>
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;
