"use client";

import React from "react";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { ShieldCheck, CheckCircle2, ThermometerSun, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  CheckCircle2: <CheckCircle2 className="w-8 h-8" />,
  ThermometerSun: <ThermometerSun className="w-8 h-8" />,
  UtensilsCrossed: <UtensilsCrossed className="w-8 h-8" />,
};

export function FeatureStrip() {
  const { locale } = useUIStore();

  return (
    <section className="bg-brand-500 text-white py-10 relative z-20 shadow-lg border-y border-brand-600">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SITE_INFO.specialties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                {iconMap[item.icon] || <CheckCircle2 className="w-8 h-8" />}
              </div>
              <div className="text-left space-y-1">
                <h3 className="font-display font-bold text-base uppercase tracking-wider leading-tight text-white">
                  {locale === "bn" ? item.titleBn : item.title}
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  {locale === "bn" && (item as any).descriptionBn ? (item as any).descriptionBn : item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

