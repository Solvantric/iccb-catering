"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { REAL_VENUES } from "@/content/content";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function VenuesSection() {
  const [activeVenue, setActiveVenue] = useState<string>(REAL_VENUES[0].id);

  const selected = REAL_VENUES.find((v) => v.id === activeVenue) || REAL_VENUES[0];

  return (
    <section className="py-24 lg:py-32 bg-paper text-ink border-b border-rule">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
            &sect; 03 / Venues
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            Halls & Grounds
          </span>
        </div>

        <div className="text-left mb-16 space-y-3">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight">
            Six venues, <em className="italic text-accent">one</em> address.
          </h2>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl font-mono">
            Purpose-built standalone halls, executive conference suites, and open-air pavilion grounds along 300 ft highway.
          </p>
        </div>

        {/* Stacked List Rows + Side Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: 8 Stacked Rows */}
          <div className="lg:col-span-8 border-t border-rule divide-y divide-rule">
            {REAL_VENUES.map((venue, idx) => {
              const isActive = activeVenue === venue.id;

              return (
                <div
                  key={venue.id}
                  onMouseEnter={() => setActiveVenue(venue.id)}
                  className={cn(
                    "group py-6 transition-colors flex items-center justify-between text-left",
                    isActive ? "bg-paper-2/60" : "hover:bg-paper-2/30"
                  )}
                >
                  <Link href={`/venues/${venue.slug}`} className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pr-4">
                    <span className="font-mono text-xs text-ink-soft group-hover:text-accent w-12 shrink-0">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-2xl sm:text-3xl text-ink group-hover:text-accent transition-colors">
                          {venue.name}
                        </h3>
                        {venue.hallNumber && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                            ({venue.hallNumber})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-soft max-w-md line-clamp-1">
                        {venue.description}
                      </p>
                      {/* Mono tags only if real */}
                      {venue.specs && (
                        <div className="flex items-center gap-2 pt-1">
                          {venue.specs.area && (
                            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-rule text-ink-soft">
                              {venue.specs.area}
                            </span>
                          )}
                          {venue.specs.parking && (
                            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-rule text-ink-soft">
                              {venue.specs.parking}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>

                  <Link
                    href={`/venues/${venue.slug}`}
                    className="w-10 h-10 border border-rule flex items-center justify-center shrink-0 group-hover:border-ink group-hover:bg-ink group-hover:text-paper transition-all"
                    aria-label={`View ${venue.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right: Hover Preview Panel */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="relative aspect-[4/3] w-full border border-rule overflow-hidden bg-paper-2">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="400px"
                className="object-cover transition-opacity duration-300"
              />
            </div>
            <div className="border border-rule p-4 bg-paper-2 text-left space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
                {selected.hallNumber || "ICCB Facility"}
              </p>
              <h4 className="font-serif text-xl text-ink font-semibold">{selected.name}</h4>
              <p className="text-xs text-ink-soft leading-relaxed">{selected.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

