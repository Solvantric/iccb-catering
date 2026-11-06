import React from "react";
import Link from "next/link";
import { REAL_EVENT_TYPES } from "@/content/content";
import { ArrowUpRight } from "lucide-react";

export function PlanEventSection() {
  return (
    <section className="py-24 lg:py-32 bg-paper text-ink border-b border-rule">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
            &sect; 04 / Plan Your Event
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            Occasions
          </span>
        </div>

        <div className="text-left mb-16 space-y-3">
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Events of every <em className="italic text-accent">character.</em>
          </h2>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl font-mono">
            From intimate ceremonies to national summits, ICCB provides dedicated layouts, audio-visual technicalities, and logistical coordination.
          </p>
        </div>

        {/* 8 Event Types Stacked Rows */}
        <div className="border-t border-rule divide-y divide-rule">
          {REAL_EVENT_TYPES.map((ev, idx) => (
            <Link
              key={ev.id}
              href={`/plan/${ev.slug}`}
              className="group py-6 flex items-center justify-between text-left hover:bg-paper-2 transition-colors px-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                <span className="font-mono text-xs text-ink-soft group-hover:text-accent w-10 shrink-0">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink group-hover:text-accent transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-ink-soft mt-1 max-w-xl leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="w-10 h-10 border border-rule flex items-center justify-center shrink-0 group-hover:border-ink group-hover:bg-ink group-hover:text-paper transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

