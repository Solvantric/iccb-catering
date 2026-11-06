import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = "", light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded",
        className
      )}
      aria-label="International Convention City Bashundhara"
    >
      <div
        className={cn(
          "transition-all duration-200 inline-flex items-center justify-center",
          light
            ? "bg-[#FDFBF7] p-2 sm:p-2.5 rounded-lg shadow-sm"
            : "dark:bg-[#FDFBF7] dark:p-2 sm:dark:p-2.5 dark:rounded-lg dark:shadow-sm"
        )}
      >
        <Image
          src="/logo/iccb-logo.png"
          alt="International Convention City Bashundhara"
          width={130}
          height={119}
          priority
          className="h-9 sm:h-11 w-auto object-contain"
        />
      </div>
    </Link>
  );
}
