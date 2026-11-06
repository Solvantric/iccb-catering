import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Mission & Values | International Convention City Bashundhara",
  description: "Our guiding principles of hospitality, safety, and event excellence.",
  path: "/about/mission-values",
});

export default function MissionValuesPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "About Us", href: "/about/overview" }, { label: "Mission & Values" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 02 / Mission & Values</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Our Guiding <span className="italic text-accent">Commitment</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            As an enterprise of Bashundhara Group, International Convention City Bashundhara is committed to setting the benchmark for international-standard event hospitality, safety, and infrastructure in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-rule p-6 bg-paper-2 space-y-3">
            <span className="mono text-accent">01. Service Integrity</span>
            <h3 className="font-serif text-xl text-ink">Hospitality Excellence</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Delivering disciplined banqueting and event operations tailored to the exact specifications of guests, hosts, and international delegations.
            </p>
          </div>

          <div className="border border-rule p-6 bg-paper-2 space-y-3">
            <span className="mono text-accent">02. Safety & Precision</span>
            <h3 className="font-serif text-xl text-ink">Structural Safety</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Operating with full compliance in fire safety, security protocols, multi-tiered crowd management, and modern hygiene standards.
            </p>
          </div>

          <div className="border border-rule p-6 bg-paper-2 space-y-3">
            <span className="mono text-accent">03. Heritage</span>
            <h3 className="font-serif text-xl text-ink">Cultural Pride</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Preserving traditional culinary art through our royal Mughal recipes while providing contemporary technology for world-class conventions.
            </p>
          </div>
        </div>
      </div>

      <BookingContactBlock
        title="Connect With Our Team"
        subtitle="For inquiries regarding our event policies, standards, or partnerships, speak directly with our team."
      />
    </div>
  );
}

