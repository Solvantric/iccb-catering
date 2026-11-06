"use client";

import React from "react";
import { CountUp } from "@/components/motion";
import { Building2, Users, CalendarCheck, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function StatsSection() {
  const { locale } = useUIStore();
  const t = translations[locale].stats;

  const stats = [
    {
      label: t.stat1Label,
      value: 2015,
      suffix: "",
      prefix: "",
      desc: t.stat1Desc,
      icon: <CalendarCheck className="w-6 h-6" />,
      isVerified: true,
    },
    {
      label: t.stat2Label,
      value: 10000,
      suffix: "+",
      prefix: "",
      desc: t.stat2Desc,
      icon: <Users className="w-6 h-6" />,
      isVerified: true,
    },
    {
      label: t.stat3Label,
      value: 4,
      suffix: locale === "bn" ? "টি হল" : " Halls",
      prefix: "",
      desc: t.stat3Desc,
      icon: <Building2 className="w-6 h-6" />,
      isVerified: true,
    },
    {
      label: t.stat4Label,
      value: 100,
      suffix: "%",
      prefix: "",
      desc: t.stat4Desc,
      icon: <Award className="w-6 h-6" />,
      isVerified: true,
    },
  ];

  return (
    <section className="py-20 bg-ink-950 text-white relative border-y border-ink-900">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-ink-900/60 border border-ink-800 text-center space-y-3 group hover:border-brand-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all">
                {st.icon}
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                <CountUp end={st.value} prefix={st.prefix} suffix={st.suffix} />
              </div>
              <div className="space-y-0.5">
                <p className="font-display font-bold text-xs uppercase tracking-wider text-brand-400">
                  {st.label}
                </p>
                <p className="text-[11px] text-ink-400">{st.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

