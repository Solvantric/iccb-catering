"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE_INFO } from "@/data/site";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { track } from "@/lib/analytics";

export function CTABand() {
  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello ICCB Catering, I would like to inquire about event catering services.")}`;

  return (
    <section className="bg-brand-500 text-white py-14 relative z-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-100">
              Direct Banquet Desk
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
              PLANNING AN EVENT? GET A FREE QUOTE
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Speak directly with our banquet specialists today or build your customized package online in 2 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Call */}
            <a
              href={`tel:${SITE_INFO.contact.cateringPhone}`}
              onClick={() => track("call_clicked", { channel: "cta_band" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-ink-950 font-bold text-sm hover:bg-brand-50 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>{SITE_INFO.contact.cateringPhone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { channel: "cta_band" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Quote Form */}
            <Link href="/quote">
              <Button variant="dark" size="md" withArrow>
                Request Quote Online
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

