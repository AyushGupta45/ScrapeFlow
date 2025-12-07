"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WorkflowGetMany } from "../../types";
import { Button } from "@/components/ui/button";
import {
  RocketIcon,
  ClockArrowUpIcon,
  ArchiveIcon,
  ShuffleIcon,
  EllipsisVertical,
  TrashIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { useConfirm } from "@/components/use-confirm";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const statusIconMap = {
  draft: ClockArrowUpIcon,
  published: RocketIcon,
};

const statusColorMap = {
  draft: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  published: "bg-green-500/20 text-green-800 border-green-800/5",
};

export const columns: ColumnDef<WorkflowGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Workflow Name",
    cell: ({ row }) => {
      const status = row.original.status as keyof typeof statusIconMap;
      const Icon = statusIconMap[status];
      return (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-4 items-center">
            <span className="font-semibold capitalize truncate">
              {row.original.name}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "capitalize [&>svg]:size-4 text-muted-foreground flex items-center gap-1 py-1 px-2",
                statusColorMap[status]
              )}
            >
              <Icon />
              {row.original.status}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground truncate">
            {row.original.description}
          </span>
        </div>
      );
    },
  },

  {
    id: "options",
    header: "Options",
    cell: ({ row }) => {
      const trpc = useTRPC();
      const queryClient = useQueryClient();

      const removeWorkflow = useMutation(
        trpc.workflows.remove.mutationOptions({
          onSuccess: async () => {
            await queryClient.invalidateQueries(
              trpc.workflows.getMany.queryOptions({})
            );
            toast.success("Workflow deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        })
      );

      const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "This action will permanently remove this workflow.",
        {
          buttonText: "Delete",
          buttonVariant: "destructive",
        }
      );

      const handleRemoveWorkflow = async () => {
        const ok = await confirmRemove();
        if (!ok) return;

        await removeWorkflow.mutateAsync({ id: row.original.id });
      };

      return (
        <>
          <RemoveConfirmation />
          <div className="flex items-center gap-4 justify-end">
            <Link href={`/workflow/editor/${row.original.id}`}>
              <Button variant="outline" size="sm">
                <ShuffleIcon size={16} />
                Edit
              </Button>
            </Link>

            <DropdownMenu>
              <TooltipWrapper content="More options">
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <EllipsisVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipWrapper>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive flex items-center gap-2"
                  onClick={handleRemoveWorkflow}
                  disabled={removeWorkflow.isPending}
                >
                  <TrashIcon size={16} className="text-destructive" />
                  {removeWorkflow.isPending ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];
