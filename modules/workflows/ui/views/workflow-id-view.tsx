"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import WorkflowEditor from "../components/editor-page/workflow-editor";

interface Props {
  workflowId: string;
}

const WorkflowIdView = ({ workflowId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.workflows.getOne.queryOptions({ id: workflowId })
  );
  return <WorkflowEditor workflow={data} />;
};

export default WorkflowIdView;

export const WorkflowIdLoading = () => {
  return (
    <LoadingState
      title="Loading Workflow"
      description="This may take few seconds"
    />
  );
};
export const WorkflowIdError = () => {
  return (
    <ErrorState
      title="Error loading Workflow"
      description="Something went wrong"
    />
  );
};
