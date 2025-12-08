"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import { TaskType, WorkflowGetExecution } from "@/modules/workflows/types";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  FileCog,
  Loader2Icon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { datesToDurationString } from "@/modules/workflows/lib/helper-functions";

interface SidebarProps {
  initialData: WorkflowGetExecution;
  selectedPhaseId: string | null;
  setSelectedPhaseId: (id: string) => void;
}

const infoItems = [
  {
    label: "Status",
    icon: <CircleDashedIcon size={20} />,
    getValue: (data: any) => data?.status ?? "—",
  },
  {
    label: "Started At",
    icon: <CalendarIcon size={20} />,
    getValue: (data: any) =>
      data?.startedAt
        ? formatDistanceToNow(new Date(data.startedAt), { addSuffix: true })
        : "—",
  },
  {
    label: "Duration",
    icon: <ClockIcon size={20} />,
    getValue: (data: any) => {
      const duration = datesToDurationString(
        data?.completedAt ? new Date(data.completedAt) : null,
        data?.startedAt ? new Date(data.startedAt) : null
      );
      return duration || <Loader2Icon size={20} className="animate-spin" />;
    },
  },
];

const WorkflowExecutorSidebar = ({
  initialData,
  selectedPhaseId,
  setSelectedPhaseId,
}: SidebarProps) => {
  const { state, isMobile } = useSidebar();

  return (
    <>
      <Sidebar className="select-none">
        <SidebarHeader className="text-sidebar-accent-foreground py-4 bg-white">
          <div className="flex justify-center">
            <Logo />
          </div>
        </SidebarHeader>

        <Separator />

        <SidebarContent className="bg-white">
          <SidebarGroup className="pt-0">
            <SidebarGroupLabel className="text-sm mt-4">
              Execution Details
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="relative flex w-full min-w-0 flex-col p-4 pt-1 gap-2">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="h-10 border border-transparent from-bg-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                  >
                    <div className="h-full flex justify-between items-center">
                      <div className="text-muted-foreground flex items-center gap-2">
                        {item.icon}
                        <p>{item.label}</p>
                      </div>

                      <div className="font-semibold flex items-center gap-2">
                        {item.getValue(initialData)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>

            <Separator />

            <SidebarGroupLabel className="text-sm mt-4">
              Execution Phases
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="relative flex w-full min-w-0 flex-col py-4 px-2 pt-1 gap-2">
                {initialData?.phases.map((phase, index) => (
                  <Button
                    key={phase.id}
                    className="h-10 border border-transparent flex justify-between px-2"
                    variant={
                      selectedPhaseId === phase.id ? "secondary" : "ghost"
                    }
                    onClick={() => setSelectedPhaseId(phase.id)}
                  >
                    <div className="h-full w-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="flex items-center justify-center h-6 w-6 rounded-sm p-0 text-sm leading-none"
                        >
                          {index + 1}
                        </Badge>
                        <p className="font-semibold">{phase.name}</p>
                      </div>
                      <p className="flex items-center justify-center text-xs leading-none text-muted-foreground">
                        {phase.status}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default WorkflowExecutorSidebar;
