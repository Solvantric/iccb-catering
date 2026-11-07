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
        "inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl shrink-0 transition-all duration-200 hover:opacity-95",
        className
      )}
      aria-label="ICCB Catering home"
    >
      <div className="h-full w-auto max-h-full bg-white rounded-xl p-1 sm:p-1.5 md:p-2 flex items-center justify-center shadow-xs border border-ink-100/70">
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
