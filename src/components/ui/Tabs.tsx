"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pills" | "underline" | "dark";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pills",
}: TabsProps) {
  if (variant === "dark") {
    return (
      <div className={cn("flex flex-wrap gap-2 p-1.5 bg-ink-900 border border-ink-800 rounded-xl", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 uppercase tracking-wider",
                isActive
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-ink-300 hover:text-white hover:bg-ink-800/60"
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn("ml-2 px-1.5 py-0.5 rounded-full text-[10px]", isActive ? "bg-white/20" : "bg-ink-800")}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2 p-1 bg-ink-100 rounded-xl", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 tracking-wide",
              isActive
                ? "bg-white text-ink-950 shadow-sm"
                : "text-ink-600 hover:text-ink-900 hover:bg-white/50"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn("ml-2 px-1.5 py-0.5 rounded-full text-[10px]", isActive ? "bg-brand-100 text-brand-700" : "bg-ink-200")}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

