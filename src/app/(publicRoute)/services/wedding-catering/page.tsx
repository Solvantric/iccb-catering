import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";
import { PACKAGES } from "@/data/packages";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { formatCurrency } from "@/lib/format";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircle2, Heart, Award, Sparkles } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Royal Wedding Catering in Dhaka | Holud, Reception & Walima",
  description:
    "Authentic Old Dhaka Kacchi Biryani, Shahi Mutton Rezala, and royal hospitality crafted for unforgettable wedding receptions at ICCB.",
  path: "/services/wedding-catering",
});

export default function WeddingCateringPage() {
  const weddingPkg = PACKAGES.find((p) => p.slug === "royal-mughal-wedding-feast") || PACKAGES[0];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={IMAGES.weddingReception}
            alt="Wedding Banquet"
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_BLUR}
            className="object-cover"
          />
        </div>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Services", href: "/services" },
                { label: "Wedding Catering" },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Royal Mughal Banquets ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            WEDDING CATERING
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Crafting legendary wedding feasts where tender Kacchi Biryani, rich Rezala, and authentic Borhani create memories cherished for generations.
          </p>
        </div>
      </section>

      {/* Story & Food Details */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              The Taste of Happiness
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              WHERE TRADITION MEETS FLAWLESS HYGIENE
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              In Bangladesh, the success of a wedding reception hinges on the quality, fragrance, and temperature of the banquet feast. For years, wedding families had to gamble with third-party cooks or chaotic bazaar slaughtering.
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              At ICCB Catering, your mutton is processed in our own dedicated modern slaughterhouse, seasoned with whole stone-ground spices, and cooked by master Ustads who have guarded royal Mughal culinary secrets for decades.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>100% Halal certified young mutton & tender chicken</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Private VIP tasting session before wedding confirmation</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Dedicated bridal head table butler service</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  Book Wedding Catering
                </Button>
              </Link>
              <Link href="/tasting">
                <Button size="lg" variant="outline">
                  Book a Food Tasting
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={IMAGES.kacchiBiryani}
                alt="Signature Kacchi Biryani"
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

      {/* Featured Wedding Package */}
      <section className="py-20 bg-brand-50/50 border-t border-brand-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ Our Signature Feast ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {weddingPkg.name}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600">
              {weddingPkg.description}
            </p>
            <p className="font-display font-black text-3xl text-brand-600">
              {formatCurrency(weddingPkg.pricePerHead)}{" "}
              <span className="text-xs font-normal text-ink-500 font-sans">/ guest</span>
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-ink-200 shadow-soft text-left space-y-6">
            {weddingPkg.courses.map((course, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-display font-bold text-sm uppercase text-brand-600 tracking-wider">
                  {course.name}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-700">
                  {course.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="pt-4 border-t border-ink-100 flex justify-between items-center">
              <span className="text-xs text-ink-500">Min. {weddingPkg.minGuests} guests</span>
              <Link href={`/packages/${weddingPkg.slug}`}>
                <Button size="sm" withArrow>
                  Inquire for This Package
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

