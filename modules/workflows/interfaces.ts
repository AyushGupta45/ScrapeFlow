import { Node } from "@xyflow/react";

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum TaskTypesParams {
  STRING = "String",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
}

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
