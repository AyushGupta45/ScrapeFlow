"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TooltipWrapper from "@/components/tooltip-wrapper";
import {
  ChevronLeftIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  SaveIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  workflow: WorkflowGetOne;
}

const WorkflowEditorHeader = ({ workflow }: Props) => {
  const router = useRouter();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const { toObject } = useReactFlow();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateWorkflow = useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: workflow.id })
        );

        toast.success("Workflow saved successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleSave = () => {
    updateWorkflow.mutate({
      ...workflow,
      definition: JSON.stringify(toObject()),
    });
  };

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

              {/* Current workflow */}
              <BreadcrumbItem>
                <BreadcrumbLink className="text-primary font-medium" asChild>
                  <div>
                    <p className="font-medium text-base text-ellipsis truncate">
                      {workflow.name}
                    </p>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-1 flex-1 justify-end">
          <Button onClick={handleSave} disabled={updateWorkflow.isPending}>
            <SaveIcon />
            Save Workflow
          </Button>
        </div>
      </header>
  );
};

export default WorkflowEditorHeader;
