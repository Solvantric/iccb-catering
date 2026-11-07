import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { CheckCircle2, Calendar } from "lucide-react";

const eventDetails: Record<
  string,
  { title: string; headline: string; desc: string; image: string; highlights: string[] }
> = {
  iftar: {
    title: "Ramadan Iftar & Dinner Banquet",
    headline: "PREMIUM RAMADAN IFTAR CATERING DHAKA",
    desc: "Wholesome, traditional Iftar boxes and lavish grand Iftar-dinner buffets for corporate conglomerates, embassies, and family gatherings.",
    image: IMAGES.kacchiBiryani,
    highlights: [
      "Custom individual multi-compartment Iftar boxes",
      "Traditional Beguni, Piyaju, Halim, Jalebi & fresh seasonal fruits",
      "Signature Kacchi Biryani & Borhani for post-Maghrib dinner",
      "Punctual delivery exactly 45 minutes prior to Iftar time",
    ],
  },
  conference: {
    title: "Corporate Conferences & Seminars",
    headline: "CONFERENCE & SUMMIT CATERING IN DHAKA",
    desc: "Speed-oriented catering designed to serve 500 to 5,000+ business delegates with continuous hot beverages, executive buffet layouts, and light menus.",
    image: IMAGES.corporateEvent,
    highlights: [
      "Dual buffet lanes to minimize attendee wait time",
      "Continuous artisanal tea & espresso stations throughout the day",
      "Balanced low-glycemic lunch courses to avoid afternoon fatigue",
      "On-site service manager to sync with stage itinerary",
    ],
  },
  engagement: {
    title: "Engagement & Ring Ceremony",
    headline: "ELEGANT ENGAGEMENT CEREMONY CATERING",
    desc: "Intimate and visually dazzling food presentation for pre-wedding milestones with live carving counters, mocktails, and sweet paan stations.",
    image: IMAGES.weddingReception,
    highlights: [
      "Artisanal welcome drinks and signature mocktail counters",
      "Fine dining table layout with custom floral arrangements",
      "Delectable Mughal and Continental fusion courses",
      "Private VIP family service",
    ],
  },
  "annual-gala": {
    title: "Annual Corporate Gala Dinner",
    headline: "GRAND CORPORATE GALA DINNER BANQUETS",
    desc: "Celebrate annual milestones, employee awards, and company anniversaries with a world-class sit-down banquet or lavish buffet.",
    image: IMAGES.hallGulnaksha,
    highlights: [
      "Sophisticated multi-cuisine grand feast",
      "Uniformed banquet waitstaff and floor captains",
      "Live tandoori kebab and sizzling steak stations",
      "Complete hall setup coordination with ICCB staff",
    ],
  },
  wedding: {
    title: "Grand Wedding Reception",
    headline: "DHAKA'S PREMIER WEDDING RECEPTION CATERING",
    desc: "Royal Mughal heritage wedding feast prepared with fresh meats from our modern slaughterhouse and served in ICCB's 4 grand halls.",
    image: IMAGES.weddingReception,
    highlights: [
      "Signature Shahi Kacchi Biryani with Aloo & Egg",
      "Traditional Borhani served chilled in clay pitchers",
      "VIP bridal head table butler service",
      "Complimentary private food tasting session before confirmation",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(eventDetails).map((key) => ({
    type: key,
  }));
}

export async function generateMetadata({ params }: { params: { type: string } }) {
  const ev = eventDetails[params.type];
  if (!ev) return {};
  return generatePageMetadata({
    title: `${ev.title} Catering Dhaka | ICCB Catering`,
    description: ev.desc,
    path: `/events/${params.type}`,
    image: ev.image,
  });
}

export default function EventLandingPage({ params }: { params: { type: string } }) {
  const ev = eventDetails[params.type];
  if (!ev) notFound();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Events" },
                { label: ev.title },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ Dedicated Event Specialization ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            {ev.headline}
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {ev.desc}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Hospitality Standards
            </span>
            <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950">
              WHY CHOOSE ICCB FOR YOUR {ev.title.toUpperCase()}
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              Every detail matters when hosting your guests. ICCB Catering coordinates venue setup, food temperature verification, and uniformed waitstaff so you can focus on hosting.
            </p>

            <div className="space-y-3 pt-2">
              {ev.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  Book Catering for {ev.title}
                </Button>
              </Link>
              <Link href="/packages">
                <Button size="lg" variant="outline">
                  Browse Menu Packages
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={ev.image}
                alt={ev.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

