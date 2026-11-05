import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = "", light = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)}>
      <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-display font-black text-xl tracking-tighter shadow-md group-hover:scale-105 transition-transform duration-200">
        IC
      </div>
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-display font-black text-xl tracking-tight leading-none uppercase",
            light ? "text-white" : "text-ink-950"
          )}
        >
          ICCB
        </span>
        <span className="font-display font-bold text-[10px] tracking-[0.25em] text-brand-500 uppercase leading-none mt-1">
          Catering
        </span>
      </div>
    </Link>
  );
}
