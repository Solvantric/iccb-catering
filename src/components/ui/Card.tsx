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
    default: "bg-white border border-ink-100 shadow-soft rounded-2xl",
    dark: "bg-ink-900 border border-ink-800 text-white rounded-2xl shadow-dark",
    bordered: "bg-white border border-ink-200 rounded-2xl",
    interactive:
      "bg-white border border-ink-100 shadow-soft rounded-2xl transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-brand-200",
  };

  return (
    <div className={cn(variantStyles[variant], "p-6", className)} {...props}>
      {children}
    </div>
  );
}

