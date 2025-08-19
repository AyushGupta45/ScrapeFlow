import { Button } from "@/components/ui/button";
import { useState, JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type ButtonVariant = "default" | "destructive" | "outline";

export const useConfirm = (
  title: string,
  description: string,
  options?: {
    buttonText?: string;
    buttonVariant?: ButtonVariant;
  }
): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={!!promise} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full lg:w-auto"
            variant={options?.buttonVariant ?? "default"}
          >
            {options?.buttonText ?? "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
