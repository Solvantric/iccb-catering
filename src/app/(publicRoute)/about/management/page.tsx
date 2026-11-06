import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Management | International Convention City Bashundhara",
  description: "Executive leadership and management governance of ICCB under Bashundhara Group.",
  path: "/about/management",
});

export default function ManagementPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "About Us", href: "/about/overview" }, { label: "Management" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 03 / Leadership</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Executive <span className="italic text-accent">Management</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            International Convention City Bashundhara is guided by executive leadership under Bashundhara Group, overseeing large-scale conventions, trade exhibitions, and hospitality services.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-ink-soft">§ Governance & Operations</span>
          <p className="text-sm text-ink-soft leading-relaxed">
            For executive communications, official partnership requests, or high-level delegation inquiries, please contact the ICCB management office directly at our administrative headquarters in Kuril Bishwa Road.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Contact Management Desk"
        subtitle="Direct your administrative and official inquiries to our central desk."
      />
    </div>
  );
}

