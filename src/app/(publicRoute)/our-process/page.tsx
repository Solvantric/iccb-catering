import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ShieldCheck, ThermometerSun, Utensils, CheckCircle2, Truck, Award } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Our 5-Step Catering Process & Hygiene Protocols | ICCB Catering",
  description:
    "Learn how ICCB Catering delivers flawless events: in-house slaughterhouse, laboratory quality testing, insulated thermal food transport, and dedicated banquet captains.",
  path: "/our-process",
});

export default function OurProcessPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Our Process" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Operational Discipline ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            HOW ICCB CATERING WORKS
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            From farm-to-table hygiene in our dedicated modern slaughterhouse to synchronized banquet delivery in South Asia&apos;s largest venue.
          </p>
        </div>
      </section>

      {/* The 5 Steps In-Depth */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            The Client Journey
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
            5 STEPS FROM INQUIRY TO EVENT DAY
          </h2>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-white border border-ink-100 shadow-soft items-start text-left">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 font-display font-black text-2xl flex items-center justify-center shrink-0">
              01
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl uppercase tracking-wide text-ink-950">
                Initial Consultation & Event Profiling
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                Connect with our dedicated banquet consultants online, via phone, or in person at Kuril. We review your target date, venue preference (ICCB Hall 1-4 or off-premises residence), guest attendance, and stylistic preferences.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-white border border-ink-100 shadow-soft items-start text-left">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 font-display font-black text-2xl flex items-center justify-center shrink-0">
              02
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl uppercase tracking-wide text-ink-950">
                Custom Menu Curation & Private Food Tasting
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                We craft an itemized menu proposal. For wedding receptions and major corporate events, you and your family are hosted for a tasting session at the ICCB Heritage Restaurant to calibrate spice levels, portioning, and plating confections.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-white border border-ink-100 shadow-soft items-start text-left">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 font-display font-black text-2xl flex items-center justify-center shrink-0">
              03
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl uppercase tracking-wide text-ink-950">
                Transparent Itemized Quotation
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                Receive an all-inclusive transparent quotation with per-person pricing, optional live carving stations, porcelain dinnerware, silverware, waitstaff headcount, and delivery logistics without hidden surcharges.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-white border border-ink-100 shadow-soft items-start text-left">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 font-display font-black text-2xl flex items-center justify-center shrink-0">
              04
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl uppercase tracking-wide text-ink-950">
                Reservation Confirmation & Hall Floor Plan Locking
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                Confirm your booking with a formal agreement and standard deposit. Our hall operations team coordinates buffet lane floor plans, VIP seating, stage timing, and backstage prep stations.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-white border border-ink-100 shadow-soft items-start text-left">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 font-display font-black text-2xl flex items-center justify-center shrink-0">
              05
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl uppercase tracking-wide text-ink-950">
                Event Day Execution & Thermal Delivery
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                On the event day, dishes leave our kitchen at 85°C in temperature-controlled transport, tested by our QA supervisor. Uniformed waitstaff and banquet captains ensure every guest experiences the taste of happiness.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <Link href="/quote">
            <Button size="lg" withArrow variant="primary">
              Start Step 1: Request a Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

