import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { FlowToExecutionPlan } from "../lib/execution-plan";
import {
  AppNode,
  AppNodeMissingInputs,
  FlowToExecutionValidationError,
} from "../types";
import { useFlowValidation } from "./use-flow-validation";
import { toast } from "sonner";

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: {
      type: FlowToExecutionValidationError;
      invalidElements?: AppNodeMissingInputs[];
    }) => {
      switch (error.type) {
        case FlowToExecutionValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowToExecutionValidationError.INVALID_INPUTS:
          toast.error("Not all inputs values are set");
          setInvalidInputs(error.invalidElements!);
          break;

        default:
          toast.error("Something went wrong");
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};
