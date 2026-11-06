"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale } = useUIStore();
  const t = translations[locale].testimonials;

  return (
    <section className="py-24 bg-brand-50/50 dark:bg-ink-950/70 relative overflow-hidden transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-lg font-semibold block">
            {t.tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 dark:text-ink-50">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Testimonial Cards (Exact Reference Style with Quote Icon, Avatar, Role, Dots) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((item, idx) => {
            const author = locale === "bn" && (item as any).authorBn ? (item as any).authorBn : item.author;
            const role = locale === "bn" && (item as any).roleBn ? (item as any).roleBn : item.role;
            const company = locale === "bn" && (item as any).companyBn ? (item as any).companyBn : item.company;
            const content = locale === "bn" && (item as any).contentBn ? (item as any).contentBn : item.content;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white dark:bg-ink-900 rounded-3xl p-8 border border-ink-100 dark:border-white/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all text-left flex flex-col justify-between relative group"
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors shrink-0">
                  <Quote className="w-6 h-6" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-200 leading-relaxed italic mb-8 flex-1">
                  &ldquo;{content}&rdquo;
                </p>

                {/* Author & Avatar */}
                <div className="flex items-center gap-3 pt-4 border-t border-ink-100 dark:border-white/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-200 dark:border-brand-900">
                    <Image
                      src={item.avatarUrl}
                      alt={author}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase text-ink-950 dark:text-ink-50">
                      {author}
                    </h4>
                    <p className="text-[11px] text-ink-500 dark:text-ink-400">{role}</p>
                    <p className="text-[10px] text-brand-700 dark:text-brand-400 font-semibold">{company}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel indicator dots (Reference Feature) */}
        <div className="flex items-center justify-center gap-2 pt-12">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveIndex(dot)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === dot ? "w-8 bg-brand-500" : "w-2.5 bg-ink-300 dark:bg-ink-700 hover:bg-ink-400"
              }`}
              aria-label={`Go to testimonial slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

