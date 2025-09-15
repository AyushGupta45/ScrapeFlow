import { Edge, Node } from "@xyflow/react";

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_DATA = "EXTRACT_DATA",
}

export enum TaskTypesParams {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

export const ColorForHandle: Record<TaskTypesParams, string> = {
  STRING: "!bg-amber-500",
  BROWSER_INSTANCE: "!bg-sky-500",
};

export interface TaskParam {
  name: string;
  type: TaskTypesParams;
  helperText?: string;
  required?: boolean;
  hideHandler?: boolean;
  [key: string]: any;
}

export interface ParamProps {
  input: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export type WorkflowDefinition = {
  nodes: AppNode[];
  edges: Edge[];
};
