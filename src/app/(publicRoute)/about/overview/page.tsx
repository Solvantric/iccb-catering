import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS, REAL_VENUES } from "@/content/content";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Overview | International Convention City Bashundhara",
  description: "Operating since 1 January 2015 along the 300 ft Purbachal Express Highway in Kuril Bishwa Road, Dhaka.",
  path: "/about/overview",
});

export default function OverviewPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "About Us", href: "/about/overview" }, { label: "Overview" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 01 / Overview</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            International Convention City <span className="italic text-accent">Bashundhara</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Operating since 1 January 2015, ICCB is South Asia&apos;s premier purpose-built convention, exhibition, and banqueting destination, situated along the 300 ft Purbachal Express Highway in Kuril Bishwa Road, Dhaka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-ink-soft">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-ink">Architectural Scale & Purpose</h2>
            <p>
              Designed by Volumezero and spanning a 17-acre perimeter, ICCB was engineered to host national gatherings, international bilateral summits, large-scale industrial trade fairs, and landmark weddings with comprehensive in-house logistics and security.
            </p>
            <p>
              The structural design combines concrete, steel, and expansive glass curtain walls, delivering acoustic discipline and column-free exhibition halls capable of hosting high-volume guest traffic seamlessly.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-ink">Integrated Facilities</h2>
            <p>
              The complex encompasses six fully air-conditioned convention halls, the vast open-air Expo Village for outdoor expositions, and the renowned ICCB Heritage Restaurant offering royal Mughal dining traditions.
            </p>
            <p>
              Every hall is backed by uninterrupted high-voltage utility grids, multi-tiered parking perimeters, pre-function lobbies, and dedicated catering kitchens.
            </p>
          </div>
        </div>

        <div className="border border-rule p-6 bg-paper-2 space-y-4">
          <span className="mono text-ink-soft">§ Key Facts</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-ink-soft block">Inaugurated</span>
              <span className="text-ink font-semibold">{SITE_FACTS.operatingSince}</span>
            </div>
            <div>
              <span className="text-ink-soft block">Site Area</span>
              <span className="text-ink font-semibold">{SITE_FACTS.siteScale}</span>
            </div>
            <div>
              <span className="text-ink-soft block">Venues</span>
              <span className="text-ink font-semibold">6 Halls + Expo Grounds</span>
            </div>
            <div>
              <span className="text-ink-soft block">Architect</span>
              <span className="text-ink font-semibold">{SITE_FACTS.architect}</span>
            </div>
          </div>
        </div>
      </div>

      <BookingContactBlock
        title="Schedule a Venue Inspection"
        subtitle="Our venue coordination team is available at Kuril Bishwa Road to walk through floor plans and scheduling."
      />
    </div>
  );
}

