"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, ArrowUp, Calendar } from "lucide-react";
import { SITE_INFO } from "@/data/site";
import { track } from "@/lib/analytics";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello ICCB Catering, I would like to inquire about event catering services.")}`;

  return (
    <>
      {/* Desktop Floating Right Action Pills */}
      <div className="hidden md:flex flex-col fixed right-6 bottom-8 z-40 space-y-3">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-12 h-12 rounded-full bg-ink-900/90 text-white shadow-lg flex items-center justify-center hover:bg-black hover:scale-110 transition-all border border-ink-700"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { channel: "floating_button" })}
          className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-floating flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all group relative"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-ink-950 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${SITE_INFO.contact.cateringPhone}`}
          onClick={() => track("call_clicked", { channel: "floating_button" })}
          className="w-12 h-12 rounded-full bg-brand-500 text-white shadow-floating flex items-center justify-center hover:bg-brand-600 hover:scale-110 transition-all group relative"
          title="Call Catering Desk"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-ink-950 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Call Catering Hotline
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (Call | WhatsApp | Get Quote) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink-950/95 backdrop-blur-md border-t border-ink-800 p-2 flex items-center justify-around gap-2 text-xs">
        <a
          href={`tel:${SITE_INFO.contact.cateringPhone}`}
          onClick={() => track("call_clicked", { channel: "mobile_bottom_bar" })}
          className="flex-1 py-2.5 px-2 bg-ink-900 border border-ink-800 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold"
        >
          <Phone className="w-3.5 h-3.5 text-brand-500" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { channel: "mobile_bottom_bar" })}
          className="flex-1 py-2.5 px-2 bg-emerald-700/80 border border-emerald-600 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/quote"
          className="flex-1 py-2.5 px-2 bg-brand-500 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </Link>
      </div>
    </>
  );
}

