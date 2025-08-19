import WorkflowViewHeader from "@/modules/workflows/ui/components/workflow-view-header";
import WorkflowViews, {
  WorkflowsViewError,
  WorkflowsViewLoading,
} from "@/modules/workflows/ui/views/workflow-views";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/modules/workflows/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Workflow = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.workflows.getMany.queryOptions({ ...filters })
  );
  return (
    <div className="flex flex-col h-full">
      <WorkflowViewHeader />
      <div className="flex-1">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<WorkflowsViewLoading />}>
            <ErrorBoundary fallback={<WorkflowsViewError />}>
              <WorkflowViews />
            </ErrorBoundary>
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Workflow;
