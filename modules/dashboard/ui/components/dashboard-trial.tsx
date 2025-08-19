import { authClient } from "@/lib/auth-client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RocketIcon } from "lucide-react";

// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const DashboardTrial = () => {
  // const trpc = useTRPC();
  // const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  // if (!data) {
  //   return null;
  // }

  return (
    <div className="border bg-sidebar-accent rounded-lg w-full flex flex-col gap-y-2">
      <div className="p-3 flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="text-sm font-medium">Free Trial</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xs">
            0/200 Credits
          </p>
          <Progress value={(0/ 200) * 100} />
        </div>
      </div>
      <div className="px-4 pb-4">
        
        <Button
        className="w-full"
      >
        <Link href="/upgrade">Buy Credits</Link>
      </Button></div>
      
    </div>
  );
};

export default DashboardTrial;
