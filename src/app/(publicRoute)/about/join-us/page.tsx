import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Join Us | Careers at ICCB",
  description: "Career opportunities in hospitality, venue management, and event operations at ICCB.",
  path: "/about/join-us",
});

export default function JoinUsPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "About Us", href: "/about/overview" }, { label: "Join Us" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 05 / Careers</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Join Our <span className="italic text-accent">Team</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Be part of South Asia&apos;s leading convention destination. We welcome dynamic professionals in hospitality management, culinary arts, technical engineering, and client relations.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-ink-soft">§ Recruitment Inquiries</span>
          <p className="text-sm text-ink-soft leading-relaxed">
            To enquire regarding current openings or to submit an unsolicited curriculum vitae, please email our human resources department at{" "}
            <a href={`mailto:${SITE_FACTS.bookingEmail}`} className="text-accent underline font-mono">
              {SITE_FACTS.bookingEmail}
            </a>{" "}
            with the subject line &ldquo;Career Application — [Your Domain]&rdquo;.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Administrative Office"
        subtitle="For inquiries regarding employment verifications and general administration."
      />
    </div>
  );
}

