"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PACKAGES } from "@/data/packages";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { formatCurrency } from "@/lib/format";
import { CheckCircle2, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export function CorporateCateringClient() {
  const { locale } = useUIStore();
  const isBn = locale === "bn";

  const corporatePackages = PACKAGES.filter(
    (p) =>
      p.cuisineType.toLowerCase().includes("corporate") ||
      p.cuisineType.toLowerCase().includes("continental") ||
      p.slug.includes("corporate")
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: isBn ? "সেবাসমূহ" : "Services", href: "/services" },
                { label: isBn ? "কর্পোরেট ক্যাটারিং" : "Corporate Catering" },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ {isBn ? "বৃহৎ পরিসরে আন্তর্জাতিক মানের কর্পোরেট আতিথেয়তা" : "Corporate Hospitality at Scale"} ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            {isBn ? "কর্পোরেট ক্যাটারিং সার্ভিস" : "CORPORATE CATERING"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? "৫০ জন থেকে শুরু করে ১০,০০০+ প্রতিনিধির সম্মেলন, এজিএম কিংবা এক্সিকিউটিভ লাঞ্চ: শতভাগ সময়নিষ্ঠতা, আধুনিক খাদ্যমান ও প্রিমিয়াম স্বাদ।"
              : "From Fortune 500 board luncheons to international expos hosting 10,000+ attendees: zero-delay buffet service, strict temperature control, and executive taste."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              {isBn ? "সময়নিষ্ঠ বাস্তবায়ন" : "Punctual Execution"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {isBn ? "কর্পোরেট সাফল্য ও সেরা আতিথেয়তা" : "CRAFTED FOR EXECUTIVE PRODUCTIVITY"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans">
              {isBn
                ? "কর্পোরেট আয়োজনে সময় সবচেয়ে গুরুত্বপূর্ণ। আমাদের আধুনিক মেগা-কিচেন এবং ডাবল-সাইডেড বুফে সিস্টেমের মাধ্যমে আমরা মাত্র ২৫ মিনিটের মধ্যে ১,০০০+ প্রতিনিধিকে নিখুঁতভাবে আপ্যায়ন করতে সক্ষম, যা প্রোগ্রামের সূচি রাখে নিরবচ্ছিন্ন।"
                : "In corporate banqueting, timing is everything. Our industrial-grade kitchen operations and double-sided buffet lines allow us to serve 1,000 delegates in under 25 minutes, avoiding the bottlenecks and queues that derail event schedules."}
            </p>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans">
              {isBn
                ? "আমরা প্রদান করি লাইভ চা/কফি স্টেশন, কাস্টমাইজড এক্সিকিউটিভ লাঞ্চ বক্স, ভিআইপি প্লেটেড ডিনার এবং সার্বক্ষণিক অভিজ্ঞ ক্যাটারিং ক্যাপ্টেন।"
                : "We provide complete turn-key solutions including live tea/coffee stations, customized executive lunch boxes, plated VIP dinners, and dedicated on-site logistics captains."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-ink-200 space-y-1">
                <Clock className="w-5 h-5 text-brand-500" strokeWidth={1.75} />
                <h4 className="font-display font-bold text-sm uppercase text-ink-950">
                  {isBn ? "নির্ভুল সময়নিষ্ঠতা" : "Strict Punctuality"}
                </h4>
                <p className="text-[11px] text-ink-600 font-sans">
                  {isBn ? "কনফারেন্সের সময়সূচির সাথে হুবহু সামঞ্জস্যপূর্ণ" : "Syncs directly with conference programs"}
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-ink-200 space-y-1">
                <ShieldCheck className="w-5 h-5 text-brand-500" strokeWidth={1.75} />
                <h4 className="font-display font-bold text-sm uppercase text-ink-950">
                  {isBn ? "শতভাগ হালাল ও স্বাস্থ্যসম্মত" : "HACCP Certified"}
                </h4>
                <p className="text-[11px] text-ink-600 font-sans">
                  {isBn ? "ল্যাব পরীক্ষিত খাদ্যমান ও আধুনিক কসাইখানা" : "Lab tested hygiene and cold-chain integrity"}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  {isBn ? "কর্পোরেট ক্যাটারিং বুক করুন" : "Book Corporate Catering"}
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={IMAGES.corporateEvent}
                alt="Corporate Summit Buffet"
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

      {/* Featured Corporate Packages with Relevant Pictures */}
      <section className="py-20 bg-white border-t border-ink-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ {isBn ? "কর্পোরেট প্যাকেজসমূহ" : "Corporate Packages"} ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {isBn ? "জনপ্রিয় কর্পোরেট ব্যাঙ্কোয়েট মেনু" : "POPULAR CORPORATE BANQUET MENUS"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 font-sans">
              {isBn
                ? "আমাদের স্ট্যান্ডার্ড প্যাকেজ থেকে নির্বাচন করুন অথবা এক্সিকিউটিভ মাস্টারের সাথে কাস্টমাইজ করুন।"
                : "Select an established package or customize every dish with our Executive Master Chef."}
            </p>
          </div>

          {/* Cards with Relevant Pictures */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {corporatePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 border border-ink-200 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all group"
              >
                <div className="space-y-4">
                  {/* Relevant Package Image */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-ink-100 bg-ink-100">
                    <Image
                      src={pkg.image || IMAGES.corporateEvent}
                      alt={isBn && pkg.nameBn ? pkg.nameBn : pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={PLACEHOLDER_BLUR}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold text-white bg-ink-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        {pkg.tag || (isBn ? "কর্পোরেট" : "Corporate")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-500 font-medium">
                      {isBn ? `ন্যূনতম ${pkg.minGuests} জন অতিথি` : `Min ${pkg.minGuests} guests`}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl uppercase text-ink-950 group-hover:text-brand-600 transition-colors">
                      {isBn && pkg.nameBn ? pkg.nameBn : pkg.name}
                    </h3>
                    <p className="font-display font-black text-2xl text-brand-600 mt-1">
                      {formatCurrency(pkg.pricePerHead)}{" "}
                      <span className="text-xs font-normal text-ink-500 font-sans">
                        {isBn ? "/ জন প্রতি" : "/ person"}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs text-ink-600 leading-relaxed font-sans line-clamp-2">
                    {isBn && pkg.descriptionBn ? pkg.descriptionBn : pkg.description}
                  </p>

                  <div className="space-y-2 border-t border-ink-100 pt-4">
                    <span className="text-[10px] font-bold uppercase text-ink-400 tracking-wider">
                      {isBn ? "প্যাকেজের বিশেষ সুবিধাসমূহ" : "Included Highlights"}
                    </span>
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-ink-700 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-ink-100">
                  <Link href={`/packages/${pkg.slug}`} className="block">
                    <Button variant="outline" className="w-full text-xs font-bold uppercase" withArrow>
                      {isBn ? "প্যাকেজের বিবরণ দেখুন" : "View Package Details"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

