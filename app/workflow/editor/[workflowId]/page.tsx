import WorkflowIdView, {
  WorkflowIdError,
  WorkflowIdLoading,
} from "@/modules/workflows/ui/views/workflow-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{ workflowId: string }>;
}

const WorkflowEditor = async ({ params }: Props) => {
  const workflowId = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.workflows.getOne.queryOptions({ id: workflowId.workflowId })
  );
  return (
    <div className="flex flex-col h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<WorkflowIdLoading />}>
          <ErrorBoundary fallback={<WorkflowIdError />}>
            <WorkflowIdView workflowId={workflowId.workflowId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default WorkflowEditor;
