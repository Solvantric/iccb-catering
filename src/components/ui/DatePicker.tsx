"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  label?: string;
  value?: string; // DD/MM/YYYY
  onChange: (date: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function DatePicker({
  label,
  value = "",
  onChange,
  error,
  placeholder = "DD/MM/YYYY",
  className,
  required,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const handleSelectDay = (day: number) => {
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(viewMonth + 1).padStart(2, "0");
    const dateStr = `${formattedDay}/${formattedMonth}/${viewYear}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={cn("relative w-full text-left space-y-1.5", className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
          {label} {required && <span className="text-brand-500">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors duration-150",
          error && "border-red-500",
          !value && "text-ink-400"
        )}
      >
        <span>{value || placeholder}</span>
        <CalendarIcon className="w-4 h-4 text-ink-400" />
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-72 bg-white rounded-xl shadow-xl border border-ink-200 p-4 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-ink-900">
              {monthNames[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded hover:bg-ink-100 text-ink-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded hover:bg-ink-100 text-ink-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-[10px] font-bold text-ink-400 uppercase">
                {d}
              </span>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formattedDay = String(day).padStart(2, "0");
              const formattedMonth = String(viewMonth + 1).padStart(2, "0");
              const currentStr = `${formattedDay}/${formattedMonth}/${viewYear}`;
              const isSelected = value === currentStr;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "h-7 w-7 text-xs rounded-full flex items-center justify-center transition-colors mx-auto",
                    isSelected
                      ? "bg-brand-500 text-white font-bold"
                      : "hover:bg-brand-50 hover:text-brand-600 text-ink-800"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

