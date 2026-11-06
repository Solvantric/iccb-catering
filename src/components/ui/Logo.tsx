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
        "inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-[2px] shrink-0",
        className
      )}
      aria-label="ICCB home"
    >
      <div className="h-full w-auto bg-white rounded-[2px] p-1 sm:p-1.5 flex items-center justify-center shadow-xs">
        <Image
          src="/logo/iccb-logo.png"
          alt="International Convention City Bashundhara"
          width={319}
          height={291}
          priority
          className="h-full w-auto max-h-full object-contain"
        />
      </div>
    </Link>
  );
}
