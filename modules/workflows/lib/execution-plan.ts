import { Edge } from "@xyflow/react";
import {
  AppNode,
  AppNodeMissingInputs,
  FlowToExecutionValidationError,
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "../types";
import { TaskRegistry } from "../ui/tasks/registry";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: FlowToExecutionValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
};

export const FlowToExecutionPlan = (
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType => {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );
  if (!entryPoint) {
    return {
      error: { type: FlowToExecutionValidationError.NO_ENTRY_POINT },
    };
  }

  const inputswithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidINputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidINputs.length > 0) {
    inputswithErrors.push({ nodeId: entryPoint.id, inputs: invalidINputs });
  }
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // console.error("Invalid inputs", currentNode.id, invalidInputs);
          inputswithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  if (inputswithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionValidationError.INVALID_INPUTS,
        invalidElements: inputswithErrors,
      },
    };
  }

  return { executionPlan };
};

const getInvalidInputs = (
  node: AppNode,
  edge: Edge[],
  planned: Set<string>
) => {
  const invalidInputs = [];

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }

    const incomingEdges = edge.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }

    invalidInputs.push(input.name);
  }
  return invalidInputs;
};

const getIncomers = (node: AppNode, nodes: AppNode[], edges: Edge[]) => {
  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });
  return nodes.filter((n) => incomersIds.has(n.id));
};
