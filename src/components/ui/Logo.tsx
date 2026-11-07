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
        "h-full inline-flex items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        className
      )}
      aria-label="ICCB Catering home"
    >
      <div className="h-full w-auto bg-[#FFFFFF] p-[6px] border-r border-ink-100 dark:border-white/10 flex items-center justify-center">
        <Image
          src="/logo/iccb-logo.png"
          alt="International Convention City Bashundhara"
          width={390}
          height={358}
          priority
          className="h-full w-auto max-h-full object-contain shrink-0"
        />
      </div>
    </Link>
  );
}
