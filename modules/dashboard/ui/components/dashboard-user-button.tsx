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
import { ChevronsUpDownIcon, CreditCardIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border-2 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/50 cursor-pointer p-3 w-full flex items-center justify-between overflow-hidden gap-2">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronsUpDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="top" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          // onClick={async () => await authClient.customer.portal()}
          className="cursor-pointer flex items-center justify-between"
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
              },
            })
          }
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOut className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
