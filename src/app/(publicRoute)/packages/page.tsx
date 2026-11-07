"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PackageCalculator } from "@/components/calculator/PackageCalculator";
import { useUIStore } from "@/store/uiStore";
import { motion } from "framer-motion";

function PackageCardItem({
  pkg,
  idx,
  isBn,
  onSelect,
}: {
  pkg: (typeof PACKAGES)[0];
  idx: number;
  isBn: boolean;
  onSelect: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  // Extract all dishes
  const allDishes: string[] = [];
  pkg.courses.forEach((c) => {
    c.items.forEach((item) => allDishes.push(item));
  });

  // Filter out forbidden words: halal, 65, hot, temperature, lab, slaughter
  const forbidden = ["halal", "65", "hot", "temperature", "lab", "slaughter"];
  const cleanServices = pkg.inclusions.filter((inc) => {
    const lower = inc.toLowerCase();
    return !forbidden.some((term) => lower.includes(term));
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="flex flex-col group text-left"
    >
      {/* Cover image: aspect-[16/10], radius 0, top gradient black/50 to transparent */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900 rounded-none">
        {!imgError ? (
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-ink-900 flex items-center justify-center text-white/30" />
        )}

        {/* Top gradient black/50 to transparent */}
        <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Package name over image top-left: Playfair Display, uppercase, tracking-[0.12em], white, 24px */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10">
          <h3 className="font-serif uppercase text-white tracking-[0.12em] text-[20px] sm:text-[24px] leading-snug drop-shadow-sm font-normal">
            {pkg.name}
          </h3>
        </div>
      </div>

      {/* Under image details */}
      <div className="pt-6 space-y-5 flex-1 flex flex-col justify-between">
        {/* a) Price Row */}
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[28px] sm:text-[30px] font-bold text-ink-950 dark:text-white leading-none">
                {formatCurrency(pkg.pricePerHead)}
              </span>
              <span className="text-xs sm:text-sm text-ink-500 dark:text-ink-400">
                {isBn ? "প্রতি অতিথি" : "per guest"}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-ink-500 dark:text-ink-400">
              {isBn
                ? `সর্বনিম্ন ${pkg.minGuests} অতিথি`
                : `Minimum ${pkg.minGuests} guests`}
            </div>
          </div>

          {/* b) 1px hairline */}
          <div className="w-full h-[1px] bg-ink-200/70 dark:bg-white/10 my-4" />

          {/* c) Small caps label "What's included" + 2-col dishes + joined services */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-400 dark:text-ink-400 block">
              {isBn ? "যা যা অন্তর্ভুক্ত রয়েছে" : "WHAT'S INCLUDED"}
            </span>

            {/* Dishes in 2 columns: 16px Playfair, small brand dot bullets, all dishes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {allDishes.map((dish, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                  <span className="font-serif text-[15px] sm:text-[16px] text-ink-800 dark:text-ink-200 leading-snug">
                    {dish}
                  </span>
                </div>
              ))}
            </div>

            {/* Muted line of included services joined with ' · ' */}
            {cleanServices.length > 0 && (
              <p className="text-xs text-ink-500 dark:text-ink-400 pt-2 leading-relaxed">
                {cleanServices.join(" · ")}
              </p>
            )}
          </div>
        </div>

        {/* d) Two buttons side by side */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <Link href="/quote" onClick={onSelect} className="flex-1 sm:flex-initial">
            <button
              type="button"
              className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white uppercase tracking-[0.2em] text-[12px] px-8 py-3 rounded-none font-medium transition-colors"
            >
              {isBn ? "অনুসন্ধান করুন" : "ENQUIRE"}
            </button>
          </Link>

          <Link
            href={`/packages/${pkg.slug}`}
            className="flex-1 sm:flex-initial"
          >
            <button
              type="button"
              className="w-full sm:w-auto border border-ink-900/40 dark:border-white/40 text-ink-900 dark:text-white uppercase tracking-[0.2em] text-[12px] px-8 py-3 rounded-none font-medium hover:border-brand-500 hover:text-brand-500 dark:hover:border-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              {isBn ? "বিস্তারিত দেখুন" : "VIEW DETAILS"}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPage() {
  const { locale, setQuoteDraft } = useUIStore();
  const isBn = locale === "bn";

  const handleSelectPackage = (pkg: (typeof PACKAGES)[0]) => {
    setQuoteDraft({
      packageId: pkg.id,
      packageName: pkg.name,
      guestCount: pkg.minGuests,
    });
  };

  return (
    <div className="bg-[#F7F3EE] dark:bg-ink-950 text-ink-950 dark:text-white min-h-screen transition-colors">
      {/* Calm Cream Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: isBn ? "প্যাকেজসমূহ" : "Packages" }]} />
          </div>

          {/* Title: 'Our' in Playfair Display italic brand-500, 'PACKAGES' uppercase */}
          <h1 className="text-center font-serif text-[clamp(2.25rem,5vw,4rem)] leading-tight tracking-[0.12em]">
            <span className="italic text-brand-500 mr-3">
              {isBn ? "আমাদের" : "Our"}
            </span>
            <span className="uppercase text-ink-900 dark:text-white font-normal">
              {isBn ? "প্যাকেজসমূহ" : "PACKAGES"}
            </span>
          </h1>

          {/* 48px brand-500 hairline */}
          <div className="w-12 h-[2px] bg-brand-500 mx-auto my-4" />

          {/* Sub-line (muted, max-w-xl) */}
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 max-w-xl mx-auto leading-relaxed">
            {isBn
              ? "আপনার অনুষ্ঠানের জন্য একটি প্যাকেজ বেছে নিন, আমরা আপনার তারিখ, ভেন্যু ও অতিথি সংখ্যা অনুযায়ী এটি কাস্টমাইজ করব।"
              : "Choose a package for your event and we will tailor it to your date, venue and guests."}
          </p>
        </div>
      </section>

      {/* Grid: grid-cols-1 md:grid-cols-2, gap-x-10 gap-y-16, max-w-6xl */}
      <section className="pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {PACKAGES.map((pkg, idx) => (
            <PackageCardItem
              key={pkg.id}
              pkg={pkg}
              idx={idx}
              isBn={isBn}
              onSelect={() => handleSelectPackage(pkg)}
            />
          ))}
        </div>
      </section>

      {/* Interactive Budget Calculator */}
      <section className="py-20 bg-[#F7F3EE] dark:bg-ink-950 border-t border-ink-200/50 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block">
              {isBn ? "বাজেট হিসাব" : "Real-time Estimator"}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 dark:text-white">
              {isBn ? "ইভেন্ট বাজেট ক্যালকুলেটর" : "ESTIMATE EVENT BUDGET"}
            </h2>
            <p className="text-xs text-ink-600 dark:text-ink-400">
              {isBn
                ? "অতিথির সংখ্যা ও পছন্দের প্যাকেজ সিলেক্ট করে তৎক্ষণাৎ মোট খরচের হিসাব দেখুন।"
                : "Select guest attendance and optional culinary live stations for instant projections."}
            </p>
          </div>

          <PackageCalculator />
        </div>
      </section>
    </div>
  );
}
