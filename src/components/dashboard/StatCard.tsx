import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-10 border border-ink-100 shadow-soft flex flex-col justify-between text-left group hover:shadow-card hover:border-brand-200 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
          {title}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white transition-all">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="font-display font-black text-2xl sm:text-3xl text-ink-950">
          {value}
        </div>

        <div className="flex items-center gap-2 mt-2">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full",
                isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {change}
            </span>
          )}
          {subtitle && <span className="text-[11px] text-ink-400">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}

