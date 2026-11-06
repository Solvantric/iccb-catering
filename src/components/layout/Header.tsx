"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MAIN_NAV, NavItem } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { IMAGES } from "@/content/images";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<string>("gulnaksha");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle click outside & Esc key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const venueImageMap: Record<string, string> = {
    gulnaksha: IMAGES.venues.gulnaksha,
    pushpoguchcho: IMAGES.venues.pushpoguchcho,
    rajdarshan: IMAGES.venues.rajdarshan,
    noboratri: IMAGES.venues.noboratri,
    pushpanjali: IMAGES.venues.pushpanjali,
    "seminar-hall": IMAGES.venues.seminarHall,
    "expo-village": IMAGES.venues.expoVillage,
    "heritage-restaurant": IMAGES.venues.heritageRestaurant,
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 border-b",
        scrolled
          ? "bg-[#F4EFE6]/90 dark:bg-[#0F0E0D]/90 backdrop-blur-md border-[#D8CFBE] dark:border-[#2B2723]"
          : "bg-[#F4EFE6] dark:bg-[#0F0E0D] border-transparent"
      )}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Real ICCB Logo */}
        <div className="flex items-center justify-start">
          <Logo />
        </div>

        {/* Center: 5 Minimalist Nav Items */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {MAIN_NAV.map((item) => {
            const isOpen = activeMenu === item.label;
            const hasSub = !!item.columns && item.columns.length > 0;

            return (
              <div
                key={item.label}
                className="relative py-6"
                onMouseEnter={() => hasSub && setActiveMenu(item.label)}
                onMouseLeave={() => hasSub && setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.12em] font-medium transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                    isOpen ? "text-accent" : "text-ink hover:text-accent"
                  )}
                >
                  <span>{item.label}</span>
                  {hasSub && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 opacity-60 transition-transform duration-150",
                        isOpen && "rotate-180 text-accent"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Panel */}
                {isOpen && item.columns && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 bg-paper dark:bg-paper-2 border border-rule shadow-lg p-6 animate-in fade-in duration-150 z-50 text-left",
                      item.label === "Explore" ? "w-[720px] grid grid-cols-12 gap-6" :
                      item.label === "Plan Your Event" ? "w-[560px] grid grid-cols-2 gap-8" : "w-64 space-y-2"
                    )}
                  >
                    {item.label === "Explore" ? (
                      <>
                        {/* Venues Column */}
                        <div className="col-span-5 space-y-1 border-r border-rule pr-4">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mb-3">
                            Venues
                          </p>
                          {item.columns[0]?.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onMouseEnter={() => sub.slug && setHoveredVenue(sub.slug)}
                              className="block py-1 text-xs text-ink hover:text-accent transition-colors font-mono tracking-wide"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>

                        {/* Discover Column */}
                        <div className="col-span-3 space-y-1">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mb-3">
                            Discover
                          </p>
                          {item.columns[1]?.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-1 text-xs text-ink hover:text-accent transition-colors font-mono tracking-wide"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>

                        {/* Image Preview Column */}
                        <div className="col-span-4 relative rounded-xs overflow-hidden border border-rule bg-paper-2 h-[220px]">
                          {venueImageMap[hoveredVenue] && (
                            <Image
                              src={venueImageMap[hoveredVenue]}
                              alt="ICCB Venue Preview"
                              fill
                              sizes="240px"
                              className="object-cover transition-opacity duration-300"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-white">
                              Preview Manifest
                            </span>
                          </div>
                        </div>
                      </>
                    ) : item.label === "Plan Your Event" ? (
                      <>
                        <div className="space-y-1 border-r border-rule pr-4">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mb-3">
                            Event Types
                          </p>
                          {item.columns[0]?.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-1 text-xs text-ink hover:text-accent transition-colors font-mono tracking-wide"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft mb-3">
                            Information
                          </p>
                          {item.columns[1]?.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-1 text-xs text-ink hover:text-accent transition-colors font-mono tracking-wide"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="space-y-1">
                        {item.columns[0]?.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-1.5 text-xs text-ink hover:text-accent transition-colors font-mono tracking-wide"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Enquire Button & Mobile Hamburger */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/contact/enquiry"
            className="hidden sm:inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] font-medium px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            Enquire
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-ink hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-paper dark:bg-paper-2 z-50 overflow-y-auto p-6 border-t border-rule animate-in fade-in">
          <div className="space-y-6 text-left">
            {MAIN_NAV.map((nav) => (
              <div key={nav.label} className="border-b border-rule pb-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                  {nav.label}
                </p>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {nav.columns?.flatMap((c) => c.items).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-mono text-ink hover:text-accent py-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/contact/enquiry"
                onClick={() => setMobileOpen(false)}
                className="w-full block text-center font-mono text-xs uppercase tracking-wider py-3 border border-ink bg-ink text-paper"
              >
                Request a Booking
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
