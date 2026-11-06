import React from "react";
import Image from "next/image";
import { SITE_FACTS } from "@/content/content";
import { IMAGES } from "@/content/images";

export function GroundsSection() {
  const groundPillars = [
    {
      title: "Masterplan Architecture",
      detail: `Conceived by architectural studio ${SITE_FACTS.architect} across a 17-acre site using durable metal, concrete, and glass structural frameworks.`,
    },
    {
      title: "Circulation Loop Road",
      detail: "Wide internal loop road engineered for fluid transit of delegational convoys, broadcast vans, and event logistics without traffic congestion.",
    },
    {
      title: "Canopy & Perimeter Parking",
      detail: "Dedicated multi-vehicle shaded canopy parking and expansive paved perimeter bays supporting high-volume attendance.",
    },
    {
      title: "Security & Surveillance",
      detail: "Multi-tier security infrastructure with boundary perimeters, controlled entry access checkpoints, and 24-hour campus monitoring.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-paper text-ink border-b border-rule">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
            &sect; 06 / Grounds &amp; Story
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            Site Infrastructure
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-tight">
              A 17-acre canvas for <em className="italic text-accent">logistical precision.</em>
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-mono">
              The ICCB campus integrates architecture, security, and vehicular flow to handle national gatherings with complete institutional control.
            </p>

            <div className="relative aspect-[16/10] w-full border border-rule overflow-hidden bg-paper-2 mt-8">
              <Image
                src={IMAGES.grounds}
                alt="ICCB Grounds"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: 4 Ground Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {groundPillars.map((item, idx) => (
              <div key={item.title} className="p-6 border border-rule bg-paper-2 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold block">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
                <h3 className="font-serif text-xl text-ink font-semibold">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-soft leading-relaxed font-mono">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

