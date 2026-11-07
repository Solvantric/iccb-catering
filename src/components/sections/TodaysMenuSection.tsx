"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MENU_ITEMS } from "@/data/menu";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { Sparkles, Utensils, CheckCircle2, ArrowRight } from "lucide-react";

export function TodaysMenuSection() {
  const { locale } = useUIStore();
  const t = translations[locale].todaysMenu;
  const todaysDishes = MENU_ITEMS.filter((item) => item.isTodaysMenu).slice(0, 6);

  return (
    <section className="py-28 bg-ink-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="font-serif italic text-brand-300 text-sm font-semibold tracking-wide">
              {locale === "bn" ? "~ বিশেষ রন্ধনশিল্পের স্বাদ ~" : "~ Master Chef Signature Showcase ~"}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
            {t.heading}
          </h2>

          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {locale === "bn"
              ? "আইসিসিবি হেরিটেজ কিচেনের মাস্টার শেফদের প্রস্তুতকৃত খাঁটি শাহী মুঘল ও আন্তর্জাতিক রন্ধনশালার সেরা পরিবেশনা। প্রতিটি পদ পরিবেশিত হয় নিরাপদ ও সঠিক তাপমাত্রায়।"
              : "Prepared in our modern kitchen facilities and served at guaranteed 65°C+ optimal temperatures. Experience authentic Mughal heritage and culinary excellence for your guests."}
          </p>
        </div>

        {/* Menu Cards Grid - Prominent Highlighted Image & Zero Prices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {todaysDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-brand-500/50 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7 transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(220,5,17,0.25)] hover:-translate-y-1 group"
            >
              {/* Highlighted Magnified Circular Plate Presentation */}
              <div className="relative shrink-0">
                {/* Glowing Halo around plate */}
                <div className="absolute -inset-2 rounded-full bg-brand-500/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Double Ringed Plate Container */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-brand-600/60 via-white/20 to-brand-500/40 border-2 border-white/25 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={locale === "bn" && dish.nameBn ? dish.nameBn : dish.name}
                      fill
                      sizes="(max-width: 640px) 140px, 160px"
                      placeholder="blur"
                      blurDataURL={PLACEHOLDER_BLUR}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Cuisine Badge overlay on plate */}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-ink-950/90 border border-brand-500/50 text-[10px] font-bold uppercase tracking-wider text-brand-300 whitespace-nowrap shadow-md">
                  {dish.cuisine || "Specialty"}
                </span>
              </div>

              {/* Dish Information */}
              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider text-white group-hover:text-brand-400 transition-colors">
                    {locale === "bn" && dish.nameBn ? dish.nameBn : dish.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-brand-400 bg-brand-950/80 border border-brand-800/80 px-2.5 py-0.5 rounded-full shrink-0 self-center sm:self-auto">
                    {locale === "bn" ? "শেফ স্পেশাল" : "Chef Signature"}
                  </span>
                </div>

                {/* Rich Culinary Description */}
                <p className="text-xs sm:text-sm text-ink-300 leading-relaxed line-clamp-2">
                  {locale === "bn" && dish.descriptionBn ? dish.descriptionBn : dish.description}
                </p>

                {/* Quality & Dietary Tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  {dish.dietTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold text-white/80 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-brand-400" />
                      <span>{tag}</span>
                    </span>
                  ))}

                  {dish.preparationTime && (
                    <span className="text-[10px] text-ink-400 font-mono">
                      &bull; {dish.preparationTime}
                    </span>
                  )}
                </div>

                {/* Consultation / Tasting Action */}
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <Link
                    href={`/menu/${dish.slug}`}
                    className="text-xs font-bold text-white hover:text-brand-400 transition-colors inline-flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>{locale === "bn" ? "উপকরণ ও বিবরণ" : "View Ingredients"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-white/20">•</span>

                  <Link
                    href="/tasting"
                    className="text-xs font-semibold text-brand-300 hover:text-white transition-colors"
                  >
                    {locale === "bn" ? "টেস্টিং সেশন বুক করুন" : "Request Tasting"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/menu">
            <Button size="lg" variant="primary" withArrow className="px-8 shadow-xl">
              {locale === "bn" ? "সম্পূর্ণ মেনু ক্যাটালগ দেখুন" : "Explore Complete Menu"}
            </Button>
          </Link>
          <Link href="/quote">
            <Button size="lg" variant="secondary" className="px-8">
              {locale === "bn" ? "কাস্টম মেনু কোটেশন চান" : "Request Custom Banquet Quote"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
