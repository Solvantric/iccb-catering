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

// ─── Bangla translation maps ────────────────────────────────────────────────
const PKG_NAMES_BN: Record<string, string> = {
  "Royal Mughal Wedding Feast": "রাজকীয় মুঘল বিয়ের ভোজ",
  "Executive Corporate Buffet": "এক্সিকিউটিভ কর্পোরেট বুফে",
  "Social & Birthday Celebration": "সামাজিক ও জন্মদিনের উৎসব",
  "Grand High-Tea Reception": "গ্র্যান্ড হাই-টি রিসেপশন",
};

const COURSE_NAMES_BN: Record<string, string> = {
  "Welcome Drinks & Starters": "স্বাগত পানীয় ও স্টার্টার",
  "Main Course": "মূল খাবার",
  "Desserts & Sweets": "মিষ্টি ও ডেজার্ট",
  "Salad & Starters": "সালাদ ও স্টার্টার",
  "Desserts & Beverages": "ডেজার্ট ও পানীয়",
  "Starters & Finger Foods": "স্টার্টার ও ফিঙ্গার ফুড",
  "Desserts & Refreshments": "মিষ্টি ও রিফ্রেশমেন্ট",
  "Savouries & Canapés": "লোনা নাস্তা ও ক্যানাপে",
  "Sweet Bites": "মিষ্টি কামড়",
  Beverages: "পানীয়",
};

const DISH_BN: Record<string, string> = {
  "Chilled Dhakai Borhani": "ঠান্ডা ঢাকাই বোরহানি",
  "Zafrani Sharbat": "জাফরানি শরবত",
  "Crispy Vegetable Singara": "ক্রিসপি সবজি সিঙ্গারা",
  "Fresh Mint Chutney": "তাজা পুদিনা চাটনি",
  "Signature Mutton Kacchi Biryani with Aloo & Boiled Egg": "সিগনেচার মাটন কাচ্চি বিরিয়ানি আলু ও ডিমসহ",
  "Shahi Mutton Rezala": "শাহী মাটন রেজালা",
  "Golden Dhakai Chicken Roast": "গোল্ডেন ঢাকাই চিকেন রোস্ট",
  "Roghni Naan / Butter Naan": "রোঘনি নান / বাটার নান",
  "Mixed Onion Cucumber Salad with Lime & Green Chilies": "পেঁয়াজ-শসার মিশ্র সালাদ লেবু ও কাঁচামরিচসহ",
  "Clay Pot Zafrani Shahi Firni": "মাটির পাত্রে জাফরানি শাহী ফিরনি",
  "Mini Shahi Tukra with Rabri": "মিনি শাহী টুকরা রাবরিসহ",
  "Traditional Sweet Paan": "ঐতিহ্যবাহী মিষ্টি পান",
  "Classic Chicken Caesar Salad": "ক্লাসিক চিকেন সিজার সালাদ",
  "Sweet Corn Vegetable Soup": "সুইট কর্ন ভেজিটেবল স্যুপ",
  "Warm Bread Rolls & Butter": "উষ্ণ ব্রেড রোল ও মাখন",
  "Herb-Crusted Beef Medallions in Peppercorn Glaze": "পেপারকর্ন গ্লেজে হার্ব ক্রাস্টেড বিফ মেডালিয়ন",
  "Grilled Chicken Breast with Mushroom Demi-Glace": "মাশরুম ডেমি-গ্লেসে গ্রিলড চিকেন ব্রেস্ট",
  "Steamed Jasmine / Basmati Rice": "স্টিমড জেসমিন / বাসমতী চাল",
  "Penne Pasta with Sun-Dried Tomato Cream": "সানড্রাইড টমেটো ক্রিমে পেনে পাস্তা",
  "Sautéed Seasonal Butter Vegetables": "মৌসুমি বাটার ভেজিটেবল স্যুটে",
  "Fresh Fruit Tartlets": "ফ্রেশ ফ্রুট টার্টলেট",
  "Chocolate Mousse Cups": "চকলেট মুস কাপ",
  "Freshly Brewed Tea & Coffee Station": "তাজা চা ও কফি স্টেশন",
  "Crispy Fried Chicken Wontons": "ক্রিসপি ফ্রাইড চিকেন ওয়ান্টন",
  "Mini Seekh Kebabs": "মিনি শিক কাবাব",
  "Tangy Tamarind Dip": "টেংটি তেঁতুলের ডিপ",
  "Saffron Polao with Ghee Rice": "জাফরান পোলাও ঘি চালসহ",
  "Spicy Beef Bhuna": "স্পাইসি গরুর ভুনা",
  "Chicken Korma with Golden Almonds": "গোল্ডেন বাদামে চিকেন কোরমা",
  "Chinese Vegetable Fried Rice": "চাইনিজ ভেজিটেবল ফ্রাইড রাইস",
  "Szechuan Chilli Chicken Gravy": "সেচুয়ান চিলি চিকেন গ্রেভি",
  "Creamy Caramel Custard": "ক্রিমি ক্যারামেল কাস্টার্ড",
  "Gulab Jamun in Warm Syrup": "গরম সিরাপে গোলাপ জামুন",
  "Soft Drinks & Mineral Water": "কোমল পানীয় ও মিনারেল ওয়াটার",
  "Smoked Chicken & Cucumber Finger Sandwiches": "স্মোকড চিকেন ও শসার ফিঙ্গার স্যান্ডউইচ",
  "Mini Beef Sausage Rolls": "মিনি বিফ সোসেজ রোল",
  "Crispy Paneer Pakora": "ক্রিসপি পনির পাকোড়া",
  "Chicken Quiche Bites": "চিকেন কুইশ বাইট",
  "Freshly Baked Scones with Cream & Jam": "তাজা বেকড স্কোন ক্রিম ও জ্যামসহ",
  "Mini Éclairs": "মিনি এক্লেয়ার",
  "Fruit Skewers with Honey Glaze": "হানি গ্লেজে ফ্রুট স্কিউয়ার",
  "Masala Milk Tea": "মশলা দুধ চা",
  "English Breakfast Tea": "ইংলিশ ব্রেকফাস্ট টি",
  "Artisanal Black Coffee": "আর্টিসানাল ব্ল্যাক কফি",
  "Chilled Lemon Mint Ice Tea": "ঠান্ডা লেবু-পুদিনা আইস টি",
};

function translateDish(dish: string, isBn: boolean): string {
  if (!isBn) return dish;
  return DISH_BN[dish] ?? dish;
}

function translateCourseName(name: string, isBn: boolean): string {
  if (!isBn) return name;
  return COURSE_NAMES_BN[name] ?? name;
}

function translatePkgName(name: string, isBn: boolean): string {
  if (!isBn) return name;
  return PKG_NAMES_BN[name] ?? name;
}
// ────────────────────────────────────────────────────────────────────────────

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
          <h3 className="font-display font-black uppercase text-white tracking-tight text-[20px] sm:text-[24px] leading-snug drop-shadow-sm">
            {translatePkgName(pkg.name, isBn)}
          </h3>
        </div>
      </div>

      {/* Under image details */}
      <div className="pt-6 space-y-5 flex-1 flex flex-col justify-between">
        {/* a) Price Row */}
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-[28px] sm:text-[30px] text-ink-950 dark:text-white leading-none">
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

          {/* c) Small caps label "What's included" + compact 2-col dishes + joined services */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 block">
              {isBn ? "যা যা অন্তর্ভুক্ত রয়েছে" : "WHAT'S INCLUDED"}
            </span>

            {/* Dishes in 2 columns: compact small font, single-line truncate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {allDishes.map((dish, i) => (
                <div key={i} className="flex items-center gap-1.5 min-w-0">
                  <span className="w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                  <span className="font-sans text-[11px] sm:text-[12px] text-ink-700 dark:text-ink-300 leading-snug truncate">
                    {translateDish(dish, isBn)}
                  </span>
                </div>
              ))}
            </div>

            {/* Muted line of included services joined with ' · ' */}
            {cleanServices.length > 0 && (
              <p className="text-[11px] text-ink-500 dark:text-ink-400 pt-1 leading-normal italic font-sans">
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
    <div className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white min-h-screen transition-colors">
      {/* Calm Cream Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: isBn ? "প্যাকেজসমূহ" : "Packages" }]} />
          </div>

          {/* Title */}
          <h1 className="text-center font-display font-black text-[clamp(2.25rem,5vw,4rem)] leading-tight tracking-tight uppercase">
            <span className="text-brand-500 mr-3">
              {isBn ? "আমাদের" : "Our"}
            </span>
            <span className="text-ink-900 dark:text-white">
              {isBn ? "প্যাকেজসমূহ" : "PACKAGES"}
            </span>
          </h1>

          {/* 48px brand-500 hairline */}
          <div className="w-12 h-[2px] bg-brand-500 mx-auto my-4" />

          {/* Sub-line (muted, max-w-xl) */}
          <p className="text-xs sm:text-sm font-sans text-ink-600 dark:text-ink-400 max-w-xl mx-auto leading-relaxed">
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
      <section className="py-20 bg-white dark:bg-ink-950 border-t border-ink-200/50 dark:border-white/10 transition-colors">
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
