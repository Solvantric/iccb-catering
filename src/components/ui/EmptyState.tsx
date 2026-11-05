import React from "react";
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-ink-200 rounded-2xl bg-ink-50/50",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-bold font-display uppercase tracking-wider text-ink-900 mb-1">
        {title}
      </h4>
      <p className="text-xs text-ink-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
