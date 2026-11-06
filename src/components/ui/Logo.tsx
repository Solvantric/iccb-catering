import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        className
      )}
      aria-label="International Convention City Bashundhara Home"
    >
      {/* Ivory plate container in dark mode to ensure high contrast */}
      <div className="flex items-center gap-2.5 px-2 py-1 rounded-xs transition-colors dark:bg-[#F4EFE6] dark:text-[#1A1613]">
        {/* ICCB Red Monogram / Wordmark */}
        <div className="flex flex-col text-left">
          <span className="font-serif italic font-bold text-2xl tracking-tight leading-none text-[#E10A17]">
            ICCB
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] font-semibold text-[#1A1613] leading-none mt-1">
            Bashundhara
          </span>
        </div>
      </div>
      <div className="hidden sm:flex flex-col text-left border-l border-rule pl-3 py-0.5">
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink font-medium leading-tight">
          International Convention
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-soft leading-tight">
          City Bashundhara
        </span>
      </div>
    </Link>
  );
}
