"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUIStore } from "@/store/uiStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useUIStore();

  React.useEffect(() => {
    const saved = localStorage.getItem("iccb-locale");
    if (saved === "bn" || saved === "en") {
      setLocale(saved);
      document.documentElement.lang = saved;
    }
  }, [setLocale]);

  React.useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem("iccb-locale", locale);
  }, [locale]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="iccb-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

