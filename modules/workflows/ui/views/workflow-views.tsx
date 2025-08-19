"use client";

import React from "react";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import EmptyState from "@/components/empty-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { useWorkflowsFilters } from "../../hooks/use-workflows-filter";
import { DataPagination } from "@/components/data-pagination";

const WorkflowViews = () => {
  const router = useRouter();
  const [filters, setFilters] = useWorkflowsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.workflows.getMany.queryOptions({ ...filters })
  );


  return (
    <div className="flex-1 py-4 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        // onRowClick={(row) => router.push(`/workflows/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No Workflows Found"
          description="You have not created any workflows yet. Start by creating a new workflow to automate your tasks."
        />
      )}
    </div>
  );
};

export default WorkflowViews;

export const WorkflowsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Workflows"
      description="This may take few seconds"
    />
  );
};
export const WorkflowsViewError = () => {
  return (
    <ErrorState
      title="Error loading Workflows"
      description="Something went wrong"
    />
  );
};
