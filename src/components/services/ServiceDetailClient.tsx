"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, ArrowRight, Utensils, Users } from "lucide-react";
import { PLACEHOLDER_BLUR, IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { useUIStore } from "@/store/uiStore";

export function ServiceDetailClient({ service }: { service: Service }) {
  const { locale } = useUIStore();
  const isBn = locale === "bn";

  const title = isBn && service.titleBn ? service.titleBn : service.title;
  const shortDesc = isBn ? "আন্তর্জাতিক মানসম্পন্ন পেশাদার মেহমানদারি ও স্বাস্থ্যসম্মত ক্যাটারিং সার্ভিস।" : service.shortDesc;
  const fullDesc = isBn
    ? "আইসিসিবি ক্যাটারিং প্রতিটি অনুষ্ঠানে উপহার দেয় অসাধারণ স্বাদ, আধুনিক হাইজিন এবং সময়নিষ্ঠ পরিবেশনা। নিজস্ব আধুনিক কসাইখানা এবং এক্সিকিউটিভ শেফদের সমন্বয়ে আমরা নিশ্চিত করি অতুলনীয় ব্যাঙ্কোয়েট অভিজ্ঞতা।"
    : service.fullDesc;

  // Find relevant packages to display with images
  const relevantPackages = PACKAGES.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white dark:bg-ink-950 text-ink-950 dark:text-white py-16 sm:py-20 relative overflow-hidden text-center border-b border-ink-100 dark:border-white/10 transition-colors">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: isBn ? "সেবাসমূহ" : "Services", href: "/services" },
                { label: title },
              ]}
            />
          </div>
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            ~ {isBn ? "আইসিসিবি প্রিমিয়াম ক্যাটারিং সার্ভিস" : "Dedicated Hospitality Service"} ~
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-ink-950 dark:text-white">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed font-sans">
            {shortDesc}
          </p>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-16 sm:py-20 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              {isBn ? "সার্ভিস বিবরণী" : "Full Overview"}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {isBn ? "আপনার বিশেষ আয়োজনে নিখুঁত আতিথেয়তা" : "CRAFTED FOR YOUR EVENT EXCELLENCE"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans">
              {fullDesc}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-sm uppercase text-ink-950 tracking-wider">
                {isBn ? "সার্ভিসের মূল সুবিধাসমূহ:" : "Service Key Features:"}
              </h4>
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-700 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>
                    {isBn
                      ? idx === 0
                        ? "দেশী ও আন্তর্জাতিক অতিথিদের উপযোগী কাস্টমাইজড মেনু"
                        : idx === 1
                        ? "লাইভ হট বেভারেজ স্টেশন ও রিফ্রেশমেন্ট বার"
                        : idx === 2
                        ? "এক্সিকিউটিভ ব্যাঙ্কোয়েট টেবিল সেটআপ ও প্রিমিয়াম ক্রোকারিজ"
                        : idx === 3
                        ? "অন-সাইট সার্বক্ষণিক দায়িত্বপ্রাপ্ত ক্যাটারিং ম্যানেজার"
                        : "খাদ্যমান ও শতভাগ হালাল মাংসের নিশ্চয়তা"
                      : feat}
                  </span>
                </div>
              ))}
            </div>

            {service.idealFor && (
              <div className="pt-2">
                <h4 className="font-display font-bold text-sm uppercase text-ink-950 tracking-wider mb-2">
                  {isBn ? "যাদের জন্য প্রযোজ্য:" : "Ideal For:"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.idealFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-ink-100 text-ink-800 px-3 py-1 rounded-full font-medium font-sans"
                    >
                      {isBn
                        ? idx === 0
                          ? "কর্পোরেট সম্মেলন ও এজিএম"
                          : idx === 1
                          ? "আন্তর্জাতিক সামিট"
                          : idx === 2
                          ? "প্রোডাক্ট লঞ্চ"
                          : "বোর্ড মিটিং ও লাঞ্চ"
                        : item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 flex flex-wrap gap-4">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  {isBn ? `${title} বুক করুন` : `Book Catering for ${service.title}`}
                </Button>
              </Link>
              <Link href="/tasting">
                <Button size="lg" variant="outline">
                  {isBn ? "ফুড টেস্টিং বুক করুন" : "Schedule a Tasting Session"}
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-ink-100">
              <Image
                src={service.image || IMAGES.weddingReception}
                alt={title}
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

      {/* Relevant Packages with Pictures */}
      <section className="py-16 sm:py-20 bg-white border-t border-ink-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ {isBn ? "প্রস্তাবিত প্যাকেজসমূহ" : "Recommended Packages"} ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-950">
              {isBn ? "জনপ্রিয় ব্যাঙ্কোয়েট কোর্সসমূহ" : "POPULAR BANQUET COURSES"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 font-sans">
              {isBn
                ? "আপনার অতিথির সংখ্যা ও পছন্দ অনুযায়ী নির্বাচিত প্যাকেজ বেছে নিন।"
                : "Curated multi-course packages prepared fresh with authentic spices."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {relevantPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 border border-ink-200 shadow-soft flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all group"
              >
                <div className="space-y-4">
                  {/* Relevant Picture */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-ink-100 bg-ink-100">
                    <Image
                      src={pkg.image || IMAGES.kacchiBiryani}
                      alt={isBn && pkg.nameBn ? pkg.nameBn : pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={PLACEHOLDER_BLUR}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold text-white bg-ink-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        {pkg.tag || (isBn ? "সিগনেচার" : "Signature")}
                      </span>
                    </div>
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

