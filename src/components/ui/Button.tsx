"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "danger";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      withArrow = false,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 tracking-wide",
      md: "text-sm px-5 py-2.5 gap-2 tracking-wide",
      lg: "text-base px-7 py-3.5 gap-2.5 tracking-wide",
    };

    const variantStyles = {
      primary:
        "bg-brand-500 text-white shadow-md hover:bg-brand-600 active:bg-brand-700 hover:shadow-floating hover:-translate-y-0.5",
      secondary:
        "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 active:bg-white/30",
      outline:
        "border border-brand-500 text-brand-600 bg-transparent hover:bg-brand-50 active:bg-brand-100",
      ghost:
        "text-ink-600 hover:text-ink-900 hover:bg-ink-100 active:bg-ink-200",
      dark:
        "bg-ink-900 text-white hover:bg-black active:bg-ink-950 border border-ink-800",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        <span>{children}</span>
        {withArrow && !isLoading && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

