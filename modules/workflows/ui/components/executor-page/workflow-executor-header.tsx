"use client";
import React from "react";

import { PanelLeftCloseIcon, PanelLeftIcon, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowGetOne } from "../../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  workflowData: WorkflowGetOne;
  executionId: string;
}

const WorkflowExecutorHeader = ({ workflowData, executionId }: Props) => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  // const { toObject } = useReactFlow();
  // const trpc = useTRPC();
  // const queryClient = useQueryClient();

  // const updateWorkflow = useMutation(
  //   trpc.workflows.update.mutationOptions({
  //     onSuccess: async () => {
  //       await queryClient.invalidateQueries(
  //         trpc.workflows.getMany.queryOptions({})
  //       );
  //       await queryClient.invalidateQueries(
  //         trpc.workflows.getOne.queryOptions({ id: workflow.id })
  //       );

  //       toast.success("Workflow saved successfully");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   })
  // );

  // const handleSave = () => {
  //   updateWorkflow.mutate({
  //     ...workflow,
  //     definition: JSON.stringify(toObject()),
  //   });
  // };

  return (
    <header className="flex px-4 items-center py-3 border-b bg-background justify-between dark:bg-background/30">
      <div className="flex gap-x-4 items-center">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-primary text-base"
                >
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            {/* Workflows */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/workflows"
                  className="text-gray-500 hover:text-primary text-base"
                >
                  Workflows
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {/* workflow editor */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/workflow/editor/${workflowData.id}`}
                  className="text-gray-500 hover:text-primary text-base"
                >
                  {workflowData.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink className="text-primary font-medium" asChild>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-base text-ellipsis truncate">
                    Workflow Execution details
                  </p>
                  <p className="text-gray-500 text-xs text-ellipsis truncate">
                    Run ID: {executionId}
                  </p>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4 flex-1 justify-end">
        {/* <ExecuteWorkflowButton workflowId={workflow.id} />

        <Button onClick={handleSave} disabled={updateWorkflow.isPending}>
          <SaveIcon />
          Save Workflow
        </Button> */}
      </div>
    </header>
  );
};

export default WorkflowExecutorHeader;
