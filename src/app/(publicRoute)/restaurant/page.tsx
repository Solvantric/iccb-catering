import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingContactBlock } from "@/components/sections/BookingContactBlock";
import { SITE_FACTS } from "@/content/content";
import { IMAGES } from "@/content/images";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "ICCB Heritage Restaurant | Authentic Mughal Fine Dining",
  description: "Preserving authentic 400-year-old Mughal royal recipes in an architectural heritage atmosphere.",
  path: "/restaurant",
});

export default function RestaurantPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <Breadcrumbs items={[{ label: "Dining", href: "/catering" }, { label: "Restaurant" }]} />

        <div className="space-y-4 border-b border-rule pb-8">
          <span className="mono text-ink-soft">§ Dining / Heritage</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink tracking-tight">
            ICCB Heritage <span className="italic text-accent">Restaurant</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-soft max-w-3xl leading-relaxed">
            Inaugurated in June 2021, ICCB Heritage Restaurant is dedicated to reviving 400-year-old authentic Mughal royal dining traditions inside an evocative architectural setting.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full border border-rule overflow-hidden bg-paper-2">
          <Image
            src={IMAGES.venues.heritageRestaurant}
            alt="ICCB Heritage Restaurant Dining Room"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={IMAGES.placeholderBlur}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Royal Mughal Gastronomy</h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              Featuring authentic slow-cooked Dum Biryanis, rich Kormas, fragrant Kebabs, and heritage dessert courses crafted by master Ustad chefs honoring historic culinary manuscripts.
            </p>
          </div>

          <div className="border border-rule p-8 bg-paper-2 space-y-4">
            <h2 className="font-serif text-2xl text-ink">Private Rooms & Reservations</h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              Located on the ICCB grounds with dedicated private family dining rooms and VIP chambers. Reservations are highly recommended for dinner banquets.
            </p>
            <div className="pt-2 text-xs font-mono">
              <span className="text-ink-soft block">Inquiries:</span>
              <a href={`tel:${SITE_FACTS.cateringPhone.replace(/[^0-9+]/g, "")}`} className="text-ink font-semibold hover:text-accent">
                {SITE_FACTS.cateringPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <BookingContactBlock
        title="Reserve at ICCB Heritage Restaurant"
        subtitle="For private family dining, corporate dinners, or tasting appointments."
      />
    </div>
  );
}

