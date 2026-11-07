"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PACKAGES } from "@/data/packages";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { formatCurrency } from "@/lib/format";
import { useUIStore } from "@/store/uiStore";
import { CheckCircle2 } from "lucide-react";

export default function WeddingCateringPage() {
  const { locale } = useUIStore();
  const isBn = locale === "bn";
  const weddingPkg = PACKAGES.find((p) => p.slug === "royal-mughal-wedding-feast") || PACKAGES[0];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: isBn ? "সেবাসমূহ" : "Services", href: "/services" },
                { label: isBn ? "বিয়ের ক্যাটারিং" : "Wedding Catering" },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            {isBn ? "~ রাজকীয় মুঘল বিয়ের ভোজ ~" : "~ Royal Mughal Banquets ~"}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            {isBn ? "বিয়ের ক্যাটারিং" : "WEDDING CATERING"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? "কোমল কাচ্চি বিরিয়ানি, সমৃদ্ধ রেজালা এবং খাঁটি বোরহানির স্বাদে অবিস্মরণীয় বিয়ের অনুষ্ঠান গড়ে তুলি আমরা — প্রজন্মের পর প্রজন্ম ধরে মনে রাখার মতো।"
              : "Crafting legendary wedding feasts where tender Kacchi Biryani, rich Rezala, and authentic Borhani create memories cherished for generations."}
          </p>
        </div>
      </section>

      {/* Story & Food Details */}
      <section className="py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              {isBn ? "সুখের স্বাদ" : "The Taste of Happiness"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {isBn ? "ঐতিহ্য ও নিখুঁত স্বাস্থ্যবিধির মেলবন্ধন" : "WHERE TRADITION MEETS FLAWLESS HYGIENE"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              {isBn
                ? "বাংলাদেশে বিয়ের অনুষ্ঠানের সাফল্য নির্ভর করে মূলত খাবারের মান, সুঘ্রাণ ও পরিবেশনের উপর। বহু বছর ধরে বিয়ের পরিবারগুলোকে তৃতীয় পক্ষের রাঁধুনি বা বাজারের বিশৃঙ্খল ব্যবস্থার উপর নির্ভর করতে হতো।"
                : "In Bangladesh, the success of a wedding reception hinges on the quality, fragrance, and temperature of the banquet feast. For years, wedding families had to gamble with third-party cooks or chaotic bazaar slaughtering."}
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              {isBn
                ? "আইসিসিবি ক্যাটারিংয়ে আপনার মাংস আমাদের নিজস্ব আধুনিক কসাইখানায় প্রক্রিয়াজাত করা হয়, গোটা পাথরে পেষা মশলায় মেরিনেট করা হয় এবং রান্না করেন মুঘল রন্ধনশৈলীর গোপন রহস্য বহনকারী মাস্টার উস্তাদরা।"
                : "At ICCB Catering, your mutton is processed in our own dedicated modern slaughterhouse, seasoned with whole stone-ground spices, and cooked by master Ustads who have guarded royal Mughal culinary secrets for decades."}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>
                  {isBn
                    ? "১০০% হালাল সার্টিফাইড তরুণ মাটন ও কোমল মুরগি"
                    : "100% Halal certified young mutton & tender chicken"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>
                  {isBn
                    ? "বিয়ে নিশ্চিতের আগে প্রাইভেট ভিআইপি টেস্টিং সেশন"
                    : "Private VIP tasting session before wedding confirmation"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>
                  {isBn
                    ? "বর-কনে টেবিলে ডেডিকেটেড বাটলার সার্ভিস"
                    : "Dedicated bridal head table butler service"}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  {isBn ? "বিয়ের ক্যাটারিং বুক করুন" : "Book Wedding Catering"}
                </Button>
              </Link>
              <Link href="/tasting">
                <Button size="lg" variant="outline">
                  {isBn ? "ফুড টেস্টিং বুক করুন" : "Book a Food Tasting"}
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
              {isBn ? "~ আমাদের সিগনেচার ভোজ ~" : "~ Our Signature Feast ~"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {isBn ? "রাজকীয় মুঘল বিয়ের ভোজ" : weddingPkg.name}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600">
              {isBn
                ? "আমাদের কিংবদন্তি শাহী কাচ্চি বিরিয়ানি, নরম মাটন রেজালা, সোনালী চিকেন রোস্ট এবং ঐতিহ্যবাহী ঢাকাই মিষ্টান্ন নিয়ে রাজকীয় ভোজ।"
                : weddingPkg.description}
            </p>
            <p className="font-display font-black text-3xl text-brand-600">
              {formatCurrency(weddingPkg.pricePerHead)}{" "}
              <span className="text-xs font-normal text-ink-500 font-sans">
                {isBn ? "/ জন" : "/ guest"}
              </span>
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-ink-200 shadow-soft text-left space-y-6">
            {weddingPkg.courses.map((course, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-display font-bold text-sm uppercase text-brand-600 tracking-wider">
                  {isBn
                    ? course.name === "Welcome Drinks & Starters"
                      ? "স্বাগত পানীয় ও স্টার্টার"
                      : course.name === "Main Course"
                      ? "মূল খাবার"
                      : course.name === "Desserts & Sweets"
                      ? "মিষ্টি ও ডেজার্ট"
                      : course.name
                    : course.name}
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
              <span className="text-xs text-ink-500">
                {isBn ? `সর্বনিম্ন ${weddingPkg.minGuests} অতিথি` : `Min. ${weddingPkg.minGuests} guests`}
              </span>
              <Link href={`/packages/${weddingPkg.slug}`}>
                <Button size="sm" withArrow>
                  {isBn ? "এই প্যাকেজের জন্য যোগাযোগ করুন" : "Inquire for This Package"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


