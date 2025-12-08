"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import React from "react";
import WorkflowExecutor from "../components/executor-page/workflow-executor";

interface Props {
  workflowId: string;
  executionId: string;
}

const WorkflowIdExecutionView = ({ workflowId, executionId }: Props) => {
  const trpc = useTRPC();
  const { data: workflowExecutionData } = useSuspenseQuery({
    ...trpc.workflows.getExecution.queryOptions({ workflowId, executionId }),
    refetchInterval: (query) =>
      query.state.data?.status === "RUNNING" ? 1000 : false,
  });
  const { data: workflowData } = useSuspenseQuery(
    trpc.workflows.getOne.queryOptions({ id: workflowId })
  );
  return (
    <WorkflowExecutor
      workflowExecution={workflowExecutionData}
      workflowData={workflowData}
      executionId={executionId}
    />
  );
};

export default WorkflowIdExecutionView;

export const WorkflowIdExecutionLoading = () => {
  return (
    <LoadingState
      title="Loading Workflow Execution"
      description="This may take few seconds"
    />
  );
};
export const WorkflowIdExecutionError = () => {
  return (
    <ErrorState
      title="Error loading Workflow Execution"
      description="Something went wrong"
    />
  );
};
