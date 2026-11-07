"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE_INFO } from "@/data/site";
import { Phone, MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function CTABand() {
  const { locale } = useUIStore();
  const t = translations[locale].ctaBand;
  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    locale === "bn"
      ? "আসসালামু আলাইকুম, আইসিসিবি ক্যাটারিং সেবা সম্পর্কে বিস্তারিত জানতে চাই।"
      : "Hello ICCB Catering, I would like to inquire about event catering services."
  )}`;

  return (
    <section className="bg-brand-500 text-white py-14 relative z-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-100">
              {t.tag}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
              {t.heading}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Call */}
            <a
              href={`tel:${SITE_INFO.contact.cateringPhone}`}
              onClick={() => track("call_clicked", { channel: "cta_band" })}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-ink-950 font-bold text-sm hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <span className="w-7 h-7 rounded-full bg-brand-500/10 text-brand-600 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <span>{SITE_INFO.contact.cateringPhone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { channel: "cta_band" })}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white font-bold text-sm hover:brightness-110 transition-all shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 group"
            >
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </span>
              <span>{t.whatsapp}</span>
            </a>

            {/* Quote Form */}
            <Link href="/quote">
              <Button variant="dark" size="md" withArrow className="px-6 py-3.5 shadow-lg">
                {t.requestQuote}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

