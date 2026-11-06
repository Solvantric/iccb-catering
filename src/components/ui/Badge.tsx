import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "success" | "warning" | "danger" | "neutral" | "sample";
  size?: "sm" | "md";
}

export function Badge({
  className,
  children,
  variant = "brand",
  size = "md",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-medium tracking-wider uppercase",
    md: "text-xs px-2.5 py-1 font-semibold",
  };

  const variantStyles = {
    brand: "bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80",
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80",
    danger: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80",
    neutral: "bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 border border-ink-200 dark:border-ink-700",
    sample: "bg-amber-100 text-amber-800 border border-amber-300 font-mono text-[10px] tracking-widest",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full leading-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <Badge variant="sample" size="sm" className={className} title="Sample mock record">
      Sample
    </Badge>
  );
}

