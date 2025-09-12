import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";


export type WorkflowGetOne =
  inferRouterOutputs<AppRouter>["workflows"]["getOne"];
export type WorkflowGetMany =
  inferRouterOutputs<AppRouter>["workflows"]["getMany"]["items"];

