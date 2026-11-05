import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SITE_INFO } from "@/data/site";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { generatePageMetadata } from "@/lib/seo";
import { Users, Maximize2, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "ICCB Convention Halls & Outside Venues | South Asia's Largest Venue",
  description:
    "Explore ICCB's 4 grand pillarless convention halls in Kuril, Dhaka: Hall 1 (Gulnaksha), Hall 2 (Pushpaguchha), Hall 3 (Rajdarshan), and Hall 4 (Naboratna).",
  path: "/venues",
});

export default function VenuesPage() {
  const hallsWithImages = [
    {
      ...SITE_INFO.halls[0],
      image: IMAGES.hallGulnaksha,
      badge: "Pillarless Grand Ballroom",
    },
    {
      ...SITE_INFO.halls[1],
      image: IMAGES.hallPushpaguchha,
      badge: "Acoustic Conference Hall",
    },
    {
      ...SITE_INFO.halls[2],
      image: IMAGES.hallRajdarshan,
      badge: "South Asia's Mega Hall",
    },
    {
      ...SITE_INFO.halls[3],
      image: IMAGES.hallNaboratna,
      badge: "Versatile Banquet Hall",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Venues & Halls" }]} />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ South Asia&apos;s Largest Event Venue ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            OUR 4 CONVENTION HALLS
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Operating since 1 January 2015 along the 300 ft. Purbachal Express Highway in Kuril, ICCB hosts 10,000+ guests simultaneously with full-service venue, decoration, and catering management.
          </p>
        </div>
      </section>

      {/* Halls Grid */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {hallsWithImages.map((hall, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={hall.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className={`lg:col-span-6 space-y-5 text-left ${isEven ? "lg:order-2" : ""}`}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {hall.badge}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
                  {hall.name}
                </h2>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {hall.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-ink-50 rounded-2xl border border-ink-200">
                    <span className="text-[10px] text-ink-400 uppercase font-bold block">Capacity</span>
                    <span className="font-display font-bold text-base text-ink-950">{hall.capacity}</span>
                  </div>
                  <div className="p-4 bg-ink-50 rounded-2xl border border-ink-200">
                    <span className="text-[10px] text-ink-400 uppercase font-bold block">Floor Area</span>
                    <span className="font-display font-bold text-base text-ink-950">{hall.area}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/booking">
                    <Button size="md" withArrow variant="primary">
                      Book {hall.name.split(" ")[0]}
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button size="md" variant="outline">
                      Request Hall + Catering Quote
                    </Button>
                  </Link>
                </div>
              </div>

              <div className={`lg:col-span-6 relative ${isEven ? "lg:order-1" : ""}`}>
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-card border border-ink-100 group">
                  <Image
                    src={hall.image}
                    alt={hall.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ICCB Heritage Restaurant & Outside Catering */}
      <section className="bg-brand-50/60 py-20 border-t border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Heritage Restaurant */}
            <div className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft space-y-4">
              <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                Mughal Concept Restaurant &bull; Opened June 2021
              </span>
              <h3 className="font-display font-black text-2xl uppercase text-ink-950">
                ICCB HERITAGE RESTAURANT
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Located right inside ICCB premises, our heritage restaurant offers year-round authentic Mughal dining and serves as the VIP food tasting suite for wedding couples and corporate event organizers.
              </p>
              <div className="pt-2">
                <Link href="/tasting">
                  <Button size="sm" variant="outline" withArrow>
                    Book Tasting at Heritage Restaurant
                  </Button>
                </Link>
              </div>
            </div>

            {/* Outside Catering */}
            <div className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft space-y-4">
              <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                Mobile Off-Premises Logistics
              </span>
              <h3 className="font-display font-black text-2xl uppercase text-ink-950">
                OUTSIDE & LAWN CATERING
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                We also deliver the complete ICCB catering experience outside our halls to diplomatic residences, corporate headquarters, and private villas anywhere across Greater Dhaka with smart thermal insulated transport.
              </p>
              <div className="pt-2">
                <Link href="/services/corporate-catering">
                  <Button size="sm" variant="primary" withArrow>
                    Inquire for Outside Catering
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
