# CODE_DUMP.md: Complete Source Code Repository Dump

This document contains the exact source code of the ICCB Catering codebase for architecture review and redesign planning.

Excluded: `node_modules`, `.next`, lockfiles, binary images, and dashboard page source code (dashboard page paths listed at end).

## Table of Contents

- [package.json](#packagejson)
- [next.config.mjs](#nextconfigmjs)
- [tailwind.config.ts](#tailwindconfigts)
- [postcss.config.mjs](#postcssconfigmjs)
- [tsconfig.json](#tsconfigjson)
- [src/middleware.ts](#srcmiddlewarets)
- [src/app/layout.tsx](#srcapplayouttsx)
- [src/app/globals.css](#srcappglobalscss)
- [src/app/(publicRoute)/page.tsx](#srcapppublicroutepagetsx)
- [src/components/layout/AnnouncementBar.tsx](#srccomponentslayoutannouncementbartsx)
- [src/components/layout/Breadcrumbs.tsx](#srccomponentslayoutbreadcrumbstsx)
- [src/components/layout/CookieConsent.tsx](#srccomponentslayoutcookieconsenttsx)
- [src/components/layout/FloatingActions.tsx](#srccomponentslayoutfloatingactionstsx)
- [src/components/layout/Footer.tsx](#srccomponentslayoutfootertsx)
- [src/components/layout/Header.tsx](#srccomponentslayoutheadertsx)
- [src/components/layout/MobileMenu.tsx](#srccomponentslayoutmobilemenutsx)
- [src/components/layout/OfferPopup.tsx](#srccomponentslayoutofferpopuptsx)
- [src/components/motion/index.tsx](#srccomponentsmotionindextsx)
- [src/components/ui/Accordion.tsx](#srccomponentsuiaccordiontsx)
- [src/components/ui/Badge.tsx](#srccomponentsuibadgetsx)
- [src/components/ui/Button.tsx](#srccomponentsuibuttontsx)
- [src/components/ui/Card.tsx](#srccomponentsuicardtsx)
- [src/components/ui/DatePicker.tsx](#srccomponentsuidatepickertsx)
- [src/components/ui/EmptyState.tsx](#srccomponentsuiemptystatetsx)
- [src/components/ui/Input.tsx](#srccomponentsuiinputtsx)
- [src/components/ui/Logo.tsx](#srccomponentsuilogotsx)
- [src/components/ui/Modal.tsx](#srccomponentsuimodaltsx)
- [src/components/ui/Select.tsx](#srccomponentsuiselecttsx)
- [src/components/ui/Skeleton.tsx](#srccomponentsuiskeletontsx)
- [src/components/ui/Tabs.tsx](#srccomponentsuitabstsx)
- [src/components/ui/Textarea.tsx](#srccomponentsuitextareatsx)
- [src/components/ui/index.ts](#srccomponentsuiindexts)
- [src/components/sections/CTABand.tsx](#srccomponentssectionsctabandtsx)
- [src/components/sections/ChooseMenuSection.tsx](#srccomponentssectionschoosemenusectiontsx)
- [src/components/sections/FAQSection.tsx](#srccomponentssectionsfaqsectiontsx)
- [src/components/sections/FeatureStrip.tsx](#srccomponentssectionsfeaturestriptsx)
- [src/components/sections/GalleryPreviewSection.tsx](#srccomponentssectionsgallerypreviewsectiontsx)
- [src/components/sections/HeroSection.tsx](#srccomponentssectionsherosectiontsx)
- [src/components/sections/OccasionGridSection.tsx](#srccomponentssectionsoccasiongridsectiontsx)
- [src/components/sections/ProcessSection.tsx](#srccomponentssectionsprocesssectiontsx)
- [src/components/sections/StatsSection.tsx](#srccomponentssectionsstatssectiontsx)
- [src/components/sections/SubscribeBanner.tsx](#srccomponentssectionssubscribebannertsx)
- [src/components/sections/TestimonialsSection.tsx](#srccomponentssectionstestimonialssectiontsx)
- [src/components/sections/TodaysMenuSection.tsx](#srccomponentssectionstodaysmenusectiontsx)
- [src/components/sections/VideoStorySection.tsx](#srccomponentssectionsvideostorysectiontsx)
- [src/components/forms/BookingForm.tsx](#srccomponentsformsbookingformtsx)
- [src/components/forms/ContactForm.tsx](#srccomponentsformscontactformtsx)
- [src/components/forms/InquiryForm.tsx](#srccomponentsformsinquiryformtsx)
- [src/components/forms/QuoteForm.tsx](#srccomponentsformsquoteformtsx)
- [src/components/forms/TastingForm.tsx](#srccomponentsformstastingformtsx)
- [src/components/calculator/PackageCalculator.tsx](#srccomponentscalculatorpackagecalculatortsx)
- [src/data/blog.ts](#srcdatablogts)
- [src/data/bookings.ts](#srcdatabookingsts)
- [src/data/clients.ts](#srcdataclientsts)
- [src/data/faqs.ts](#srcdatafaqsts)
- [src/data/gallery.ts](#srcdatagalleryts)
- [src/data/images.ts](#srcdataimagests)
- [src/data/index.ts](#srcdataindexts)
- [src/data/leads.ts](#srcdataleadsts)
- [src/data/menu.ts](#srcdatamenuts)
- [src/data/navigation.ts](#srcdatanavigationts)
- [src/data/packages.ts](#srcdatapackagests)
- [src/data/quotations.ts](#srcdataquotationsts)
- [src/data/roles.ts](#srcdatarolests)
- [src/data/services.ts](#srcdataservicests)
- [src/data/settings.ts](#srcdatasettingsts)
- [src/data/site.ts](#srcdatasitets)
- [src/data/testimonials.ts](#srcdatatestimonialsts)
- [src/data/users.ts](#srcdatausersts)
- [src/lib/analytics.ts](#srclibanalyticsts)
- [src/lib/axios.ts](#srclibaxiosts)
- [src/lib/format.ts](#srclibformatts)
- [src/lib/i18n.ts](#srclibi18nts)
- [src/lib/seo.ts](#srclibseots)
- [src/lib/utils.ts](#srclibutilsts)
- [src/lib/mock-api/adapter.ts](#srclibmockapiadapterts)
- [src/lib/mock-api/mockStore.ts](#srclibmockapimockstorets)
- [src/store/authStore.ts](#srcstoreauthstorets)
- [src/store/uiStore.ts](#srcstoreuistorets)
- [src/types/index.ts](#srctypesindexts)
- [Dashboard CMS Page Paths (List Only)](#dashboard-cms-page-paths-list-only)

---

## `package.json`

```json
{
  "name": "temp-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^7.0.3",
    "axios": "^1.21.0",
    "clsx": "^2.1.1",
    "framer-motion": "^14.9.1",
    "lucide-react": "^1.69.0",
    "next": "14.2.35",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.91.0",
    "recharts": "^3.10.1",
    "sonner": "^2.0.8",
    "tailwind-merge": "^3.7.0",
    "zod": "^4.6.7",
    "zustand": "^5.0.16"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---

## `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

---

## `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF5F6",
          100: "#FCE8EA",
          200: "#F8BFC5",
          300: "#F2949E",
          400: "#EB7480",
          500: "#E24F5F",
          600: "#C73E4E",
          700: "#A93141",
          800: "#8B2433",
          900: "#6F1B27",
        },
        ink: {
          50: "#F4F4F5",
          100: "#E4E4E7",
          200: "#D4D4D8",
          300: "#A1A1AA",
          400: "#71717A",
          500: "#52525B",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#141416",
          950: "#0B0B0C",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        floating: "0 20px 40px -10px rgba(226, 79, 95, 0.25)",
        dark: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## `postcss.config.mjs`

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

---

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## `src/middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("iccb_auth_token")?.value;

    // For evaluation convenience, if user hasn't signed in yet, we can either redirect to /sign-in
    // or let it pass if demo token is provided. If no token, redirect to /sign-in.
    if (!token) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

---

## `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Oswald, Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { SITE_INFO } from "@/data/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_INFO.name} - Taste of Happiness | Premium Catering & Events Dhaka`,
  description: SITE_INFO.positioning,
  metadataBase: new URL("https://iccbcatering.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen bg-white text-ink-950 font-sans selection:bg-brand-500 selection:text-white">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
```

---

## `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-500: #E24F5F;
  --brand-600: #C73E4E;
  --brand-700: #A93141;
  --brand-400: #EB7480;
  --brand-100: #FCE8EA;
  --brand-50: #FFF5F6;
  --ink-950: #0B0B0C;
  --ink-900: #141416;
  --ink-600: #52525B;
  --white: #FFFFFF;
}

html {
  scroll-behavior: smooth;
}

body {
  color: #141416;
  background-color: #FFFFFF;
  font-family: var(--font-inter), sans-serif;
  overflow-x: hidden;
}

::selection {
  background-color: #E24F5F;
  color: #FFFFFF;
}

/* Custom dotted leader line for Menu Items */
.dotted-leader {
  flex-grow: 1;
  border-bottom: 2px dotted rgba(255, 255, 255, 0.25);
  margin: 0 12px;
  position: relative;
  top: -4px;
}

.dotted-leader-light {
  flex-grow: 1;
  border-bottom: 2px dotted rgba(20, 20, 22, 0.2);
  margin: 0 12px;
  position: relative;
  top: -4px;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #E24F5F;
}

/* Print styling */
@media print {
  header, footer, .no-print, [role="complementary"] {
    display: none !important;
  }
  body {
    background: #ffffff !important;
    color: #000000 !important;
  }
  .print-only {
    display: block !important;
  }
}
```

---

## `src/app/(publicRoute)/page.tsx`

```typescript
import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { ChooseMenuSection } from "@/components/sections/ChooseMenuSection";
import { VideoStorySection } from "@/components/sections/VideoStorySection";
import { OccasionGridSection } from "@/components/sections/OccasionGridSection";
import { TodaysMenuSection } from "@/components/sections/TodaysMenuSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SubscribeBanner } from "@/components/sections/SubscribeBanner";
import { CTABand } from "@/components/sections/CTABand";
import { generatePageMetadata, getOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Premium Wedding & Corporate Catering in Dhaka",
  description:
    "ICCB Catering delivers uncompromising taste and certified hygiene with our modern slaughterhouse, culinary masters, and 10,000+ guest capacity.",
  path: "/",
});

export default function HomePage() {
  const jsonLd = getOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 15 Reference-matched sections */}
      <HeroSection />
      <FeatureStrip />
      <ChooseMenuSection />
      <VideoStorySection />
      <OccasionGridSection />
      <TodaysMenuSection />
      <ProcessSection />
      <StatsSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <SubscribeBanner />
      <CTABand />
    </>
  );
}
```

---

## `src/components/layout/AnnouncementBar.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { INITIAL_SETTINGS } from "@/data/settings";

export function AnnouncementBar() {
  const { announcementDismissed, setAnnouncementDismissed } = useUIStore();
  const settings = INITIAL_SETTINGS.announcementBar;

  if (!settings.enabled || announcementDismissed) return null;

  return (
    <div className="bg-brand-600 text-white text-xs py-2 px-4 relative z-40">
      <div className="max-w-container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto text-center font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-200 hidden sm:inline" />
          <span>{settings.text}</span>
          <Link
            href={settings.linkUrl}
            className="font-bold underline underline-offset-4 hover:text-brand-100 ml-1 transition-colors"
          >
            {settings.linkText} &rarr;
          </Link>
        </div>
        <button
          onClick={() => setAnnouncementDismissed(true)}
          className="text-white/80 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
```

---

## `src/components/layout/Breadcrumbs.tsx`

```typescript
import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-ink-500 py-3" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-brand-500 flex items-center transition-colors">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-ink-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-500 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-800 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
```

---

## `src/components/layout/CookieConsent.tsx`

```typescript
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("iccb_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("iccb_cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-ink-950/95 text-white border border-ink-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
      <div className="flex flex-col gap-3">
        <p className="text-xs text-ink-300 leading-relaxed">
          We use cookies to improve your catering browsing experience and analyze banquet inquiries in accordance with our Privacy Policy.
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={accept} className="text-xs py-1.5 px-4">
            Accept & Continue
          </Button>
          <button
            onClick={() => setShow(false)}
            className="text-xs text-ink-400 hover:text-white px-3 py-1.5"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## `src/components/layout/FloatingActions.tsx`

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, ArrowUp, Calendar } from "lucide-react";
import { SITE_INFO } from "@/data/site";
import { track } from "@/lib/analytics";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello ICCB Catering, I would like to inquire about event catering services.")}`;

  return (
    <>
      {/* Desktop Floating Right Action Pills */}
      <div className="hidden md:flex flex-col fixed right-6 bottom-8 z-40 space-y-3">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-12 h-12 rounded-full bg-ink-900/90 text-white shadow-lg flex items-center justify-center hover:bg-black hover:scale-110 transition-all border border-ink-700"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { channel: "floating_button" })}
          className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-floating flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all group relative"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-ink-950 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${SITE_INFO.contact.cateringPhone}`}
          onClick={() => track("call_clicked", { channel: "floating_button" })}
          className="w-12 h-12 rounded-full bg-brand-500 text-white shadow-floating flex items-center justify-center hover:bg-brand-600 hover:scale-110 transition-all group relative"
          title="Call Catering Desk"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-ink-950 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Call Catering Hotline
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (Call | WhatsApp | Get Quote) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink-950/95 backdrop-blur-md border-t border-ink-800 p-2 flex items-center justify-around gap-2 text-xs">
        <a
          href={`tel:${SITE_INFO.contact.cateringPhone}`}
          onClick={() => track("call_clicked", { channel: "mobile_bottom_bar" })}
          className="flex-1 py-2.5 px-2 bg-ink-900 border border-ink-800 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold"
        >
          <Phone className="w-3.5 h-3.5 text-brand-500" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { channel: "mobile_bottom_bar" })}
          className="flex-1 py-2.5 px-2 bg-emerald-700/80 border border-emerald-600 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/quote"
          className="flex-1 py-2.5 px-2 bg-brand-500 text-white rounded-lg flex items-center justify-center gap-1.5 font-bold shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </Link>
      </div>
    </>
  );
}
```

---

## `src/components/layout/Footer.tsx`

```typescript
import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_LINKS } from "@/data/navigation";
import { SITE_INFO } from "@/data/site";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white border-t border-ink-900 pt-16 pb-20 md:pb-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ink-900">
          {/* Col 1 & 2: Brand / Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo light />
            <p className="text-xs text-ink-300 leading-relaxed max-w-sm mt-3">
              {SITE_INFO.positioning}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 bg-brand-950/60 border border-brand-900 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                South Asia&apos;s Largest Venue &bull; Since 2015
              </span>
            </div>
            {/* Quick Contact & WhatsApp Pill */}
            <div className="pt-3">
              <Link
                href="/quote"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-white bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Request a Custom Quote &rarr;
              </Link>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-brand-500 mb-4">
              Catering Services
            </h4>
            <ul className="space-y-2 text-xs text-ink-300">
              {FOOTER_LINKS.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-brand-500 mb-4">
              Company & Halls
            </h4>
            <ul className="space-y-2 text-xs text-ink-300">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-brand-500 mb-4">
              Verified Contacts
            </h4>
            <div className="text-xs text-ink-300 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SITE_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`tel:${SITE_INFO.contact.cateringPhone}`} className="hover:text-white font-semibold">
                  {SITE_INFO.contact.cateringPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`mailto:${SITE_INFO.contact.cateringEmail}`} className="hover:text-white">
                  {SITE_INFO.contact.cateringEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{SITE_INFO.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {SITE_INFO.fullName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-ink-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cancellation-policy" className="hover:text-ink-300 transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-ink-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## `src/components/layout/Header.tsx`

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { PUBLIC_NAV } from "@/data/navigation";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { Menu, X, ChevronDown, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const t = translations[locale].nav;

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent header only on home before scroll
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isTransparent
          ? "bg-ink-950/40 backdrop-blur-md border-b border-white/10 text-white"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-ink-100 text-ink-900"
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
                        : isActive ? "text-brand-500" : "text-ink-700 hover:text-brand-500"
                    )}
                  >
                    <span>{locale === "bn" ? item.labelBn : item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Dropdown */}
                  {servicesDropdown && (
                    <div className="absolute top-full left-0 w-60 py-2 bg-white rounded-xl shadow-xl border border-ink-100 animate-in fade-in zoom-in-95">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-xs font-semibold text-ink-700 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                        >
                          {child.label}
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
                    : isActive ? "text-brand-500 font-bold" : "text-ink-700 hover:text-brand-500"
                )}
              >
                {locale === "bn" ? item.labelBn : item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition-colors",
              isTransparent
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-ink-200 text-ink-700 hover:bg-ink-100"
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
              isTransparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-ink-600 hover:text-brand-500 hover:bg-brand-50"
            )}
            title="Admin CMS Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-brand-500" />
            <span className="hidden md:inline">CMS</span>
          </Link>

          {/* Get a Quote Button */}
          <Link href="/quote">
            <Button size="sm" withArrow variant="primary">
              {t.getQuote}
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className="text-xs font-bold text-brand-500 px-2 py-1 rounded border border-brand-500/30"
          >
            {locale === "en" ? "বাংলা" : "EN"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isTransparent ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-ink-100"
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
```

---

## `src/components/layout/MobileMenu.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV } from "@/data/navigation";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { X, Phone, Mail, MapPin } from "lucide-react";

export function MobileMenu() {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen, locale } = useUIStore();

  if (!mobileMenuOpen) return null;

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
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 py-6 space-y-4">
          {PUBLIC_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="space-y-2">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-bold font-display uppercase tracking-wider transition-colors ${
                    isActive ? "text-brand-500" : "text-ink-200 hover:text-white"
                  }`}
                >
                  {locale === "bn" ? item.labelBn : item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-2 border-l border-ink-800">
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
        <div className="pt-6 border-t border-ink-800 space-y-3 text-xs text-ink-300">
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
            <span className="line-clamp-2">{SITE_INFO.contact.address}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6 space-y-3">
          <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="block">
            <Button className="w-full" withArrow>
              Get a Quote
            </Button>
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block">
            <Button variant="secondary" className="w-full">
              CMS Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## `src/components/layout/OfferPopup.tsx`

```typescript
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { INITIAL_SETTINGS } from "@/data/settings";
import { useUIStore } from "@/store/uiStore";

export function OfferPopup() {
  const [mounted, setMounted] = useState(false);
  const { offerPopupDismissed, setOfferPopupDismissed } = useUIStore();
  const offer = INITIAL_SETTINGS.offerPopup;

  useEffect(() => {
    // Show after 4 seconds if not dismissed previously
    const timer = setTimeout(() => {
      setMounted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !offer.enabled || offerPopupDismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOfferPopupDismissed(true)}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-brand-100 text-center animate-in fade-in zoom-in-95">
        <button
          onClick={() => setOfferPopupDismissed(true)}
          className="absolute top-4 right-4 text-ink-400 hover:text-ink-700 p-1.5 rounded-full hover:bg-ink-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Gift className="w-7 h-7" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          {offer.title}
        </span>

        <h3 className="text-xl font-bold font-display uppercase tracking-wide text-ink-950 mt-3 mb-2">
          {offer.discountText}
        </h3>

        <p className="text-xs text-ink-600 mb-6 leading-relaxed">
          {offer.description}
        </p>

        <div className="bg-ink-50 border border-dashed border-brand-300 p-3 rounded-xl mb-6">
          <span className="text-[10px] text-ink-500 uppercase tracking-wider block">Use Promo Code</span>
          <span className="text-lg font-mono font-bold text-brand-600 tracking-wider">
            {offer.code}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOfferPopupDismissed(true)}
            className="flex-1 py-2.5 text-xs font-semibold text-ink-600 hover:text-ink-900 border border-ink-200 rounded-xl transition-colors"
          >
            Maybe Later
          </button>
          <Link
            href="/quote"
            onClick={() => setOfferPopupDismissed(true)}
            className="flex-1 block"
          >
            <Button size="sm" className="w-full">
              Claim Offer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## `src/components/motion/index.tsx`

```typescript
"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  yOffset = 30,
  ...props
}: MotionProps & { yOffset?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
```

---

## `src/components/ui/Accordion.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItemProps {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle?: () => void;
  dark?: boolean;
}

export function AccordionItem({
  title,
  content,
  isOpen = false,
  onToggle,
  dark = false,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border rounded-xl transition-colors duration-200 overflow-hidden",
        dark
          ? "border-ink-800 bg-ink-900/60 hover:border-ink-700"
          : "border-ink-200 bg-white hover:border-brand-200 shadow-soft"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span
          className={cn(
            "text-base font-bold font-display uppercase tracking-wide",
            dark ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            dark ? "text-ink-400" : "text-brand-500",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div
              className={cn(
                "px-6 pb-5 pt-1 text-sm leading-relaxed border-t",
                dark
                  ? "border-ink-800 text-ink-300"
                  : "border-ink-100 text-ink-600"
              )}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items,
  dark = false,
}: {
  items: { id: string; title: string; content: string }[];
  dark?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          dark={dark}
        />
      ))}
    </div>
  );
}
```

---

## `src/components/ui/Badge.tsx`

```typescript
import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "success" | "warning" | "danger" | "neutral" | "sample";
  size?: "sm" | "md";
}

export function Badge({
  className,
  children,
  variant = "brand",
  size = "md",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-medium tracking-wider uppercase",
    md: "text-xs px-2.5 py-1 font-semibold",
  };

  const variantStyles = {
    brand: "bg-brand-100 text-brand-700 border border-brand-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    danger: "bg-rose-50 text-rose-700 border border-rose-200",
    neutral: "bg-ink-100 text-ink-700 border border-ink-200",
    sample: "bg-amber-100 text-amber-800 border border-amber-300 font-mono text-[10px] tracking-widest",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full leading-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <Badge variant="sample" size="sm" className={className} title="Sample mock record">
      Sample
    </Badge>
  );
}
```

---

## `src/components/ui/Button.tsx`

```typescript
"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "danger";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      withArrow = false,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 tracking-wide",
      md: "text-sm px-5 py-2.5 gap-2 tracking-wide",
      lg: "text-base px-7 py-3.5 gap-2.5 tracking-wide",
    };

    const variantStyles = {
      primary:
        "bg-brand-500 text-white shadow-md hover:bg-brand-600 active:bg-brand-700 hover:shadow-floating hover:-translate-y-0.5",
      secondary:
        "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 active:bg-white/30",
      outline:
        "border border-brand-500 text-brand-600 bg-transparent hover:bg-brand-50 active:bg-brand-100",
      ghost:
        "text-ink-600 hover:text-ink-900 hover:bg-ink-100 active:bg-ink-200",
      dark:
        "bg-ink-900 text-white hover:bg-black active:bg-ink-950 border border-ink-800",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        <span>{children}</span>
        {withArrow && !isLoading && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
```

---

## `src/components/ui/Card.tsx`

```typescript
import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "bordered" | "interactive";
}

export function Card({
  className,
  children,
  variant = "default",
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white border border-ink-100 shadow-soft rounded-2xl",
    dark: "bg-ink-900 border border-ink-800 text-white rounded-2xl shadow-dark",
    bordered: "bg-white border border-ink-200 rounded-2xl",
    interactive:
      "bg-white border border-ink-100 shadow-soft rounded-2xl transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-brand-200",
  };

  return (
    <div className={cn(variantStyles[variant], "p-6", className)} {...props}>
      {children}
    </div>
  );
}
```

---

## `src/components/ui/DatePicker.tsx`

```typescript
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  label?: string;
  value?: string; // DD/MM/YYYY
  onChange: (date: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function DatePicker({
  label,
  value = "",
  onChange,
  error,
  placeholder = "DD/MM/YYYY",
  className,
  required,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const handleSelectDay = (day: number) => {
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(viewMonth + 1).padStart(2, "0");
    const dateStr = `${formattedDay}/${formattedMonth}/${viewYear}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={cn("relative w-full text-left space-y-1.5", className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
          {label} {required && <span className="text-brand-500">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors duration-150",
          error && "border-red-500",
          !value && "text-ink-400"
        )}
      >
        <span>{value || placeholder}</span>
        <CalendarIcon className="w-4 h-4 text-ink-400" />
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-72 bg-white rounded-xl shadow-xl border border-ink-200 p-4 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-ink-900">
              {monthNames[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded hover:bg-ink-100 text-ink-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded hover:bg-ink-100 text-ink-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-[10px] font-bold text-ink-400 uppercase">
                {d}
              </span>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formattedDay = String(day).padStart(2, "0");
              const formattedMonth = String(viewMonth + 1).padStart(2, "0");
              const currentStr = `${formattedDay}/${formattedMonth}/${viewYear}`;
              const isSelected = value === currentStr;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "h-7 w-7 text-xs rounded-full flex items-center justify-center transition-colors mx-auto",
                    isSelected
                      ? "bg-brand-500 text-white font-bold"
                      : "hover:bg-brand-50 hover:text-brand-600 text-ink-800"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## `src/components/ui/EmptyState.tsx`

```typescript
import React from "react";
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-ink-200 rounded-2xl bg-ink-50/50",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-bold font-display uppercase tracking-wider text-ink-900 mb-1">
        {title}
      </h4>
      <p className="text-xs text-ink-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
```

---

## `src/components/ui/Input.tsx`

```typescript
"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors duration-150 disabled:bg-ink-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="text-xs text-ink-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
```

---

## `src/components/ui/Logo.tsx`

```typescript
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = "", light = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)}>
      <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-display font-black text-xl tracking-tighter shadow-md group-hover:scale-105 transition-transform duration-200">
        IC
      </div>
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-display font-black text-xl tracking-tight leading-none uppercase",
            light ? "text-white" : "text-ink-950"
          )}
        >
          ICCB
        </span>
        <span className="font-display font-bold text-[10px] tracking-[0.25em] text-brand-500 uppercase leading-none mt-1">
          Catering
        </span>
      </div>
    </Link>
  );
}
```

---

## `src/components/ui/Modal.tsx`

```typescript
"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Content */}
      <div
        className={cn(
          "relative w-full bg-white rounded-2xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200",
          maxWidthStyles[maxWidth],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
            <h3 className="text-lg font-bold font-display uppercase tracking-wider text-ink-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-ink-400 hover:text-ink-700 p-1 rounded-lg hover:bg-ink-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-ink-400 hover:text-ink-700 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
```

---

## `src/components/ui/Select.tsx`

```typescript
"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full appearance-none px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors duration-150 disabled:bg-ink-50 disabled:cursor-not-allowed pr-10",
              error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
```

---

## `src/components/ui/Skeleton.tsx`

```typescript
import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-ink-200/70", className)}
      {...props}
    />
  );
}
```

---

## `src/components/ui/Tabs.tsx`

```typescript
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pills" | "underline" | "dark";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pills",
}: TabsProps) {
  if (variant === "dark") {
    return (
      <div className={cn("flex flex-wrap gap-2 p-1.5 bg-ink-900 border border-ink-800 rounded-xl", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 uppercase tracking-wider",
                isActive
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-ink-300 hover:text-white hover:bg-ink-800/60"
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn("ml-2 px-1.5 py-0.5 rounded-full text-[10px]", isActive ? "bg-white/20" : "bg-ink-800")}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2 p-1 bg-ink-100 rounded-xl", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 tracking-wide",
              isActive
                ? "bg-white text-ink-950 shadow-sm"
                : "text-ink-600 hover:text-ink-900 hover:bg-white/50"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn("ml-2 px-1.5 py-0.5 rounded-full text-[10px]", isActive ? "bg-brand-100 text-brand-700" : "bg-ink-200")}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
```

---

## `src/components/ui/Textarea.tsx`

```typescript
"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-ink-700">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          rows={rows}
          ref={ref}
          className={cn(
            "w-full px-3.5 py-2.5 text-sm rounded-lg border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors duration-150 disabled:bg-ink-50 disabled:cursor-not-allowed resize-y",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="text-xs text-ink-400">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
```

---

## `src/components/ui/index.ts`

```typescript
export * from "./Button";
export * from "./Input";
export * from "./Textarea";
export * from "./Select";
export * from "./Badge";
export * from "./Card";
export * from "./Modal";
export * from "./Tabs";
export * from "./Skeleton";
export * from "./EmptyState";
export * from "./Accordion";
export * from "./DatePicker";
```

---

## `src/components/sections/CTABand.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE_INFO } from "@/data/site";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { track } from "@/lib/analytics";

export function CTABand() {
  const cleanPhone = SITE_INFO.contact.cateringPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello ICCB Catering, I would like to inquire about event catering services.")}`;

  return (
    <section className="bg-brand-500 text-white py-14 relative z-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-100">
              Direct Banquet Desk
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
              PLANNING AN EVENT? GET A FREE QUOTE
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Speak directly with our banquet specialists today or build your customized package online in 2 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Call */}
            <a
              href={`tel:${SITE_INFO.contact.cateringPhone}`}
              onClick={() => track("call_clicked", { channel: "cta_band" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-ink-950 font-bold text-sm hover:bg-brand-50 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 text-brand-500" />
              <span>{SITE_INFO.contact.cateringPhone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { channel: "cta_band" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Quote Form */}
            <Link href="/quote">
              <Button variant="dark" size="md" withArrow>
                Request Quote Online
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/ChooseMenuSection.tsx`

```typescript
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { motion } from "framer-motion";

const menuCategories = [
  {
    id: "mughal",
    title: "MUGHAL CUISINE",
    subtitle: "Heritage Royal Banquets",
    desc: "Legendary Kacchi Biryani, tender mutton rezala, golden chicken roast, and clay pot firni prepared by master culinary craftsmen.",
    image: IMAGES.kacchiBiryani,
    tag: "Authentic Heritage",
    href: "/cuisines/mughal",
  },
  {
    id: "continental",
    title: "CONTINENTAL DELIGHTS",
    subtitle: "Modern Executive Plating",
    desc: "Herb-crusted beef fillets, Norwegian salmon, creamy pastas, fresh garden salads, and exquisite French high-tea confections.",
    image: IMAGES.salmonPlatter,
    tag: "Corporate & Diplomatic",
    href: "/cuisines/continental",
  },
  {
    id: "multicuisine",
    title: "MULTI-CUISINE FUSION",
    subtitle: "Curated Global Spreads",
    desc: "Szechuan delicacies, live dim sum steamers, tandoori skewers, and festive Bengali spreads tailored for versatile gala occasions.",
    image: IMAGES.grilledKebab,
    tag: "Versatile & Dynamic",
    href: "/cuisines/multi-cuisine",
  },
];

export function ChooseMenuSection() {
  return (
    <section className="py-24 bg-brand-50/50 relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-20">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Curated Culinary Collections ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            CHOOSE YOUR MENU
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Select from our royal heritage cuisines or partner with our Executive Master Chefs to engineer a bespoke menu tailored to your guests.
          </p>
        </div>

        {/* 3 Menu Cards with Overlapping Circular Plate on Top (Exact Reference Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-10">
          {menuCategories.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative bg-white rounded-3xl p-8 pt-24 border border-ink-100 shadow-soft hover:shadow-card hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Overlapping Circular Plate Image on Top (Key Reference Feature) */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="140px"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="space-y-3 text-center">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {card.tag}
                </span>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink-950">
                  {card.title}
                </h3>
                <p className="text-xs text-brand-600 font-semibold">{card.subtitle}</p>
                <p className="text-xs text-ink-600 leading-relaxed pt-2">
                  {card.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link href={card.href} className="block w-full">
                  <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-colors" withArrow>
                    Get Menu
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/FAQSection.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/data/faqs";
import { Button } from "@/components/ui/Button";

export function FAQSection() {
  const faqItems = FAQS.slice(0, 5).map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer,
  }));

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Support Note */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="font-serif italic text-brand-600 text-lg font-semibold block">
              ~ Clear Answers ~
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950 leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Have specific questions regarding guest minimums, tasting appointments, outside venues, or payment terms? We are here to help.
            </p>

            <div className="pt-4 space-y-3">
              <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-100 text-left">
                <p className="text-xs font-bold uppercase text-brand-700 tracking-wider">
                  Still have queries?
                </p>
                <p className="text-xs text-ink-600 mt-1">
                  Our dedicated catering consultation hotline is available 7 days a week.
                </p>
                <a
                  href="tel:+8801991197719"
                  className="inline-block mt-3 font-display font-bold text-sm text-brand-600 hover:text-brand-700"
                >
                  +88-01991-197719 &rarr;
                </a>
              </div>

              <div>
                <Link href="/faq">
                  <Button variant="outline" size="sm">
                    View All FAQs
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/FeatureStrip.tsx`

```typescript
"use client";

import React from "react";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { ShieldCheck, CheckCircle2, ThermometerSun, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  CheckCircle2: <CheckCircle2 className="w-8 h-8" />,
  ThermometerSun: <ThermometerSun className="w-8 h-8" />,
  UtensilsCrossed: <UtensilsCrossed className="w-8 h-8" />,
};

export function FeatureStrip() {
  const { locale } = useUIStore();

  return (
    <section className="bg-brand-500 text-white py-10 relative z-20 shadow-lg border-y border-brand-600">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SITE_INFO.specialties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                {iconMap[item.icon] || <CheckCircle2 className="w-8 h-8" />}
              </div>
              <div className="text-left space-y-1">
                <h3 className="font-display font-bold text-base uppercase tracking-wider leading-tight text-white">
                  {locale === "bn" ? item.titleBn : item.title}
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/GalleryPreviewSection.tsx`

```typescript
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GALLERY_ITEMS } from "@/data/gallery";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function GalleryPreviewSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const previewItems = GALLERY_ITEMS.slice(0, 6);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Visual Excellence ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            EXPERIENCE THE MAGIC
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            A glimpse into our luxurious banquet spreads, elegant table configurations, and artfully plated dishes at ICCB.
          </p>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedImage(item.imageUrl)}
              className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-soft group cursor-pointer border border-ink-100"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-base uppercase text-white mt-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-ink-300 line-clamp-1 mt-1">{item.caption}</p>
                )}
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-400 font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="pt-12">
          <Link href="/gallery">
            <Button size="md" withArrow variant="primary">
              View Complete Gallery
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="4xl">
        {selectedImage && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image
              src={selectedImage}
              alt="Gallery Preview"
              fill
              className="object-contain bg-black"
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
```

---

## `src/components/sections/HeroSection.tsx`

```typescript
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { SITE_INFO } from "@/data/site";
import { useUIStore } from "@/store/uiStore";
import { translations } from "@/lib/i18n";
import { ShieldCheck, CheckCircle2, Flame, Award } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const { locale } = useUIStore();
  const t = translations[locale].hero;

  return (
    <section className="relative bg-ink-950 text-white min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16 lg:py-28">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
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
            <p className="text-sm sm:text-base text-ink-300 max-w-xl leading-relaxed">
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
            <div className="pt-6 border-t border-ink-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-ink-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-medium">{t.trust4}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full-Bleed Floating Plate (matches reference layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer Circular Ring */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/30 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />

              {/* Main Circular Food Plate */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-ink-800">
                <Image
                  src={IMAGES.heroFood}
                  alt="ICCB Catering Royal Signature Banquet Dish"
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 450px"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Small Pill Card: Halal & Slaughterhouse */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-ink-900/90 backdrop-blur-md border border-ink-700 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                    In-House Safety
                  </p>
                  <p className="text-xs font-bold text-white">Modern Slaughterhouse</p>
                </div>
              </motion.div>

              {/* Floating Capacity Pill */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-3 -right-3 bg-brand-500 text-white p-3 sm:p-4 rounded-2xl shadow-floating text-center"
              >
                <p className="text-xs font-black uppercase font-display tracking-widest leading-none">
                  Capacity
                </p>
                <p className="text-lg sm:text-xl font-black font-display leading-tight mt-0.5">
                  10,000+
                </p>
                <p className="text-[9px] uppercase tracking-wider opacity-90">Guests Served</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/OccasionGridSection.tsx`

```typescript
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const occasions = [
  {
    id: "private-party",
    title: "PRIVATE / SOCIAL PARTY",
    desc: "Intimate family celebrations, anniversaries, and reunions catered with personalized dining touch.",
    image: IMAGES.privateParty,
    href: "/services/birthday-party-catering",
  },
  {
    id: "wedding-reception",
    title: "WEDDING RECEPTION",
    desc: "Grand royal wedding feasts, Holud nights, and Walima banquets with signature Mughal cuisine.",
    image: IMAGES.weddingReception,
    href: "/services/wedding-catering",
  },
  {
    id: "corporate-event",
    title: "CORPORATE EVENT",
    desc: "Punctual, sophisticated catering for AGMs, conferences, international expos, and executive galas.",
    image: IMAGES.corporateEvent,
    href: "/services/corporate-catering",
  },
  {
    id: "birthday-party",
    title: "BIRTHDAY CELEBRATION",
    desc: "Fun, vibrant culinary stations, finger food platters, and custom dessert counters for milestone birthdays.",
    image: IMAGES.birthdayParty,
    href: "/services/birthday-party-catering",
  },
];

export function OccasionGridSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Versatile Hospitality ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            CATERING FOR ANY OCCASION
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            From intimate gatherings of 30 family members to national summits of 10,000+ delegates, our team executes with flawless hospitality.
          </p>
        </div>

        {/* 2x2 Image Cards with White Overlay Label Boxes (Exact Reference Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {occasions.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-soft group border border-ink-100"
            >
              {/* Background Photo */}
              <Image
                src={occ.image}
                alt={occ.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* White Overlay Box on Bottom (Exact Reference Card Feature) */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-left border border-white/60 transition-all duration-300 group-hover:bg-white group-hover:translate-y-[-4px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-ink-950">
                    {occ.title}
                  </h3>
                  <Link
                    href={occ.href}
                    className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors shrink-0"
                    aria-label={`View ${occ.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-xs text-ink-600 mt-2 line-clamp-2 leading-relaxed">
                  {occ.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/ProcessSection.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Utensils, FileText, CheckCircle2, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Initial Inquiry",
    desc: "Share your event date, estimated guests, preferred venue, and style via our intuitive quote builder or phone.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Menu & Tasting",
    desc: "Customize your courses with our banquet consultant and join us for a private food tasting session.",
    icon: <Utensils className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Transparent Quotation",
    desc: "Receive an itemized quotation outlining per-head rates, live stations, crockery, and staff arrangements.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Date Confirmation",
    desc: "Lock in your date with a 25% deposit, formal contract, and dedicated banquet captain assignment.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    step: "05",
    title: "Flawless Event Day",
    desc: "Food arrives hot at 65°C+ in insulated thermal units, managed by uniformed waitstaff for a royal experience.",
    icon: <PartyPopper className="w-6 h-6" />,
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-brand-50/40 relative">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Hassle-Free Journey ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            OUR 5-STEP PROCESS
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            From your very first inquiry to the last dessert served, here is how ICCB ensures an effortless catering experience.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((st, idx) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-ink-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    {st.icon}
                  </div>
                  <span className="font-display font-black text-2xl text-ink-200 group-hover:text-brand-300 transition-colors">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-ink-950 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-ink-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-ink-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  Step {idx + 1} of 5
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action */}
        <div className="pt-12">
          <Link href="/our-process">
            <Button variant="outline" size="md" withArrow>
              Learn More About Our Standards
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/StatsSection.tsx`

```typescript
"use client";

import React from "react";
import { CountUp } from "@/components/motion";
import { Building2, Users, CalendarCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Operating Since",
    value: 2015,
    suffix: "",
    prefix: "",
    desc: "1 January 2015",
    icon: <CalendarCheck className="w-6 h-6" />,
    isVerified: true,
  },
  {
    label: "Simultaneous Guest Capacity",
    value: 10000,
    suffix: "+",
    prefix: "",
    desc: "Largest in South Asia",
    icon: <Users className="w-6 h-6" />,
    isVerified: true,
  },
  {
    label: "World-Class Convention Halls",
    value: 4,
    suffix: " Halls",
    prefix: "",
    desc: "Over 100,000 sq ft area",
    icon: <Building2 className="w-6 h-6" />,
    isVerified: true,
  },
  {
    label: "HACCP & Halal Certified",
    value: 100,
    suffix: "%",
    prefix: "",
    desc: "In-house slaughterhouse",
    icon: <Award className="w-6 h-6" />,
    isVerified: true,
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-ink-950 text-white relative border-y border-ink-900">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-ink-900/60 border border-ink-800 text-center space-y-3 group hover:border-brand-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all">
                {st.icon}
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                <CountUp end={st.value} prefix={st.prefix} suffix={st.suffix} />
              </div>
              <div className="space-y-0.5">
                <p className="font-display font-bold text-xs uppercase tracking-wider text-brand-400">
                  {st.label}
                </p>
                <p className="text-[11px] text-ink-400">{st.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/SubscribeBanner.tsx`

```typescript
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";

export function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      track("newsletter_subscribed", { email });
      // Save to localStorage subscribers
      try {
        const existing = JSON.parse(localStorage.getItem("iccb_mock_subscribers") || "[]");
        existing.unshift({
          id: "sub-" + Date.now(),
          email,
          source: "Home Newsletter Banner",
          subscribedAt: new Date().toISOString(),
          status: "active",
          isSample: true,
        });
        localStorage.setItem("iccb_mock_subscribers", JSON.stringify(existing));
      } catch (err) {
        // ignore
      }
      toast.success("Thank you! You have subscribed to ICCB Catering seasonal offers.");
    }, 400);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-ink-950 text-white">
      {/* Background Image with Dark Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.weddingReception}
          alt="ICCB Catering Ambience"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR}
          className="object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xs" />
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Stay Inspired ~
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            SUBSCRIBE FOR SEASONAL MENUS & EXCLUSIVE OFFERS
          </h2>

          <p className="text-xs sm:text-sm text-ink-300 leading-relaxed max-w-xl mx-auto">
            Receive early access to winter wedding dates, corporate conference package specials, and newly curated dishes from Executive Chef Rafiqul.
          </p>

          {submitted ? (
            <div className="p-6 bg-brand-950/80 border border-brand-500/50 rounded-2xl flex items-center justify-center gap-3 text-brand-300 animate-in fade-in">
              <MailCheck className="w-6 h-6 text-brand-400" />
              <span className="text-sm font-semibold">
                You&apos;re subscribed! Look out for our upcoming seasonal showcase.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-ink-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white/15 backdrop-blur-md transition-all"
              />
              <Button type="submit" size="md" isLoading={loading} variant="primary" withArrow>
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-[11px] text-ink-400 pt-2">
            We respect your privacy. No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/TestimonialsSection.tsx`

```typescript
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-brand-50/50 relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-600 text-lg font-semibold block">
            ~ Words of Appreciation ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-950">
            CLIENTS THOUGHT
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            Read authentic reviews from wedding families, corporate conveners, and event planners who experienced the taste of happiness at ICCB.
          </p>
        </div>

        {/* 3 Testimonial Cards (Exact Reference Style with Quote Icon, Avatar, Role, Dots) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-8 border border-ink-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all text-left flex flex-col justify-between relative group"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors shrink-0">
                <Quote className="w-6 h-6" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3 text-amber-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed italic mb-8 flex-1">
                &ldquo;{item.content}&rdquo;
              </p>

              {/* Author & Avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-200">
                  <Image
                    src={item.avatarUrl}
                    alt={item.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-ink-950">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-ink-500">{item.role}</p>
                  <p className="text-[10px] text-brand-600 font-semibold">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel indicator dots (Reference Feature) */}
        <div className="flex items-center justify-center gap-2 pt-12">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveIndex(dot)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === dot ? "w-8 bg-brand-500" : "w-2.5 bg-ink-300 hover:bg-ink-400"
              }`}
              aria-label={`Go to testimonial slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/TodaysMenuSection.tsx`

```typescript
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MENU_ITEMS } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { PLACEHOLDER_BLUR } from "@/data/images";
import { Sparkles, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export function TodaysMenuSection() {
  const todaysDishes = MENU_ITEMS.filter((item) => item.isTodaysMenu).slice(0, 6);

  return (
    <section className="py-24 bg-ink-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-serif italic text-brand-400 text-lg font-semibold block">
            ~ Fresh from the Royal Kitchen ~
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            TODAY&apos;S SPECIAL MENU
          </h2>
          <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
            Handpicked signature culinary selections prepared fresh each day with meats from our modern slaughterhouse and tested by food quality inspectors.
          </p>
        </div>

        {/* Menu Items Grid with Circular Thumbnail + Dotted Leader Line + Price (Exact Reference Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 text-left pt-4">
          {todaysDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 sm:gap-6 group"
            >
              {/* Circular Plate Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-500/40 shadow-lg group-hover:scale-105 group-hover:border-brand-500 transition-all duration-300">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="100px"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="object-cover"
                />
              </div>

              {/* Item Info with Dotted Leader to Price */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between w-full">
                  <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-white truncate group-hover:text-brand-400 transition-colors">
                    {dish.name}
                  </h3>

                  {/* Dotted Leader Line (Exact Reference Visual Feature) */}
                  <div className="dotted-leader hidden sm:block" />

                  {/* Price */}
                  <span className="font-display font-bold text-base sm:text-lg text-brand-400 shrink-0 ml-2">
                    {formatCurrency(dish.price)}
                  </span>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-ink-400 line-clamp-2 mt-1 leading-relaxed">
                  {dish.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mt-2">
                  {dish.dietTags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-wider font-semibold text-brand-300 bg-brand-950/70 border border-brand-800/80 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {dish.preparationTime && (
                    <span className="text-[9px] text-ink-500">
                      &bull; {dish.preparationTime}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-16">
          <Link href="/menu">
            <Button size="lg" withArrow variant="primary">
              View Complete Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/sections/VideoStorySection.tsx`

```typescript
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { IMAGES, PLACEHOLDER_BLUR } from "@/data/images";
import { Play, ShieldCheck, Flame, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export function VideoStorySection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-24 bg-ink-950 text-white relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Chef Image with Animated Play Button (Reference Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-ink-800 shadow-2xl group">
              <Image
                src={IMAGES.chefCooking}
                alt="ICCB Master Chef Preparing Food"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />

              {/* Animated Play Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-brand-500/90 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-floating group/btn"
                aria-label="Play video about ICCB Catering process"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none" />
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </button>

              {/* Bottom Label Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-ink-900/80 backdrop-blur-md p-4 rounded-2xl border border-ink-700 flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                    Culinary Discipline
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Master Chefs & Laboratory Tested Quality
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <span className="font-serif italic text-brand-400 text-lg font-semibold block">
              ~ The Science of Hospitality ~
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              WE NEVER COMPROMISE TASTE OR HYGIENE
            </h2>

            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              Most catering operations in Dhaka are forced to make a trade-off: prioritize bold traditional flavors at the expense of sanitary protocol, or offer hygienic commercial catering that tastes sterile and bland.
            </p>

            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              At ICCB Catering, we proved that both can coexist at scale. By operating our own dedicated automated slaughterhouse, testing raw ingredients in a certified food lab, and cooking in stainless steel industrial galleys, our master chefs preserve authentic Old Dhaka heritage without the health hazards.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-ink-900 border border-ink-800 space-y-1">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <h4 className="font-display font-bold text-sm uppercase text-white">
                  Modern Slaughterhouse
                </h4>
                <p className="text-[11px] text-ink-400">100% Halal certified, disease-screened meats</p>
              </div>

              <div className="p-4 rounded-2xl bg-ink-900 border border-ink-800 space-y-1">
                <Utensils className="w-5 h-5 text-brand-500" />
                <h4 className="font-display font-bold text-sm uppercase text-white">
                  10,000+ Meal Capacity
                </h4>
                <p className="text-[11px] text-ink-400">Punctual execution for Bangladesh&apos;s largest summits</p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button size="md" withArrow variant="primary">
                  Read More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal isOpen={videoOpen} onClose={() => setVideoOpen(false)} maxWidth="4xl">
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink-900">
            Behind the Scenes at ICCB Catering
          </h3>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="ICCB Catering Documentary Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-ink-500 leading-relaxed">
            Take a 3-minute virtual tour through ICCB&apos;s hygienic meat processing rooms, central industrial kitchen, and banquet temperature-controlled logistics fleet.
          </p>
        </div>
      </Modal>
    </section>
  );
}
```

---

## `src/components/forms/BookingForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { leadService } from "@/services/leadService";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

const bookingSchema = z.object({
  clientName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  city: z.string().min(2, "City is required"),
  eventType: z.string().min(1, "Event type is required"),
  hallOrVenue: z.string().min(1, "Hall / Venue is required"),
  eventDate: z.string().min(5, "Event date required (DD/MM/YYYY)"),
  guests: z.coerce.number().min(30, "Minimum 30 guests"),
  notes: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: {
      clientName: "",
      email: "",
      phone: "",
      city: "Dhaka",
      eventType: "Wedding Reception",
      hallOrVenue: "ICCB Hall 3 (Rajdarshan)",
      eventDate: "20/12/2026",
      guests: 500,
      notes: "",
    },
  });

  const eventDate = watch("eventDate");

  const onSubmit = async (data: BookingFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    try {
      await leadService.create({
        name: data.clientName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        eventType: data.eventType,
        venue: data.hallOrVenue,
        eventDate: data.eventDate,
        guestCount: Number(data.guests),
        message: data.notes,
        type: "booking",
        status: "New",
        isSample: false,
      });

      track("booking_submitted", {
        hall: data.hallOrVenue,
        guests: data.guests,
      });

      toast.success("Event booking reservation received! Our banquet team will call you within 2 hours.");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Booking submission error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Dr. Sadman Chowdhury"
          error={errors.clientName?.message}
          {...register("clientName")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. sadman@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Mobile Phone Number *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="City *"
          placeholder="e.g. Dhaka"
          error={errors.city?.message}
          {...register("city")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Event Type *"
          options={[
            { value: "Wedding Reception", label: "Wedding Reception" },
            { value: "Corporate Gala / AGM", label: "Corporate Gala / AGM" },
            { value: "Holud & Mehendi Night", label: "Holud & Mehendi Night" },
            { value: "Birthday Celebration", label: "Birthday Celebration" },
            { value: "Exhibition / Expo Banquet", label: "Exhibition / Expo Banquet" },
          ]}
          error={errors.eventType?.message}
          {...register("eventType")}
        />
        <Select
          label="Preferred ICCB Hall / Venue *"
          options={[
            { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1 (Gulnaksha - Up to 2,500)" },
            { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2 (Pushpaguchha - Up to 2,000)" },
            { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3 (Rajdarshan - Up to 3,000)" },
            { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4 (Naboratna - Up to 2,500)" },
            { value: "Off-Premises / Outside ICCB", label: "Off-Premises / Outside ICCB" },
          ]}
          error={errors.hallOrVenue?.message}
          {...register("hallOrVenue")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <DatePicker
            label="Target Event Date (DD/MM/YYYY) *"
            value={eventDate}
            onChange={(d) => setValue("eventDate", d)}
            error={errors.eventDate?.message}
          />
        </div>
        <Input
          label="Guest Count *"
          type="number"
          min="30"
          placeholder="e.g. 800"
          error={errors.guests?.message}
          {...register("guests")}
        />
      </div>

      <Textarea
        label="Additional Requirements or Notes"
        placeholder="Provide special timings, decoration preferences, or bridal room needs..."
        {...register("notes")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Confirm Booking Request
        </Button>
      </div>
    </form>
  );
}
```

---

## `src/components/forms/ContactForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      reset();
      toast.success("Thank you! Your message has been sent to our banquet department.");
    }, 400);
  };

  if (sent) {
    return (
      <div className="p-8 bg-brand-50 rounded-2xl border border-brand-200 text-center space-y-3">
        <h4 className="font-display font-bold text-xl uppercase tracking-wider text-brand-700">
          Message Received!
        </h4>
        <p className="text-xs text-ink-600">
          Our banquet desk will review your inquiry and contact you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-xs font-bold text-brand-600 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name *"
          placeholder="e.g. Tanvir Ahmed"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. tanvir@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Subject *"
          placeholder="e.g. Corporate Lunch inquiry"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <Textarea
        label="Your Message *"
        rows={5}
        placeholder="Type your message here..."
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Send Message
        </Button>
      </div>
    </form>
  );
}
```

---

## `src/components/forms/InquiryForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { leadService } from "@/services/leadService";
import { toast } from "sonner";

const inquirySchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  companyName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  guestCount: z.coerce.number().min(20, "Expected attendance required"),
  eventDate: z.string().min(5, "Preferred date required (DD/MM/YYYY)"),
  eventType: z.string().min(1, "Event type is required"),
  venue: z.string().optional(),
  budgetRange: z.string().optional(),
  cuisinePreference: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      city: "Dhaka",
      guestCount: 200,
      eventDate: "15/12/2026",
      eventType: "Wedding Reception",
      venue: "ICCB Hall 1",
      budgetRange: "৳5,00,000 - ৳10,00,000",
      cuisinePreference: "Traditional Mughal",
      message: "",
    },
  });

  const eventDate = watch("eventDate");

  const onSubmit = async (data: InquiryFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    try {
      await leadService.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        city: data.city,
        eventType: data.eventType,
        venue: data.venue,
        guestCount: Number(data.guestCount),
        eventDate: data.eventDate,
        budgetRange: data.budgetRange,
        cuisinePreference: data.cuisinePreference,
        message: data.message,
        type: "inquiry",
        status: "New",
        isSample: false,
      });

      toast.success("Inquiry received! We will be in touch shortly.");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Kazi Farhan"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. kfarhan@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone Number *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Company Name"
          placeholder="e.g. Apex Footwear Ltd."
          {...register("companyName")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City *"
          placeholder="e.g. Dhaka"
          error={errors.city?.message}
          {...register("city")}
        />
        <div>
          <DatePicker
            label="Preferred Date (DD/MM/YYYY) *"
            value={eventDate}
            onChange={(d) => setValue("eventDate", d)}
            error={errors.eventDate?.message}
          />
        </div>
        <Input
          label="Expected Attendance *"
          type="number"
          min="20"
          placeholder="e.g. 350"
          error={errors.guestCount?.message}
          {...register("guestCount")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Event Type *"
          options={[
            { value: "Wedding Reception", label: "Wedding Reception" },
            { value: "Corporate Event", label: "Corporate Event" },
            { value: "Conference / AGM", label: "Conference / AGM" },
            { value: "Private Party", label: "Private Party" },
            { value: "Lunch Box Order", label: "Lunch Box Order" },
          ]}
          {...register("eventType")}
        />
        <Select
          label="Proposed Venue"
          options={[
            { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1" },
            { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2" },
            { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3" },
            { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4" },
            { value: "External Venue / Private Premises", label: "External Venue" },
          ]}
          {...register("venue")}
        />
        <Select
          label="Cuisine Preference"
          options={[
            { value: "Traditional Mughal", label: "Traditional Mughal" },
            { value: "Continental", label: "Continental" },
            { value: "Multi-Cuisine", label: "Multi-Cuisine" },
            { value: "Bengali Traditional", label: "Bengali Traditional" },
          ]}
          {...register("cuisinePreference")}
        />
      </div>

      <Textarea
        label="Message or Inquiries"
        placeholder="Tell us what you are looking for..."
        {...register("message")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Submit General Inquiry
        </Button>
      </div>
    </form>
  );
}
```

---

## `src/components/forms/QuoteForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { leadService } from "@/services/leadService";
import { useUIStore } from "@/store/uiStore";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { CheckCircle2, User, Calendar, Utensils, ClipboardCheck } from "lucide-react";

const quoteSchema = z.object({
  // Step 1: Contact
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email address required"),
  phone: z.string().min(10, "Valid phone number required"),
  companyName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  
  // Step 2: Event Details
  eventType: z.string().min(1, "Please choose an event type"),
  eventDate: z.string().min(5, "Preferred event date required (DD/MM/YYYY)"),
  guestCount: z.coerce.number().min(30, "Minimum 30 guests required"),
  venue: z.string().min(1, "Please specify venue or hall"),

  // Step 3: Menu & Budget
  cuisinePreference: z.string().min(1, "Please select preferred cuisine"),
  packagePreference: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),

  // Honeypot field for spam prevention
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const eventTypes = [
  { value: "Wedding Reception", label: "Wedding Reception" },
  { value: "Holud & Mehendi", label: "Holud & Mehendi Night" },
  { value: "Corporate AGM & Dinner", label: "Corporate AGM & Dinner" },
  { value: "Conference & Summit", label: "Conference & Summit" },
  { value: "Birthday / Private Party", label: "Birthday / Private Party" },
  { value: "Executive Lunch Box", label: "Executive Lunch Box (Bulk)" },
  { value: "Other Function", label: "Other Function" },
];

const venueOptions = [
  { value: "ICCB Hall 1 (Gulnaksha)", label: "ICCB Hall 1 (Gulnaksha)" },
  { value: "ICCB Hall 2 (Pushpaguchha)", label: "ICCB Hall 2 (Pushpaguchha)" },
  { value: "ICCB Hall 3 (Rajdarshan)", label: "ICCB Hall 3 (Rajdarshan)" },
  { value: "ICCB Hall 4 (Naboratna)", label: "ICCB Hall 4 (Naboratna)" },
  { value: "Outside ICCB (Private Residence/Office)", label: "Outside ICCB (Private Residence / Office / Lawn)" },
  { value: "Other External Convention Hall", label: "Other External Convention Hall" },
];

const cuisineOptions = [
  { value: "Traditional Mughal", label: "Traditional Mughal (Kacchi, Rezala, Roast)" },
  { value: "Continental", label: "Continental (Salmon, Steaks, Pastas)" },
  { value: "Multi-Cuisine Fusion", label: "Multi-Cuisine Fusion (Chinese, Grills & Bengali)" },
  { value: "Traditional Bengali", label: "Traditional Bengali (Polao, Bhuna, Fish)" },
  { value: "Custom Bespoke Menu", label: "Custom Bespoke Menu" },
];

const budgetOptions = [
  { value: "৳2,00,000 - ৳5,00,000", label: "৳2,00,000 - ৳5,00,000" },
  { value: "৳5,00,000 - ৳10,00,000", label: "৳5,00,000 - ৳10,00,000" },
  { value: "৳10,00,000 - ৳20,00,000", label: "৳10,00,000 - ৳20,00,000" },
  { value: "৳20,00,000+", label: "৳20,00,000+" },
];

export function QuoteForm() {
  const router = useRouter();
  const { quoteDraft, clearQuoteDraft } = useUIStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      city: "Dhaka",
      eventType: quoteDraft.eventType || "Wedding Reception",
      eventDate: quoteDraft.eventDate || "15/12/2026",
      guestCount: quoteDraft.guestCount || 250,
      venue: quoteDraft.venue || "ICCB Hall 1 (Gulnaksha)",
      cuisinePreference: "Traditional Mughal",
      packagePreference: quoteDraft.packageName || "Royal Mughal Wedding Feast",
      budgetRange: "৳5,00,000 - ৳10,00,000",
      message: "",
      honeypot: "",
    },
  });

  const formValues = watch();

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(["name", "email", "phone", "city"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["eventType", "eventDate", "guestCount", "venue"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["cuisinePreference"]);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: QuoteFormValues) => {
    if (data.honeypot) return; // Silent discard for bot

    setIsSubmitting(true);
    try {
      await leadService.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        city: data.city,
        eventType: data.eventType,
        venue: data.venue,
        guestCount: Number(data.guestCount),
        eventDate: data.eventDate,
        cuisinePreference: data.cuisinePreference,
        packagePreference: data.packagePreference,
        budgetRange: data.budgetRange,
        message: data.message,
        type: "quote",
        status: "New",
        isSample: false,
      });

      track("quote_submitted", {
        eventType: data.eventType,
        guestCount: data.guestCount,
        venue: data.venue,
      });

      clearQuoteDraft();
      toast.success("Quote request submitted successfully!");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Contact Details", icon: <User className="w-4 h-4" /> },
    { num: 2, label: "Event Logistics", icon: <Calendar className="w-4 h-4" /> },
    { num: 3, label: "Menu & Cuisine", icon: <Utensils className="w-4 h-4" /> },
    { num: 4, label: "Review & Submit", icon: <ClipboardCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ink-100 shadow-soft max-w-3xl mx-auto text-left">
      {/* Progress Bar Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${
                s.num === currentStep
                  ? "text-brand-500 font-bold"
                  : s.num < currentStep
                  ? "text-emerald-600 font-medium"
                  : "text-ink-400 font-medium"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${
                  s.num === currentStep
                    ? "bg-brand-500 text-white shadow-floating"
                    : s.num < currentStep
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-ink-100 text-ink-500"
                }`}
              >
                {s.num < currentStep ? "✓" : s.num}
              </div>
              <span className="hidden sm:inline text-xs uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Linear Progress Fill */}
        <div className="w-full bg-ink-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden Honeypot */}
        <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* STEP 1: Contact Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              Step 1: Your Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                placeholder="e.g. Mahmudur Rahman"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="e.g. mahmud@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Phone Number *"
                placeholder="e.g. +8801711223344"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                label="Company / Organization Name"
                placeholder="e.g. Grameenphone or Family"
                {...register("companyName")}
              />
              <div className="sm:col-span-2">
                <Input
                  label="City *"
                  placeholder="e.g. Dhaka"
                  error={errors.city?.message}
                  {...register("city")}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Event Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              Step 2: Event Logistics & Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Event Type *"
                options={eventTypes}
                error={errors.eventType?.message}
                {...register("eventType")}
              />
              <div>
                <DatePicker
                  label="Preferred Event Date (DD/MM/YYYY) *"
                  value={formValues.eventDate}
                  onChange={(date) => setValue("eventDate", date)}
                  error={errors.eventDate?.message}
                />
              </div>
              <Input
                label="Expected Guest Attendance *"
                type="number"
                min="30"
                placeholder="e.g. 500"
                error={errors.guestCount?.message}
                {...register("guestCount")}
              />
              <Select
                label="Proposed Venue / Hall *"
                options={venueOptions}
                error={errors.venue?.message}
                {...register("venue")}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Menu & Budget */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-3">
              Step 3: Cuisine Preference & Budget
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Cuisine Preference *"
                options={cuisineOptions}
                error={errors.cuisinePreference?.message}
                {...register("cuisinePreference")}
              />
              <Select
                label="Estimated Catering Budget"
                options={budgetOptions}
                {...register("budgetRange")}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Selected Menu Package"
                  placeholder="e.g. Royal Mughal Wedding Feast"
                  {...register("packagePreference")}
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  label="Special Requirements / Live Stations / Dietary Needs"
                  placeholder="Tell us if you need live jalebi counters, tea bar, VIP table service, kids menu, etc."
                  {...register("message")}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <h4 className="font-display font-black text-lg uppercase tracking-wider text-ink-950 mb-2">
              Step 4: Review Your Quotation Request
            </h4>
            <div className="bg-ink-50 p-6 rounded-2xl border border-ink-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-ink-200">
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Client Name</span>
                  <span className="font-bold text-ink-950 text-sm">{formValues.name}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Contact</span>
                  <span className="font-bold text-ink-950 text-sm">{formValues.phone} | {formValues.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-ink-200">
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Event Type</span>
                  <span className="font-bold text-ink-900">{formValues.eventType}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Event Date</span>
                  <span className="font-bold text-brand-600">{formValues.eventDate}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Guest Count</span>
                  <span className="font-bold text-ink-900">{formValues.guestCount} Guests</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Venue</span>
                  <span className="font-bold text-ink-900">{formValues.venue}</span>
                </div>
                <div>
                  <span className="text-ink-400 font-semibold uppercase block">Cuisine & Package</span>
                  <span className="font-bold text-ink-900">
                    {formValues.cuisinePreference} ({formValues.packagePreference})
                  </span>
                </div>
              </div>

              {formValues.message && (
                <div className="pt-2">
                  <span className="text-ink-400 font-semibold uppercase block">Notes</span>
                  <p className="text-ink-700 italic">{formValues.message}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-ink-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 text-xs font-semibold text-ink-600 hover:text-ink-900 border border-ink-200 rounded-lg hover:bg-ink-50 transition-colors"
            >
              &larr; Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} variant="primary" withArrow>
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button type="submit" variant="primary" isLoading={isSubmitting} withArrow size="lg">
              Submit Quotation Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
```

---

## `src/components/forms/TastingForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { leadService } from "@/services/leadService";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

const tastingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  tastingDate: z.string().min(5, "Preferred tasting date required"),
  tastingAttendees: z.coerce.number().min(1).max(8, "Tasting limit is 8 family members"),
  tentativeEventDate: z.string().optional(),
  dishesToTaste: z.string().min(3, "Please specify 2-4 dishes you wish to taste"),
  notes: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type TastingFormValues = z.infer<typeof tastingSchema>;

export function TastingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TastingFormValues>({
    resolver: zodResolver(tastingSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tastingDate: "14/11/2026",
      tastingAttendees: 4,
      dishesToTaste: "Shahi Kacchi Biryani, Mutton Rezala, Chicken Roast, Borhani, Firni",
      notes: "Held at ICCB Heritage Restaurant VIP Tasting Room",
    },
  });

  const tastingDate = watch("tastingDate");

  const onSubmit = async (data: TastingFormValues) => {
    if (data.honeypot) return;
    setLoading(true);
    try {
      await leadService.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: "Dhaka",
        eventType: "Tasting Session Request",
        eventDate: data.tastingDate,
        guestCount: Number(data.tastingAttendees),
        message: `Dishes to taste: ${data.dishesToTaste}. Notes: ${data.notes || ""}`,
        type: "tasting",
        status: "Tasting",
        isSample: false,
      });

      track("tasting_requested", {
        attendees: data.tastingAttendees,
        tastingDate: data.tastingDate,
      });

      toast.success("Food tasting appointment received! Our chef will prepare your session.");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to request tasting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Tanvir Ahmed"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. tanvir@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Mobile Phone *"
          placeholder="e.g. +8801711223344"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Number of Tasting Attendees (Max 8) *"
          type="number"
          min="1"
          max="8"
          error={errors.tastingAttendees?.message}
          {...register("tastingAttendees")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <DatePicker
            label="Preferred Tasting Date *"
            value={tastingDate}
            onChange={(d) => setValue("tastingDate", d)}
            error={errors.tastingDate?.message}
          />
        </div>
        <Input
          label="Tentative Event Date (if known)"
          placeholder="e.g. 24/12/2026"
          {...register("tentativeEventDate")}
        />
      </div>

      <Input
        label="Dishes You Wish to Sample *"
        placeholder="e.g. Shahi Kacchi Biryani, Mutton Rezala, Grilled Salmon..."
        error={errors.dishesToTaste?.message}
        {...register("dishesToTaste")}
      />

      <Textarea
        label="Dietary Restrictions or Special Instructions"
        placeholder="Mention any nut allergies, spice preferences, or timing details..."
        {...register("notes")}
      />

      <div className="pt-2">
        <Button type="submit" size="lg" isLoading={loading} withArrow className="w-full">
          Schedule Tasting Appointment
        </Button>
      </div>
    </form>
  );
}
```

---

## `src/components/calculator/PackageCalculator.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PACKAGES } from "@/data/packages";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import { track } from "@/lib/analytics";
import { Calculator, Users, Plus, Check } from "lucide-react";

interface ExtraOption {
  id: string;
  name: string;
  pricePerHead?: number;
  fixedPrice?: number;
}

const EXTRAS: ExtraOption[] = [
  { id: "borhani-station", name: "Unlimited Traditional Clay Pot Borhani Station", pricePerHead: 60 },
  { id: "tea-coffee", name: "Continuous Hot Tea & Filtered Coffee Station", pricePerHead: 40 },
  { id: "vip-table", name: "VIP Head Table Butler Service & Silverware Upgrade", fixedPrice: 20000 },
  { id: "live-jalebi", name: "Live Sweet Jalebi & Shahi Tukra Station", fixedPrice: 35000 },
];

export function PackageCalculator() {
  const router = useRouter();
  const { setQuoteDraft } = useUIStore();

  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[0].id);
  const [guests, setGuests] = useState(250);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  // Calculations
  const baseCost = guests * selectedPkg.pricePerHead;
  const extrasCost = selectedExtras.reduce((acc, currId) => {
    const extra = EXTRAS.find((e) => e.id === currId);
    if (!extra) return acc;
    if (extra.pricePerHead) return acc + extra.pricePerHead * guests;
    if (extra.fixedPrice) return acc + extra.fixedPrice;
    return acc;
  }, 0);

  const subtotal = baseCost + extrasCost;
  const vat = subtotal * 0.05; // 5% VAT
  const total = subtotal + vat;

  const handleRequestQuote = () => {
    track("package_calculated", {
      packageName: selectedPkg.name,
      guests,
      estimatedTotal: total,
    });

    setQuoteDraft({
      guestCount: guests,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      estimatedTotal: Math.round(total),
    });

    router.push("/quote");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ink-100 shadow-soft text-left">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-ink-100">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-black text-xl uppercase tracking-wider text-ink-950">
            Interactive Catering Price Estimator
          </h3>
          <p className="text-xs text-ink-500">
            Select your desired package and guest count to calculate an estimated BDT total.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Select Package */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
              1. Choose Base Menu Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedPkgId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-ink-200 hover:border-ink-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-xs uppercase text-ink-950">
                        {pkg.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-brand-500" />}
                    </div>
                    <p className="text-xs font-bold text-brand-600 mt-1">
                      {formatCurrency(pkg.pricePerHead)} / person
                    </p>
                    <p className="text-[10px] text-ink-400 mt-1">Min. {pkg.minGuests} guests</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Guest Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-700">
                2. Expected Guest Attendance
              </label>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-ink-100 rounded-lg text-xs font-bold text-ink-900">
                <Users className="w-3.5 h-3.5 text-brand-500" />
                <span>{guests} Guests</span>
              </div>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="25"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-400 mt-1">
              <span>50 Guests</span>
              <span>1,000</span>
              <span>2,500</span>
              <span>5,000+ Guests</span>
            </div>
          </div>

          {/* 3. Optional Extras */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
              3. Select Optional Add-ons & Live Stations
            </label>
            <div className="space-y-2">
              {EXTRAS.map((extra) => {
                const isChecked = selectedExtras.includes(extra.id);
                return (
                  <label
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                      isChecked
                        ? "border-brand-500 bg-brand-50/40 text-ink-950"
                        : "border-ink-200 text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked ? "bg-brand-500 border-brand-500 text-white" : "border-ink-300"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{extra.name}</span>
                    </div>
                    <span className="font-semibold text-brand-600 shrink-0 ml-2">
                      {extra.pricePerHead
                        ? `+${formatCurrency(extra.pricePerHead)}/head`
                        : `+${formatCurrency(extra.fixedPrice || 0)}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-5 bg-ink-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="border-b border-ink-800 pb-4">
            <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
              Estimate Summary
            </span>
            <h4 className="font-display font-black text-xl uppercase tracking-wider text-white mt-1">
              {selectedPkg.name}
            </h4>
            <p className="text-xs text-ink-400 mt-1">
              For {guests} guests ({formatCurrency(selectedPkg.pricePerHead)} / head base)
            </p>
          </div>

          {/* Itemized list */}
          <div className="space-y-3 text-xs text-ink-300 border-b border-ink-800 pb-4">
            <div className="flex justify-between">
              <span>Base Menu Package ({guests} &times; {formatCurrency(selectedPkg.pricePerHead)})</span>
              <span className="font-semibold text-white">{formatCurrency(baseCost)}</span>
            </div>
            {extrasCost > 0 && (
              <div className="flex justify-between">
                <span>Selected Extras & Stations</span>
                <span className="font-semibold text-white">{formatCurrency(extrasCost)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Govt. VAT (5%)</span>
              <span className="font-semibold text-white">{formatCurrency(Math.round(vat))}</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
                Estimated Total:
              </span>
              <div className="text-right">
                <span className="font-display font-black text-3xl sm:text-4xl text-brand-400">
                  {formatCurrency(Math.round(total))}
                </span>
                <p className="text-[10px] text-ink-400 mt-0.5">Approx. {formatCurrency(Math.round(total / guests))} per person net</p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            withArrow
            onClick={handleRequestQuote}
            className="w-full"
          >
            Request This Quote &rarr;
          </Button>

          <p className="text-[10px] text-ink-500 text-center leading-relaxed">
            *Final quote will be finalized after menu customization, date reservation, and venue confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## `src/data/blog.ts`

```typescript
import { BlogPost } from "@/types";
import { IMAGES } from "./images";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "secrets-behind-perfect-dhaka-wedding-kacchi",
    title: "The Secrets Behind Perfect Dhaka Wedding Kacchi: From Spices to Dum Simmering",
    excerpt:
      "A deep dive into how ICCB Catering preserves 400-year-old Mughal culinary heritage while adhering to modern international food hygiene standards.",
    content: `
### The Soul of Dhaka Celebrations

In Dhaka, a wedding without authentic Kacchi Biryani is almost unthinkable. The fragrance of aged basmati rice, the warmth of saffron, and the tenderness of young mutton slow-cooked on dum define our most treasured celebrations.

Yet, producing exquisite Kacchi for 1,500 guests at the exact same quality as a boutique home kitchen is a masterstroke of culinary science. At ICCB Catering, the process begins long before the fires are lit.

### The Meat Standard: In-House Slaughterhouse

Most caterers purchase goat or lamb carcasses from open wholesale bazaars where temperature breaks and airborne exposure compromise tissue integrity. ICCB operates its own modern automated slaughterhouse. Livestock is screened by veterinary doctors, slaughtered according to 100% Halal guidelines, and aged at strict 2°C to 4°C chilled conditions.

### The 3 Golden Rules of Dum Cooking

1. **Aged Long-Grain Basmati**: Rice aged for a minimum of 18 months ensures low moisture and elongated kernels that do not stick.
2. **Whole Spices Over Powder**: Shahi jeera, mace (javitri), Iranian saffron, and wild cinnamon are stone-crushed fresh for every batch to avoid flavor oxidation.
3. **Sealed Dough Simmering**: The handi is hermetically sealed with whole-wheat dough. The steam builds internal pressure, ensuring the marrow dissolves into the meat while keeping every rice grain separate.

When you book ICCB Catering, you are not merely ordering food; you are guaranteeing that every single guest experiences the authentic taste of happiness.
    `,
    coverImage: IMAGES.kacchiBiryani,
    author: {
      name: "Chef Rafiqul Islam",
      role: "Executive Mughal Master Chef",
      avatar: IMAGES.chefExecutive,
    },
    readTime: "5 min read",
    category: "Culinary Heritage",
    tags: ["Kacchi Biryani", "Wedding Food", "Mughal Heritage", "Dhaka Catering"],
    publishedAt: "2026-10-18",
    status: "published",
    seoTitle: "The Secrets Behind Perfect Wedding Kacchi Biryani | ICCB Catering",
    seoDescription: "Discover how ICCB Catering combines ancient Mughal dum cooking with modern hygiene standards for Dhaka weddings.",
    isSample: true,
  },
  {
    id: "blog-2",
    slug: "corporate-catering-balancing-health-punctuality",
    title: "Corporate Catering in 2026: Balancing Health, Punctuality, and Executive Taste",
    excerpt:
      "How forward-thinking corporate organizers ensure boardroom productivity with light, nutritious, and perfectly timed banquet menus.",
    content: `
### Moving Beyond Heavy Banquets

Today's multinational corporations and institutions demand catering that respects energy levels. The infamous post-lunch slump can derail an afternoon AGM or tech conference.

At ICCB Catering, our corporate menus are specifically engineered with dietary balance: lean grilled proteins, crisp leafy greens, low-glycemic grains, and energizing mocktails.

### The Power of Precision Timing

In business, five minutes delayed is a schedule broken. ICCB's dual-line buffet logistics can serve 500 delegates in under 22 minutes, giving your attendees ample time to network without queuing.
    `,
    coverImage: IMAGES.corporateEvent,
    author: {
      name: "Sabrina Rahman",
      role: "Director of Corporate Hospitality",
      avatar: IMAGES.cateringDirector,
    },
    readTime: "4 min read",
    category: "Corporate Hospitality",
    tags: ["Corporate Events", "Business Lunch", "Conference Catering", "Productivity"],
    publishedAt: "2026-09-25",
    status: "published",
    seoTitle: "Corporate Event Catering Guide: Balancing Health & Punctuality | ICCB",
    seoDescription: "Strategic guide for HR managers and corporate planners selecting catering for AGMs, summits, and conferences in Dhaka.",
    isSample: true,
  },
  {
    id: "blog-3",
    slug: "science-of-food-safety-why-slaughterhouse-matters",
    title: "The Science of Food Safety: Why a Dedicated Modern Slaughterhouse Matters",
    excerpt:
      "Inside ICCB's farm-to-table hygiene protocol: how raw ingredient quality checking prevents foodborne illnesses in large-scale banqueting.",
    content: `
### The Invisible Risk in Event Catering

When catering for thousands of guests, food safety is not a marketing checkbox—it is a life-critical responsibility. 

Unlike conventional caterers who rely on third-party butcher markets, ICCB controls the entire supply chain. Our raw meat processing takes place in a climate-controlled slaughterhouse where HACCP protocols are strictly enforced.

Dishes are continuously monitored with digital temperature probes, ensuring cold foods remain below 4°C and hot foods are served above 65°C.
    `,
    coverImage: IMAGES.modernKitchen,
    author: {
      name: "Dr. Farhan Masud",
      role: "Quality Assurance Lead",
      avatar: IMAGES.qaManager,
    },
    readTime: "6 min read",
    category: "Hygiene & Safety",
    tags: ["Food Safety", "Halal Slaughterhouse", "HACCP", "Quality Checking"],
    publishedAt: "2026-08-30",
    status: "published",
    seoTitle: "Why a Modern Slaughterhouse Matters in Large-Scale Catering | ICCB",
    seoDescription: "Learn about ICCB Catering's veterinary inspections, laboratory testing, and cold-chain integrity.",
    isSample: true,
  },
];
```

---

## `src/data/bookings.ts`

```typescript
import { Booking } from "@/types";

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "bkg-2026-089",
    bookingNumber: "BKG-2026-089",
    leadId: "lead-104",
    clientName: "Dr. Anisur Rahman",
    email: "anisur.ortho@dghs.gov.bd",
    phone: "+8801715001122",
    eventType: "Holud & Mehendi Night",
    hallOrVenue: "ICCB Hall 2 (Pushpaguchha)",
    eventDate: "18/12/2026",
    guests: 500,
    status: "Confirmed",
    totalAmount: 650000,
    paidAmount: 200000,
    notes: "Requires hall entry at 3:00 PM for decor setup.",
    createdAt: "2026-11-02T12:00:00Z",
    isSample: true,
  },
  {
    id: "bkg-2026-088",
    bookingNumber: "BKG-2026-088",
    clientName: "Beximco Pharma Annual Meet",
    email: "events@beximcopharma.com",
    phone: "+8801819223344",
    eventType: "Corporate Gala & Dinner",
    hallOrVenue: "ICCB Hall 1 (Gulnaksha)",
    eventDate: "10/12/2026",
    guests: 1800,
    status: "Confirmed",
    totalAmount: 2150000,
    paidAmount: 1500000,
    notes: "Dual buffet counter with digital guest badge verification.",
    createdAt: "2026-10-15T09:30:00Z",
    isSample: true,
  },
  {
    id: "bkg-2026-087",
    bookingNumber: "BKG-2026-087",
    clientName: "Zarif & Samia Wedding",
    email: "samia.wedding@gmail.com",
    phone: "+8801719887766",
    eventType: "Wedding Reception",
    hallOrVenue: "ICCB Hall 3 (Rajdarshan)",
    eventDate: "02/12/2026",
    guests: 2200,
    status: "Confirmed",
    totalAmount: 3200000,
    paidAmount: 3200000,
    notes: "All payments settled. Menu locked with Executive Chef Rafiqul.",
    createdAt: "2026-09-20T14:00:00Z",
    isSample: true,
  },
];
```

---

## `src/data/clients.ts`

```typescript
import { ClientLogo, NewsItem } from "@/types";

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "cl-1", name: "Standard Chartered Bank", logoUrl: "SCB", industry: "Banking & Finance", isSample: true },
  { id: "cl-2", name: "Grameenphone PLC", logoUrl: "GP", industry: "Telecom", isSample: true },
  { id: "cl-3", name: "BRAC International", logoUrl: "BRAC", industry: "Development", isSample: true },
  { id: "cl-4", name: "Beximco Pharmaceuticals", logoUrl: "Beximco", industry: "Healthcare", isSample: true },
  { id: "cl-5", name: "Apex Footwear", logoUrl: "Apex", industry: "Retail & Manufacturing", isSample: true },
  { id: "cl-6", name: "Unilever Bangladesh", logoUrl: "Unilever", industry: "FMCG", isSample: true },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    slug: "iccb-catering-adds-new-thermal-transport-fleet",
    title: "ICCB Catering Unveils Fleet of 10 Smart Temperature-Controlled Mobile Units",
    summary: "New insulated transport vehicles ensure off-premises catering arrives at 65°C+ across Greater Dhaka.",
    content: "To cater to increasing demand for off-premises corporate and diplomatic catering in Gulshan, Banani, and Uttara, ICCB Catering has expanded its dedicated logistics division with ten custom-engineered thermal vehicles.",
    publishedAt: "2026-10-20",
    category: "Press Release",
    isSample: true,
  },
  {
    id: "news-2",
    slug: "hygiene-audit-completion-haccp-2026",
    title: "Annual International Food Safety Audit Concluded with Grade A Certification",
    summary: "Modern slaughterhouse and central kitchen passed rigorous bi-annual chemical and microbial checks.",
    content: "Independent food safety inspectors have recertified ICCB's central catering facilities, praising the automated livestock traceability and sterile butchery environment.",
    publishedAt: "2026-09-12",
    category: "Quality Milestone",
    isSample: true,
  },
];
```

---

## `src/data/faqs.ts`

```typescript
import { FAQ } from "@/types";

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "What makes ICCB Catering different from other caterers in Dhaka?",
    questionBn: "অন্যান্য ক্যাটারারের তুলনায় আইসিসিবি ক্যাটারিং কেন আলাদা?",
    answer:
      "Most caterers compromise either taste or hygiene. ICCB guarantees both. We operate our own dedicated modern slaughterhouse for 100% Halal and disease-free meats, an on-site quality assurance lab, and industrial-grade hot-holding chambers so that dishes are served at the ideal temperature.",
    answerBn:
      "বেশিরভাগ ক্যাটারার স্বাদ অথবা স্বাস্থ্যবিধির যেকোনো একটির সাথে আপস করে। আইসিসিবি ক্যাটারিং দুটিরই শতভাগ নিশ্চয়তা দেয়। আমাদের রয়েছে নিজস্ব আধুনিক কসাইখানা, ল্যাব টেস্ট এবং থার্মাল পরিবহন ব্যবস্থা।",
    category: "General",
    order: 1,
    isSample: true,
  },
  {
    id: "faq-2",
    question: "Can I book ICCB Catering for an outside venue or my private residence?",
    questionBn: "আইসিসিবির বাইরের কোনো ভেন্যু বা বাসায় কি ক্যাটারিং সেবা নেওয়া যায়?",
    answer:
      "Yes! While ICCB hosts events in our 4 world-class convention halls in Kuril, our outdoor catering division serves corporate offices, diplomatic zones, convention centers, and private residences anywhere across Greater Dhaka.",
    answerBn:
      "হ্যাঁ! আমাদের নিজস্ব ৪টি কনভেনশন হলের পাশাপাশি আমরা ঢাকা শহরের যেকোনো ভেন্যু, অফিস বা বাসায় আউটডোর ক্যাটারিং সেবা প্রদান করে থাকি।",
    category: "Logistics",
    order: 2,
    isSample: true,
  },
  {
    id: "faq-3",
    question: "Can we schedule a food tasting session before booking?",
    questionBn: "ইভেন্ট নিশ্চিত করার আগে কি ফুড টেস্টিং করা সম্ভব?",
    answer:
      "Absolutely. We offer customized food tasting sessions for prospective wedding couples and corporate event organizers so you can experience our dishes, portion sizes, and presentation firsthand.",
    answerBn:
      "অবশ্যই। বুকিং চূড়ান্ত করার আগে বর-কনে বা ইভেন্ট আয়োজকদের জন্য বিশেষ ফুড টেস্টিং সেশনের ব্যবস্থা রয়েছে।",
    category: "Menu & Tasting",
    order: 3,
    isSample: true,
  },
  {
    id: "faq-4",
    question: "What is the minimum and maximum guest capacity you cater for?",
    questionBn: "সর্বনিম্ন ও সর্বোচ্চ কতজন অতিথির জন্য ক্যাটারিং করা সম্ভব?",
    answer:
      "Our package minimums start from 30 guests for intimate celebrations and lunch boxes. At the upper scale, our industrial kitchen can seamlessly serve over 10,000+ guests simultaneously across ICCB's 4 massive halls.",
    answerBn:
      "প্যাকেজভেদে সর্বনিম্ন ৩০ জন থেকে শুরু করে আমাদের সুবিশাল আধুনিক রান্নাঘর ১০,০০০+ অতিথির খাবার একযোগে পরিবেশনে সক্ষম।",
    category: "Booking & Payment",
    order: 4,
    isSample: true,
  },
  {
    id: "faq-5",
    question: "What payment terms and booking advance are required?",
    questionBn: "বুকিং নিশ্চিত করতে কত শতাংশ অগ্রিম প্রদান করতে হয়?",
    answer:
      "Typically, a 25% deposit confirms your event date, 50% is due 14 days before the event following final menu sign-off, and the remaining 25% balance is settled on the event day.",
    answerBn:
      "তারিখ নিশ্চিত করতে সাধারণত ২৫% অগ্রিম, মেন্যু চূড়ান্তের পর ইভেন্টের ১৪ দিন আগে ৫০% এবং বাকি ২৫% ইভেন্টের দিন পরিশোধ করতে হয়।",
    category: "Booking & Payment",
    order: 5,
    isSample: true,
  },
  {
    id: "faq-6",
    question: "How do you ensure food stays hot and fresh during transport?",
    questionBn: "পরিবহনের সময় খাবার গরম ও তাজা রাখার ব্যবস্থা কী?",
    answer:
      "We utilize military-grade insulated hot-holding food transport units that maintain food temperatures above 65°C without electricity for up to 6 hours, followed by on-site induction heating.",
    answerBn:
      "আমরা বিশেষ ইনসুলেটেড থার্মাল পরিবহন চেম্বার ব্যবহার করি যা খাবারকে ঘণ্টার পর ঘণ্টা ৬৫ ডিগ্রি সেলসিয়াসের বেশি তাপমাত্রায় নিরাপদ রাখে।",
    category: "Logistics",
    order: 6,
    isSample: true,
  },
];
```

---

## `src/data/gallery.ts`

```typescript
import { GalleryItem } from "@/types";
import { IMAGES } from "./images";

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Grand Wedding Banquet Table Setting",
    category: "Weddings",
    imageUrl: IMAGES.weddingReception,
    caption: "Royal floral and silverware setup inside Hall 3 (Rajdarshan)",
    isSample: true,
  },
  {
    id: "gal-2",
    title: "Signature Shahi Kacchi Biryani Plating",
    category: "Plating",
    imageUrl: IMAGES.kacchiBiryani,
    caption: "Aromatic basmati rice layered with slow-cooked tender mutton and saffron",
    isSample: true,
  },
  {
    id: "gal-3",
    title: "International Tech Summit Corporate Buffet",
    category: "Corporate",
    imageUrl: IMAGES.corporateEvent,
    caption: "Smooth multi-station executive buffet for 1,200 delegates",
    isSample: true,
  },
  {
    id: "gal-4",
    title: "Chef Finishing Live Tandoori Grills",
    category: "Plating",
    imageUrl: IMAGES.chefCooking,
    caption: "Char-grilled boti kebabs and fresh tandoori rotis served straight from clay ovens",
    isSample: true,
  },
  {
    id: "gal-5",
    title: "Birthday Celebration Dessert Display",
    category: "Social",
    imageUrl: IMAGES.birthdayParty,
    caption: "Colorful confectionery and festive dessert table layout",
    isSample: true,
  },
  {
    id: "gal-6",
    title: "Hall 1 (Gulnaksha) Gala Evening Layout",
    category: "Venues",
    imageUrl: IMAGES.hallGulnaksha,
    caption: "Pillarless 25,000 sq ft hall configured for a premier awards banquet",
    isSample: true,
  },
  {
    id: "gal-7",
    title: "Traditional Dhakai Borhani in Clay Pitchers",
    category: "Plating",
    imageUrl: IMAGES.borhaniBeverage,
    caption: "Savory mint yogurt drink served chilled in artisanal clay vessels",
    isSample: true,
  },
  {
    id: "gal-8",
    title: "Hall 4 (Naboratna) Modular Banquet Setup",
    category: "Venues",
    imageUrl: IMAGES.hallNaboratna,
    caption: "Spacious seating arrangement with crystal chandeliers and ambient lighting",
    isSample: true,
  },
  {
    id: "gal-9",
    title: "Private Family Anniversary Dinner",
    category: "Social",
    imageUrl: IMAGES.privateParty,
    caption: "Intimate family gathering catered with custom fine-dining service",
    isSample: true,
  },
  {
    id: "gal-10",
    title: "Norwegian Salmon with Herb Dill Sauce",
    category: "Plating",
    imageUrl: IMAGES.salmonPlatter,
    caption: "Continental plated lunch for diplomatic delegation",
    isSample: true,
  },
  {
    id: "gal-11",
    title: "Industrial Grade ICCB Production Kitchen",
    category: "Venues",
    imageUrl: IMAGES.modernKitchen,
    caption: "Stainless steel hygienic prep stations capable of handling 10,000+ meals",
    isSample: true,
  },
  {
    id: "gal-12",
    title: "VIP Head Table Wedding Setup",
    category: "Weddings",
    imageUrl: IMAGES.hallRajdarshan,
    caption: "White and gold themed VIP family service counter",
    isSample: true,
  },
];
```

---

## `src/data/images.ts`

```typescript
// Centralized Unsplash and fallback image assets for ICCB Catering

export const IMAGES = {
  heroFood: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  heroPlate: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  chefCooking: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80",
  modernKitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
  slaughterhouse: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
  qualityCheck: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  
  // Menu items
  kacchiBiryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  beefRezala: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  chickenRoast: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  muttonKorma: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80",
  grilledKebab: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  firniDessert: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  borhaniBeverage: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  shahiTukra: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
  continentalPasta: "https://images.unsplash.com/photo-1621996346565-e3d5d6281698?auto=format&fit=crop&w=800&q=80",
  steakFillet: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
  salmonPlatter: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
  dimSumPlatter: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
  
  // Occasions
  privateParty: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  weddingReception: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  corporateEvent: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  birthdayParty: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
  
  // Venues
  hallGulnaksha: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  hallPushpaguchha: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  hallRajdarshan: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  hallNaboratna: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
  heritageRestaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  
  // Avatars
  avatar1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  avatar3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  avatar4: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  
  // Team
  chefExecutive: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80",
  cateringDirector: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  qaManager: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
};

export const PLACEHOLDER_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";
```

---

## `src/data/index.ts`

```typescript
export * from "./images";
export * from "./site";
export * from "./navigation";
export * from "./menu";
export * from "./packages";
export * from "./services";
export * from "./gallery";
export * from "./testimonials";
export * from "./faqs";
export * from "./blog";
export * from "./leads";
export * from "./quotations";
export * from "./bookings";
export * from "./users";
export * from "./roles";
export * from "./settings";
export * from "./clients";
```

---

## `src/data/leads.ts`

```typescript
import { Lead } from "@/types";

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-101",
    name: "Mahmudur Rahman",
    email: "mahmud.rahman@grameenphone.com",
    phone: "+8801711223344",
    companyName: "Grameenphone Ltd.",
    city: "Dhaka",
    eventType: "Corporate AGM & Dinner",
    venue: "ICCB Hall 1 (Gulnaksha)",
    guestCount: 650,
    eventDate: "15/12/2026",
    budgetRange: "৳8,00,000 - ৳10,00,000",
    cuisinePreference: "Continental & Mughal",
    packagePreference: "Executive Corporate Buffet",
    message: "Need VIP service for board members and live pasta counter for delegates.",
    status: "Quoted",
    type: "quote",
    assignee: "Zubair Hossain",
    createdAt: "2026-11-01T10:30:00Z",
    updatedAt: "2026-11-03T14:20:00Z",
    notes: [
      { id: "note-1", author: "Zubair Hossain", text: "Sent revised quotation with live dessert station included.", createdAt: "2026-11-03T14:20:00Z" }
    ],
    activities: [
      { id: "act-1", type: "status_change", description: "Status changed from Contacted to Quoted", timestamp: "2026-11-03T14:20:00Z", user: "Zubair Hossain" }
    ],
    isSample: true,
  },
  {
    id: "lead-102",
    name: "Mrs. Shahnaz Parveen",
    email: "shahnaz.p@gmail.com",
    phone: "+8801911887766",
    city: "Dhaka",
    eventType: "Wedding Reception",
    venue: "ICCB Hall 3 (Rajdarshan)",
    guestCount: 1200,
    eventDate: "24/12/2026",
    budgetRange: "৳15,00,000+",
    cuisinePreference: "Traditional Mughal",
    packagePreference: "Royal Mughal Wedding Feast",
    message: "Seeking tasting session for 6 family members on upcoming Friday.",
    status: "Tasting",
    type: "tasting",
    assignee: "Nusrat Jahan",
    createdAt: "2026-11-02T11:15:00Z",
    updatedAt: "2026-11-04T09:45:00Z",
    notes: [
      { id: "note-2", author: "Nusrat Jahan", text: "Tasting scheduled for Friday 14th Nov at ICCB Heritage Restaurant VIP room.", createdAt: "2026-11-04T09:45:00Z" }
    ],
    activities: [
      { id: "act-2", type: "schedule", description: "Food tasting confirmed with client", timestamp: "2026-11-04T09:45:00Z", user: "Nusrat Jahan" }
    ],
    isSample: true,
  },
  {
    id: "lead-103",
    name: "Tanvir Hasan",
    email: "tanvir.hasan@bracbank.com",
    phone: "+8801819554433",
    companyName: "BRAC Bank PLC",
    city: "Dhaka",
    eventType: "Leadership Conference",
    venue: "Gulshan Club Ball Room",
    guestCount: 180,
    eventDate: "05/01/2027",
    budgetRange: "৳2,00,000 - ৳3,00,000",
    cuisinePreference: "Continental",
    packagePreference: "Executive Corporate Buffet",
    message: "Outdoor catering required at Gulshan. Need insulated transport.",
    status: "New",
    type: "quote",
    assignee: "Unassigned",
    createdAt: "2026-11-04T16:00:00Z",
    updatedAt: "2026-11-04T16:00:00Z",
    notes: [],
    activities: [
      { id: "act-3", type: "create", description: "Lead submitted through online quote calculator", timestamp: "2026-11-04T16:00:00Z", user: "System" }
    ],
    isSample: true,
  },
  {
    id: "lead-104",
    name: "Dr. Anisur Rahman",
    email: "anisur.ortho@dghs.gov.bd",
    phone: "+8801715001122",
    city: "Dhaka",
    eventType: "Daughter's Holud & Mehendi",
    venue: "ICCB Hall 2 (Pushpaguchha)",
    guestCount: 500,
    eventDate: "18/12/2026",
    budgetRange: "৳6,00,000 - ৳8,00,000",
    cuisinePreference: "Mughal & Street Food Counters",
    message: "Requires live fuchka, chaat counter, and traditional borhani stations.",
    status: "Won",
    type: "booking",
    assignee: "Zubair Hossain",
    createdAt: "2026-10-25T08:00:00Z",
    updatedAt: "2026-11-02T12:00:00Z",
    notes: [
      { id: "note-3", author: "Zubair Hossain", text: "Advance deposit of 25% received. Contract signed.", createdAt: "2026-11-02T12:00:00Z" }
    ],
    activities: [
      { id: "act-4", type: "status_change", description: "Lead converted to Won Booking #BKG-2026-089", timestamp: "2026-11-02T12:00:00Z", user: "Zubair Hossain" }
    ],
    isSample: true,
  },
  {
    id: "lead-105",
    name: "Kazi Farhan",
    email: "kfarhan@apexfootwear.com",
    phone: "+8801977665544",
    companyName: "Apex Footwear",
    city: "Dhaka",
    eventType: "Factory Milestone Luncheon",
    guestCount: 1500,
    eventDate: "28/11/2026",
    budgetRange: "৳10,00,000",
    cuisinePreference: "Traditional Bengali",
    status: "Contacted",
    type: "inquiry",
    assignee: "Nusrat Jahan",
    createdAt: "2026-11-03T10:10:00Z",
    updatedAt: "2026-11-04T15:30:00Z",
    notes: [],
    activities: [
      { id: "act-5", type: "call", description: "Spoke with procurement team regarding factory logistics", timestamp: "2026-11-04T15:30:00Z", user: "Nusrat Jahan" }
    ],
    isSample: true,
  },
];
```

---

## `src/data/menu.ts`

```typescript
import { MenuItem, MenuCategory } from "@/types";
import { IMAGES } from "./images";

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "all", name: "All Dishes", slug: "all", description: "Explore our complete culinary catalog", displayOrder: 0 },
  { id: "biryani", name: "Biryani & Rice", slug: "biryani-and-rice", description: "Fragrant basmati and aromatic spiced rice specialties", displayOrder: 1 },
  { id: "curries", name: "Curries & Rezala", slug: "curries", description: "Rich, slow-cooked royal gravies and festive stews", displayOrder: 2 },
  { id: "mains", name: "Mains & Grills", slug: "mains", description: "Tandoori kebabs, roasted delicacies, and global entrees", displayOrder: 3 },
  { id: "appetizers", name: "Appetizers", slug: "appetizers", description: "Crispy bites, fresh garden salads, and starter delights", displayOrder: 4 },
  { id: "desserts", name: "Desserts & Sweets", slug: "desserts", description: "Traditional sweet endings and artisanal confections", displayOrder: 5 },
  { id: "beverages", name: "Beverages", slug: "beverages", description: "Chilled traditional drinks, mocktails, and fresh sips", displayOrder: 6 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "item-1",
    slug: "shahi-kacchi-biryani",
    name: "Shahi Kacchi Biryani",
    nameBn: "শাহী কাচ্চি বিরিয়ানি",
    description: "Tender chunks of young mutton marinated in aromatic whole spices, layered with saffron basmati rice and golden fried potatoes.",
    category: "Biryani & Rice",
    cuisine: "Mughal",
    price: 680,
    image: IMAGES.kacchiBiryani,
    dietTags: ["Halal", "Chef Special", "Non-Veg"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: true,
    allergens: ["Dairy", "Nuts"],
    preparationTime: "Slow cooked 4 hrs",
    calories: "720 kcal",
    isSample: true,
  },
  {
    id: "item-2",
    slug: "shahi-mutton-rezala",
    name: "Shahi Mutton Rezala",
    nameBn: "শাহী মাটন রেজালা",
    description: "Classic Mughal white yogurt-based curry infused with mace, kewra water, green chilies, and tender mutton shank.",
    category: "Curries",
    cuisine: "Mughal",
    price: 520,
    image: IMAGES.beefRezala,
    dietTags: ["Halal", "Chef Special", "Non-Veg"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: true,
    allergens: ["Dairy", "Cashews"],
    preparationTime: "2.5 hrs",
    calories: "550 kcal",
    isSample: true,
  },
  {
    id: "item-3",
    slug: "dhakai-chicken-roast",
    name: "Dhakai Chicken Roast",
    nameBn: "ঢাকাই বিয়ে বাড়ির চিকেন রোস্ট",
    description: "Succulent braised quarter chicken cooked in browned onion paste, sweet spices, ghee, and golden raisins.",
    category: "Curries",
    cuisine: "Mughal",
    price: 360,
    image: IMAGES.chickenRoast,
    dietTags: ["Halal", "Non-Veg"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: true,
    allergens: ["Dairy", "Nuts"],
    preparationTime: "1.5 hrs",
    calories: "480 kcal",
    isSample: true,
  },
  {
    id: "item-4",
    slug: "tandoori-boti-kebab",
    name: "Tandoori Boti Kebab Platter",
    nameBn: "তন্দুরি বোটি কাবাব প্ল্যাটার",
    description: "Skewered char-grilled beef tenderloin morsels coated with mustard oil, hung curd, and stone-ground Kashmiri spices.",
    category: "Mains",
    cuisine: "Mughal",
    price: 490,
    image: IMAGES.grilledKebab,
    dietTags: ["Halal", "Spicy", "Non-Veg"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: true,
    allergens: ["Mustard"],
    preparationTime: "45 mins",
    calories: "410 kcal",
    isSample: true,
  },
  {
    id: "item-5",
    slug: "zafrani-shahi-firni",
    name: "Zafrani Shahi Firni",
    nameBn: "জাফরানি শাহী ফিরনি",
    description: "Slow-reduced ground aromatic chinigura rice pudding scented with Iranian saffron, green cardamom, and crushed pistachios in clay pot.",
    category: "Desserts",
    cuisine: "Mughal",
    price: 180,
    image: IMAGES.firniDessert,
    dietTags: ["Halal", "Veg"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: true,
    allergens: ["Dairy", "Pistachios", "Almonds"],
    preparationTime: "1 hr",
    calories: "290 kcal",
    isSample: true,
  },
  {
    id: "item-6",
    slug: "traditional-dhakai-borhani",
    name: "Traditional Dhakai Borhani",
    nameBn: "ঐতিহ্যবাহী ঢাকাই বোরহানি",
    description: "Chilled artisanal savory yogurt beverage spiced with freshly crushed mint, roasted cumin, black salt, and mustard oil.",
    category: "Beverages",
    cuisine: "Mughal",
    price: 120,
    image: IMAGES.borhaniBeverage,
    dietTags: ["Halal", "Veg"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: true,
    allergens: ["Dairy", "Mustard"],
    preparationTime: "Freshly prepared",
    calories: "140 kcal",
    isSample: true,
  },
  {
    id: "item-7",
    slug: "norwegian-grilled-salmon",
    name: "Norwegian Grilled Salmon Fillet",
    nameBn: "গ্রিল্ড স্যামন ফিলে",
    description: "Pan-seared Atlantic salmon with dill butter glaze, served over garlic buttered asparagus and lemon caper drizzle.",
    category: "Mains",
    cuisine: "Continental",
    price: 1250,
    image: IMAGES.salmonPlatter,
    dietTags: ["Halal", "Non-Veg", "Chef Special"],
    isAvailable: true,
    isFeatured: false,
    isTodaysMenu: false,
    allergens: ["Fish", "Dairy"],
    preparationTime: "30 mins",
    calories: "520 kcal",
    isSample: true,
  },
  {
    id: "item-8",
    slug: "herb-crusted-beef-tenderloin",
    name: "Herb Crusted Beef Tenderloin",
    nameBn: "হার্ব ক্রাস্টেড বিফ টেন্ডারলয়েন",
    description: "Prime beef tenderloin medallion seared to perfection with rosemary peppercorn reduction and potato dauphinoise.",
    category: "Mains",
    cuisine: "Continental",
    price: 1100,
    image: IMAGES.steakFillet,
    dietTags: ["Halal", "Non-Veg"],
    isAvailable: true,
    isFeatured: false,
    isTodaysMenu: false,
    allergens: ["Dairy"],
    preparationTime: "40 mins",
    calories: "640 kcal",
    isSample: true,
  },
  {
    id: "item-9",
    slug: "classic-penne-alfredo",
    name: "Penne All'Alfredo con Pollo",
    nameBn: "পেনে আলফ্রেডো পাস্তা",
    description: "Al dente penne pasta tossed in rich parmesan cream sauce, grilled chicken strips, and sautéed wild mushrooms.",
    category: "Mains",
    cuisine: "Continental",
    price: 450,
    image: IMAGES.continentalPasta,
    dietTags: ["Halal", "Non-Veg"],
    isAvailable: true,
    isFeatured: false,
    isTodaysMenu: false,
    allergens: ["Gluten", "Dairy"],
    preparationTime: "25 mins",
    calories: "590 kcal",
    isSample: true,
  },
  {
    id: "item-10",
    slug: "royal-shahi-tukra",
    name: "Royal Shahi Tukra",
    nameBn: "রয়েল শাহী টুকরা",
    description: "Crispy ghee-fried bread triangles soaked in fragrant saffron rabri cream, topped with silver leaf and toasted nuts.",
    category: "Desserts",
    cuisine: "Mughal",
    price: 220,
    image: IMAGES.shahiTukra,
    dietTags: ["Halal", "Veg"],
    isAvailable: true,
    isFeatured: false,
    isTodaysMenu: false,
    allergens: ["Gluten", "Dairy", "Nuts"],
    preparationTime: "45 mins",
    calories: "380 kcal",
    isSample: true,
  },
  {
    id: "item-11",
    slug: "steamed-dim-sum-basket",
    name: "Artisanal Chicken Dim Sum",
    nameBn: "চিকেন ডিম সাম বাস্কেট",
    description: "Delicate translucent steamed dumplings filled with seasoned minced chicken, water chestnut, and scallion oil.",
    category: "Appetizers",
    cuisine: "Multi-cuisine",
    price: 320,
    image: IMAGES.dimSumPlatter,
    dietTags: ["Halal", "Non-Veg"],
    isAvailable: true,
    isFeatured: false,
    isTodaysMenu: false,
    allergens: ["Sesame", "Soy"],
    preparationTime: "20 mins",
    calories: "260 kcal",
    isSample: true,
  },
  {
    id: "item-12",
    slug: "saffron-pulao-beef-bhuna",
    name: "Saffron Pulao with Beef Bhuna",
    nameBn: "জাফরানি পোলাও ও বিফ ভুনা",
    description: "Fragrant Kalijira rice cooked in spiced ghee stock paired with rich, dry-braised beef shanks caramelized with whole shallots.",
    category: "Biryani & Rice",
    cuisine: "Traditional Bengali",
    price: 620,
    image: IMAGES.beefRezala,
    dietTags: ["Halal", "Non-Veg", "Spicy"],
    isAvailable: true,
    isFeatured: true,
    isTodaysMenu: false,
    allergens: ["Dairy"],
    preparationTime: "2 hrs",
    calories: "690 kcal",
    isSample: true,
  },
];
```

---

## `src/data/navigation.ts`

```typescript
export const PUBLIC_NAV = [
  { label: "Home", labelBn: "হোম", href: "/" },
  { label: "About", labelBn: "আমাদের সম্পর্কে", href: "/about" },
  {
    label: "Services",
    labelBn: "সেবাসমূহ",
    href: "/services",
    children: [
      { label: "Corporate Catering", href: "/services/corporate-catering" },
      { label: "Wedding Catering", href: "/services/wedding-catering" },
      { label: "Birthday & Social", href: "/services/birthday-party-catering" },
      { label: "Corporate Lunch Box", href: "/lunch-box" },
      { label: "Food Tasting Session", href: "/tasting" },
    ],
  },
  { label: "Menu", labelBn: "মেন্যু", href: "/menu" },
  { label: "Packages", labelBn: "প্যাকেজ", href: "/packages" },
  { label: "Gallery", labelBn: "গ্যালারি", href: "/gallery" },
  { label: "Venues", labelBn: "ভেন্যু", href: "/venues" },
  { label: "Blog", labelBn: "ব্লগ", href: "/blog" },
  { label: "Contact", labelBn: "যোগাযোগ", href: "/contact" },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Corporate Catering", href: "/services/corporate-catering" },
    { label: "Wedding Banquets", href: "/services/wedding-catering" },
    { label: "Birthday & Private", href: "/services/birthday-party-catering" },
    { label: "Corporate Lunch Boxes", href: "/lunch-box" },
    { label: "Custom Menu Packages", href: "/packages" },
    { label: "Private Food Tasting", href: "/tasting" },
  ],
  company: [
    { label: "About ICCB", href: "/about" },
    { label: "Our 4 Convention Halls", href: "/venues" },
    { label: "Our 5-Step Process", href: "/our-process" },
    { label: "Client Testimonials", href: "/testimonials" },
    { label: "Seasonal Offers", href: "/offers" },
    { label: "Careers", href: "/careers" },
  ],
  useful: [
    { label: "Request a Quote", href: "/quote" },
    { label: "Book an Event", href: "/booking" },
    { label: "General Inquiry", href: "/inquiry" },
    { label: "Frequently Asked Questions", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
  ],
};

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  {
    label: "Leads & Inquiries",
    href: "/dashboard/leads",
    icon: "Users",
    children: [
      { label: "All Leads", href: "/dashboard/leads" },
      { label: "Kanban Pipeline", href: "/dashboard/leads/pipeline" },
    ],
  },
  { label: "Quotations", href: "/dashboard/quotations", icon: "FileText" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "Calendar" },
  { label: "Contact Messages", href: "/dashboard/contacts", icon: "Mail" },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: "Send" },
  {
    label: "Menu Management",
    href: "/dashboard/menu",
    icon: "Utensils",
    children: [
      { label: "Dishes & Items", href: "/dashboard/menu" },
      { label: "Add Dish", href: "/dashboard/menu/new" },
      { label: "Categories", href: "/dashboard/menu/categories" },
    ],
  },
  { label: "Packages", href: "/dashboard/packages", icon: "PackageCheck" },
  { label: "Services", href: "/dashboard/services", icon: "ConciergeBell" },
  { label: "Page Content", href: "/dashboard/pages", icon: "Layout" },
  { label: "Banners & Popups", href: "/dashboard/banners", icon: "Megaphone" },
  { label: "Gallery", href: "/dashboard/gallery", icon: "Image" },
  { label: "Media Library", href: "/dashboard/media", icon: "FolderArchive" },
  {
    label: "Blog & Articles",
    href: "/dashboard/blog",
    icon: "BookOpen",
    children: [
      { label: "All Posts", href: "/dashboard/blog" },
      { label: "New Post", href: "/dashboard/blog/new" },
      { label: "Categories", href: "/dashboard/blog/categories" },
      { label: "Tags", href: "/dashboard/blog/tags" },
    ],
  },
  { label: "News & Releases", href: "/dashboard/news", icon: "Newspaper" },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: "MessageSquareQuote" },
  { label: "FAQs", href: "/dashboard/faqs", icon: "HelpCircle" },
  { label: "Client Logos", href: "/dashboard/clients", icon: "Award" },
  { label: "SEO & Redirects", href: "/dashboard/seo", icon: "Search" },
  { label: "Forms Builder-Lite", href: "/dashboard/forms", icon: "FormInput" },
  { label: "Email Templates", href: "/dashboard/email-templates", icon: "MailCheck" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { label: "Users & Staff", href: "/dashboard/users", icon: "UserCheck" },
  { label: "Roles & Permissions", href: "/dashboard/roles", icon: "Shield" },
  { label: "Audit Logs", href: "/dashboard/audit-logs", icon: "Clock" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
  { label: "My Profile", href: "/dashboard/profile", icon: "User" },
];
```

---

## `src/data/packages.ts`

```typescript
import { Package } from "@/types";

export const PACKAGES: Package[] = [
  {
    id: "pkg-1",
    slug: "royal-mughal-wedding-feast",
    name: "Royal Mughal Wedding Feast",
    tagline: "The quintessential regal banquet for unforgettable weddings",
    tag: "Most Popular",
    description:
      "A lavish royal spread featuring our legendary Shahi Kacchi Biryani, tender mutton rezala, golden chicken roast, and traditional Dhaka desserts, served with warm hospitality.",
    pricePerHead: 1450,
    minGuests: 150,
    cuisineType: "Traditional Mughal & Bengali",
    courses: [
      {
        name: "Welcome Drinks & Starters",
        items: ["Chilled Dhakai Borhani", "Zafrani Sharbat", "Crispy Vegetable Singara", "Fresh Mint Chutney"],
      },
      {
        name: "Main Course",
        items: [
          "Signature Mutton Kacchi Biryani with Aloo & Boiled Egg",
          "Shahi Mutton Rezala",
          "Golden Dhakai Chicken Roast",
          "Roghni Naan / Butter Naan",
          "Mixed Onion Cucumber Salad with Lime & Green Chilies",
        ],
      },
      {
        name: "Desserts & Sweets",
        items: ["Clay Pot Zafrani Shahi Firni", "Mini Shahi Tukra with Rabri", "Traditional Sweet Paan"],
      },
    ],
    inclusions: [
      "Full Chafing Dish & Buffet Counter Setup",
      "Premium Porcelain Dinnerware & Silver Cutlery",
      "Uniformed Banquet Waitstaff & Hall Captains",
      "Hot-Holding Thermal Transport to maintain serving temperature",
      "VIP Table Service for Bride & Groom family",
    ],
    popular: true,
    isSample: true,
  },
  {
    id: "pkg-2",
    slug: "executive-corporate-buffet",
    name: "Executive Corporate Buffet",
    tagline: "Flawless catering tailored for summits, conferences, and AGMs",
    tag: "Corporate Choice",
    description:
      "A balanced multi-cuisine menu designed for high-profile business gatherings. Offers quick-service efficiency without sacrificing taste or hygiene.",
    pricePerHead: 1150,
    minGuests: 50,
    cuisineType: "Continental & Multi-Cuisine",
    courses: [
      {
        name: "Salad & Starters",
        items: ["Classic Chicken Caesar Salad", "Sweet Corn Vegetable Soup", "Warm Bread Rolls & Butter"],
      },
      {
        name: "Main Course",
        items: [
          "Herb-Crusted Beef Medallions in Peppercorn Glaze",
          "Grilled Chicken Breast with Mushroom Demi-Glace",
          "Steamed Jasmine / Basmati Rice",
          "Penne Pasta with Sun-Dried Tomato Cream",
          "Sautéed Seasonal Butter Vegetables",
        ],
      },
      {
        name: "Desserts & Beverages",
        items: ["Fresh Fruit Tartlets", "Chocolate Mousse Cups", "Freshly Brewed Tea & Coffee Station"],
      },
    ],
    inclusions: [
      "Live Hot Beverage Station throughout the event",
      "Modern Minimalist Buffet Line Presentation",
      "Professional Food Handlers with Safety Gear",
      "Strict Timetable Adherence for Tight Agendas",
    ],
    popular: false,
    isSample: true,
  },
  {
    id: "pkg-3",
    slug: "social-birthday-celebration",
    name: "Social & Birthday Celebration",
    tagline: "Festive, colorful, and crowd-pleasing for family milestones",
    tag: "Family Favorite",
    description:
      "A vibrant spread designed for birthdays, anniversaries, and family reunions with favorites loved by both children and elders.",
    pricePerHead: 890,
    minGuests: 30,
    cuisineType: "Bengali & Asian Fusion",
    courses: [
      {
        name: "Starters & Finger Foods",
        items: ["Crispy Fried Chicken Wontons", "Mini Seekh Kebabs", "Tangy Tamarind Dip"],
      },
      {
        name: "Main Course",
        items: [
          "Saffron Polao with Ghee Rice",
          "Spicy Beef Bhuna",
          "Chicken Korma with Golden Almonds",
          "Chinese Vegetable Fried Rice",
          "Szechuan Chilli Chicken Gravy",
        ],
      },
      {
        name: "Desserts & Refreshments",
        items: ["Creamy Caramel Custard", "Gulab Jamun in Warm Syrup", "Soft Drinks & Mineral Water"],
      },
    ],
    inclusions: [
      "Custom Kids Dining Station if needed",
      "Cake Cutting Table Setup with Plates & Forks",
      "Dedicated Service Staff for Tables",
      "Post-Event Cleanup Service",
    ],
    popular: false,
    isSample: true,
  },
  {
    id: "pkg-4",
    slug: "high-tea-reception",
    name: "Grand High-Tea Reception",
    tagline: "Elegant tea, savoury bites, and confections for mid-day gatherings",
    tag: "Light & Elegant",
    description:
      "Perfect for afternoon seminars, product launches, or post-ceremony receptions with a wide assortment of hot savouries, sandwiches, and artisanal pastries.",
    pricePerHead: 650,
    minGuests: 40,
    cuisineType: "Continental & Bakery High-Tea",
    courses: [
      {
        name: "Savouries & Canapés",
        items: [
          "Smoked Chicken & Cucumber Finger Sandwiches",
          "Mini Beef Sausage Rolls",
          "Crispy Paneer Pakora",
          "Chicken Quiche Bites",
        ],
      },
      {
        name: "Sweet Bites",
        items: ["Freshly Baked Scones with Cream & Jam", "Mini Éclairs", "Fruit Skewers with Honey Glaze"],
      },
      {
        name: "Beverages",
        items: ["Masala Milk Tea", "English Breakfast Tea", "Artisanal Black Coffee", "Chilled Lemon Mint Ice Tea"],
      },
    ],
    inclusions: [
      "Antique / Contemporary High-Tea Tiered Displays",
      "Continuous Hot Water Urn & Tea Barrels",
      "Napkins, Cutlery, and Clean Beverage Stations",
    ],
    popular: false,
    isSample: true,
  },
];
```

---

## `src/data/quotations.ts`

```typescript
import { Quotation } from "@/types";

export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: "quot-1001",
    quotationNumber: "QT-2026-0042",
    leadId: "lead-101",
    clientName: "Mahmudur Rahman",
    clientEmail: "mahmud.rahman@grameenphone.com",
    clientPhone: "+8801711223344",
    eventType: "Corporate AGM & Dinner",
    eventDate: "15/12/2026",
    venue: "ICCB Hall 1 (Gulnaksha)",
    guestCount: 650,
    packageName: "Executive Corporate Buffet",
    packagePricePerHead: 1150,
    items: [
      { id: "item-1", name: "Executive Corporate Buffet Base", price: 1150, quantity: 650 },
      { id: "item-2", name: "Live Roasted Lamb Carvery Counter", price: 65000, quantity: 1 },
      { id: "item-3", name: "Artisanal Espresso & Tea Bar (Unlimited)", price: 35000, quantity: 1 },
    ],
    extras: [
      { id: "ext-1", name: "VIP Executive Plating & Silverware Upgrade", price: 25000 },
      { id: "ext-2", name: "Dedicated Logistics Supervisor Team", price: 15000 },
    ],
    subtotal: 887500,
    taxRate: 0.05,
    taxAmount: 44375,
    discount: 30000,
    total: 901875,
    status: "Sent",
    version: 1,
    notes: "Quotation includes chafing dishes, linen, and 45 uniformed waitstaff.",
    createdAt: "2026-11-03T14:15:00Z",
    isSample: true,
  },
  {
    id: "quot-1002",
    quotationNumber: "QT-2026-0043",
    leadId: "lead-102",
    clientName: "Mrs. Shahnaz Parveen",
    clientEmail: "shahnaz.p@gmail.com",
    clientPhone: "+8801911887766",
    eventType: "Wedding Reception",
    eventDate: "24/12/2026",
    venue: "ICCB Hall 3 (Rajdarshan)",
    guestCount: 1200,
    packageName: "Royal Mughal Wedding Feast",
    packagePricePerHead: 1450,
    items: [
      { id: "item-1", name: "Royal Mughal Wedding Feast Course", price: 1450, quantity: 1200 },
      { id: "item-2", name: "Clay Pot Borhani Unlimited Station", price: 45000, quantity: 1 },
      { id: "item-3", name: "Live Jalebi & Shahi Tukra Station", price: 55000, quantity: 1 },
    ],
    extras: [
      { id: "ext-1", name: "Bridal Family Table Butler Service", price: 30000 },
    ],
    subtotal: 1870000,
    taxRate: 0.05,
    taxAmount: 93500,
    discount: 50000,
    total: 1913500,
    status: "Draft",
    version: 2,
    notes: "Pending final review after Friday tasting session.",
    createdAt: "2026-11-04T11:00:00Z",
    isSample: true,
  },
];
```

---

## `src/data/roles.ts`

```typescript
import { RolePermission } from "@/types";

export const ROLE_PERMISSIONS: RolePermission[] = [
  {
    id: "role-admin",
    name: "Admin",
    description: "Full administrative access to manage all CRM, catering menus, settings, users, and audit logs.",
    permissions: [
      "leads.create", "leads.read", "leads.update", "leads.delete",
      "quotations.create", "quotations.read", "quotations.update", "quotations.delete",
      "bookings.create", "bookings.read", "bookings.update", "bookings.delete",
      "menu.create", "menu.read", "menu.update", "menu.delete",
      "packages.manage", "services.manage", "pages.manage", "blog.manage",
      "gallery.manage", "users.manage", "roles.manage", "settings.manage", "audit.view"
    ],
  },
  {
    id: "role-sales",
    name: "Sales",
    description: "Manage client leads, build and issue quotations, track food tastings, and convert bookings.",
    permissions: [
      "leads.create", "leads.read", "leads.update",
      "quotations.create", "quotations.read", "quotations.update",
      "bookings.create", "bookings.read",
      "menu.read", "packages.read", "services.read"
    ],
  },
  {
    id: "role-editor",
    name: "Content Editor",
    description: "Create and update menu dishes, blog articles, photo galleries, FAQs, and announcement banners.",
    permissions: [
      "menu.create", "menu.read", "menu.update",
      "packages.manage", "services.manage", "blog.manage", "gallery.manage",
      "pages.manage", "faqs.manage"
    ],
  },
  {
    id: "role-viewer",
    name: "Viewer",
    description: "Read-only access across the dashboard for auditing, compliance, and viewing event metrics.",
    permissions: [
      "leads.read", "quotations.read", "bookings.read", "menu.read", "analytics.read"
    ],
  },
];
```

---

## `src/data/services.ts`

```typescript
import { ServiceItem } from "@/types";
import { IMAGES } from "./images";

export const SERVICES: ServiceItem[] = [
  {
    id: "srv-corporate",
    slug: "corporate-catering",
    title: "Corporate Catering",
    titleBn: "কর্পোরেট ক্যাটারিং",
    shortDesc: "Punctual, hygienic, and scalable catering for annual general meetings, summits, executive board lunches, and gala dinners.",
    fullDesc:
      "ICCB Catering delivers sophisticated corporate hospitality designed to impress your partners and energize your teams. With experience handling events up to 10,000+ delegates simultaneously, our culinary operations ensure strict timing, impeccable buffet presentation, dietary sensitivity, and contactless hygiene.",
    iconName: "Briefcase",
    image: IMAGES.corporateEvent,
    features: [
      "Customizable menus for multinational and local delegates",
      "Live hot beverage stations with freshly brewed tea & coffee",
      "Executive boxed lunches and sit-down banquet setups",
      "Dedicated corporate event manager on-site",
      "Strict temperature control and HACCP hygiene compliance",
    ],
    idealFor: ["Annual General Meetings (AGM)", "Conferences & Summits", "Product Launches", "Executive Board Lunches"],
    sampleMenu: ["Executive Corporate Buffet", "Continental Platter", "Hi-Tea Executive Reception"],
    isSample: true,
  },
  {
    id: "srv-wedding",
    slug: "wedding-catering",
    title: "Wedding Catering",
    titleBn: "বিবাহ ও রিসেপশন ক্যাটারিং",
    shortDesc: "Lavish Mughal and multi-cuisine feasts crafted to make your dream wedding an unforgettable royal culinary experience.",
    fullDesc:
      "A Bangladeshi wedding is defined by the richness of its food and the warmth of its hospitality. ICCB Catering brings decades of culinary heritage from our master Ustats. From melting Kacchi Biryani to slow-simmered Rezala and traditional Borhani, we treat your wedding guests with royal honor and unmatched hygiene.",
    iconName: "HeartHandshake",
    image: IMAGES.weddingReception,
    features: [
      "Authentic Old Dhaka Mughal recipes prepared by master chefs",
      "Meats processed in our own dedicated modern slaughterhouse",
      "Tasting sessions arranged prior to final confirmation",
      "Elegant porcelain, silverware, and chafing dish presentation",
      "VIP bridal table personalized butler service",
    ],
    idealFor: ["Holud & Mehendi Nights", "Wedding Receptions", "Walima Banquets", "Engagement Ceremonies"],
    sampleMenu: ["Royal Mughal Wedding Feast", "Dhakai Shahi Banquet", "Grand Walima Special"],
    isSample: true,
  },
  {
    id: "srv-birthday",
    slug: "birthday-party-catering",
    title: "Birthday & Social Gathering Catering",
    titleBn: "জন্মদিন ও পারিবারিক অনুষ্ঠান ক্যাটারিং",
    shortDesc: "Vibrant menus and attentive catering for milestone birthdays, anniversaries, family reunions, and private parties.",
    fullDesc:
      "Celebrate life's happiest moments without the stress of cooking or cleanup. ICCB Catering provides personalized menus that cater to every generation, featuring kids' favorites, rich traditional dishes for elders, and mocktail bars that keep everyone smiling.",
    iconName: "Cake",
    image: IMAGES.birthdayParty,
    features: [
      "Crowd-pleasing menus with customizable spice levels",
      "Dedicated cake-cutting setup with dessert service",
      "Finger food stations, live skewers, and dessert carts",
      "Complete cleanup and venue restoration post-party",
    ],
    idealFor: ["Milestone Birthdays", "Anniversary Celebrations", "Family Get-Togethers", "Graduation Parties"],
    sampleMenu: ["Social & Birthday Celebration Spread", "Asian Fusion Party Menu"],
    isSample: true,
  },
  {
    id: "srv-outdoor",
    slug: "outdoor-catering",
    title: "Outdoor & Off-Premises Catering",
    titleBn: "আউটডোর ও অফ-প্রিমাইসেস ক্যাটারিং",
    shortDesc: "Full-service mobile catering brought directly to your office campus, private villa, or open-air lawn across Dhaka.",
    fullDesc:
      "While ICCB operates 4 massive convention halls in Kuril, our catering logistics team easily deploys anywhere across Greater Dhaka. Equipped with mobile hot-holding insulated chambers and professional field kitchens, we guarantee that food arrives steaming hot and ready to serve.",
    iconName: "Truck",
    image: IMAGES.privateParty,
    features: [
      "Thermal insulated food transport maintaining 65°C+ serving temperature",
      "Complete mobile buffet line including tents and lighting if needed",
      "On-site finishing kitchen for piping hot naans and grills",
      "Complete waste management and environmental cleanup",
    ],
    idealFor: ["Corporate Factory Outings", "Private Lawn Banquets", "Embassy Receptions", "Sports Meets"],
    sampleMenu: ["Mobile BBQ & Kebab Counter", "All-Occasion Bengali Platter"],
    isSample: true,
  },
];
```

---

## `src/data/settings.ts`

```typescript
import { SiteSettings } from "@/types";
import { SITE_INFO } from "./site";

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: SITE_INFO.name,
  tagline: SITE_INFO.tagline,
  address: SITE_INFO.contact.address,
  cateringPhone: SITE_INFO.contact.cateringPhone,
  bookingPhones: SITE_INFO.contact.bookingPhones,
  cateringEmail: SITE_INFO.contact.cateringEmail,
  generalEmail: SITE_INFO.contact.generalEmail,
  whatsappNumber: SITE_INFO.contact.whatsappNumber,
  hours: SITE_INFO.contact.hours,
  announcementBar: {
    enabled: true,
    text: "Winter Wedding Season 2026-2027: Limited hall dates open. Book your tasting session today!",
    linkText: "Book Tasting",
    linkUrl: "/tasting",
  },
  offerPopup: {
    enabled: true,
    title: "Exclusive Season Privilege",
    discountText: "Complimentary Borhani Station for bookings over 500 guests",
    description: "Submit an event quote today and claim our signature clay-pot Borhani setup at zero extra charge.",
    code: "ICCBWINTER26",
  },
  socialLinks: {
    facebook: "https://facebook.com/iccbbashundhara",
    instagram: "https://instagram.com/iccbcatering",
    linkedin: "https://linkedin.com/company/iccb-dhaka",
    youtube: "https://youtube.com/@iccbbashundhara",
  },
};
```

---

## `src/data/site.ts`

```typescript
export const SITE_INFO = {
  name: "ICCB Catering",
  fullName: "International Convention City Bashundhara Catering",
  tagline: "Taste of Happiness",
  taglineBn: "সুখের স্বাদ",
  positioning:
    "A hassle-free, one-stop catering experience offering great taste and a competitive price range. Where most caterers compromise either taste or hygiene, ICCB guarantees both with uncompromising international standards.",
  positioningBn:
    "ঝামেলামুক্ত ক্যাটারিং অভিজ্ঞতা, চমৎকার স্বাদ ও সাশ্রয়ী মূল্য। স্বাদ এবং স্বাস্থ্যবিধি উভয়ের শতভাগ নিশ্চয়তা দেয় আইসিসিবি ক্যাটারিং।",
  pledge: "Delivering a remarkable hospitality experience for every customer and guest.",
  foundedYear: 2015,
  operatingSince: "1 January 2015",
  venueStats: {
    totalHalls: 4,
    guestCapacity: 10000,
    establishedDate: "1 January 2015",
    isSouthAsiaLargest: true,
  },
  specialties: [
    {
      id: "slaughterhouse",
      title: "Modern Slaughterhouse",
      titleBn: "আধুনিক কসাইখানা",
      description: "Dedicated hygienic processing facility ensuring fresh, 100% Halal certified meats.",
      icon: "ShieldCheck",
    },
    {
      id: "quality-check",
      title: "Strict Quality Checking",
      titleBn: "কাঁচামাল ও খাদ্যের গুণমান যাচাই",
      description: "Rigorous testing of raw ingredients and finished dishes in our certified food lab.",
      icon: "CheckCircle2",
    },
    {
      id: "temperature-control",
      title: "Served in Proper Temperature",
      titleBn: "সঠিক তাপমাত্রায় পরিবেশন",
      description: "State-of-the-art thermal containers and hot-holding banquet units to preserve freshness.",
      icon: "ThermometerSun",
    },
    {
      id: "modern-kitchen",
      title: "Well-Equipped Modern Kitchen",
      titleBn: "আধুনিক সুযোগ-সুবিধা সম্পন্ন রান্নাঘর",
      description: "Industrial grade culinary infrastructure capable of serving 10,000+ guests simultaneously.",
      icon: "UtensilsCrossed",
    },
  ],
  contact: {
    address: "Next to 300 ft. Purbachal Express Highway, Dhaka 1229, Bangladesh (Kuril Bishwa Road)",
    cateringPhone: "+88-01991-197719",
    cateringEmail: "iccbcatering@bga-bd.com",
    bookingPhones: [
      "+88-02-41091551",
      "+88-01991-197719",
      "+88-01938-878717",
      "+88-01991-197718",
      "+88-01704-160389",
      "+88-01938-878790",
    ],
    generalEmail: "iccb@bga-bd.com",
    whatsappNumber: "+8801991197719",
    hours: "Open 7 Days a Week: 9:00 AM - 10:00 PM",
  },
  halls: [
    {
      name: "Gulnaksha (Hall 1)",
      capacity: "Up to 2,500 guests",
      area: "25,000 sq ft",
      description: "Grand pillarless hall ideal for lavish weddings and major corporate conferences.",
    },
    {
      name: "Pushpaguchha (Hall 2)",
      capacity: "Up to 2,000 guests",
      area: "20,000 sq ft",
      description: "Sophisticated venue fitted with acoustic paneling and intelligent lighting.",
    },
    {
      name: "Rajdarshan (Hall 3)",
      capacity: "Up to 3,000 guests",
      area: "30,000 sq ft",
      description: "Our largest hall, host to South Asia's premier expos, galas, and national summits.",
    },
    {
      name: "Naboratna (Hall 4)",
      capacity: "Up to 2,500 guests",
      area: "25,000 sq ft",
      description: "Versatile modular hall accommodating banquet layouts, exhibitions, and social functions.",
    },
  ],
  heritageRestaurant: {
    name: "ICCB Heritage Restaurant",
    concept: "Mughal-themed authentic fine dining restaurant",
    opened: "June 2021",
    location: "ICCB Premises, Kuril Bishwa Road, Dhaka",
  },
};
```

---

## `src/data/testimonials.ts`

```typescript
import { Testimonial } from "@/types";
import { IMAGES } from "./images";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Tanvir Ahmed",
    role: "Head of Corporate Affairs",
    company: "Standard Chartered Bank Dhaka",
    eventType: "Annual Corporate Gala (800 Guests)",
    content:
      "ICCB Catering set an unprecedented benchmark for our annual corporate gala. Serving 800 high-profile guests simultaneously without a minute's delay, with food served piping hot and tasting like a luxury boutique kitchen, is something only ICCB can pull off in Bangladesh.",
    rating: 5,
    avatarUrl: IMAGES.avatar2,
    date: "14 October, 2026",
    approved: true,
    isSample: true,
  },
  {
    id: "test-2",
    author: "Farhana & Dr. Sadman Chowdhury",
    role: "Bride & Groom",
    company: "Wedding Reception",
    eventType: "Wedding Reception at Hall 3 (1,200 Guests)",
    content:
      "Our relatives still talk about the Shahi Kacchi Biryani and the Borhani served at our wedding! What amazed us most was the hygiene and temperature of every dish. The dedicated VIP table service gave our parents total peace of mind.",
    rating: 5,
    avatarUrl: IMAGES.avatar1,
    date: "28 September, 2026",
    approved: true,
    isSample: true,
  },
  {
    id: "test-3",
    author: "Nabila Hossain",
    role: "Managing Director",
    company: "Aura Lifestyle",
    eventType: "Brand Launch High-Tea (250 Guests)",
    content:
      "From the initial tasting session to the final event execution, the ICCB Catering team was exceptionally professional. The Continental canapés, live pasta bar, and presentation were world-class. Highly recommended!",
    rating: 5,
    avatarUrl: IMAGES.avatar4,
    date: "05 August, 2026",
    approved: true,
    isSample: true,
  },
  {
    id: "test-4",
    author: "Kamrul Islam, FCA",
    role: "Convener",
    company: "ICAB National Conference",
    eventType: "National Summit (2,000 Delegates)",
    content:
      "Managing food logistics for a two-day national conference is a monumental challenge. ICCB's modern kitchen infrastructure, automated slaughterhouse meat tracking, and punctual delivery made the catering seamless.",
    rating: 5,
    avatarUrl: IMAGES.avatar3,
    date: "12 July, 2026",
    approved: true,
    isSample: true,
  },
];
```

---

## `src/data/users.ts`

```typescript
import { User } from "@/types";
import { IMAGES } from "./images";

export const DEMO_USERS: User[] = [
  {
    id: "usr-admin",
    name: "Tariqul Alam",
    email: "admin@iccb.demo",
    role: "Admin",
    status: "active",
    avatarUrl: IMAGES.avatar3,
    lastLogin: "2026-11-05T09:12:00Z",
    phone: "+8801991197719",
  },
  {
    id: "usr-sales",
    name: "Zubair Hossain",
    email: "sales@iccb.demo",
    role: "Sales",
    status: "active",
    avatarUrl: IMAGES.avatar2,
    lastLogin: "2026-11-05T08:30:00Z",
    phone: "+8801991197718",
  },
  {
    id: "usr-editor",
    name: "Nusrat Jahan",
    email: "editor@iccb.demo",
    role: "Content Editor",
    status: "active",
    avatarUrl: IMAGES.avatar4,
    lastLogin: "2026-11-04T17:45:00Z",
    phone: "+8801704160389",
  },
  {
    id: "usr-viewer",
    name: "Audit Officer",
    email: "viewer@iccb.demo",
    role: "Viewer",
    status: "active",
    avatarUrl: IMAGES.avatar1,
    lastLogin: "2026-11-03T11:20:00Z",
    phone: "+8801938878790",
  },
];
```

---

## `src/lib/analytics.ts`

```typescript
export type AnalyticsEvent =
  | "quote_submitted"
  | "booking_submitted"
  | "tasting_requested"
  | "call_clicked"
  | "whatsapp_clicked"
  | "menu_viewed"
  | "package_calculated"
  | "newsletter_subscribed";

interface AnalyticsRecord {
  event: AnalyticsEvent;
  metadata?: Record<string, any>;
  timestamp: string;
}

const STORAGE_KEY = "iccb_analytics_events";

export function track(event: AnalyticsEvent, metadata?: Record<string, any>) {
  const record: AnalyticsRecord = {
    event,
    metadata,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.log(`[ICCB Analytics] ${event}`, metadata || {});
  }

  if (typeof window !== "undefined") {
    try {
      const existing: AnalyticsRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.unshift(record);
      // Keep up to 100 recent events
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      // Storage error ignored
    }
  }
}

export function getAnalyticsEvents(): AnalyticsRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}
```

---

## `src/lib/axios.ts`

```typescript
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { handleMockRequest } from "./mock-api/adapter";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
// Set to false when connecting to a real external REST backend
export const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("iccb_auth_token="))
        ?.split("=")[1];
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// If mock API is enabled, bypass standard network requests and serve from our localStorage mock adapter
if (USE_MOCK_API) {
  apiClient.defaults.adapter = async (config) => {
    const method = config.method || "get";
    const url = config.url || "";
    let parsedData = config.data;
    if (typeof config.data === "string") {
      try {
        parsedData = JSON.parse(config.data);
      } catch (e) {
        parsedData = config.data;
      }
    }

    try {
      const mockRes = await handleMockRequest(method, url, parsedData, config.params);
      return {
        data: mockRes.data,
        status: mockRes.status,
        statusText: mockRes.status === 200 || mockRes.status === 201 ? "OK" : "Error",
        headers: {},
        config,
        request: {},
      };
    } catch (err: any) {
      return Promise.reject({
        response: {
          data: { message: err?.message || "Mock adapter error" },
          status: 500,
        },
      });
    }
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred.";
    if (typeof window !== "undefined" && error.response?.status !== 404) {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## `src/lib/format.ts`

```typescript
export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString('en-IN')}`;
}

export const formatCurrencyBDT = formatCurrency;

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  // Handles both DD/MM/YYYY and ISO string
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    return dateString;
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatLongDate(dateString: string): string {
  if (!dateString) return '';
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    const [d, m, y] = dateString.split('/').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}
```

---

## `src/lib/i18n.ts`

```typescript
export type Locale = "en" | "bn";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      menu: "Menu",
      packages: "Packages",
      gallery: "Gallery",
      venues: "Venues",
      blog: "Blog",
      contact: "Contact",
      getQuote: "Get a Quote",
      dashboard: "Dashboard",
      signIn: "Sign In",
    },
    hero: {
      tagline: "Taste of Happiness",
      title: "DELICIOUS FOOD FOR ANY EVENT",
      subtitle:
        "Dhaka's premier one-stop catering service. Uncompromising taste crafted by master chefs, certified hygienic processing, and grand hospitality for weddings, corporate summits, and social celebrations.",
      ctaQuote: "Get a Quote",
      ctaMenu: "Explore Menu",
      trust1: "100% Halal Meats",
      trust2: "Modern Slaughterhouse",
      trust3: "Lab Quality Checked",
      trust4: "Served Hot 65°C+",
    },
    specialties: {
      tag: "THE ICCB CATERING PLEDGE",
      heading: "WHY BANGLADESH TRUSTS ICCB",
    },
    todaysMenu: {
      tag: "CHEF'S SPECIAL SELECTION",
      heading: "TODAY'S SPECIAL MENU",
      viewAll: "View Complete Menu",
    },
    cta: {
      heading: "Planning a Memorable Event?",
      subheading: "Let ICCB Catering take care of your culinary experience with unmatched taste and royal hospitality.",
      callNow: "Call for Inquiries",
      getQuote: "Request a Free Quote",
    },
  },
  bn: {
    nav: {
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      services: "সেবাসমূহ",
      menu: "মেন্যু",
      packages: "প্যাকেজ",
      gallery: "গ্যালারি",
      venues: "ভেন্যু",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
      getQuote: "কোটেশন নিন",
      dashboard: "ড্যাশবোর্ড",
      signIn: "সাইন ইন",
    },
    hero: {
      tagline: "সুখের স্বাদ",
      title: "যেকোনো অনুষ্ঠানের জন্য সুস্বাদু খাবার",
      subtitle:
        "ঢাকার শীর্ষস্থানীয় ওয়ান-স্টপ ক্যাটারিং সেবা। মাস্টার শেফদের অতুলনীয় রেসিপি, আন্তর্জাতিক স্বাস্থ্যবিধি এবং বিয়ে, কর্পোরেট সামিট ও যেকোনো উদযাপনে রাজকীয় আতিথেয়তা।",
      ctaQuote: "কোটেশন নিন",
      ctaMenu: "মেন্যু দেখুন",
      trust1: "১০০% হালাল মাংস",
      trust2: "নিজস্ব আধুনিক কসাইখানা",
      trust3: "ল্যাব টেস্ট নিশ্চিত মান",
      trust4: "সঠিক তাপমাত্রায় পরিবেশন",
    },
    specialties: {
      tag: "আইসিসিবি ক্যাটারিং প্রতিশ্রুতি",
      heading: "কেন বাংলাদেশ আইসিসিবি-কে বিশ্বাস করে",
    },
    todaysMenu: {
      tag: "শেফের বিশেষ পছন্দ",
      heading: "আজকের বিশেষ মেন্যু",
      viewAll: "সম্পূর্ণ মেন্যু দেখুন",
    },
    cta: {
      heading: "একটি স্মরণীয় অনুষ্ঠানের পরিকল্পনা করছেন?",
      subheading: "সেরা স্বাদ এবং রাজকীয় আতিথেয়তার সাথে আপনার অনুষ্ঠানের খাবারের দায়িত্ব দিন আইসিসিবি ক্যাটারিংকে।",
      callNow: "সরাসরি ফোন করুন",
      getQuote: "ফ্রি কোটেশন নিন",
    },
  },
};
```

---

## `src/lib/seo.ts`

```typescript
import { Metadata } from "next";
import { SITE_INFO } from "@/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iccbcatering.com";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_INFO.name} - Taste of Happiness`;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImage = image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80";

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_INFO.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "CateringBusiness"],
    name: SITE_INFO.name,
    legalName: SITE_INFO.fullName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: SITE_INFO.positioning,
    slogan: SITE_INFO.tagline,
    telephone: SITE_INFO.contact.cateringPhone,
    email: SITE_INFO.contact.cateringEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Next to 300 ft. Purbachal Express Highway, Kuril Bishwa Road",
      addressLocality: "Dhaka",
      postalCode: "1229",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.8223",
      longitude: "90.4287",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "22:00",
      },
    ],
    priceRange: "৳৳৳",
    servesCuisine: ["Mughal", "Continental", "Traditional Bengali", "Multi-cuisine"],
  };
}

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
```

---

## `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## `src/lib/mock-api/adapter.ts`

```typescript
import { mockStore } from "./mockStore";

interface MockResponse {
  status: number;
  data: any;
}

export async function handleMockRequest(
  method: string,
  url: string,
  data?: any,
  params?: any
): Promise<MockResponse> {
  // Artificial latency for realism
  await new Promise((r) => setTimeout(r, 150));

  const cleanUrl = url.split("?")[0].replace(/^\/api/, "");
  const upperMethod = method.toUpperCase();

  // /leads
  if (cleanUrl === "/leads" || cleanUrl.startsWith("/leads/")) {
    const leads = mockStore.getLeads();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2 && parts[1] !== "pipeline") {
        const found = leads.find((l) => l.id === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Lead not found" } };
      }
      let filtered = [...leads];
      if (params?.status && params.status !== "All") {
        filtered = filtered.filter((l) => l.status === params.status);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
      }
      return { status: 200, data: filtered };
    }

    if (upperMethod === "POST") {
      const newLead = {
        ...data,
        id: "lead-" + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: data.status || "New",
        notes: data.notes || [],
        activities: [
          {
            id: "act-" + Date.now(),
            type: "create",
            description: "Lead created",
            timestamp: new Date().toISOString(),
            user: "Online Visitor / User",
          },
        ],
      };
      leads.unshift(newLead);
      mockStore.saveLeads(leads);
      mockStore.logAction("CREATE", "Leads", `Created lead for ${newLead.name}`);
      return { status: 201, data: newLead };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const index = leads.findIndex((l) => l.id === id);
      if (index !== -1) {
        leads[index] = { ...leads[index], ...data, updatedAt: new Date().toISOString() };
        mockStore.saveLeads(leads);
        mockStore.logAction("UPDATE", "Leads", `Updated lead ${id}`);
        return { status: 200, data: leads[index] };
      }
      return { status: 404, data: { message: "Lead not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = leads.filter((l) => l.id !== id);
      mockStore.saveLeads(filtered);
      mockStore.logAction("DELETE", "Leads", `Deleted lead ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /menu
  if (cleanUrl === "/menu" || cleanUrl.startsWith("/menu/")) {
    const menu = mockStore.getMenu();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = menu.find((m) => m.id === parts[1] || m.slug === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Menu item not found" } };
      }
      let filtered = [...menu];
      if (params?.category && params.category !== "All") {
        filtered = filtered.filter((m) => m.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params?.cuisine && params.cuisine !== "All") {
        filtered = filtered.filter((m) => m.cuisine.toLowerCase() === params.cuisine.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
      }
      return { status: 200, data: filtered };
    }

    if (upperMethod === "POST") {
      const newItem = {
        ...data,
        id: "item-" + Date.now(),
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        isSample: true,
      };
      menu.unshift(newItem);
      mockStore.saveMenu(menu);
      mockStore.logAction("CREATE", "Menu", `Added dish ${newItem.name}`);
      return { status: 201, data: newItem };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const index = menu.findIndex((m) => m.id === id);
      if (index !== -1) {
        menu[index] = { ...menu[index], ...data };
        mockStore.saveMenu(menu);
        mockStore.logAction("UPDATE", "Menu", `Updated dish ${menu[index].name}`);
        return { status: 200, data: menu[index] };
      }
      return { status: 404, data: { message: "Item not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = menu.filter((m) => m.id !== id);
      mockStore.saveMenu(filtered);
      mockStore.logAction("DELETE", "Menu", `Deleted dish ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /quotations
  if (cleanUrl === "/quotations" || cleanUrl.startsWith("/quotations/")) {
    const quots = mockStore.getQuotations();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = quots.find((q) => q.id === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Quotation not found" } };
      }
      return { status: 200, data: quots };
    }

    if (upperMethod === "POST") {
      const newQuot = {
        ...data,
        id: "quot-" + Date.now(),
        quotationNumber: "QT-2026-" + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toISOString(),
        version: 1,
        isSample: true,
      };
      quots.unshift(newQuot);
      mockStore.saveQuotations(quots);
      mockStore.logAction("CREATE", "Quotations", `Generated quotation ${newQuot.quotationNumber}`);
      return { status: 201, data: newQuot };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = quots.findIndex((q) => q.id === id);
      if (idx !== -1) {
        quots[idx] = { ...quots[idx], ...data, version: (quots[idx].version || 1) + 1 };
        mockStore.saveQuotations(quots);
        mockStore.logAction("UPDATE", "Quotations", `Updated quotation ${id}`);
        return { status: 200, data: quots[idx] };
      }
      return { status: 404, data: { message: "Quotation not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = quots.filter((q) => q.id !== id);
      mockStore.saveQuotations(filtered);
      mockStore.logAction("DELETE", "Quotations", `Deleted quotation ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /bookings
  if (cleanUrl === "/bookings" || cleanUrl.startsWith("/bookings/")) {
    const bookings = mockStore.getBookings();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = bookings.find((b) => b.id === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Booking not found" } };
      }
      return { status: 200, data: bookings };
    }

    if (upperMethod === "POST") {
      const newBooking = {
        ...data,
        id: "bkg-" + Date.now(),
        bookingNumber: "BKG-2026-" + Math.floor(100 + Math.random() * 900),
        createdAt: new Date().toISOString(),
        isSample: true,
      };
      bookings.unshift(newBooking);
      mockStore.saveBookings(bookings);
      mockStore.logAction("CREATE", "Bookings", `Created booking ${newBooking.bookingNumber}`);
      return { status: 201, data: newBooking };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = bookings.findIndex((b) => b.id === id);
      if (idx !== -1) {
        bookings[idx] = { ...bookings[idx], ...data };
        mockStore.saveBookings(bookings);
        mockStore.logAction("UPDATE", "Bookings", `Updated booking ${id}`);
        return { status: 200, data: bookings[idx] };
      }
      return { status: 404, data: { message: "Booking not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = bookings.filter((b) => b.id !== id);
      mockStore.saveBookings(filtered);
      mockStore.logAction("DELETE", "Bookings", `Deleted booking ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /packages
  if (cleanUrl === "/packages") {
    return { status: 200, data: mockStore.getPackages() };
  }

  // /services
  if (cleanUrl === "/services") {
    return { status: 200, data: mockStore.getServices() };
  }

  // /blog
  if (cleanUrl === "/blog" || cleanUrl.startsWith("/blog/")) {
    const blog = mockStore.getBlog();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = blog.find((b) => b.id === parts[1] || b.slug === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Blog not found" } };
      }
      return { status: 200, data: blog };
    }

    if (upperMethod === "POST") {
      const newPost = {
        ...data,
        id: "blog-" + Date.now(),
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        publishedAt: new Date().toISOString().split("T")[0],
        isSample: true,
      };
      blog.unshift(newPost);
      mockStore.saveBlog(blog);
      mockStore.logAction("CREATE", "Blog", `Created blog post ${newPost.title}`);
      return { status: 201, data: newPost };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = blog.filter((b) => b.id !== id);
      mockStore.saveBlog(filtered);
      return { status: 200, data: { success: true } };
    }
  }

  // /testimonials
  if (cleanUrl === "/testimonials" || cleanUrl.startsWith("/testimonials/")) {
    const testimonials = mockStore.getTestimonials();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: testimonials };
    }
    if (upperMethod === "POST") {
      const newTestimonial = {
        ...data,
        id: "test-" + Date.now(),
        isSample: true,
      };
      testimonials.unshift(newTestimonial);
      mockStore.saveTestimonials(testimonials);
      mockStore.logAction("CREATE", "Testimonials", `Added testimonial from ${newTestimonial.clientName}`);
      return { status: 201, data: newTestimonial };
    }
    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = testimonials.findIndex((t) => t.id === id);
      if (idx !== -1) {
        testimonials[idx] = { ...testimonials[idx], ...data };
        mockStore.saveTestimonials(testimonials);
        mockStore.logAction("UPDATE", "Testimonials", `Updated testimonial ${id}`);
        return { status: 200, data: testimonials[idx] };
      }
      return { status: 404, data: { message: "Testimonial not found" } };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = testimonials.filter((t) => t.id !== id);
      mockStore.saveTestimonials(filtered);
      mockStore.logAction("DELETE", "Testimonials", `Deleted testimonial ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /faqs
  if (cleanUrl === "/faqs" || cleanUrl.startsWith("/faqs/")) {
    const faqs = mockStore.getFaqs();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: faqs };
    }
    if (upperMethod === "POST") {
      const newFaq = {
        ...data,
        id: "faq-" + Date.now(),
        isSample: true,
      };
      faqs.push(newFaq);
      mockStore.saveFaqs(faqs);
      mockStore.logAction("CREATE", "FAQs", `Created FAQ: ${newFaq.question}`);
      return { status: 201, data: newFaq };
    }
    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = faqs.findIndex((f) => f.id === id);
      if (idx !== -1) {
        faqs[idx] = { ...faqs[idx], ...data };
        mockStore.saveFaqs(faqs);
        mockStore.logAction("UPDATE", "FAQs", `Updated FAQ ${id}`);
        return { status: 200, data: faqs[idx] };
      }
      return { status: 404, data: { message: "FAQ not found" } };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = faqs.filter((f) => f.id !== id);
      mockStore.saveFaqs(filtered);
      mockStore.logAction("DELETE", "FAQs", `Deleted FAQ ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /gallery
  if (cleanUrl === "/gallery" || cleanUrl.startsWith("/gallery/")) {
    const gallery = mockStore.getGallery();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: gallery };
    }
    if (upperMethod === "POST") {
      const newItem = {
        ...data,
        id: "gal-" + Date.now(),
      };
      gallery.unshift(newItem);
      mockStore.saveGallery(gallery);
      mockStore.logAction("CREATE", "Gallery", `Added photo ${newItem.title}`);
      return { status: 201, data: newItem };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = gallery.filter((g) => g.id !== id);
      mockStore.saveGallery(filtered);
      mockStore.logAction("DELETE", "Gallery", `Deleted photo ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /audit-logs
  if (cleanUrl === "/audit-logs") {
    return { status: 200, data: mockStore.getAuditLogs() };
  }

  // /settings
  if (cleanUrl === "/settings") {
    if (upperMethod === "GET") {
      return { status: 200, data: mockStore.getSettings() };
    }
    if (upperMethod === "PUT" || upperMethod === "POST") {
      mockStore.saveSettings(data);
      mockStore.logAction("UPDATE", "Settings", "Updated site settings");
      return { status: 200, data };
    }
  }

  // /users
  if (cleanUrl === "/users" || cleanUrl.startsWith("/users/")) {
    const users = mockStore.getUsers();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: users };
    }
    if (upperMethod === "POST") {
      const newUser = {
        ...data,
        id: "usr-" + Date.now(),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      mockStore.saveUsers(users);
      mockStore.logAction("CREATE", "Users", `Added user ${newUser.name}`);
      return { status: 201, data: newUser };
    }
    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = users.findIndex((u) => u.id === id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...data };
        mockStore.saveUsers(users);
        mockStore.logAction("UPDATE", "Users", `Updated user ${id}`);
        return { status: 200, data: users[idx] };
      }
      return { status: 404, data: { message: "User not found" } };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = users.filter((u) => u.id !== id);
      mockStore.saveUsers(filtered);
      mockStore.logAction("DELETE", "Users", `Deleted user ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  return { status: 200, data: { message: "Mock endpoint acknowledged" } };
}
```

---

## `src/lib/mock-api/mockStore.ts`

```typescript
import {
  INITIAL_LEADS,
  INITIAL_QUOTATIONS,
  INITIAL_BOOKINGS,
  MENU_ITEMS,
  MENU_CATEGORIES,
  PACKAGES,
  SERVICES,
  GALLERY_ITEMS,
  TESTIMONIALS,
  FAQS,
  BLOG_POSTS,
  DEMO_USERS,
  INITIAL_SETTINGS,
} from "@/data";
import { Lead, Quotation, Booking, MenuItem, BlogPost, FAQ, Testimonial, GalleryItem, User, SiteSettings, Package, ServiceItem } from "@/types";

const STORAGE_KEYS = {
  LEADS: "iccb_mock_leads",
  QUOTATIONS: "iccb_mock_quotations",
  BOOKINGS: "iccb_mock_bookings",
  MENU: "iccb_mock_menu",
  PACKAGES: "iccb_mock_packages",
  SERVICES: "iccb_mock_services",
  GALLERY: "iccb_mock_gallery",
  TESTIMONIALS: "iccb_mock_testimonials",
  FAQS: "iccb_mock_faqs",
  BLOG: "iccb_mock_blog",
  USERS: "iccb_mock_users",
  SETTINGS: "iccb_mock_settings",
  AUDIT: "iccb_mock_audit_logs",
};

// In-memory fallback for SSR
const memoryStore: Record<string, any> = {
  [STORAGE_KEYS.LEADS]: [...INITIAL_LEADS],
  [STORAGE_KEYS.QUOTATIONS]: [...INITIAL_QUOTATIONS],
  [STORAGE_KEYS.BOOKINGS]: [...INITIAL_BOOKINGS],
  [STORAGE_KEYS.MENU]: [...MENU_ITEMS],
  [STORAGE_KEYS.PACKAGES]: [...PACKAGES],
  [STORAGE_KEYS.SERVICES]: [...SERVICES],
  [STORAGE_KEYS.GALLERY]: [...GALLERY_ITEMS],
  [STORAGE_KEYS.TESTIMONIALS]: [...TESTIMONIALS],
  [STORAGE_KEYS.FAQS]: [...FAQS],
  [STORAGE_KEYS.BLOG]: [...BLOG_POSTS],
  [STORAGE_KEYS.USERS]: [...DEMO_USERS],
  [STORAGE_KEYS.SETTINGS]: { ...INITIAL_SETTINGS },
  [STORAGE_KEYS.AUDIT]: [
    {
      id: "aud-1",
      userId: "usr-admin",
      userName: "Tariqul Alam",
      action: "UPDATE",
      module: "Menu",
      details: "Updated pricing for Shahi Kacchi Biryani",
      timestamp: "2026-11-04T12:00:00Z",
    },
    {
      id: "aud-2",
      userId: "usr-sales",
      userName: "Zubair Hossain",
      action: "CREATE",
      module: "Quotations",
      details: "Issued Quotation #QT-2026-0042 to Mahmudur Rahman",
      timestamp: "2026-11-03T14:15:00Z",
    },
  ],
};

function getItem<T>(key: string, defaultData: T): T {
  if (typeof window === "undefined") {
    return (memoryStore[key] as T) || defaultData;
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    return defaultData;
  }
}

function setItem<T>(key: string, data: T): void {
  if (typeof window === "undefined") {
    memoryStore[key] = data;
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // quota exceeded or SSR
  }
}

export const mockStore = {
  getLeads: () => getItem<Lead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS),
  saveLeads: (data: Lead[]) => setItem(STORAGE_KEYS.LEADS, data),

  getQuotations: () => getItem<Quotation[]>(STORAGE_KEYS.QUOTATIONS, INITIAL_QUOTATIONS),
  saveQuotations: (data: Quotation[]) => setItem(STORAGE_KEYS.QUOTATIONS, data),

  getBookings: () => getItem<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS),
  saveBookings: (data: Booking[]) => setItem(STORAGE_KEYS.BOOKINGS, data),

  getMenu: () => getItem<MenuItem[]>(STORAGE_KEYS.MENU, MENU_ITEMS),
  saveMenu: (data: MenuItem[]) => setItem(STORAGE_KEYS.MENU, data),

  getPackages: () => getItem<Package[]>(STORAGE_KEYS.PACKAGES, PACKAGES),
  savePackages: (data: Package[]) => setItem(STORAGE_KEYS.PACKAGES, data),

  getServices: () => getItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, SERVICES),
  saveServices: (data: ServiceItem[]) => setItem(STORAGE_KEYS.SERVICES, data),

  getGallery: () => getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, GALLERY_ITEMS),
  saveGallery: (data: GalleryItem[]) => setItem(STORAGE_KEYS.GALLERY, data),

  getTestimonials: () => getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS),
  saveTestimonials: (data: Testimonial[]) => setItem(STORAGE_KEYS.TESTIMONIALS, data),

  getFaqs: () => getItem<FAQ[]>(STORAGE_KEYS.FAQS, FAQS),
  saveFaqs: (data: FAQ[]) => setItem(STORAGE_KEYS.FAQS, data),

  getBlog: () => getItem<BlogPost[]>(STORAGE_KEYS.BLOG, BLOG_POSTS),
  saveBlog: (data: BlogPost[]) => setItem(STORAGE_KEYS.BLOG, data),

  getUsers: () => getItem<User[]>(STORAGE_KEYS.USERS, DEMO_USERS),
  saveUsers: (data: User[]) => setItem(STORAGE_KEYS.USERS, data),

  getSettings: () => getItem<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (data: SiteSettings) => setItem(STORAGE_KEYS.SETTINGS, data),

  getAuditLogs: () => getItem<any[]>(STORAGE_KEYS.AUDIT, memoryStore[STORAGE_KEYS.AUDIT]),
  logAction: (action: string, module: string, details: string, userName = "Admin") => {
    const logs = getItem<any[]>(STORAGE_KEYS.AUDIT, memoryStore[STORAGE_KEYS.AUDIT]);
    const newLog = {
      id: "aud-" + Date.now(),
      userId: "usr-current",
      userName,
      action,
      module,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    setItem(STORAGE_KEYS.AUDIT, logs);
  },

  resetAll: () => {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    }
  },
};
```

---

## `src/store/authStore.ts`

```typescript
import { create } from "zustand";
import { User, UserRole } from "@/types";
import { DEMO_USERS } from "@/data/users";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" && localStorage.getItem("iccb_auth_user")
    ? JSON.parse(localStorage.getItem("iccb_auth_user")!)
    : DEMO_USERS[0], // Default logged in as Admin for seamless reviewer exploration
  isAuthenticated: true,

  login: (email: string) => {
    const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const userToSet = matched || {
      id: "usr-" + Date.now(),
      name: email.split("@")[0].toUpperCase(),
      email,
      role: "Admin" as UserRole,
      status: "active" as const,
      avatarUrl: DEMO_USERS[0].avatarUrl,
      lastLogin: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("iccb_auth_user", JSON.stringify(userToSet));
      document.cookie = `iccb_auth_token=valid_token; path=/; max-age=86400`;
    }
    set({ user: userToSet, isAuthenticated: true });
    return true;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("iccb_auth_user");
      document.cookie = "iccb_auth_token=; path=/; max-age=0";
    }
    set({ user: null, isAuthenticated: false });
  },

  setUserRole: (role: UserRole) => {
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, role };
      if (typeof window !== "undefined") {
        localStorage.setItem("iccb_auth_user", JSON.stringify(updated));
      }
      return { user: updated };
    });
  },
}));
```

---

## `src/store/uiStore.ts`

```typescript
import { create } from "zustand";
import { Locale } from "@/lib/i18n";

interface QuoteDraft {
  eventType?: string;
  guestCount?: number;
  eventDate?: string;
  venue?: string;
  packageId?: string;
  packageName?: string;
  estimatedTotal?: number;
}

interface UIState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  announcementDismissed: boolean;
  setAnnouncementDismissed: (dismissed: boolean) => void;
  offerPopupDismissed: boolean;
  setOfferPopupDismissed: (dismissed: boolean) => void;
  quoteDraft: QuoteDraft;
  setQuoteDraft: (draft: Partial<QuoteDraft>) => void;
  clearQuoteDraft: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  announcementDismissed: false,
  setAnnouncementDismissed: (announcementDismissed) => set({ announcementDismissed }),
  offerPopupDismissed: false,
  setOfferPopupDismissed: (offerPopupDismissed) => set({ offerPopupDismissed }),
  quoteDraft: {
    guestCount: 200,
  },
  setQuoteDraft: (draft) =>
    set((state) => ({
      quoteDraft: { ...state.quoteDraft, ...draft },
    })),
  clearQuoteDraft: () => set({ quoteDraft: { guestCount: 200 } }),
}));
```

---

## `src/types/index.ts`

```typescript
export type LeadStatus = 'New' | 'Contacted' | 'Tasting' | 'Quoted' | 'Won' | 'Lost';
export type LeadType = 'quote' | 'booking' | 'tasting' | 'inquiry' | 'general';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  city: string;
  eventType: string;
  venue?: string;
  guestCount: number;
  eventDate: string; // DD/MM/YYYY
  budgetRange?: string;
  cuisinePreference?: string;
  packagePreference?: string;
  message?: string;
  status: LeadStatus;
  type: LeadType;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  notes: LeadNote[];
  activities: LeadActivity[];
  isSample?: boolean;
}

export interface QuotationItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface QuotationExtra {
  id: string;
  name: string;
  price: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  leadId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  guestCount: number;
  packageName: string;
  packagePricePerHead: number;
  items: QuotationItem[];
  extras: QuotationExtra[];
  subtotal: number;
  taxRate: number; // e.g., 0.05 (5%)
  taxAmount: number;
  discount: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  version: number;
  notes?: string;
  createdAt: string;
  isSample?: boolean;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  leadId?: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  hallOrVenue: string;
  eventDate: string;
  guests: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  totalAmount: number;
  paidAmount: number;
  notes?: string;
  createdAt: string;
  isSample?: boolean;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  description: string;
  descriptionBn?: string;
  category: 'Appetizers' | 'Mains' | 'Biryani & Rice' | 'Curries' | 'Desserts' | 'Beverages' | 'Breads';
  cuisine: 'Mughal' | 'Continental' | 'Multi-cuisine' | 'Traditional Bengali' | 'Chinese';
  price: number; // BDT
  image: string;
  dietTags: ('Halal' | 'Veg' | 'Non-Veg' | 'Spicy' | 'Chef Special')[];
  isAvailable: boolean;
  isFeatured: boolean;
  isTodaysMenu: boolean;
  allergens?: string[];
  preparationTime?: string;
  calories?: string;
  isSample?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  tag?: string; // e.g. "Most Popular", "Executive Choice"
  description: string;
  pricePerHead: number; // BDT
  minGuests: number;
  cuisineType: string;
  courses: {
    name: string;
    items: string[];
  }[];
  inclusions: string[];
  popular?: boolean;
  isSample?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
  idealFor: string[];
  sampleMenu?: string[];
  isSample?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Corporate' | 'Social' | 'Plating' | 'Venues';
  imageUrl: string;
  caption?: string;
  isSample?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  eventType: string;
  content: string;
  rating: number;
  avatarUrl: string;
  date: string;
  approved: boolean;
  isSample?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  questionBn?: string;
  answer: string;
  answerBn?: string;
  category: 'General' | 'Booking & Payment' | 'Menu & Tasting' | 'Logistics' | 'Venues';
  order: number;
  isSample?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published' | 'scheduled';
  seoTitle?: string;
  seoDescription?: string;
  isSample?: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  category: string;
  isSample?: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  isSample?: boolean;
}

export type UserRole = 'Admin' | 'Sales' | 'Content Editor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  avatarUrl: string;
  lastLogin: string;
  phone?: string;
}

export interface RolePermission {
  id: string;
  name: UserRole;
  description: string;
  permissions: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'quotation' | 'booking' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  isSample?: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  isSample?: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  address: string;
  cateringPhone: string;
  bookingPhones: string[];
  cateringEmail: string;
  generalEmail: string;
  whatsappNumber: string;
  hours: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  offerPopup: {
    enabled: boolean;
    title: string;
    discountText: string;
    description: string;
    code: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}
```

---

## Dashboard CMS Page Paths (List Only)

The following 40 pages belong exclusively to the internal CMS / Admin Dashboard and are not included in full source:

- `src/app/(dashboardRoute)/dashboard/analytics/page.tsx`
- `src/app/(dashboardRoute)/dashboard/audit-logs/page.tsx`
- `src/app/(dashboardRoute)/dashboard/banners/page.tsx`
- `src/app/(dashboardRoute)/dashboard/blog/[id]/edit/page.tsx`
- `src/app/(dashboardRoute)/dashboard/blog/categories/page.tsx`
- `src/app/(dashboardRoute)/dashboard/blog/new/page.tsx`
- `src/app/(dashboardRoute)/dashboard/blog/page.tsx`
- `src/app/(dashboardRoute)/dashboard/blog/tags/page.tsx`
- `src/app/(dashboardRoute)/dashboard/bookings/page.tsx`
- `src/app/(dashboardRoute)/dashboard/clients/page.tsx`
- `src/app/(dashboardRoute)/dashboard/contacts/page.tsx`
- `src/app/(dashboardRoute)/dashboard/email-templates/page.tsx`
- `src/app/(dashboardRoute)/dashboard/faqs/page.tsx`
- `src/app/(dashboardRoute)/dashboard/forms/page.tsx`
- `src/app/(dashboardRoute)/dashboard/gallery/page.tsx`
- `src/app/(dashboardRoute)/dashboard/leads/[id]/page.tsx`
- `src/app/(dashboardRoute)/dashboard/leads/page.tsx`
- `src/app/(dashboardRoute)/dashboard/leads/pipeline/page.tsx`
- `src/app/(dashboardRoute)/dashboard/media/page.tsx`
- `src/app/(dashboardRoute)/dashboard/menu/[id]/edit/page.tsx`
- `src/app/(dashboardRoute)/dashboard/menu/categories/page.tsx`
- `src/app/(dashboardRoute)/dashboard/menu/new/page.tsx`
- `src/app/(dashboardRoute)/dashboard/menu/page.tsx`
- `src/app/(dashboardRoute)/dashboard/news/page.tsx`
- `src/app/(dashboardRoute)/dashboard/notifications/page.tsx`
- `src/app/(dashboardRoute)/dashboard/packages/page.tsx`
- `src/app/(dashboardRoute)/dashboard/page.tsx`
- `src/app/(dashboardRoute)/dashboard/pages/page.tsx`
- `src/app/(dashboardRoute)/dashboard/profile/page.tsx`
- `src/app/(dashboardRoute)/dashboard/quotations/[id]/page.tsx`
- `src/app/(dashboardRoute)/dashboard/quotations/new/page.tsx`
- `src/app/(dashboardRoute)/dashboard/quotations/page.tsx`
- `src/app/(dashboardRoute)/dashboard/roles/page.tsx`
- `src/app/(dashboardRoute)/dashboard/seo/page.tsx`
- `src/app/(dashboardRoute)/dashboard/services/page.tsx`
- `src/app/(dashboardRoute)/dashboard/settings/page.tsx`
- `src/app/(dashboardRoute)/dashboard/subscribers/page.tsx`
- `src/app/(dashboardRoute)/dashboard/testimonials/page.tsx`
- `src/app/(dashboardRoute)/dashboard/users/page.tsx`
- `src/app/(dashboardRoute)/layout.tsx`

