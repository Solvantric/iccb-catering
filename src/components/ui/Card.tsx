import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "bordered" | "interactive";
}

export function Card({
  className,
  children,
  variant = "default",
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white dark:bg-ink-900 border border-ink-100 dark:border-white/10 shadow-soft rounded-2xl text-ink-950 dark:text-ink-50",
    dark: "bg-ink-900 border border-ink-800 text-white rounded-2xl shadow-dark",
    bordered: "bg-white dark:bg-ink-900 border border-ink-200 dark:border-white/10 rounded-2xl text-ink-950 dark:text-ink-50",
    interactive:
      "bg-white dark:bg-ink-900 border border-ink-100 dark:border-white/10 shadow-soft rounded-2xl transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-brand-200 dark:hover:border-white/20 text-ink-950 dark:text-ink-50",
  };

  return (
    <div className={cn(variantStyles[variant], "p-6", className)} {...props}>
      {children}
    </div>
  );
}

