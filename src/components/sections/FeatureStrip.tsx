"use client";

import React from "react";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { ShieldCheck, CheckCircle2, ThermometerSun, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} />,
  ThermometerSun: <ThermometerSun className="w-6 h-6" strokeWidth={1.75} />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" strokeWidth={1.75} />,
};

export function FeatureStrip() {
  const { locale } = useUIStore();

  return (
    <section className="bg-brand-500 text-white py-8 sm:py-10 relative z-20 shadow-md">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SITE_INFO.specialties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-start gap-3.5 group"
            >
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0 text-white">
                {iconMap[item.icon] || <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} />}
              </div>
              <div className="text-left space-y-0.5">
                <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider leading-tight text-white">
                  {locale === "bn" ? item.titleBn : item.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed">
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

