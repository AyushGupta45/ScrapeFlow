"use client";
import React from "react";
import { sidebarRoutes } from "@/constants";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import DashboardUserButton from "./dashboard-user-button";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <Sidebar className="select-none">
        <SidebarHeader className="text-sidebar-accent-foreground py-4">
          <div className="flex justify-center">
            <Logo />
          </div>
        </SidebarHeader>

        <Separator className="mb-4" />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarRoutes.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-bg-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        pathname === item.href &&
                          "bg-linear-tp-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="text-sm font-medium tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          {/* <DashboardTrial /> */}
          <div className="py-1" />
          <DashboardUserButton />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
