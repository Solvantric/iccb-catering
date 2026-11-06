"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { PUBLIC_NAV } from "@/data/navigation";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { Menu, X, ChevronDown, Globe, Lock, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { resolvedTheme, setTheme } = useTheme();
  const t = translations[locale].nav;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isTransparent
          ? "bg-ink-950/40 backdrop-blur-md border-b border-white/10 text-white"
          : "bg-white/95 dark:bg-ink-950/95 backdrop-blur-md shadow-sm border-b border-ink-100 dark:border-white/10 text-ink-900 dark:text-white"
      )}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo light={isTransparent} />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-7">
          {PUBLIC_NAV.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = !!item.children;

            if (hasChildren) {
              return (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 text-sm font-semibold uppercase tracking-wider transition-colors py-2",
                      isTransparent
                        ? isActive ? "text-brand-400" : "text-white/90 hover:text-white"
                        : isActive ? "text-brand-500" : "text-ink-700 dark:text-ink-200 hover:text-brand-500 dark:hover:text-brand-400"
                    )}
                  >
                    <span>{locale === "bn" ? item.labelBn || item.label : item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Dropdown */}
                  {servicesDropdown && (
                    <div className="absolute top-full left-0 w-64 py-2 bg-white dark:bg-ink-900 rounded-xl shadow-xl border border-ink-100 dark:border-white/10 animate-in fade-in zoom-in-95">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-xs font-semibold text-ink-700 dark:text-ink-200 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-white/5 transition-colors"
                        >
                          {locale === "bn" ? child.labelBn || child.label : child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold uppercase tracking-wider transition-colors",
                  isTransparent
                    ? isActive ? "text-brand-400 font-bold" : "text-white/90 hover:text-white"
                    : isActive ? "text-brand-500 font-bold" : "text-ink-700 dark:text-ink-200 hover:text-brand-500 dark:hover:text-brand-400"
                )}
              >
                {locale === "bn" ? item.labelBn || item.label : item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.themeToggle}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                isTransparent
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-ink-200 dark:border-white/10 text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-white/10"
              )}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-ink-600" />
              )}
            </button>
          )}

          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition-colors",
              isTransparent
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-ink-200 dark:border-white/10 text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-white/10"
            )}
            title="Toggle Language (English / বাংলা)"
          >
            <Globe className="w-3.5 h-3.5 text-brand-500" />
            <span>{locale === "en" ? "বাংলা" : "EN"}</span>
          </button>

          {/* CMS Link */}
          <Link
            href="/dashboard"
            className={cn(
              "text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg",
              isTransparent
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-ink-600 dark:text-ink-300 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-white/5"
            )}
            title="Admin CMS Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-brand-500" />
            <span className="hidden md:inline">{t.dashboard}</span>
          </Link>

          {/* Get a Quote Button */}
          <Link href="/quote">
            <Button size="sm" withArrow variant="primary">
              {t.getQuote}
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex sm:hidden items-center space-x-2">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.themeToggle}
              className="p-1.5 rounded border border-white/20 text-ink-200"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-ink-200" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className="text-xs font-bold text-brand-500 px-2 py-1 rounded border border-brand-500/30"
          >
            {locale === "en" ? "বাংলা" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isTransparent ? "text-white hover:bg-white/10" : "text-ink-900 dark:text-white hover:bg-ink-100 dark:hover:bg-white/10"
            )}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
