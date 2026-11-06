import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { REAL_VENUES, SITE_FACTS } from "@/content/content";
import { IMAGES } from "@/content/images";
import { generatePageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Convention Halls & Outdoor Grounds | ICCB Venues",
  description: "Explore ICCB's 6 convention halls, Expo Village open grounds, and Heritage Restaurant in Kuril, Dhaka.",
  path: "/venues",
});

export default function VenuesPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Venues" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ 01 / Spaces</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Convention Halls & <span className="italic text-accent">Grounds</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            International Convention City Bashundhara features 6 specialized convention halls, the sprawling outdoor Expo Village, and authentic heritage dining suites on a 17-acre facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REAL_VENUES.map((venue, index) => (
            <article
              key={venue.id}
              className="border border-rule bg-paper-2 flex flex-col justify-between group hover:border-accent transition-colors"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper">
                  <Image
                    src={venue.image}
                    alt={`${venue.name} ${venue.hallNumber || ""}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL={IMAGES.placeholderBlur}
                  />
                  <div className="absolute top-3 left-3 bg-paper/90 px-2.5 py-1 text-[11px] font-mono border border-rule">
                    {venue.hallNumber || "Open Grounds"}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="mono text-ink-soft">0{index + 1}</span>
                    <span className="text-xs text-ink-soft font-mono">{venue.tagline}</span>
                  </div>
                  <h2 className="font-serif text-2xl text-ink">{venue.name}</h2>
                  <p className="text-xs text-ink-soft leading-relaxed line-clamp-3">
                    {venue.description}
                  </p>

                  {venue.features && venue.features.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {venue.features.map((feat) => (
                        <span key={feat} className="text-[10px] font-mono border border-rule px-2 py-0.5 text-ink-soft">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-rule mt-4 flex items-center justify-between">
                <Link
                  href={`/venues/${venue.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink hover:text-accent transition-colors"
                >
                  <span>Explore Hall</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact/enquiry"
                  className="text-xs font-mono text-ink-soft hover:text-ink underline"
                >
                  Check Availability
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BookingContactBlock
        title="Inquire Regarding Hall Bookings"
        subtitle="For specifications, technical floor layouts, and date reservations, connect with our banquet office."
      />
    </div>
  );
}
