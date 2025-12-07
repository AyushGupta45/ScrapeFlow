import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SquareDashedMousePointer } from "lucide-react";
import Image from "next/image";

interface Props {
  fontSize?: string;
  iconSize?: number;
}

const Logo = ({ fontSize = "text-2xl", iconSize = 35 }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2 select-none",
        fontSize
      )}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={iconSize}
        height={iconSize}
      />
      <div>
        <span className="text-emerald-500">Scrape</span>
        <span className="text-stone-700 dark:text-stone-300">Flow</span>
      </div>
    </Link>
  );
};

export default Logo;
