"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          rows={rows}
          ref={ref}
          className={cn(
            "w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors duration-150 disabled:bg-ink-50 disabled:cursor-not-allowed resize-y",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="text-xs text-ink-400">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
