import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Team | International Convention City Bashundhara",
  description: "The dedicated event operations, banqueting, and facilities personnel behind ICCB.",
  path: "/about/our-team",
});

export default function OurTeamPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "About Us", href: "/about/overview" }, { label: "Our Team" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 04 / Team</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Event & Hospitality <span className="italic text-accent">Personnel</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Our multi-disciplinary team brings together experienced event coordinators, culinary chefs, logistics engineers, and security personnel dedicated to seamless event execution.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-ink-soft">§ Departmental Coordination</span>
          <p className="text-sm text-ink-soft leading-relaxed">
            From preliminary floor planning to real-time banqueting logistics, our departmental teams work hand-in-hand with organizers to ensure flawless event hosting.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Coordinate With Our Operations Team"
        subtitle="Speak with our dedicated venue specialists for technical and banqueting requirements."
      />
    </div>
  );
}

