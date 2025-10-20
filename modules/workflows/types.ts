import { inferRouterOutputs } from "@trpc/server";
import { Edge, Node } from "@xyflow/react";
import type { AppRouter } from "@/trpc/routers/_app";

export type WorkflowGetOne =
  inferRouterOutputs<AppRouter>["workflows"]["getOne"];
export type WorkflowGetMany =
  inferRouterOutputs<AppRouter>["workflows"]["getMany"]["items"];

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
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
  disabled?: boolean;
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
