"use client";

import React from "react";
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
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Users,
  ShieldCheck,
  Utensils,
  Award,
  ChevronRight,
} from "lucide-react";

export default function PackagesPage() {
  const { locale, setQuoteDraft } = useUIStore();

  const handleSelectPackage = (pkg: (typeof PACKAGES)[0]) => {
    setQuoteDraft({
      packageId: pkg.id,
      packageName: pkg.name,
      guestCount: pkg.minGuests,
    });
  };

  return (
    <div className="bg-ink-50/40 text-ink-950 min-h-screen">
      {/* Hero Banner with Ambient Crimson Glow */}
      <section className="bg-ink-950 text-white py-24 relative overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-brand-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-brand-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: locale === "bn" ? "প্যাকেজসমূহ" : "Banquet Packages" }]} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="font-serif italic text-brand-300 text-sm font-semibold tracking-wide">
              {locale === "bn" ? "~ পূর্ণাঙ্গ ক্যাটারিং প্যাকেজ ও মূল্যতালিকা ~" : "~ Complete Hospitality Banquet Tiers ~"}
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {locale === "bn" ? "ক্যাটারিং প্যাকেজ ও জনপ্রতি মূল্য" : "BANQUET PACKAGES & PER-HEAD PRICING"}
          </h1>

          <p className="text-xs sm:text-sm text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {locale === "bn"
              ? "বিবাহ, করপোরেট সম্মেলন ও সামাজিক অনুষ্ঠানের জন্য স্বচ্ছ জনপ্রতি মূল্য। অন্তর্ভূক্ত রয়েছে শেফ পরিবেশন, চীনামাটির বাসনপত্র ও সঠিক তাপমাত্রার নিশ্চয়তা।"
              : "Transparent all-inclusive per-person pricing for weddings, corporate galas, and social celebrations. All packages include chafing dish setup, porcelain dinnerware, and insulated hot transport."}
          </p>

          {/* Quick trust metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>{locale === "bn" ? "১০০% হালাল ও ল্যাব পরীক্ষিত" : "100% Halal Meat & Lab Tested"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-brand-400" />
              <span>{locale === "bn" ? "৬৫°সে+ গরম পরিবেশন নিশ্চয়তা" : "65°C+ Serving Guarantee"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-400" />
              <span>{locale === "bn" ? "১০,০০০+ অতিথির ধারণক্ষমতা" : "10,000+ Guest Capacity"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid with High-Resolution Photography */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block">
            {locale === "bn" ? "উপযুক্ত প্যাকেজ বাছাই করুন" : "Select Your Ideal Tier"}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
            {locale === "bn" ? "স্বাক্ষরিত ইভেন্ট প্যাকেজসমূহ" : "CURATED BANQUET MENUS"}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600">
            {locale === "bn"
              ? "প্রতিটি প্যাকেজের সাথে রয়েছে দক্ষ ক্যাটারিং টিম ও অভিজ্ঞ হল ক্যাপ্টেন।"
              : "Customizable courses with tasting sessions available upon request."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-[32px] overflow-hidden border border-ink-200/80 shadow-soft hover:shadow-2xl hover:border-brand-500/60 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
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
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink-950/80 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      <span>{pkg.tag || "Catering Package"}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white shadow-md">
                      <Users className="w-3.5 h-3.5" />
                      <span>Min. {pkg.minGuests} Guests</span>
                    </span>
                  </div>

                  {/* Price Tag pinned to bottom right of photo */}
                  <div className="absolute bottom-5 right-5 z-10 bg-brand-500 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-baseline gap-1 border border-white/20">
                    <span className="font-display font-black text-2xl sm:text-3xl leading-none">
                      {formatCurrency(pkg.pricePerHead)}
                    </span>
                    <span className="text-xs font-medium text-white/90">/ person</span>
                  </div>

                  {/* Cuisine label pinned bottom left of photo */}
                  <div className="absolute bottom-5 left-5 z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      {pkg.cuisineType}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-950 group-hover:text-brand-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="font-serif italic text-sm text-brand-600 mt-1">
                      {pkg.tagline}
                    </p>
                    <p className="text-xs text-ink-600 mt-3 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Courses Breakdown */}
                  <div className="space-y-3 pt-5 border-t border-ink-100">
                    <span className="text-[11px] font-bold uppercase text-ink-400 tracking-wider block">
                      {locale === "bn" ? "অন্তর্ভুক্ত কোর্সসমূহ:" : "Curated Course Items:"}
                    </span>
                    <div className="grid grid-cols-1 gap-3">
                      {pkg.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-ink-50/70 border border-ink-100/80 text-xs space-y-1.5"
                        >
                          <span className="font-bold text-ink-950 uppercase tracking-wide block text-[11px] text-brand-600">
                            {course.name}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {course.items.map((item, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-ink-200/60 text-ink-700 text-[11px]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2 pt-4 border-t border-ink-100">
                    <span className="text-[11px] font-bold uppercase text-ink-400 tracking-wider block">
                      {locale === "bn" ? "অন্তর্ভুক্ত সুযোগ-সুবিধা:" : "Included Amenities & Services:"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-ink-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-7 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3.5">
                <Link
                  href="/quote"
                  onClick={() => handleSelectPackage(pkg)}
                  className="w-full sm:flex-1"
                >
                  <Button variant="primary" className="w-full text-xs font-bold uppercase tracking-wider py-3 shadow-md" withArrow>
                    {locale === "bn" ? "এই প্যাকেজে কোটেশন চান" : "Request Quote for this Package"}
                  </Button>
                </Link>

                <Link href={`/packages/${pkg.slug}`} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full text-xs font-semibold uppercase tracking-wider py-3">
                    {locale === "bn" ? "বিস্তারিত" : "Package Details"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Banquet Budget Calculator Section */}
      <section className="py-20 bg-white border-t border-ink-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block">
              {locale === "bn" ? "তাৎক্ষণিক বাজেট হিসাব" : "Interactive Banquet Calculator"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {locale === "bn" ? "বাজেট ক্যালকুলেটর" : "ESTIMATE YOUR EVENT BUDGET"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600">
              {locale === "bn"
                ? "অতিথির সংখ্যা ও পছন্দের প্যাকেজ সিলেক্ট করে তৎক্ষণাৎ মোট খরচের হিসাব দেখুন।"
                : "Select guest attendance and optional culinary live stations for real-time BDT projections."}
            </p>
          </div>

          <PackageCalculator />
        </div>
      </section>
    </div>
  );
}
