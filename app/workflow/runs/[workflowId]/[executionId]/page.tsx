import WorkflowIdExecutionView, {
  WorkflowIdExecutionError,
  WorkflowIdExecutionLoading,
} from "@/modules/workflows/ui/views/workflow-id-execution-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ workflowId: string; executionId: string }>;
}

const WorkflowExecutionPage = async ({ params }: Props) => {
  const workflowParams = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.workflows.getExecution.queryOptions({
      workflowId: workflowParams.workflowId,
      executionId: workflowParams.executionId,
    })
  );

  await queryClient.prefetchQuery(
    trpc.workflows.getOne.queryOptions({
      id: workflowParams.workflowId,
    })
  );
  return (
    <div className="flex flex-col h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<WorkflowIdExecutionLoading />}>
          <ErrorBoundary fallback={<WorkflowIdExecutionError />}>
            <WorkflowIdExecutionView
              workflowId={workflowParams.workflowId}
              executionId={workflowParams.executionId}
            />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default WorkflowExecutionPage;
