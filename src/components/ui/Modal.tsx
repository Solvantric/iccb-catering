"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Content */}
      <div
        className={cn(
          "relative w-full bg-white rounded-2xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200",
          maxWidthStyles[maxWidth],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-ink-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-ink-400 hover:text-ink-700 p-1 rounded-lg hover:bg-ink-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-ink-400 hover:text-ink-700 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

