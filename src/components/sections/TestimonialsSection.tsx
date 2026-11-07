"use client";

import React, { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function CoverflowCard({
  item,
  idx,
  activeIndex,
  onSelect,
}: {
  item: (typeof TESTIMONIALS)[0];
  idx: number;
  activeIndex: number;
  onSelect: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const { locale } = useUIStore();

  const author =
    locale === "bn" && (item as any).authorBn
      ? (item as any).authorBn
      : item.author;
  const role =
    locale === "bn" && (item as any).roleBn
      ? (item as any).roleBn
      : item.role;
  const company =
    locale === "bn" && (item as any).companyBn
      ? (item as any).companyBn
      : item.company;
  const content =
    locale === "bn" && (item as any).contentBn
      ? (item as any).contentBn
      : item.content;

  const initials = author
    .split(" ")
    .map((w: string) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Offset relative to activeIndex (0 = center, 1 = right, 3 = left, 2 = hidden/far right)
  const offset = (idx - activeIndex + 4) % 4;
  const isCenter = offset === 0;
  const isRight = offset === 1;
  const isLeft = offset === 3;

  // Variants for desktop / tablet
  let x = "0%";
  let scale = 1;
  let rotate = -1;
  let opacity = 1;
  let zIndex = 30;

  if (isRight) {
    x = "75%";
    scale = 0.88;
    rotate = 0;
    opacity = 0.6;
    zIndex = 20;
  } else if (isLeft) {
    x = "-75%";
    scale = 0.88;
    rotate = 0;
    opacity = 0.6;
    zIndex = 20;
  } else if (offset === 2) {
    x = "140%";
    scale = 0.75;
    rotate = 0;
    opacity = 0;
    zIndex = 10;
  }

  return (
    <motion.div
      animate={{
        x,
        scale,
        rotate: isCenter ? -1 : 0,
        opacity: typeof window !== "undefined" && window.innerWidth < 768 && !isCenter ? 0 : opacity,
        zIndex,
      }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      onClick={!isCenter ? onSelect : undefined}
      className={cn(
        "absolute inset-0 m-auto max-w-[560px] w-full h-auto max-h-[500px] flex flex-col justify-between",
        "bg-white dark:bg-ink-900 rounded-[20px] p-7 sm:p-8 border border-ink-100 dark:border-white/10 select-none text-left",
        isCenter ? "shadow-2xl cursor-default" : "shadow-md cursor-pointer hidden md:flex",
        isLeft || isRight ? "hover:opacity-85" : ""
      )}
    >
      <div>
        {/* Top: occasion/company in small caps (muted) + stars if rating exists */}
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-ink-100 dark:border-white/10">
          <span className="font-display uppercase tracking-wider text-[11px] text-ink-500 dark:text-ink-400 font-semibold truncate">
            {company}
          </span>
          {item.rating && (
            <div className="flex items-center gap-1 text-amber-400 shrink-0">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
          )}
        </div>

        {/* Quote in Playfair italic */}
        <p
          className={cn(
            "font-serif italic text-ink-900 dark:text-white text-[16px] sm:text-[18px] leading-relaxed my-5",
            !isCenter && "line-clamp-4"
          )}
        >
          “{content}”
        </p>
      </div>

      {/* Footer: 52px round avatar + name (semibold) + role below */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-ink-100 dark:border-white/10">
        {!imgError && item.avatar ? (
          <img
            src={item.avatar}
            alt={author}
            className="w-[52px] h-[52px] rounded-full object-cover [object-position:center_top] border border-ink-200/60 dark:border-white/20 shrink-0"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-[52px] h-[52px] rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold text-sm flex items-center justify-center border border-brand-200/60 dark:border-brand-500/20 shrink-0">
            {initials}
          </div>
        )}

        <div className="min-w-0">
          <p className="font-display font-semibold text-sm sm:text-base text-ink-950 dark:text-white truncate">
            {author}
          </p>
          <p className="text-xs text-ink-500 dark:text-ink-400 truncate">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const { locale } = useUIStore();
  const t = translations[locale].testimonials;

  const total = TESTIMONIALS.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay every 4.5s (Reduced motion must NOT stop autoplay)
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(handleNext, 4500);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="py-20 lg:py-28 bg-[#F7F3EE] dark:bg-ink-950 text-ink-950 dark:text-white transition-colors overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
          <span className="font-serif italic text-brand-600 dark:text-brand-400 text-sm sm:text-base font-semibold block">
            {t.tag}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink-950 dark:text-white">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Coverflow Stage */}
        <div
          className="relative h-[460px] sm:h-[420px] max-w-5xl mx-auto flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {TESTIMONIALS.map((item, idx) => (
            <CoverflowCard
              key={item.id}
              item={item}
              idx={idx}
              activeIndex={activeIndex}
              onSelect={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* Controls: Arrows + Dots */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-ink-900/20 dark:border-white/20 text-ink-700 dark:text-ink-200 hover:border-brand-500 hover:text-brand-500 dark:hover:border-brand-500 dark:hover:text-brand-400 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          {/* Dots: Active is a long pill */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "w-8 bg-brand-500"
                    : "w-2 bg-ink-200 dark:bg-white/20 hover:bg-brand-300"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-ink-900/20 dark:border-white/20 text-ink-700 dark:text-ink-200 hover:border-brand-500 hover:text-brand-500 dark:hover:border-brand-500 dark:hover:text-brand-400 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
