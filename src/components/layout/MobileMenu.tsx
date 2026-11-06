"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV } from "@/data/navigation";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { X, Phone, Mail, MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { translations } from "@/lib/i18n";

export function MobileMenu() {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen, locale, setLocale } = useUIStore();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mobileMenuOpen) return null;

  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const isDark = currentTheme === "dark";
  const t = translations[locale].nav;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="relative ml-auto w-4/5 max-w-sm h-full bg-ink-950 text-white flex flex-col p-6 overflow-y-auto z-10 border-l border-ink-800 shadow-2xl">
        <div className="flex items-center justify-between pb-6 border-b border-ink-800">
          <Logo light />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-ink-400 hover:text-white rounded-lg hover:bg-ink-900"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Locale & Theme Controls */}
        <div className="flex items-center justify-between pt-4 pb-2">
          {/* Language Switch */}
          <div className="inline-flex items-center rounded-full bg-white/10 p-1 border border-white/10 text-xs">
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                locale === "en" ? "bg-brand-500 text-white shadow-sm" : "text-ink-300 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("bn")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                locale === "bn" ? "bg-brand-500 text-white shadow-sm" : "text-ink-300 hover:text-white"
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Theme Switch */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-ink-200 hover:text-white transition-all"
            aria-label={t.themeToggle}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-300" />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 py-4 space-y-3">
          {PUBLIC_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="space-y-1">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-bold font-display uppercase tracking-wider transition-colors ${
                    isActive ? "text-brand-500" : "text-ink-200 hover:text-white"
                  }`}
                >
                  {locale === "bn" && item.labelBn ? item.labelBn : item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1 border-l border-ink-800">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-ink-400 hover:text-brand-400 py-1"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Contact Snippet */}
        <div className="pt-4 border-t border-ink-800 space-y-2.5 text-xs text-ink-300">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-500" />
            <span>{SITE_INFO.contact.cateringPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-500" />
            <span>{SITE_INFO.contact.cateringEmail}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <span className="line-clamp-2">
              {locale === "bn"
                ? "৩০০ ফিট পূর্বাচল এক্সপ্রেস হাইওয়ের পাশে, ঢাকা ১২২৯"
                : SITE_INFO.contact.address}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-5 space-y-2.5">
          <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="block">
            <Button className="w-full" withArrow>
              {t.getQuote}
            </Button>
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block">
            <Button variant="secondary" className="w-full">
              {t.dashboard}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

