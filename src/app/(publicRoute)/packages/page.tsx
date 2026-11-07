"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PackageCalculator } from "@/components/calculator/PackageCalculator";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { useUIStore } from "@/store/uiStore";
import {
  Sparkles,
  Users,
  ShieldCheck,
  Utensils,
  Award,
  ArrowRight,
  Check,
} from "lucide-react";

export default function PackagesPage() {
  const { locale, setQuoteDraft } = useUIStore();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleSelectPackage = (pkg: (typeof PACKAGES)[0]) => {
    setQuoteDraft({
      packageId: pkg.id,
      packageName: pkg.name,
      guestCount: pkg.minGuests,
    });
  };

  // Helper to extract 4-5 signature highlight dishes from a package
  const getSignatureDishes = (pkg: (typeof PACKAGES)[0]) => {
    const allItems: string[] = [];
    pkg.courses.forEach((c) => {
      c.items.forEach((item) => allItems.push(item));
    });
    // Pick the most distinctive 4-5 items
    return allItems.slice(0, 5);
  };

  return (
    <div className="bg-ink-50/30 text-ink-950 min-h-screen">
      {/* Premium Minimal Hero Banner */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        {/* Ambient Crimson Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-500/5 dark:bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: locale === "bn" ? "প্যাকেজসমূহ" : "Banquet Packages" }]} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-white/10 border border-brand-100 dark:border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="font-serif italic text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-wide">
              {locale === "bn" ? "~ অল-ইনক্লুসিভ ক্যাটারিং মেনু ~" : "~ Curated Banquet Menus & Rates ~"}
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white max-w-3xl mx-auto leading-tight">
            {locale === "bn" ? "ক্যাটারিং প্যাকেজ ও রেট" : "BANQUET PACKAGES"}
          </h1>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto leading-relaxed">
            {locale === "bn"
              ? "বিবাহ, কর্পোরেট সামিট ও সামাজিক অনুষ্ঠানের জন্য স্বচ্ছ জনপ্রতি রেট। শেফ সার্ভিস, চিনামাটির ক্রোকারিজ ও গরম পরিবেশন অন্তর্ভুক্ত।"
              : "All-inclusive per-person rates for weddings, corporate galas, and social celebrations with full buffet setup and chef service."}
          </p>

          {/* Clean trust chips */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-ink-700 dark:text-white/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>100% Halal Meats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-brand-500" />
              <span>Served Hot 65°C+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-500" />
              <span>Crockery & Staff Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Packages Grid: Focused, Clean & Ultra-Premium */}
      <section className="py-16 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const signatureDishes = getSignatureDishes(pkg);

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-ink-100/90 shadow-soft hover:shadow-xl hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* High-Resolution Photo Header */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-ink-900">
                    <Image
                      src={pkg.image || "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80"}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={PLACEHOLDER_BLUR}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                        <Sparkles className="w-3 h-3 text-brand-400" />
                        <span>{pkg.tag || "Banquet Tier"}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-sm">
                        <Users className="w-3 h-3 text-brand-400" />
                        <span>Min. {pkg.minGuests} Guests</span>
                      </span>
                    </div>

                    {/* Price Tag Pinned to Bottom Right */}
                    <div className="absolute bottom-4 right-4 z-10 bg-brand-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-baseline gap-1 border border-white/20">
                      <span className="font-display font-black text-2xl sm:text-3xl leading-none">
                        {formatCurrency(pkg.pricePerHead)}
                      </span>
                      <span className="text-[11px] font-medium text-white/90">/ guest</span>
                    </div>

                    {/* Cuisine Type Pinned Bottom Left */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {pkg.cuisineType}
                      </span>
                    </div>
                  </div>

                  {/* Card Content: Concise & Editorial */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-950 group-hover:text-brand-600 transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="font-serif italic text-xs text-brand-600 mt-0.5">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* 5 Signature Dishes */}
                    <div className="space-y-2 pt-2 border-t border-ink-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block">
                        {locale === "bn" ? "প্রধান সিগনেচার পদসমূহ:" : "Signature Menu Dishes:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {signatureDishes.map((dish, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ink-50 border border-ink-200/70 text-ink-800 text-xs font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Included Services Row */}
                    <div className="pt-2 border-t border-ink-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-1.5">
                        {locale === "bn" ? "অন্তর্ভুক্ত সুযোগ-সুবিধা:" : "Included Services:"}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-ink-600">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span>Chafing Buffet Setup</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span>Porcelain Dinnerware</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span>Uniformed Waitstaff</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span>Served Hot 65°C+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Clean & Direct */}
                <div className="p-6 sm:p-7 pt-0 flex items-center gap-3">
                  <Link
                    href="/quote"
                    onClick={() => handleSelectPackage(pkg)}
                    className="flex-1"
                  >
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 group/btn"
                    >
                      <span>{locale === "bn" ? "এই প্যাকেজটি বুক করুন" : "Book This Package"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </Link>

                  <Link href={`/packages/${pkg.slug}`}>
                    <button
                      type="button"
                      className="px-4 py-3 rounded-xl border border-ink-200 hover:border-ink-400 text-ink-700 hover:text-ink-950 font-semibold text-xs uppercase tracking-wider transition-colors"
                    >
                      {locale === "bn" ? "বিস্তারিত" : "Details"}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Budget Calculator */}
      <section className="py-16 bg-white border-t border-ink-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 block">
              {locale === "bn" ? "বাজেট হিসাব" : "Real-time Estimator"}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950">
              {locale === "bn" ? "ইভেন্ট বাজেট ক্যালকুলেটর" : "ESTIMATE EVENT BUDGET"}
            </h2>
            <p className="text-xs text-ink-600">
              {locale === "bn"
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
