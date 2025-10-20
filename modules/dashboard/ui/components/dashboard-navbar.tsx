"use client";

import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
// import DashboardCommand from "./dashboard-command";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* <DashboardCommand open={commandOpen} setOpen={setCommandOpen} /> */}
      {/* TODO NAVBAR SEARCHF ILTER */}
      <nav className="flex px-4 items-center py-3 border-b bg-background justify-between dark:bg-background/30">
        <div className="flex gap-x-4">
          <Button className="size-9" variant="outline" onClick={toggleSidebar}>
            {state === "collapsed" || isMobile ? (
              <PanelLeftIcon className="size-4" />
            ) : (
              <PanelLeftCloseIcon className="size-4" />
            )}
          </Button>

          <BreadcrumbHeader />
        </div>
        <Button
          variant="outline"
          className="h-9 max-w-[160px] sm:max-w-[220px] md:w-[340px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
