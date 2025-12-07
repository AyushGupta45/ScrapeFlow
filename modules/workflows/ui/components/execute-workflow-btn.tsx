"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";
import { useExecutionPlan } from "../../hooks/use-execution-plan";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  workflowId: string;
}

const ExecuteWorkflowButton = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const trpc = useTRPC();
  // const queryClient = useQueryClient();
  const router = useRouter();
  const runWorkFlow = useMutation(
    trpc.workflows.run.mutationOptions({
      onSuccess: async (data) => {
        // await queryClient.invalidateQueries(
        //   trpc.workflows.getMany.queryOptions({})
        // );

        toast.success("Workflow execution started!", {
          id: "flow-execution-success",
        });
        router.push(`/workflow/runs/${workflowId}/${data.id}`);
      },
      onError: (error) => {
        toast.error("Something went wrong" + error.message, {
          id: "flow-execution-error",
        });
      },
    })
  );

  const handleExecute = () => {
    const plan = generate();
    if (!plan) return;
    runWorkFlow.mutate({
      workflowId,
      flowDefinition: JSON.stringify(toObject()),
    });
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleExecute}
      disabled={runWorkFlow.isPending}
    >
      <PlayIcon />
      Execute Workflow
    </Button>
  );
};

export default ExecuteWorkflowButton;
