import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-[4px] shrink-0 h-9 sm:h-10 w-auto transition-transform hover:opacity-95",
        className
      )}
      aria-label="ICCB Catering home"
    >
      <div className="h-full w-auto max-h-full bg-white rounded-[4px] px-2 py-1 flex items-center justify-center shadow-xs border border-ink-100/50">
        <Image
          src="/logo/iccb-logo.png"
          alt="International Convention City Bashundhara"
          width={280}
          height={70}
          priority
          className="h-full w-auto max-h-7 sm:max-h-8 object-contain shrink-0"
        />
      </div>
    </Link>
  );
}
