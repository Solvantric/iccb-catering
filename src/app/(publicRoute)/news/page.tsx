import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "News & Media | ICCB",
  description: "Official press releases, media coverage, and public notices regarding ICCB.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "News & Media" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Press</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            News & <span className="italic text-accent">Media</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Official announcements, press statements, and media inquiries regarding International Convention City Bashundhara.
          </p>
        </div>

        <div className="border border-rule p-8 bg-paper-2 space-y-4">
          <span className="mono text-ink-soft">§ Media Accreditation & Inquiries</span>
          <p className="text-sm text-ink-soft leading-relaxed">
            Journalists, press representatives, and broadcasters seeking media accreditation or official statements should reach out to the ICCB corporate communications desk.
          </p>
        </div>
      </div>

      <BookingContactBlock
        title="Corporate Communications Desk"
        subtitle="For press releases, media coverage, and official notices."
      />
    </div>
  );
}

