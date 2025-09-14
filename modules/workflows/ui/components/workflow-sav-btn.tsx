"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import React from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { WorkflowGetOne } from "../../types";

interface Props {
  workflow: WorkflowGetOne;
}

const WorkflowSaveButtonComponent = ({ workflow }: Props) => {
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
    <Button
      variant="outline"
      className="flex items-center gap-1"
      onClick={handleSave}
      disabled={updateWorkflow.isPending}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      <p className="">Save</p>
    </Button>
  );
};

export default WorkflowSaveButtonComponent;
