"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { SITE_INFO } from "@/data/site";
import { track } from "@/lib/analytics";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const { locale } = useUIStore();
  const t = translations[locale].floatingActions;

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
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

  return (
    <aside
      aria-label="Quick Communication & Navigation"
      className="fixed right-5 sm:right-6 bottom-6 z-50 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Back to Top Button: Clean, Lite, White in light mode, Dark in dark mode */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t.top}
          className="w-11 h-11 rounded-full bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200 hover:text-brand-500 dark:hover:text-brand-400 border border-ink-200 dark:border-white/15 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group"
        >
          <ArrowUp size={18} strokeWidth={1.75} className="transition-transform group-hover:-translate-y-0.5" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-100 border border-ink-200 dark:border-white/10 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {t.top}
          </span>
        </button>
      )}

      {/* WhatsApp Button: Clean, solid color, lite stroke, no glossy gradients */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_clicked", { channel: "floating_button" })}
        aria-label={t.whatsapp}
        className="relative group flex items-center justify-center"
      >
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.127-.518-1.741-.72-2.871-2.484-2.958-2.599-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-10.416c-5.522 0-10 4.477-10 10 0 1.761.459 3.416 1.261 4.863l-1.34 4.897 5.039-1.322c1.405.772 3.016 1.218 4.73 1.219 5.523 0 10-4.478 10-10 0-5.523-4.477-10-9.69-10z" />
          </svg>
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-100 border border-ink-200 dark:border-white/10 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {locale === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
        </span>
      </a>

      {/* Phone Hotline Button: Solid primary brand red #DC0511, clean & lite icon */}
      <a
        href={`tel:${SITE_INFO.contact.cateringPhone}`}
        onClick={() => track("call_clicked", { channel: "floating_button" })}
        aria-label={t.call}
        className="relative group flex items-center justify-center"
      >
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">
          <Phone size={20} strokeWidth={1.75} className="transition-transform group-hover:rotate-12" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-100 border border-ink-200 dark:border-white/10 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {SITE_INFO.contact.cateringPhone}
        </span>
      </a>
    </aside>
  );
}
