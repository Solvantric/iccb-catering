"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES, HeroSlide } from "@/data/images";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const HERO_FADE_MS = 1100;

// Alternate Ken Burns drift directions
const DRIFT_VARIANTS = [
  { x: [0, -18], y: [0, 0] },
  { x: [0, 18], y: [0, 0] },
  { x: [0, 0], y: [0, -18] },
  { x: [0, 12], y: [0, -12] },
];

export function HeroSection() {
  const { locale } = useUIStore();
  const t = translations[locale].hero;
  const isReducedMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Pause when tab hidden, resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Autoplay: exactly setTimeout(next, 3000), paused on counter/arrows or hidden tab.
  // prefers-reduced-motion does NOT stop autoplay.
  useEffect(() => {
    if (paused || tabHidden) return;
    const timer = setTimeout(nextSlide, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, paused, tabHidden, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex] || HERO_SLIDES[0];
  const nextSlideObj = HERO_SLIDES[(currentIndex + 1) % totalSlides];
  const drift = DRIFT_VARIANTS[currentIndex % DRIFT_VARIANTS.length];

  // Helper for Bengali number formatting
  const formatSlideNumber = (num: number) => {
    const str = String(num).padStart(2, "0");
    if (locale === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return str.split("").map((d) => bnDigits[parseInt(d, 10)] ?? d).join("");
    }
    return str;
  };

  return (
    <section
      className="relative w-full h-[100svh] min-h-[580px] overflow-hidden bg-ink-950 text-white select-none focus:outline-none"
      aria-roledescription="carousel"
      aria-label="ICCB Highlights Slider"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Live Region for Screen Readers */}
      <span className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {totalSlides}: {locale === "bn" ? currentSlide.labelBn : currentSlide.label}
      </span>

      {/* Preload Next Slide Image */}
      {nextSlideObj && (
        <link rel="preload" as="image" href={nextSlideObj.src} />
      )}

      {/* Slide Image Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          {HERO_SLIDES.map((slide: HeroSlide, index: number) => {
            if (index !== currentIndex) return null;
            const hasError = failedImages[slide.id];

            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: isReducedMotion ? 1 : 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: isReducedMotion ? 1 : 1.04 }}
                transition={{
                  duration: HERO_FADE_MS / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 w-full h-full overflow-hidden"
              >
                {!hasError ? (
                  <motion.div
                    className="relative w-full h-full"
                    animate={
                      isReducedMotion
                        ? { scale: 1 }
                        : {
                            scale: [1, 1.08],
                            x: drift.x,
                            y: drift.y,
                          }
                    }
                    transition={{
                      duration: 3.5,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover"
                      onError={() => {
                        setFailedImages((prev) => ({ ...prev, [slide.id]: true }));
                      }}
                    />
                  </motion.div>
                ) : (
                  /* Fallback Neutral Dark Surface */
                  <div className="w-full h-full bg-ink-950 flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-mono text-sm uppercase tracking-widest text-ink-300">
                      {locale === "bn" ? slide.labelBn : slide.label}
                    </span>
                    <span className="font-serif italic text-xs text-ink-500 mt-2">
                      International Convention City Bashundhara
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Scrims: Light Top Scrim (20% height for header) */}
      <div
        className="absolute top-0 inset-x-0 h-[20%] pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Scrims: Bottom Scrim: rgba(0,0,0,0.78) at bottom, 0.45 at 45% height, transparent at 70% */}
      <div
        className="absolute bottom-0 inset-x-0 h-full pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Foreground Content: Text Block at Bottom-Left */}
      <div
        className="relative z-20 w-full h-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end"
        style={{
          paddingBottom: "clamp(40px, 9vh, 96px)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 w-full">
          {/* Left Column: Tagline, Headline, 2 Buttons in One Row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-left max-w-2xl sm:max-w-3xl space-y-4"
          >
            {/* Tagline: colour #F2949E, size clamp(1.25rem, 2vw, 1.75rem), serif italic, text-shadow 0 2px 12px rgba(0,0,0,0.6) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="font-serif italic font-semibold tracking-wide"
              style={{
                color: "#F2949E",
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              ~ {locale === "bn" ? SITE_INFO.taglineBn : SITE_INFO.tagline} ~
            </motion.p>

            {/* Headline: text-shadow 0 2px 16px rgba(0,0,0,0.5), size clamp(2rem, 4vw, 3.75rem) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="font-display font-black uppercase tracking-tight text-white line-clamp-2 leading-[1.04]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              }}
            >
              {t.title}
            </motion.h1>

            {/* Both Action Buttons in One Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="pt-2 flex flex-row items-center gap-4"
            >
              <Link href="/quote" className="inline-block">
                <button
                  type="button"
                  className="px-6 sm:px-7 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-[0.98]"
                >
                  {t.ctaQuote}
                </button>
              </Link>
              <Link href="/menu" className="inline-block">
                <button
                  type="button"
                  className="px-6 sm:px-7 py-3 rounded-lg border border-white/80 hover:border-white text-white hover:bg-white hover:text-ink-950 font-semibold text-sm sm:text-base tracking-wide transition-all active:scale-[0.98]"
                >
                  {t.ctaMenu}
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Controls (paused = true ONLY when mouse is over arrows/counter or control has focus) */}
          <div
            className="flex flex-col items-start lg:items-end gap-3 shrink-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Slide Label above counter */}
            <span className="font-mono text-xs uppercase tracking-widest text-white/85 font-medium">
              {locale === "bn" ? currentSlide.labelBn : currentSlide.label}
            </span>

            {/* Counter + Chevrons Row */}
            <div className="flex items-center gap-4">
              {/* Mono Small Counter "01 / 04" */}
              <span className="font-mono text-sm sm:text-base text-white/90 tracking-wider">
                {formatSlideNumber(currentIndex + 1)} / {formatSlideNumber(totalSlides)}
              </span>

              {/* Prev / Next 44px Chevrons (hidden on mobile, swipe only) */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label={locale === "bn" ? "পূর্ববর্তী স্লাইড" : "Previous slide"}
                  className="w-[44px] h-[44px] rounded-full border border-white/40 hover:border-white text-white flex items-center justify-center transition-all hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label={locale === "bn" ? "পরবর্তী স্লাইড" : "Next slide"}
                  className="w-[44px] h-[44px] rounded-full border border-white/40 hover:border-white text-white flex items-center justify-center transition-all hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Row of Thin Progress Segments (2px) where active one fills over slide time, keyed by index */}
            <div className="flex items-center gap-2 pt-1 w-44 sm:w-52">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className="relative flex-1 h-[2px] bg-white/25 rounded-full overflow-hidden hover:h-[3px] transition-all cursor-pointer"
                  >
                    {isActive ? (
                      <motion.div
                        key={currentIndex}
                        className="h-full bg-white rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width: paused || tabHidden ? "0%" : "100%",
                        }}
                        transition={{
                          duration: paused || tabHidden ? 0 : 3,
                          ease: "linear",
                        }}
                      />
                    ) : idx < currentIndex ? (
                      <div className="h-full w-full bg-white/70 rounded-full" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
