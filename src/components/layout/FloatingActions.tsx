"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SITE_INFO } from "@/data/site";
import { track } from "@/lib/analytics";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { locale } = useUIStore();
  const t = translations[locale].floatingActions;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowTop(scrollY > 400);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / totalHeight)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    locale === "bn"
      ? "আসসালামু আলাইকুম, আইসিসিবি সেবা সম্পর্কে বিস্তারিত জানতে চাই।"
      : "Hello ICCB Catering, I would like to inquire about event catering services."
  )}`;

  // SVG progress ring calculations (for 48px circle, radius ~22px)
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Back to Top Button (shows only after 400px scroll with 2px brand-500 progress ring) */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t.top}
          className="relative w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-white/90 dark:bg-ink-950/80 backdrop-blur-md border border-ink-900/10 dark:border-white/20 shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500 dark:hover:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
        >
          {/* 2px brand-500 scroll-progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-brand-500 transition-all duration-150"
            />
          </svg>

          {/* Neutral Arrow Icon */}
          <ArrowUp
            size={20}
            strokeWidth={1.5}
            className="text-ink-700 dark:text-ink-200 transition-transform group-hover:-translate-y-0.5"
          />

          {/* Label Pill slides out left */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-900 shadow-md opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 pointer-events-none">
            {t.top}
          </span>
        </button>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_clicked", { channel: "floating_button" })}
        aria-label={t.whatsapp}
        className="relative w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-white/90 dark:bg-ink-950/80 backdrop-blur-md border border-ink-900/10 dark:border-white/20 shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500 dark:hover:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
      >
        <MessageCircle
          size={20}
          strokeWidth={1.5}
          className="text-[#25D366] transition-transform group-hover:scale-110"
        />

        {/* Label Pill slides out left */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-900 shadow-md opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 pointer-events-none">
          {t.whatsapp}
        </span>
      </a>

      {/* Phone Call Button */}
      <a
        href={`tel:${SITE_INFO.contact.cateringPhone}`}
        onClick={() => track("call_clicked", { channel: "floating_button" })}
        aria-label={t.call}
        className="relative w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-white/90 dark:bg-ink-950/80 backdrop-blur-md border border-ink-900/10 dark:border-white/20 shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500 dark:hover:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
      >
        <Phone
          size={20}
          strokeWidth={1.5}
          className="text-brand-500 transition-transform group-hover:scale-110"
        />

        {/* Label Pill slides out left */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-900 shadow-md opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 pointer-events-none">
          {t.call}
        </span>
      </a>
    </div>
  );
}
