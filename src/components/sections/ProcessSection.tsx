"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Utensils, FileText, CheckCircle2, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

const icons = [
  <MessageSquare key="1" className="w-6 h-6" />,
  <Utensils key="2" className="w-6 h-6" />,
  <FileText key="3" className="w-6 h-6" />,
  <CheckCircle2 key="4" className="w-6 h-6" />,
  <PartyPopper key="5" className="w-6 h-6" />,
];

export function ProcessSection() {
  const { locale } = useUIStore();
  const t = translations[locale].process;

  return (
    <section className="py-24 bg-brand-50/40 dark:bg-ink-950/70 relative transition-colors">
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

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.steps.map((st, idx) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-ink-900 rounded-2xl p-6 border border-ink-100 dark:border-white/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    {icons[idx]}
                  </div>
                  <span className="font-display font-black text-2xl text-ink-200 dark:text-ink-700 group-hover:text-brand-300 transition-colors">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 dark:text-ink-50 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-ink-100 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                  {locale === "bn" ? `ধাপ ${idx + 1} / ৫` : `Step ${idx + 1} of 5`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action */}
        <div className="pt-12">
          <Link href="/our-process">
            <Button variant="outline" size="md" withArrow className="dark:border-white/20 dark:text-ink-100">
              {locale === "bn" ? "আমাদের প্রক্রিয়া সম্পর্কে আরও জানুন" : "Learn More About Our Standards"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

