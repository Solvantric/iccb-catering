"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_FACTS } from "@/content/content";
import { IMAGES } from "@/content/images";

export function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-paper text-ink border-b border-rule">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Pattern */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
            &sect; 02 / About
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            Origin & Scale
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Tall Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full border border-rule overflow-hidden bg-paper-2">
              <Image
                src={IMAGES.about}
                alt="ICCB Convention Grounds"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-paper/95 dark:bg-paper-2/95 border-t border-rule py-2 px-3 text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Fig. 02 / 17-Acre Convention Campus
                </span>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Verified Stats */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-soft block">
                The National Stage
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink leading-tight font-normal">
                Architecture designed for <em className="italic text-accent">magnitude.</em>
              </h2>
              <p className="text-base sm:text-lg text-ink font-serif italic leading-relaxed pt-2">
                Conceived as the premier venue for grand social celebrations, bilateral conventions, and industrial exhibitions in Bangladesh.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-ink-soft leading-relaxed pt-2">
                <p>
                  International Convention City Bashundhara (ICCB) stands on a 17-acre perimeter along the 300-foot Purbachal Express Highway in Kuril, Dhaka. Architecturally conceived by Volumezero with structural metal, concrete, and glass elements, the complex delivers seamless logistical movement with an expansive peripheral loop road and multi-level parking.
                </p>
                <p>
                  With six standalone covered halls and the extensive open grounds of Expo Village, ICCB provides purpose-built infrastructure for gatherings that define the nation&apos;s cultural and corporate landscape.
                </p>
              </div>
            </div>

            {/* Verified Stats Row ONLY */}
            <div className="pt-8 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border border-rule p-5 bg-paper-2">
                <p className="font-serif text-3xl sm:text-4xl text-ink">
                  {SITE_FACTS.foundedYear}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mt-1">
                  Operating Since
                </p>
              </div>
              <div className="border border-rule p-5 bg-paper-2">
                <p className="font-serif text-3xl sm:text-4xl text-ink">
                  {SITE_FACTS.venueCount}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mt-1">
                  Convention Halls
                </p>
              </div>
              <div className="border border-rule p-5 bg-paper-2 sm:col-span-1">
                <p className="font-serif text-xl sm:text-2xl text-ink leading-snug">
                  South Asia&apos;s
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mt-1">
                  Largest Event Venue
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about/overview"
                className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 text-ink hover:text-accent transition-colors"
              >
                Read Full Overview & Mission &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

