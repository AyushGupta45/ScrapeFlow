"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { TaskType } from "../../interfaces";
import TaskMenuItem from "./task_menu_btn";

const TaskMenu = () => {
  return (
    <aside className="w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full border-b"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuItem taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;
