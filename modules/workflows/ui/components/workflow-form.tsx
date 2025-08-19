import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { workflowInsertSchema } from "../../schema";
import { Textarea } from "@/components/ui/textarea";

interface WorkflowFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  // initialValues?: Workflow; // for future update
}

export const WorkflowForm = ({
  onSuccess,
  onCancel,
}: // initialValues,
WorkflowFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createWorkflow = useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({})
        );
        toast.success("Workflow created successfully!");
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  // const updateWorkflow = useMutation(
  //   trpc.workflows.update.mutationOptions({
  //     onSuccess: async () => {
  //       await queryClient.invalidateQueries(
  //         trpc.workflows.getMany.queryOptions({})
  //       );
  //       if (initialValues?.id) {
  //         await queryClient.invalidateQueries(
  //           trpc.workflows.getOne.queryOptions({ id: initialValues.id })
  //         );
  //       }
  //       onSuccess?.();
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   })
  // );

  const form = useForm<z.infer<typeof workflowInsertSchema>>({
    resolver: zodResolver(workflowInsertSchema),
    defaultValues: {
      name: "",
      description: "",
      // name: initialValues?.name ?? "",
      // description: initialValues?.description ?? "",
    },
  });

  // const isEdit = !!initialValues?.id;
  const isPending = createWorkflow.isPending; // || updateWorkflow.isPending;

  const onSubmit = (values: z.infer<typeof workflowInsertSchema>) => {
    // if (isEdit) {
    //   updateWorkflow.mutate({ ...values, id: initialValues.id });
    // } else {
    createWorkflow.mutate(values);
    // }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g. Customer Onboarding Flow" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-32"
                  placeholder="E.g. This workflow automates the customer onboarding process."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="outline"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            Create
            {/* {isEdit ? "Update" : "Create"} */}
          </Button>
        </div>
      </form>
    </Form>
  );
};
