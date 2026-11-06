"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HERO_SLIDES, HeroSlide } from "@/data/images";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { ShieldCheck, CheckCircle2, Flame, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const { locale } = useUIStore();
  const t = translations[locale].hero;
  const isReducedMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  // Autoplay (5s), pause on hover/focus or if prefers-reduced-motion
  useEffect(() => {
    if (isReducedMotion || isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isReducedMotion, nextSlide, totalSlides]);

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
      if (Math.abs(diff) > 50) {
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

  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden flex items-center bg-ink-950 text-white"
      aria-roledescription="carousel"
      aria-label="ICCB Highlights Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
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

      {/* Background Image Slider with Crossfade & Slow Zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          {HERO_SLIDES.map((slide: HeroSlide, index: number) => {
            if (index !== currentIndex) return null;
            const hasError = failedImages[slide.id];

            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {!hasError ? (
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ scale: isReducedMotion ? 1 : [1, 1.06] }}
                    transition={{
                      duration: isReducedMotion ? 0 : 5,
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
                  /* Fallback Neutral Dark Surface (No stock / Unsplash) */
                  <div className="w-full h-full bg-ink-950 flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-mono text-sm uppercase tracking-widest text-ink-400">
                      {locale === "bn" ? slide.labelBn : slide.label}
                    </span>
                    <span className="font-serif italic text-xs text-ink-600 mt-2">
                      International Convention City Bashundhara
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dark Scrim Overlays for optimal text legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/65 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50 pointer-events-none" />

      {/* Foreground Content: Hero Copy & Overlaid CTAs */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-20 sm:pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Script Tagline */}
            <div className="inline-flex items-center gap-2">
              <span className="font-serif italic text-brand-400 text-lg sm:text-2xl font-semibold tracking-wide">
                ~ {locale === "bn" ? SITE_INFO.taglineBn : SITE_INFO.tagline} ~
              </span>
            </div>

            {/* Giant Display H1 */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] text-white">
              {t.title}
            </h1>

            {/* Sub-copy from verified facts */}
            <p className="text-sm sm:text-base text-ink-200 max-w-xl leading-relaxed">
              {t.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link href="/quote">
                <Button size="lg" withArrow variant="primary">
                  {t.ctaQuote}
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="secondary">
                  {t.ctaMenu}
                </Button>
              </Link>
            </div>

            {/* Verified Trust Badges */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-ink-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="font-medium">{t.trust1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="font-medium">{t.trust2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="font-medium">{t.trust3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="font-medium">{t.trust4}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Label Caption (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-ink-950/75 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-ink-200 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>{locale === "bn" ? currentSlide.labelBn : currentSlide.label}</span>
        </div>
      </div>

      {/* Prev / Next Controls (Right Aligned or Sides) */}
      <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={prevSlide}
          aria-label={locale === "bn" ? "পূর্ববর্তী স্লাইড" : "Previous slide"}
          className="w-10 h-10 rounded-full bg-ink-900/80 hover:bg-brand-500 border border-white/20 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-400 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label={locale === "bn" ? "পরবর্তী স্লাইড" : "Next slide"}
          className="w-10 h-10 rounded-full bg-ink-900/80 hover:bg-brand-500 border border-white/20 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-400 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators (Bottom Left / Bottom) */}
      <div className="absolute left-6 bottom-8 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide: HeroSlide, index: number) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.label}`}
              aria-current={isActive ? "true" : undefined}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? "w-8 h-2 bg-brand-500"
                  : "w-2 h-2 bg-white/40 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
