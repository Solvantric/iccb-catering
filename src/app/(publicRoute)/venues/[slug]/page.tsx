import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { REAL_VENUES, SITE_FACTS } from "@/content/content";
import { IMAGES } from "@/content/images";
import { generatePageMetadata } from "@/lib/seo";
import { Check, ArrowLeft } from "lucide-react";

interface VenueDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return REAL_VENUES.map((venue) => ({
    slug: venue.slug,
  }));
}

export function generateMetadata({ params }: VenueDetailPageProps): Metadata {
  const venue = REAL_VENUES.find((v) => v.slug === params.slug);
  if (!venue) return {};

  return generatePageMetadata({
    title: `${venue.name} ${venue.hallNumber ? `(${venue.hallNumber})` : ""} | ICCB Venues`,
    description: venue.description,
    path: `/venues/${venue.slug}`,
  });
}

export default function VenueDetailPage({ params }: VenueDetailPageProps) {
  const venue = REAL_VENUES.find((v) => v.slug === params.slug);
  if (!venue) {
    notFound();
  }

  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Venues", href: "/venues" },
            { label: venue.name },
          ]}
        />

        <div className="space-y-4 border-b border-rule pb-8">
          <div className="flex items-center gap-3">
            <span className="mono text-ink-soft">
              {venue.hallNumber ? `§ ${venue.hallNumber}` : "§ Venue"}
            </span>
            {venue.tagline && (
              <span className="text-xs font-mono text-accent">
                • {venue.tagline}
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            {venue.name}
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            {venue.description}
          </p>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-[16/9] w-full border border-rule overflow-hidden bg-paper-2">
          <Image
            src={venue.image}
            alt={`${venue.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={IMAGES.placeholderBlur}
          />
        </div>

        {/* Features & Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="border border-rule p-6 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Venue Features</h2>
            <ul className="space-y-3">
              {venue.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-xs text-ink-soft">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-rule p-6 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Venue Inclusions</h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              Equipped with independent utility sub-stations, high-capacity centralized air conditioning, heavy vehicle loading bays, and private pre-function reception zones.
            </p>
            {venue.specs?.area && (
              <div className="pt-2 border-t border-rule text-xs font-mono">
                <span className="text-ink-soft">Floor Area: </span>
                <span className="text-ink font-semibold">{venue.specs.area}</span>
              </div>
            )}
            {venue.specs?.parking && (
              <div className="text-xs font-mono">
                <span className="text-ink-soft">Dedicated Parking: </span>
                <span className="text-ink font-semibold">{venue.specs.parking}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-rule pt-6">
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Venues</span>
          </Link>
          <Link
            href="/contact/enquiry"
            className="px-6 py-2.5 bg-ink text-paper text-xs uppercase font-mono tracking-wider hover:bg-accent hover:text-white transition-colors"
          >
            Enquire for This Hall
          </Link>
        </div>
      </div>

      <BookingContactBlock
        title={`Book ${venue.name}`}
        subtitle={`Speak with our reservations team to check availability and schedule an on-site walkthrough.`}
      />
    </div>
  );
}

