import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { generatePageMetadata } from "@/lib/seo";
import { CheckCircle2, Cake, Sparkles, Smile } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Birthday & Social Party Catering Dhaka | Private Celebrations",
  description:
    "Fun, vibrant culinary stations, finger food platters, and custom dessert counters for milestone birthdays and private celebrations in Dhaka.",
  path: "/services/birthday-party-catering",
});

export default function BirthdayCateringPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ink-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={IMAGES.birthdayParty}
            alt="Birthday Gathering"
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
                { label: "Birthday & Social Gathering" },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Joyful Family Moments ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            BIRTHDAY & PRIVATE PARTY CATERING
          </h1>
          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            Delight guests of all ages with kid-friendly finger foods, live skewer bars, mouthwatering Bengali spreads, and celebratory dessert layouts.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Stress-Free Hosting
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              CELEBRATE WITHOUT THE COOKING STRESS
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              Hosting a milestone birthday, sweet sixteen, anniversary, or graduation party at home or in an event venue should be a celebration—not hours spent washing dishes or managing cooks.
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              ICCB Catering takes complete care of everything from setup to post-event clean-up. We provide delightful sliders, live barbecue skewers, Asian noodles, chaat stations, and custom cake-cutting banquet tables.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Custom spice levels for children and elders</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Cake cutting table arrangement with plates, napkins, and cutlery</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Available across Greater Dhaka with thermal mobile units</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  Book Birthday Party Catering
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={IMAGES.birthdayParty}
                alt="Birthday Party Cheers"
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

