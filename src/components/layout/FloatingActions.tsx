"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
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
      setShowTop(scrollY > 350);

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
      ? "আসসালামু আলাইকুম, আইসিসিবি ক্যাটারিং সেবা সম্পর্কে বিস্তারিত জানতে চাই।"
      : "Hello ICCB Catering, I would like to inquire about banquet catering services."
  )}`;

  // Progress ring calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <aside
      aria-label="Quick Communication & Navigation"
      className="fixed right-5 sm:right-7 bottom-6 z-50 flex flex-col items-end gap-3.5 pointer-events-auto"
    >
      {/* Back to Top Button */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t.top}
          className="relative w-12 h-12 rounded-full bg-ink-950/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-[0_0_20px_rgba(220,5,17,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
        >
          {/* Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2.5"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="#DC0511"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Sculpted Arrow */}
          <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
            <ArrowUp
              size={16}
              strokeWidth={2.5}
              className="text-white transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </span>

          {/* Tooltip */}
          <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-ink-900/95 text-white border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 pointer-events-none">
            {t.top}
          </span>
        </button>
      )}

      {/* WhatsApp Button (Ultra Premium Emerald Badge) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_clicked", { channel: "floating_button" })}
        aria-label={t.whatsapp}
        className="relative group flex items-center justify-center"
      >
        {/* Subtle Ambient Ping */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping duration-1000 pointer-events-none" />

        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#4ADE80] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] border-2 border-white/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)]">
          {/* Authentic WhatsApp Glyph */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.127-.518-1.741-.72-2.871-2.484-2.958-2.599-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-10.416c-5.522 0-10 4.477-10 10 0 1.761.459 3.416 1.261 4.863l-1.34 4.897 5.039-1.322c1.405.772 3.016 1.218 4.73 1.219 5.523 0 10-4.478 10-10 0-5.523-4.477-10-9.69-10z" />
          </svg>
        </div>

        {/* Tooltip Pill */}
        <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-ink-900/95 text-white border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 pointer-events-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>{locale === "bn" ? "হোয়াটসঅ্যাপে চ্যাট করুন" : "Chat on WhatsApp"}</span>
        </span>
      </a>

      {/* Phone Hotline Button (Ultra Premium Brand Crimson Badge) */}
      <a
        href={`tel:${SITE_INFO.contact.cateringPhone}`}
        onClick={() => track("call_clicked", { channel: "floating_button" })}
        aria-label={t.call}
        className="relative group flex items-center justify-center"
      >
        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#7D0208] via-[#DC0511] to-[#E6303B] text-white shadow-[0_8px_25px_rgba(220,5,17,0.45)] border-2 border-white/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(220,5,17,0.6)]">
          <Phone
            size={24}
            strokeWidth={2.2}
            className="text-white drop-shadow-sm transition-transform duration-300 group-hover:rotate-12"
          />
        </div>

        {/* Tooltip Pill with verified number */}
        <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-ink-900/95 text-white border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 pointer-events-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC0511] animate-ping" />
          <span>{SITE_INFO.contact.cateringPhone}</span>
        </span>
      </a>
    </aside>
  );
}
