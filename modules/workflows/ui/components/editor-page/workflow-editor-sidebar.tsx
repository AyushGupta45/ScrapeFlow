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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import TaskMenuItem from "./task_menu_btn";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import { TaskType } from "@/modules/workflows/types";

const WorkflowEditorSidebar = () => {
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
          <SidebarGroup>
            <SidebarGroupContent>
              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={["extraction"]}
              >
                <AccordionItem value="extraction">
                  <AccordionTrigger className="font-bold px-2">
                    Data Extraction
                  </AccordionTrigger>
                  <AccordionContent>
                    <SidebarMenu className="gap-2">
                      <TaskMenuItem taskType={TaskType.PAGE_TO_HTML} />
                      <TaskMenuItem
                        taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT}
                      />
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>

                {/* You can add more accordion sections here */}
              </Accordion>
            </SidebarGroupContent>

            <Separator />


          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default WorkflowEditorSidebar;
