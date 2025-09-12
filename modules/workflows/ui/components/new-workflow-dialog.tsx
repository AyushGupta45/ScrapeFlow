import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkflowForm } from "./workflow-form";
import { useRouter } from "next/navigation";

interface NewWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewWorkflowDialog = ({
  open,
  onOpenChange,
}: NewWorkflowDialogProps) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
      
          <DialogTitle>New Workflow</DialogTitle>
          <DialogDescription>
            Create a new workflow to automate your tasks.
          </DialogDescription>
        </DialogHeader>
        <WorkflowForm
          onSuccess={(id) => {
          onOpenChange(false);
          router.push(`workflow/editor/${id}`);
        }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
