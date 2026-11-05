"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItemProps {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle?: () => void;
  dark?: boolean;
}

export function AccordionItem({
  title,
  content,
  isOpen = false,
  onToggle,
  dark = false,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border rounded-xl transition-colors duration-200 overflow-hidden",
        dark
          ? "border-ink-800 bg-ink-900/60 hover:border-ink-700"
          : "border-ink-200 bg-white hover:border-brand-200 shadow-soft"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span
          className={cn(
            "text-base font-bold font-display uppercase tracking-wide",
            dark ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            dark ? "text-ink-400" : "text-brand-500",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div
              className={cn(
                "px-6 pb-5 pt-1 text-sm leading-relaxed border-t",
                dark
                  ? "border-ink-800 text-ink-300"
                  : "border-ink-100 text-ink-600"
              )}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items,
  dark = false,
}: {
  items: { id: string; title: string; content: string }[];
  dark?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          dark={dark}
        />
      ))}
    </div>
  );
}

