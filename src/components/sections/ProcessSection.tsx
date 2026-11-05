"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Utensils, FileText, CheckCircle2, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Initial Inquiry",
    desc: "Share your event date, estimated guests, preferred venue, and style via our intuitive quote builder or phone.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Menu & Tasting",
    desc: "Customize your courses with our banquet consultant and join us for a private food tasting session.",
    icon: <Utensils className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Transparent Quotation",
    desc: "Receive an itemized quotation outlining per-head rates, live stations, crockery, and staff arrangements.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Date Confirmation",
    desc: "Lock in your date with a 25% deposit, formal contract, and dedicated banquet captain assignment.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    step: "05",
    title: "Flawless Event Day",
    desc: "Food arrives hot at 65°C+ in insulated thermal units, managed by uniformed waitstaff for a royal experience.",
    icon: <PartyPopper className="w-6 h-6" />,
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-brand-50/40 relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Hassle-Free Journey ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            OUR 5-STEP PROCESS
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            From your very first inquiry to the last dessert served, here is how ICCB ensures an effortless catering experience.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((st, idx) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    {st.icon}
                  </div>
                  <span className="font-display font-black text-2xl text-ink-200 group-hover:text-brand-300 transition-colors">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-ink-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  Step {idx + 1} of 5
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action */}
        <div className="pt-12">
          <Link href="/our-process">
            <Button variant="outline" size="md" withArrow>
              Learn More About Our Standards
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

