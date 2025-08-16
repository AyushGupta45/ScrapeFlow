import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SquareDashedMousePointer } from "lucide-react";

interface Props {
  fontSize?: string;
  iconSize?: number;
}

const Logo = ({ fontSize = "text-2xl", iconSize = 20 }: Props) => {
  return (
      <Link
        href="/"
        className={cn(
          "text-2xl font-extrabold flex items-center gap-2 select-none",
          fontSize
        )}
      >
        <div className="rounded-xl bg-emerald-400 p-2">
          <SquareDashedMousePointer size={iconSize} className="stroke-white" />
        </div>
        <div>
          <span className="text-emerald-500">
            Scrape
          </span>
          <span className="text-stone-700 dark:text-stone-300">Flow</span>
        </div>
      </Link>
  );
};

export default Logo;
