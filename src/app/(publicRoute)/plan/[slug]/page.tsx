import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { REAL_EVENT_TYPES, SITE_FACTS } from "@/content/content";
import { generatePageMetadata } from "@/lib/seo";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface PlanEventDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return REAL_EVENT_TYPES.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: PlanEventDetailPageProps): Metadata {
  const event = REAL_EVENT_TYPES.find((e) => e.slug === params.slug);
  if (!event) return {};

  return generatePageMetadata({
    title: `${event.title} Hosting & Planning | ICCB`,
    description: event.description,
    path: `/plan/${event.slug}`,
  });
}

export default function PlanEventDetailPage({ params }: PlanEventDetailPageProps) {
  const event = REAL_EVENT_TYPES.find((e) => e.slug === params.slug);
  if (!event) {
    notFound();
  }

  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Plan Your Event", href: "/plan/wedding" },
            { label: event.title },
          ]}
        />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Event Classification</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            Planning for <span className="italic text-accent">{event.title}</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Venue Capabilities</h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              With six dedicated halls and flexible open grounds, ICCB accommodates {event.title.toLowerCase()} configurations from intimate VIP banquets to mega public attendance.
            </p>
            <ul className="space-y-2 text-xs text-ink-soft pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Custom seating layouts (theater, banquet, classroom, runway)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Heavy-duty power back-up and acoustic insulation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Full in-house catering and hospitality logistics</span>
              </li>
            </ul>
          </div>

          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Planning Steps</h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              Our venue management desk coordinates closely with organizers, stage directors, and event planners to ensure all logistical requirements are met.
            </p>
            <div className="pt-2">
              <Link
                href="/contact/enquiry"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-ink text-paper text-xs uppercase font-mono tracking-wider hover:bg-accent hover:text-white transition-colors"
              >
                Submit Planning Enquiry
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-rule pt-6 flex items-center justify-between">
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore Suitable Venues</span>
          </Link>
        </div>
      </div>

      <BookingContactBlock
        title={`Plan Your ${event.title}`}
        subtitle="Contact our banquet reservations desk to discuss dates, halls, and custom catering menus."
      />
    </div>
  );
}

