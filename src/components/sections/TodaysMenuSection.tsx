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
import { Sparkles, ArrowRight } from "lucide-react";

export function TodaysMenuSection() {
  const { locale } = useUIStore();
  const t = translations[locale].todaysMenu;
  const todaysDishes = MENU_ITEMS.filter((item) => item.isTodaysMenu).slice(0, 6);

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-ink-950 text-ink-950 dark:text-white relative overflow-hidden transition-colors border-t border-ink-100 dark:border-white/10">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Header: Minimal & Fresh */}
        <div className="max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-white/10 border border-brand-100 dark:border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="font-serif italic text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-wide">
              {locale === "bn" ? "~ আজকের সিগনেচার মেন্যু ~" : "~ Master Chef Selections ~"}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink-950 dark:text-white">
            {t.heading}
          </h2>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto leading-relaxed">
            {locale === "bn"
              ? "নিজস্ব আধুনিক কসাইখানার তাজা মাংস ও খাদ্যমান বিশেষজ্ঞদের তত্ত্বাবধানে প্রস্তুতকৃত সিগনেচার পদ।"
              : "Prepared fresh each day with meats from our automated slaughterhouse and served at optimal 65°C+ temperatures."}
          </p>
        </div>

        {/* Clean, Fresh Plate Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-left">
          {todaysDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white dark:bg-ink-900 border border-ink-100 dark:border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 shadow-sm hover:shadow-md hover:border-brand-500/40 transition-all duration-300 group"
            >
              {/* Highlighted Clean Plate */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-brand-500/20 dark:border-white/15 shadow-md group-hover:scale-105 group-hover:border-brand-500 transition-all duration-500">
                  <Image
                    src={dish.image}
                    alt={locale === "bn" && dish.nameBn ? dish.nameBn : dish.name}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_BLUR}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Dish Content: Concise & Fresh */}
              <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block">
                  {dish.cuisine || "Specialty"}
                </span>

                <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-950 dark:text-white group-hover:text-brand-500 transition-colors">
                  {locale === "bn" && dish.nameBn ? dish.nameBn : dish.name}
                </h3>

                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed line-clamp-2">
                  {locale === "bn" && dish.descriptionBn ? dish.descriptionBn : dish.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/menu/${dish.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-500 hover:text-brand-600 transition-colors group/dish"
                  >
                    <span>{locale === "bn" ? "বিস্তারিত দেখুন" : "View Dish"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/dish:translate-x-1" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom Actions */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/menu">
            <Button size="md" variant="primary" withArrow className="px-7 shadow-md">
              {locale === "bn" ? "সম্পূর্ণ মেনু ক্যাটালগ দেখুন" : "Explore Complete Menu"}
            </Button>
          </Link>
          <Link href="/quote">
            <Button size="md" variant="outline" className="px-7">
              {locale === "bn" ? "ক্যাটারিং বুকিং করুন" : "Book Catering Online"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
