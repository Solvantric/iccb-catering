"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/format";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { useUIStore } from "@/store/uiStore";

export function DishDetailView({ dish }: { dish: MenuItem }) {
  const { locale } = useUIStore();
  const isBn = locale === "bn";

  const dishName = isBn && dish.nameBn ? dish.nameBn : dish.name;
  const dishDesc = isBn && dish.descriptionBn ? dish.descriptionBn : dish.description;

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-14 sm:py-16 relative overflow-hidden border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: isBn ? "খাবারের মেন্যু" : "Menu", href: "/menu" },
                { label: dishName },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ {isBn ? `${dish.cuisine === "Mughal" ? "শাহী মুঘল" : dish.cuisine} স্পেশাল ক্যাটারিং পদ` : `${dish.cuisine} Culinary Special`} ~
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 dark:text-white">
            {dishName}
          </h1>
          {isBn && dish.name && (
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{dish.name}</p>
          )}
          {!isBn && dish.nameBn && (
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{dish.nameBn}</p>
          )}
        </div>
      </section>

      {/* Main Dish Details */}
      <section className="py-16 sm:py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={dish.image}
                alt={dishName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-ink-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-brand-600 tracking-wider">
                  {dish.category} &bull; {dish.cuisine}
                </span>
                <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-950 mt-1">
                  {dishName}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-ink-400 uppercase font-bold tracking-wider block">
                  {isBn ? "ক্যাটারিং স্ট্যান্ডার্ড দর" : "Standard Rate"}
                </span>
                <span className="font-display font-black text-3xl text-brand-600">
                  {formatCurrency(dish.price)}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              {dishDesc}
            </p>

            {/* Diet & Prep Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-ink-50 rounded-xl border border-ink-200">
                <span className="text-[10px] text-ink-400 uppercase font-bold block">
                  {isBn ? "খাদ্যমান ও ধরণ" : "Dietary Standard"}
                </span>
                <span className="text-xs font-bold text-ink-900">
                  {isBn
                    ? dish.dietTags
                        .map((t) => (t === "Halal" ? "১০০% হালাল" : t === "Chef Special" ? "শেফ স্পেশাল" : t === "Non-Veg" ? "আমিষ" : t))
                        .join(", ")
                    : dish.dietTags.join(", ")}
                </span>
              </div>
              {dish.preparationTime && (
                <div className="p-3 bg-ink-50 rounded-xl border border-ink-200">
                  <span className="text-[10px] text-ink-400 uppercase font-bold block">
                    {isBn ? "প্রস্তুতি সময়" : "Prep Time"}
                  </span>
                  <span className="text-xs font-bold text-ink-900">
                    {isBn ? "ধীর আঁচে রান্না ৪ ঘণ্টা" : dish.preparationTime}
                  </span>
                </div>
              )}
              {dish.calories && (
                <div className="p-3 bg-ink-50 rounded-xl border border-ink-200">
                  <span className="text-[10px] text-ink-400 uppercase font-bold block">
                    {isBn ? "শক্তি / পুষ্টিমান" : "Energy / Portion"}
                  </span>
                  <span className="text-xs font-bold text-ink-900">
                    {isBn ? "৭২০ কিলোক্যালরি" : dish.calories}
                  </span>
                </div>
              )}
            </div>

            {/* Allergens & Hygiene Pledge */}
            {dish.allergens && (
              <div className="text-xs text-ink-600 space-y-1">
                <span className="font-bold uppercase text-ink-800 text-[10px] tracking-wider block">
                  {isBn ? "অ্যালার্জেন সতর্কতা:" : "Allergen Advisory:"}
                </span>
                <p>
                  {isBn
                    ? `বিদ্যমান: ${dish.allergens.map((a) => (a === "Dairy" ? "দুগ্ধজাত" : a === "Nuts" ? "বাদাম" : a)).join(", ")}`
                    : `Contains: ${dish.allergens.join(", ")}`}
                </p>
              </div>
            )}

            <div className="p-4 bg-brand-50 border border-brand-100 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
              <p className="text-xs text-brand-900 font-medium leading-relaxed">
                {isBn
                  ? "আইসিসিবি নিজস্ব স্বয়ংক্রিয় কসাইখানায় স্বাস্থ্যসম্মত উপায়ে প্রক্রিয়াজাত তাজা মাংস ও সার্বক্ষণিক নিরাপদ তাপমাত্রা ব্যবস্থাপনা।"
                  : "Meats processed exclusively inside ICCB's automated slaughterhouse and kept in thermal temperature units."}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  {isBn ? "ক্যাটারিং মেনুতে এই পদ বুক করুন" : "Book Dish in Catering Menu"}
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline">
                  {isBn ? "সকল খাবারের মেনু দেখুন" : "Back to All Dishes"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

