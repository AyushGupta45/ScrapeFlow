import React from "react";
import { WorkflowGetOne } from "../../types";
import { ReactFlowProvider } from "@xyflow/react";
import WorkflowEditorCanvas from "./workflow-editor-canvas";

interface Props {
  workflow: WorkflowGetOne;
}

const WorkflowEditor = ({ workflow }: Props) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <WorkflowEditorCanvas workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;
