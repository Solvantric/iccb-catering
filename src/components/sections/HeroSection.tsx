"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_FACTS } from "@/content/content";
import { IMAGES } from "@/content/images";
import { motion } from "framer-motion";

export function HeroSection() {
  const marqueeItems = [
    "Weddings",
    "Fairs & Exhibitions",
    "Corporate Events",
    "Cultural Events",
    "Exams",
    "Trainings & Seminars",
    "Convocations",
    "Fashion Shows",
  ];

  return (
    <section className="bg-paper text-ink border-b border-rule overflow-hidden">
      {/* Top Hairline Meta Bar */}
      <div className="border-b border-rule">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          <span>Est. 2015 / Dhaka, Bangladesh</span>
          <span className="hidden sm:inline">Next to 300 ft Purbachal Express Highway</span>
        </div>
      </div>

      {/* Main Hero Split (55/45) */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols / ~55%) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold block">
                § 01 / Overview
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.98] tracking-tight text-ink font-normal">
                Where Dhaka <em className="italic text-accent">gathers.</em>
              </h1>
              <p className="text-sm sm:text-base text-ink-soft max-w-xl leading-relaxed pt-2">
                South Asia&apos;s premier integrated convention and event destination, purpose-built with 6 world-class halls, open-air expo grounds, and comprehensive hospitality.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/venues"
                className="font-mono text-xs uppercase tracking-[0.12em] font-medium px-6 py-3.5 bg-ink text-paper hover:bg-ink-2 transition-colors border border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Explore Venues &rarr;
              </Link>
              <Link
                href="/contact/enquiry"
                className="font-mono text-xs uppercase tracking-[0.12em] font-medium px-6 py-3.5 border border-ink text-ink hover:bg-paper-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Enquire
              </Link>
            </div>

            {/* Two Mono Meta Blocks Using ONLY Verified Facts */}
            <div className="pt-8 border-t border-rule grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  Scale & Architecture
                </p>
                <p className="font-mono text-xs text-ink font-semibold mt-1">
                  17-Acre Site &bull; 6 Convention Halls
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  Access & Location
                </p>
                <p className="font-mono text-xs text-ink font-semibold mt-1">
                  300 ft Purbachal Highway, Kuril
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols / ~45% tall 3:4 image) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full border border-rule overflow-hidden bg-paper-2">
              <Image
                src={IMAGES.hero}
                alt="International Convention City Bashundhara Grand Event Setup"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-paper/95 dark:bg-paper-2/95 border-t border-rule py-2 px-3 text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                  Fig. 01 / International Convention City Bashundhara
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="border-t border-rule py-3 bg-paper-2 overflow-hidden">
        <div className="flex space-x-8 animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-8 text-xs font-mono uppercase tracking-[0.14em] text-ink-soft">
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-6">
                  <span>{item}</span>
                  <span className="text-accent">&bull;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
