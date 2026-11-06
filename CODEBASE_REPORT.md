# CODEBASE_REPORT.md: Comprehensive Technical Audit & Architecture Review
**Project:** ICCB Catering Website & CMS Dashboard  
**Repository Branch:** `redesign-v1`  
**Date of Audit:** November 2026  
**Auditor Mode:** Read-Only Analysis for Redesign Planning  

---

## 1. Overview

### Project Identity & Purpose
The project is a full-stack Next.js web application for **ICCB Catering** (International Convention City Bashundhara Catering), Dhaka, Bangladesh. It comprises two major facets:
1. **Public Marketing Website**: Showcases catering services (Wedding, Corporate, Social, Lunch Box), menus, event packages, interactive cost estimation calculator, venue halls, tasting booking, and inquiry forms.
2. **Administrative CMS & CRM Dashboard**: A complete internal portal (`/dashboard`) including lead management (list + Kanban pipeline), quotation builder, booking tracking, menu CRUD, content editors (services, packages, blog, news, FAQs, gallery), role simulation, and audit logging.
3. **Mock REST API Layer**: An in-browser mock REST adapter that intercepts Axios requests and simulates a live backend using `localStorage` and memory fallback.

### Framework & Runtime Environment
- **Framework**: Next.js 14.2.35 (App Router architecture)
- **React**: React 18.3.1 (`react`, `react-dom`)
- **Language**: TypeScript 5 (`tsconfig.json` target ESNext with `"strict": true`)
- **Styling**: Tailwind CSS 3.4.1 with PostCSS 8
- **Icons**: Lucide React 1.69.0
- **Animation**: Framer Motion 14.9.1
- **Forms & Validation**: React Hook Form 7.91.0 + Zod 4.6.7 + `@hookform/resolvers` 7.0.3
- **Notifications**: Sonner 2.0.8 (`<Toaster />` in root layout)
- **Charts**: Recharts 3.10.1 (Used only in dashboard)
- **State Management**: Zustand 5.0.16
- **HTTP Client**: Axios 1.21.0

### Scripts in `package.json`
- `npm run dev`: Runs Next.js dev server (`next dev`)
- `npm run build`: Compiles production build (`next build`)
- `npm run start`: Launches production server (`next start`)
- `npm run lint`: Runs ESLint check (`next lint`)

### Dependencies Classification
| Dependency | Version | Status | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `next` | `14.2.35` | **Active / Used** | App Router framework, SSR, routing, metadata |
| `react`, `react-dom` | `^18` | **Active / Used** | Core UI rendering |
| `typescript` | `^5` | **Active / Used** | Type safety across entire codebase |
| `tailwindcss` | `^3.4.1` | **Active / Used** | Utility-first CSS styling system |
| `postcss` | `^8` | **Active / Used** | CSS post-processing pipeline |
| `framer-motion` | `^14.9.1` | **Active / Used** | Scroll-triggered reveals, modals, accordion transitions |
| `lucide-react` | `^1.69.0` | **Active / Used** | UI icons across public site and CMS |
| `clsx`, `tailwind-merge` | `^2.1.1`, `^3.7.0` | **Active / Used** | Dynamic Tailwind class merge utility (`src/lib/utils.ts: cn()`) |
| `sonner` | `^2.0.8` | **Active / Used** | Toast alerts for forms and dashboard actions |
| `react-hook-form` | `^7.91.0` | **Active / Used** | Form state management on quote, inquiry, booking forms |
| `zod` | `^4.6.7` | **Active / Used** | Validation schemas for quote, inquiry, tasting forms |
| `@hookform/resolvers` | `^7.0.3` | **Active / Used** | Bridge connecting Zod validation schemas to React Hook Form |
| `axios` | `^1.21.0` | **Dashboard / Mock Only** | Powers `apiClient` with mock interceptor. Not strictly needed for static public site |
| `zustand` | `^5.0.16` | **Removable / Unneeded** | Used for `uiStore` (locale, mobile drawer) and `authStore` (mock login) |
| `recharts` | `^3.10.1` | **Dashboard Only / Unneeded** | Used exclusively in `/dashboard/analytics` and `/dashboard` KPI chart |
| `eslint`, `eslint-config-next` | `^8`, `14.2.35` | **Dev Only** | Static code analysis |

---

## 2. Folder Tree & Architecture

```
ICCBWebsite/
├── .eslintrc.json              # ESLint configuration extends "next/core-web-vitals"
├── .gitignore                  # Git ignores node_modules, .next, .env, build outputs
├── next.config.mjs             # Next.js config: image domains (images.unsplash.com), eslint build bypass
├── package.json                # Project dependencies, metadata ("temp-app"), scripts
├── postcss.config.mjs          # PostCSS config registering Tailwind CSS plugin
├── README.md                   # Initial project overview and requirements
├── tailwind.config.ts          # Custom color palette (brand, ink), typography, shadows
├── tsconfig.json               # Path alias `@/* -> ./src/*`, strict typechecking
└── src/
    ├── middleware.ts           # Route guard protecting `/dashboard/*` via cookie check
    ├── types/
    │   └── index.ts            # Central TypeScript domain types (Lead, Quotation, Booking, MenuItem, etc.)
    ├── app/                    # Next.js App Router root
    │   ├── layout.tsx          # Root HTML shell, Google Fonts (Oswald, Inter, Playfair), Toaster
    │   ├── globals.css         # CSS reset, brand CSS variables, custom scrollbars, print styles
    │   ├── error.tsx           # Global fallback error boundary
    │   ├── loading.tsx         # Global loading indicator
    │   ├── not-found.tsx       # Custom 404 page with return links
    │   ├── robots.ts           # Dynamic robots.txt disallowing /dashboard/ and /api/
    │   ├── sitemap.ts          # Dynamic XML sitemap generator for all public pages and slugs
    │   ├── (dashboardRoute)/   # Route group for administrative CMS
    │   │   ├── layout.tsx      # Dashboard shell with persistent Sidebar and Topbar
    │   │   └── dashboard/      # 38 subroutes: leads, quotes, bookings, menu, pages, etc.
    │   └── (publicRoute)/      # Route group for customer-facing website
    │       ├── layout.tsx      # Public layout with Header, Footer, AnnouncementBar, MobileMenu, Popups
    │       ├── page.tsx        # Homepage composing 13 section components
    │       ├── (auth)/         # Auth pages: /sign-in, /sign-up, /forgot-password, /reset-password
    │       ├── about/          # About ICCB page
    │       ├── menu/           # Complete catering catalog with filters and [slug] item details
    │       ├── packages/       # Catering packages list and [slug] single package view
    │       ├── services/       # Services listing + dedicated subpages (wedding, corporate, birthday)
    │       ├── cuisines/[slug] # Cuisine specialty pages (Mughal, Continental, Multi-cuisine)
    │       ├── events/[type]   # Event type spotlight pages (wedding, conference, iftar)
    │       ├── quote/          # 4-step interactive Quote Builder wizard
    │       ├── booking/        # Formal event booking reservation form
    │       ├── tasting/        # Food tasting session appointment request form
    │       ├── inquiry/        # General banquet inquiry form
    │       ├── contact/        # Contact information, phone desk, map, contact form
    │       ├── gallery/        # Filterable photo gallery with fullscreen lightbox
    │       ├── venues/         # Detailed breakdown of ICCB's 4 convention halls
    │       ├── our-process/    # 5-step hospitality and hygiene workflow page
    │       ├── lunch-box/      # Corporate bulk lunch box ordering information
    │       ├── testimonials/   # Customer reviews page
    │       ├── blog/           # Blog posts listing and [slug] articles
    │       ├── faq/            # Categorized FAQ accordion page
    │       ├── offers/         # Seasonal promotions & discounts page
    │       ├── search/         # Live search page across dishes and packages
    │       ├── careers/        # Hospitality career listings page
    │       ├── thank-you/      # Post-submission confirmation page
    │       ├── privacy-policy/ # Legal privacy policy
    │       ├── terms/          # Terms of service
    │       └── cancellation-policy/ # Booking cancellation and deposit terms
    ├── components/
    │   ├── layout/             # Persistent layout chrome (Header, Footer, MobileMenu, Popups)
    │   ├── sections/           # Modular homepage presentation sections
    │   ├── ui/                 # Reusable atomic UI elements (Button, Input, Card, Modal, etc.)
    │   ├── motion/             # Framer Motion animation primitives (FadeIn, SlideUp, CountUp)
    │   ├── forms/              # Zod-validated client form components
    │   ├── calculator/         # Interactive pricing estimation widget (PackageCalculator)
    │   └── dashboard/          # Internal CMS admin widgets (Sidebar, Topbar, StatCard, StatusBadge)
    ├── data/                   # Static data dictionaries, mock DB fixtures, navigation links
    ├── lib/                    # Shared utilities, formatting, i18n dictionary, SEO helpers, mock-api
    ├── services/               # Axios service layer methods for Leads, Menu, Quotations, Content
    └── store/                  # Zustand state stores (uiStore, authStore)
```

---

## 3. Routing Architecture

### Middleware Logic (`src/middleware.ts`)
```ts
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("iccb_auth_token")?.value;
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
*Behavior*: Intercepts every route matching `/dashboard/:path*`. Inspects cookie `iccb_auth_token`. If missing, redirects client to `/sign-in?from=<path>`.

### Public Routes Overview (`src/app/(publicRoute)`)
| Route URL | File Path | Component Type | What It Renders |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/(publicRoute)/page.tsx` | **Server** | Homepage composing JSON-LD schema + 13 section components |
| `/about` | `src/app/(publicRoute)/about/page.tsx` | **Server** | ICCB history, 2015 founding, facility stats, leadership, mission |
| `/menu` | `src/app/(publicRoute)/menu/page.tsx` | **Client** | Full dish catalog with category pills, search bar, dietary tags |
| `/menu/[slug]` | `src/app/(publicRoute)/menu/[slug]/page.tsx` | **Server** | Single dish detail: ingredients, allergens, nutrition, request quote CTA |
| `/packages` | `src/app/(publicRoute)/packages/page.tsx` | **Server** | Event package cards + interactive `<PackageCalculator />` |
| `/packages/[slug]` | `src/app/(publicRoute)/packages/[slug]/page.tsx` | **Server** | Itemized course breakdown, inclusions, per-head price |
| `/services` | `src/app/(publicRoute)/services/page.tsx` | **Server** | 4 core services cards with features and ideal audience |
| `/services/[slug]` | `src/app/(publicRoute)/services/[slug]/page.tsx` | **Server** | Dynamic service detail view |
| `/services/wedding-catering` | `src/app/.../wedding-catering/page.tsx` | **Server** | Dedicated wedding catering showcase |
| `/services/corporate-catering` | `src/app/.../corporate-catering/page.tsx` | **Server** | Dedicated corporate banquet showcase |
| `/services/birthday-party-catering` | `src/app/.../birthday-party-catering/page.tsx` | **Server** | Milestone birthday & social party showcase |
| `/cuisines/[slug]` | `src/app/(publicRoute)/cuisines/[slug]/page.tsx` | **Server** | Cuisine showcase (`mughal`, `continental`, `multi-cuisine`) |
| `/events/[type]` | `src/app/(publicRoute)/events/[type]/page.tsx` | **Server** | Event guide (`wedding`, `conference`, `iftar`) |
| `/quote` | `src/app/(publicRoute)/quote/page.tsx` | **Server** | Container rendering `<QuoteForm />` (4-step wizard) |
| `/booking` | `src/app/(publicRoute)/booking/page.tsx` | **Server** | Container rendering `<BookingForm />` |
| `/tasting` | `src/app/(publicRoute)/tasting/page.tsx` | **Server** | Container rendering `<TastingForm />` |
| `/inquiry` | `src/app/(publicRoute)/inquiry/page.tsx` | **Server** | Container rendering `<InquiryForm />` |
| `/contact` | `src/app/(publicRoute)/contact/page.tsx` | **Server** | Verified address, hotline list, email, `<ContactForm />` |
| `/venues` | `src/app/(publicRoute)/venues/page.tsx` | **Server** | Details on 4 Halls: Gulnaksha, Pushpaguchha, Rajdarshan, Naboratna |
| `/gallery` | `src/app/(publicRoute)/gallery/page.tsx` | **Client** | Photo grid filterable by category with lightbox modal |
| `/testimonials` | `src/app/(publicRoute)/testimonials/page.tsx` | **Server** | Grid of all client reviews and ratings |
| `/our-process` | `src/app/(publicRoute)/our-process/page.tsx` | **Server** | Detailed 5-step operational standards |
| `/lunch-box` | `src/app/(publicRoute)/lunch-box/page.tsx` | **Server** | Corporate bulk box meal packages |
| `/offers` | `src/app/(publicRoute)/offers/page.tsx` | **Server** | Seasonal promotion vouchers and discounts |
| `/faq` | `src/app/(publicRoute)/faq/page.tsx` | **Client** | Accordion search and categorized FAQs |
| `/blog` | `src/app/(publicRoute)/blog/page.tsx` | **Server** | Culinary and event advice articles |
| `/blog/[slug]` | `src/app/(publicRoute)/blog/[slug]/page.tsx` | **Server** | Article view with author bio and tags |
| `/search` | `src/app/(publicRoute)/search/page.tsx` | **Client** | Live filter across dishes, packages, blog |
| `/careers` | `src/app/(publicRoute)/careers/page.tsx` | **Server** | Hospitality job postings & CV submission email |
| `/thank-you` | `src/app/(publicRoute)/thank-you/page.tsx` | **Server** | Post-lead submission success confirmation |
| `/privacy-policy` | `src/app/(publicRoute)/privacy-policy/page.tsx` | **Server** | Standard privacy document |
| `/terms` | `src/app/(publicRoute)/terms/page.tsx` | **Server** | Catering terms & conditions |
| `/cancellation-policy`| `src/app/(publicRoute)/cancellation-policy/page.tsx`| **Server** | Booking advance & cancellation refund terms |

### Auth Routes (`src/app/(publicRoute)/(auth)`)
- `/sign-in` (`sign-in/page.tsx` - **Client**): Admin demo login (pre-fills `admin@iccb.demo`). Sets cookie `iccb_auth_token`.
- `/sign-up` (`sign-up/page.tsx` - **Client**): Account creation mockup.
- `/forgot-password` (`forgot-password/page.tsx` - **Client**): Password reset request mockup.
- `/reset-password` (`reset-password/page.tsx` - **Client**): Password update form mockup.

### Dashboard CMS Routes (`src/app/(dashboardRoute)/dashboard`)
Contains 38 admin routes all protected by middleware and `DashboardLayout`:
`/dashboard` (Overview KPI stats + revenue chart), `/dashboard/leads` (Leads list), `/dashboard/leads/pipeline` (Kanban), `/dashboard/leads/[id]` (Lead detail), `/dashboard/quotations` (List), `/dashboard/quotations/new` (Quotation creator), `/dashboard/quotations/[id]` (Quotation invoice preview), `/dashboard/bookings` (Bookings list), `/dashboard/menu` (Dish list), `/dashboard/menu/new` (Dish form), `/dashboard/menu/[id]/edit` (Dish edit), `/dashboard/menu/categories` (Category manager), `/dashboard/packages` (Packages CRUD), `/dashboard/services` (Services CRUD), `/dashboard/gallery` (Media manager), `/dashboard/media` (Media library), `/dashboard/blog` (Blog articles), `/dashboard/blog/new` (Post editor), `/dashboard/blog/[id]/edit`, `/dashboard/blog/categories`, `/dashboard/blog/tags`, `/dashboard/news` (Press releases), `/dashboard/testimonials` (Review approvals), `/dashboard/faqs` (FAQ CRUD), `/dashboard/clients` (Client logos), `/dashboard/contacts` (Contact messages), `/dashboard/subscribers` (Email subscribers), `/dashboard/banners` (Announcement & popup settings), `/dashboard/pages` (Page content editor), `/dashboard/forms` (Form builder lite), `/dashboard/email-templates` (Email templates), `/dashboard/notifications` (Admin alerts), `/dashboard/seo` (SEO meta manager), `/dashboard/analytics` (Recharts KPI reports), `/dashboard/users` (User list), `/dashboard/roles` (RBAC role matrix), `/dashboard/audit-logs` (System activity logs), `/dashboard/profile` (Admin profile), `/dashboard/settings` (Site contact & config).

---

## 4. Design System & Typography

### Tailwind Configuration (`tailwind.config.ts`)
```ts
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
          500: "#E24F5F", // Primary Brand Crimson / Rose
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
          950: "#0B0B0C", // Near Black Charcoal
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

### Global Styles (`src/app/globals.css`)
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

### Font Configuration in `src/app/layout.tsx`
Configured via `next/font/google`:
1. **Oswald** (`--font-oswald`): Weights `400, 500, 600, 700`. Used as `font-display` for uppercase titles, headers, dish names, and big metric numbers.
2. **Inter** (`--font-inter`): Weights `300, 400, 500, 600, 700`. Used as `font-sans` for body copy, form fields, and subtitles.
3. **Playfair Display** (`--font-playfair`): Weights `400, 600, 700`, italic. Used as `font-serif` for elegant script section taglines (e.g., `~ Taste of Happiness ~`).

### Dark / Light Mode Mechanism
- **Is there a global theme toggle?** **NO.** There is no `next-themes`, no dark-mode toggle switch, and no root `dark` class toggle.
- **How is styling contrasted?** Sections use intentional alternating backgrounds:
  - Hero, VideoStory, TodaysMenu, Stats, and SubscribeBanner use hardcoded dark charcoal (`bg-ink-950 text-white`).
  - FeatureStrip and CTABand use vibrant crimson (`bg-brand-500 text-white`).
  - ChooseMenu, Process, and Testimonials use soft pink/cream (`bg-brand-50/50`).
  - OccasionGrid, FAQ, and Gallery use clean white (`bg-white`).
  - UI components like `<Card variant="dark">`, `<Accordion dark={true}>`, and `<Tabs variant="dark">` take explicit boolean/variant props.

---

## 5. Complete Component Registry

### Layout Components (`src/components/layout/`)
| File | Purpose | Props Interface | Usage | Hardcoded Data |
| :--- | :--- | :--- | :--- | :--- |
| `AnnouncementBar.tsx` | Top banner for seasonal announcements | None (reads `uiStore` & `INITIAL_SETTINGS`) | `src/app/(publicRoute)/layout.tsx` | Reads `INITIAL_SETTINGS.announcementBar` ("Winter Wedding Season...") |
| `Breadcrumbs.tsx` | Navigation trail with Home icon | `{ items: { label: string; href?: string }[] }` | Almost all public subpages | None |
| `CookieConsent.tsx` | Floating cookie warning banner | None (local state + `localStorage`) | `src/app/(publicRoute)/layout.tsx` | Hardcoded disclaimer text |
| `FloatingActions.tsx`| Floating WhatsApp, Phone call, Back-to-top, and mobile bottom bar | None | `src/app/(publicRoute)/layout.tsx` | Reads `SITE_INFO.contact.cateringPhone` |
| `Footer.tsx` | 5-column footer with brand pledge, links, and contact info | None | `src/app/(publicRoute)/layout.tsx` | Reads `FOOTER_LINKS`, `SITE_INFO` |
| `Header.tsx` | Sticky desktop & mobile navigation header with language toggle | None | `src/app/(publicRoute)/layout.tsx` | Links to `/dashboard` via "CMS" lock icon |
| `MobileMenu.tsx` | Slide-out mobile navigation drawer | None (reads `uiStore`) | `src/app/(publicRoute)/layout.tsx` | Reads `PUBLIC_NAV`, links to `/dashboard` |
| `OfferPopup.tsx` | Modal popup after 4 seconds displaying promotional voucher | None (reads `uiStore` & `INITIAL_SETTINGS`) | `src/app/(publicRoute)/layout.tsx` | Reads `INITIAL_SETTINGS.offerPopup` (`ICCBWINTER26`) |

### Section Components (`src/components/sections/`)
| File | Purpose | Props Interface | Usage | Hardcoded Data / Data Read |
| :--- | :--- | :--- | :--- | :--- |
| `HeroSection.tsx` | Homepage hero with circular plate, floating badges, headline & CTA | None | `src/app/(publicRoute)/page.tsx` | Reads `translations`, `SITE_INFO`, `IMAGES.heroFood` |
| `FeatureStrip.tsx` | 4-column banner with icons highlighting 4 core pledges | None | `src/app/(publicRoute)/page.tsx` | Reads `SITE_INFO.specialties` |
| `ChooseMenuSection.tsx`| 3 menu cards with overlapping circular dish photos | None | `src/app/(publicRoute)/page.tsx` | Hardcoded array `menuCategories` (Mughal, Continental, Multi-cuisine) |
| `VideoStorySection.tsx`| Chef cooking spotlight with animated pulsing play button and modal | None | `src/app/(publicRoute)/page.tsx` | Hardcoded marketing copy regarding taste vs hygiene |
| `OccasionGridSection.tsx`| 2x2 grid of occasion cards with floating white label cards | None | `src/app/(publicRoute)/page.tsx` | Hardcoded array `occasions` (Party, Wedding, Corporate, Birthday) |
| `TodaysMenuSection.tsx`| 6 daily dishes with circular thumbnail, dotted leader line, price | None | `src/app/(publicRoute)/page.tsx` | Reads `MENU_ITEMS.filter(isTodaysMenu)` |
| `ProcessSection.tsx`| 5 step-by-step cards outlining catering booking workflow | None | `src/app/(publicRoute)/page.tsx` | Hardcoded array `steps` (01 to 05) |
| `StatsSection.tsx` | 4 animated metric counters (Capacity, Year, Halls, Certification) | None | `src/app/(publicRoute)/page.tsx` | Hardcoded array `stats` (2015, 10000+, 4 Halls, 100%) |
| `GalleryPreviewSection.tsx`| 6-item photo grid with hover captions and lightbox modal | None | `src/app/(publicRoute)/page.tsx` | Reads `GALLERY_ITEMS.slice(0, 6)` |
| `TestimonialsSection.tsx`| 3 client review cards with ratings, quotes, avatar, dot indicators | None | `src/app/(publicRoute)/page.tsx` | Reads `TESTIMONIALS.slice(0, 3)` (Sample data) |
| `FAQSection.tsx` | Left info card + right accordion with top 5 questions | None | `src/app/(publicRoute)/page.tsx` | Reads `FAQS.slice(0, 5)` |
| `SubscribeBanner.tsx`| Newsletter email input over blurred banquet photo | None | `src/app/(publicRoute)/page.tsx` | Hardcoded promo copy, writes to localStorage mock subscribers |
| `CTABand.tsx` | Full-width crimson banner with direct hotline and WhatsApp buttons | None | `src/app/(publicRoute)/page.tsx` | Reads `SITE_INFO.contact.cateringPhone` |

### UI Components (`src/components/ui/`)
| File | Purpose | Props Interface | Usage |
| :--- | :--- | :--- | :--- |
| `Button.tsx` | Generic button supporting 6 variants (`primary`, `secondary`, `outline`, `ghost`, `dark`, `danger`), sizes (`sm`, `md`, `lg`), arrow icon, and loading state | `ButtonProps` extends `ButtonHTMLAttributes` | Used throughout public pages, sections, and dashboard |
| `Input.tsx` | Controlled input with label, error message, helper text | `InputProps` extends `InputHTMLAttributes` | All forms and dashboard editors |
| `Textarea.tsx` | Multi-line input with label and validation state | `TextareaProps` extends `TextareaHTMLAttributes` | Forms and note editors |
| `Select.tsx` | Styled custom select dropdown with Lucide Chevron | `SelectProps` extends `SelectHTMLAttributes` | Form selectors and dashboard filters |
| `Badge.tsx` | Status pill with variants (`brand`, `success`, `warning`, `danger`, `neutral`, `sample`) + `<SampleBadge />` | `BadgeProps` extends `HTMLAttributes` | Dish tags, order status, sample flag |
| `Card.tsx` | Container card with variants (`default`, `dark`, `bordered`, `interactive`) | `CardProps` extends `HTMLAttributes` | Feature and data presentations |
| `Modal.tsx` | Accessible dialog with backdrop blur and body scroll lock | `ModalProps` (`isOpen`, `onClose`, `title`, `maxWidth`) | Lightbox, video story, confirm dialog |
| `Tabs.tsx` | Tab strip supporting `pills` and `dark` variants | `TabsProps` (`tabs`, `activeTab`, `onChange`, `variant`) | Menu filtering, dashboard tabs |
| `Accordion.tsx` | Animated collapsible accordion using Framer Motion | `AccordionItemProps`, `AccordionProps` | FAQ section and `/faq` page |
| `DatePicker.tsx` | Fully bespoke month-view calendar date picker (`DD/MM/YYYY`) | `DatePickerProps` (`value`, `onChange`, `error`, `label`) | QuoteForm, BookingForm, TastingForm |
| `EmptyState.tsx` | Placeholder box for zero-data states with action button | `EmptyStateProps` (`title`, `description`, `actionLabel`) | Search page, dashboard lists |
| `Skeleton.tsx` | Animated pulsing loading placeholder box | `HTMLAttributes<HTMLDivElement>` | Loading states |
| `Logo.tsx` | ICCB Catering brand logo with red icon badge and text | `LogoProps` (`light?: boolean; className?: string`) | Header, Footer, MobileMenu, Auth layout |
| `index.ts` | Barrel export file exporting all UI components | Barrel exports | Convenience imports |

### Motion Components (`src/components/motion/`)
- `FadeIn`: Fades element in when entering viewport (`whileInView`).
- `SlideUp`: Translates element up along Y-axis (`yOffset: 30`) with easing.
- `ScaleIn`: Scales element from 0.92 to 1 on viewport enter.
- `StaggerContainer` & `StaggerItem`: Orchestrates staggered sequential animations for child items.
- `CountUp`: Custom animated number counter using `requestAnimationFrame` with exponential easing curve.

### Form Components (`src/components/forms/`)
- `QuoteForm.tsx`: 4-step wizard form (Contact -> Event Details -> Menu & Budget -> Review). Uses Zod + React Hook Form. Submits to `leadService.create()`.
- `BookingForm.tsx`: Direct booking reservation form. Validates client, date, guests (min 30). Submits to `leadService.create()`.
- `TastingForm.tsx`: Tasting appointment form (limit 8 family members). Submits to `leadService.create()`.
- `InquiryForm.tsx`: General inquiry form. Submits to `leadService.create()`.
- `ContactForm.tsx`: General message form with timeout simulation and toast notification.

### Calculator (`src/components/calculator/`)
- `PackageCalculator.tsx`: Interactive cost estimator on `/packages`. Allows choosing package, guest count, and optional add-ons (Borhani station, tea/coffee bar, VIP table service, live jalebi). Calculates subtotal + 5% VAT. Carries draft state to `/quote` via `uiStore.setQuoteDraft`.

### Dashboard Components (`src/components/dashboard/`)
- `Sidebar.tsx`: Navigation sidebar with links to all 38 CMS sections and collapsed mode.
- `Topbar.tsx`: Search bar, notifications dropdown, and live role-switcher (`Admin`, `Sales`, `Editor`, `Viewer`).
- `StatCard.tsx`: Metric card with percentage trend indicator and icon.
- `StatusBadge.tsx`: Maps status strings (`Won`, `Pending`, `Quoted`, `Lost`) to color variants.
- `ConfirmDialog.tsx`: Modal confirmation for destructive deletes.

---

## 6. Homepage Structure (Render Order & Data Dependencies)

Rendered sequentially in `src/app/(publicRoute)/page.tsx`:
1. **JSON-LD Script**: Renders `getOrganizationJsonLd()` from `src/lib/seo.ts` (SEO metadata).
2. `<HeroSection />`: Reads `SITE_INFO.tagline`, `translations[locale].hero`, `IMAGES.heroFood`.
3. `<FeatureStrip />`: Reads `SITE_INFO.specialties` (Slaughterhouse, Quality Check, Temperature Control, Modern Kitchen).
4. `<ChooseMenuSection />`: Reads local static array `menuCategories` with links to `/cuisines/mughal`, `/cuisines/continental`, `/cuisines/multi-cuisine`.
5. `<VideoStorySection />`: Hardcoded marketing copy regarding taste vs hygiene and video modal.
6. `<OccasionGridSection />`: Reads local static array `occasions` linking to service pages.
7. `<TodaysMenuSection />`: Reads `MENU_ITEMS.filter((item) => item.isTodaysMenu).slice(0, 6)` from `src/data/menu.ts`.
8. `<ProcessSection />`: Reads static `steps` array (5 steps).
9. `<StatsSection />`: Reads static `stats` array (Operating since 2015, 10,000+ Capacity, 4 Halls, 100% Halal).
10. `<GalleryPreviewSection />`: Reads `GALLERY_ITEMS.slice(0, 6)` from `src/data/gallery.ts`.
11. `<TestimonialsSection />`: Reads `TESTIMONIALS.slice(0, 3)` from `src/data/testimonials.ts`.
12. `<FAQSection />`: Reads `FAQS.slice(0, 5)` from `src/data/faqs.ts`.
13. `<SubscribeBanner />`: Form writing to `localStorage` key `iccb_mock_subscribers`.
14. `<CTABand />`: Reads `SITE_INFO.contact.cateringPhone`.

---

## 7. Navigation Architecture

### Public Navigation (`PUBLIC_NAV` in `src/data/navigation.ts`)
```ts
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
```

### Footer Links (`FOOTER_LINKS` in `src/data/navigation.ts`)
- **Services**: Corporate Catering (`/services/corporate-catering`), Wedding Banquets (`/services/wedding-catering`), Birthday & Private (`/services/birthday-party-catering`), Corporate Lunch Boxes (`/lunch-box`), Custom Menu Packages (`/packages`), Private Food Tasting (`/tasting`).
- **Company**: About ICCB (`/about`), Our 4 Convention Halls (`/venues`), Our 5-Step Process (`/our-process`), Client Testimonials (`/testimonials`), Seasonal Offers (`/offers`), Careers (`/careers`).
- **Useful**: Request a Quote (`/quote`), Book an Event (`/booking`), General Inquiry (`/inquiry`), FAQs (`/faq`), Privacy Policy (`/privacy-policy`), Terms & Conditions (`/terms`), Cancellation Policy (`/cancellation-policy`).

### Header Behavior & Dropdown Logic
- On `/`, Header is transparent with white text before scroll (`scrollY <= 20`), turning solid white with shadow on scroll.
- On all other pages, Header is solid white immediately.
- Hovering "Services" opens a 60-pixel dropdown with CSS animation (`animate-in fade-in zoom-in-95`).
- Right controls include:
  1. Language switcher pill: Toggles `locale` between English (`en`) and Bengali (`bn`) in `uiStore`.
  2. "CMS" lock icon link: Navigates directly to `/dashboard`.
  3. "Get a Quote" primary button: Links to `/quote`.

---

## 8. Data Layer & Real vs. Invented Data Audit

### Real & Verifiable Facts
- **Brand Identity**: International Convention City Bashundhara (ICCB) Catering, managed by Bashundhara Group.
- **Location**: Next to 300 ft. Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229.
- **Established Date**: 1 January 2015.
- **Convention Halls**: 4 dedicated halls totaling >100,000 sq ft:
  1. Gulnaksha (Hall 1) - 25,000 sq ft, 2,500 guests
  2. Pushpaguchha (Hall 2) - 20,000 sq ft, 2,000 guests
  3. Rajdarshan (Hall 3) - 30,000 sq ft, 3,000 guests
  4. Naboratna (Hall 4) - 25,000 sq ft, 2,500 guests
- **Heritage Restaurant**: ICCB Heritage Restaurant, opened June 2021 on ICCB premises.
- **Hotlines & Contact**: `+88-01991-197719`, `+88-02-41091551`, `iccbcatering@bga-bd.com`.

### Invented / Sample / Mock Data
| File Path | Item / Field | Assessment |
| :--- | :--- | :--- |
| `src/data/testimonials.ts` | All 4 client reviews (`Tanvir Ahmed - Standard Chartered`, `Farhana & Dr. Sadman`, `Nabila Hossain - Aura`, `Kamrul Islam - ICAB`) | **INVENTED**: Contains `isSample: true`. Synthetic names, roles, quotes. |
| `src/data/clients.ts` | 6 Corporate client logos (`Standard Chartered`, `Grameenphone`, `BRAC`, `Beximco`, `Apex`, `Unilever`) | **INVENTED**: Contains `isSample: true`. Unverified corporate client associations. |
| `src/data/clients.ts` | `NEWS_ITEMS`: "Smart Temperature-Controlled Mobile Units", "HACCP 2026 Grade A" | **INVENTED**: Synthetic press releases with `isSample: true`. |
| `src/data/settings.ts` | `announcementBar.text`: "Winter Wedding Season 2026-2027: Limited hall dates open..." | **INVENTED**: Synthetic seasonal promo text. |
| `src/data/settings.ts` | `offerPopup`: "Complimentary Borhani Station for bookings over 500 guests", Code: `ICCBWINTER26` | **INVENTED**: Synthetic promo discount voucher. |
| `src/data/blog.ts` | Authors: "Chef Rafiqul Islam", "Sabrina Rahman", "Dr. Farhan Masud" | **INVENTED**: Synthetic author personas and stock headshots. |
| `src/data/leads.ts` | 4 sample leads (`lead-101` to `lead-104`) | **INVENTED**: Dummy CRM records with `isSample: true`. |
| `src/data/quotations.ts` | 2 sample quotations (`QT-2026-0042`, `QT-2026-0043`) | **INVENTED**: Dummy financial quotation documents. |
| `src/data/bookings.ts` | 3 sample bookings (`BKG-2026-089`, etc.) | **INVENTED**: Dummy booking invoices. |
| `src/data/users.ts` | `DEMO_USERS` (`admin@iccb.demo`, `sales@iccb.demo`, etc.) | **INVENTED**: Mock credentials for reviewer testing. |
| `src/data/menu.ts` | `MENU_ITEMS` (all items tagged `isSample: true`) | **HYBRID**: Real Bangladeshi dish names and pricing, but synthetic sample records. |
| `src/data/packages.ts`| `PACKAGES` (all packages tagged `isSample: true`) | **HYBRID**: Realistic catering bundles, but mock operational packages. |
| `src/data/site.ts` | Claims: "Modern Slaughterhouse", "Quality Checking Lab", "Served in 65°C+ Temperature" | **UNCONFIRMED CLAIM**: Core marketing pillars from original author; unverified whether ICCB owns an official slaughterhouse. |

---

## 9. API & Mock Service Layer

### How It Works
1. `src/lib/axios.ts`: Configures Axios `apiClient`. If `USE_MOCK_API` is active (default), it overrides `apiClient.defaults.adapter`.
2. `src/lib/mock-api/adapter.ts`: Intercepts URLs (`/leads`, `/menu`, `/quotations`, `/bookings`, `/packages`, `/services`, `/gallery`, `/testimonials`, `/faqs`, `/blog`, `/settings`, `/users`, `/auth`). Implements full GET, POST, PUT, DELETE with artificial 150ms latency.
3. `src/lib/mock-api/mockStore.ts`: Reads from and writes to `localStorage` keys (`iccb_mock_leads`, `iccb_mock_menu`, etc.) with in-memory fallback during Next.js SSR.
4. `src/services/*`: Thin wrapper methods around `apiClient` (`leadService`, `menuService`, `quotationService`, `bookingService`, `contentServices`).

### What Public Pages Depend on the API/Mock Layer?
- **Public Form Submissions**:
  - `<QuoteForm />` -> calls `leadService.create()`
  - `<BookingForm />` -> calls `leadService.create()`
  - `<TastingForm />` -> calls `leadService.create()`
  - `<InquiryForm />` -> calls `leadService.create()`
- **Public Pages**:
  - Note that `/menu`, `/packages`, `/gallery`, `/faq`, `/blog`, and `/testimonials` pages import static data **directly from `@/data/*`**, NOT from `services/*`!
  - Only the CMS Dashboard pages (`/dashboard/*`) depend extensively on `services/*` for CRUD operations.

### What Would Break If the Mock API Was Removed?
- Public lead forms (`<QuoteForm />`, `<BookingForm />`, `<TastingForm />`, `<InquiryForm />`) would throw submission errors unless updated to submit to a real API endpoint, Next.js Server Action, or simple email/webhook handler.
- The entire `/dashboard` would lose its mock data backend.
- The rest of the public website would continue working completely intact because it reads static TypeScript data directly.

---

## 10. State Management & Localization

### 1. `uiStore` (`src/store/uiStore.ts`)
- `locale`: `"en"` | `"bn"` (Default `"en"`)
- `mobileMenuOpen`: boolean
- `announcementDismissed`: boolean
- `offerPopupDismissed`: boolean
- `quoteDraft`: `{ eventType?, guestCount?, eventDate?, venue?, packageId?, packageName?, estimatedTotal? }`
- Used to pass calculator estimation data from `/packages` into the quote wizard on `/quote`.

### 2. `authStore` (`src/store/authStore.ts`)
- Manages current user session: `user: User | null`, `isAuthenticated: boolean`.
- Defaults to `DEMO_USERS[0]` (`Tariqul Alam - Admin`) if reviewer opens dashboard.
- Sets cookie `iccb_auth_token=valid_token` on login.

### 3. Cookies & `localStorage` Keys
- Cookie `iccb_auth_token`: Read by `src/middleware.ts` to grant access to `/dashboard/*`.
- `localStorage` Keys:
  - `iccb_auth_user`: Active logged-in user profile.
  - `iccb_cookie_consent`: Cookie acceptance banner state (`"accepted"`).
  - `iccb_analytics_events`: Array of recent 100 tracked interaction events.
  - `iccb_mock_subscribers`: Subscribed email addresses from newsletter banner.
  - `iccb_mock_*`: 13 mock database tables (`leads`, `menu`, `bookings`, `quotations`, etc.).

### 4. Internationalization (EN / BN)
- Implemented in `src/lib/i18n.ts`. A static translation dictionary with keys `en` and `bn`.
- Covers `nav`, `hero`, `specialties`, `todaysMenu`, `cta`.
- Language toggle in `Header.tsx` calls `setLocale("bn" | "en")`.
- When set to `"bn"`, components check `locale === "bn" ? item.nameBn : item.name`.

---

## 11. Form Specifications & Zod Schemas

### 1. Quote Form (`src/components/forms/QuoteForm.tsx`)
```ts
const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email address required"),
  phone: z.string().min(10, "Valid phone number required"),
  companyName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  eventType: z.string().min(1, "Please choose an event type"),
  eventDate: z.string().min(5, "Preferred event date required (DD/MM/YYYY)"),
  guestCount: z.coerce.number().min(30, "Minimum 30 guests required"),
  venue: z.string().min(1, "Please specify venue or hall"),
  cuisinePreference: z.string().min(1, "Please select preferred cuisine"),
  packagePreference: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});
```
- **Submission Destination**: `leadService.create({ ...data, type: "quote", status: "New" })`
- **Post-Submission**: Redirects to `/thank-you`.

### 2. Booking Form (`src/components/forms/BookingForm.tsx`)
```ts
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
```
- **Submission Destination**: `leadService.create({ ...data, type: "booking", status: "New" })`
- **Post-Submission**: Redirects to `/thank-you`.

### 3. Tasting Form (`src/components/forms/TastingForm.tsx`)
```ts
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
```
- **Submission Destination**: `leadService.create({ ...data, type: "tasting", status: "Tasting" })`
- **Post-Submission**: Redirects to `/thank-you`.

### 4. Inquiry Form (`src/components/forms/InquiryForm.tsx`)
```ts
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
```
- **Submission Destination**: `leadService.create({ ...data, type: "inquiry", status: "New" })`
- **Post-Submission**: Redirects to `/thank-you`.

### 5. Contact Form (`src/components/forms/ContactForm.tsx`)
```ts
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0).optional(),
});
```
- **Submission Destination**: Client-side simulated timeout (`400ms`), resets form and shows in-card confirmation state.

---

## 12. Image Assets & Media Architecture

### Image Configuration in `next.config.mjs`
```js
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

### Central Image Registry (`src/data/images.ts`)
All photos across the site are Unsplash CDN URLs centralized in `src/data/images.ts`:
- **Dishes**: `kacchiBiryani`, `beefRezala`, `chickenRoast`, `muttonKorma`, `grilledKebab`, `firniDessert`, `borhaniBeverage`, `shahiTukra`, `continentalPasta`, `steakFillet`, `salmonPlatter`, `dimSumPlatter`.
- **Venues & Kitchen**: `heroFood`, `chefCooking`, `modernKitchen`, `slaughterhouse`, `hallGulnaksha`, `hallPushpaguchha`, `hallRajdarshan`, `hallNaboratna`, `heritageRestaurant`.
- **Occasions**: `privateParty`, `weddingReception`, `corporateEvent`, `birthdayParty`.
- **People & Avatars**: `avatar1`, `avatar2`, `avatar3`, `avatar4`, `chefExecutive`, `cateringDirector`, `qaManager`.
- **Blur Placeholder**: `PLACEHOLDER_BLUR` (inline Base64 SVG dark gray rectangle) used for smooth image loading.

---

## 13. Animations & Motion Architecture

- Implemented via `framer-motion` in `src/components/motion/index.tsx`.
- **Key Motion Primitives**:
  - `<FadeIn>`: Opacity fade on scroll enter with `-50px` margin.
  - `<SlideUp>`: Upward translation with subtle spring curve `[0.21, 0.47, 0.32, 0.98]`.
  - `<ScaleIn>`: Zoom in from 0.92 scale.
  - `<StaggerContainer>` & `<StaggerItem>`: Orchestrates sequential delay across child grids.
  - `<CountUp>`: Native `requestAnimationFrame` interpolator with exponential easing `progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)` to animate numbers up to targets (e.g. 10,000 guests, 2015 year).
- **CSS Animations in `tailwind.config.ts`**:
  - `animate-spin-slow`: 20s linear infinite rotation (used on outer decorative circular border around hero food plate).
  - `animate-pulse-subtle`: Subtle pulsing glow.
  - Ping animation on video play button in `<VideoStorySection />`.

---

## 14. Redesign Impact Map

### List A: Safe to Reuse As-Is
*High quality, zero CMS/mock baggage, clean UI components:*
1. `src/components/ui/Button.tsx` (Clean styling, loading state, arrow support)
2. `src/components/ui/Input.tsx` (Accessible input with label and error state)
3. `src/components/ui/Textarea.tsx` (Clean textarea component)
4. `src/components/ui/Select.tsx` (Accessible dropdown)
5. `src/components/ui/Modal.tsx` (Solid accessible modal dialog)
6. `src/components/ui/DatePicker.tsx` (Custom dependency-free date picker)
7. `src/components/ui/Skeleton.tsx` (Simple pulse loading box)
8. `src/components/motion/index.tsx` (`FadeIn`, `SlideUp`, `CountUp` animation primitives)
9. `src/lib/format.ts` (`formatCurrency` BDT format, date formatters)
10. `src/lib/utils.ts` (`cn` class merge helper)
11. `src/lib/seo.ts` (Metadata and Schema.org JSON-LD generator)
12. `src/app/robots.ts` & `src/app/sitemap.ts` (SEO utilities)
13. `src/components/layout/Breadcrumbs.tsx` (Standard breadcrumb navigation)
14. `src/components/layout/CookieConsent.tsx` (Standalone privacy consent)

### List B: Reusable but Needs Restyling / Cleanup
*Valuable structural components that need visual polish or mock removal:*
1. `src/components/layout/Header.tsx` (Remove `/dashboard` CMS link; remove `zustand` store dependency; fix focus ring)
2. `src/components/layout/MobileMenu.tsx` (Remove CMS button; remove `zustand` dependency)
3. `src/components/layout/Footer.tsx` (Refine layout, update social links, ensure clean mobile view)
4. `src/components/layout/FloatingActions.tsx` (Refine floating pill style and positioning)
5. `src/components/ui/Card.tsx` (Harmonize border radii and elevation shadows)
6. `src/components/ui/Badge.tsx` (Remove `<SampleBadge />` variant; keep standard badges)
7. `src/components/ui/Tabs.tsx` (Refine active state typography and spacing)
8. `src/components/ui/Accordion.tsx` (Improve border contrast and open animation)
9. `src/components/ui/Logo.tsx` (Elevate SVG mark styling for premium feel)
10. `src/components/sections/HeroSection.tsx` (Restyle typography, enhance plate presentation, eliminate mock text)
11. `src/components/sections/ChooseMenuSection.tsx` (Modernize card layout and circular image positioning)
12. `src/components/sections/TodaysMenuSection.tsx` (Restyle dotted leaders and dark background contrast)
13. `src/components/sections/OccasionGridSection.tsx` (Improve floating label card design)
14. `src/components/sections/StatsSection.tsx` (Elevate counter card presentation)
15. `src/components/sections/CTABand.tsx` (Clean up typography and button hierarchy)
16. `src/components/forms/QuoteForm.tsx` (Remove `uiStore` dependency, streamline wizard steps)
17. `src/components/calculator/PackageCalculator.tsx` (Modernize price display and item cards)
18. `src/data/site.ts` (Audit verified facts vs unconfirmed claims)
19. `src/data/menu.ts` (Remove `isSample: true` tags; curate verified menu dishes)
20. `src/data/packages.ts` (Remove `isSample: true` tags; polish pricing)
21. `src/data/services.ts` (Remove `isSample: true` tags; sharpen value proposition)

### List C: Belongs Only to Dashboard/Auth/Mock/CMS (Can Be Removed)
*Complete list of files and folders to eliminate for a clean public catering site:*
1. `src/app/(dashboardRoute)/` (The entire folder: 38 dashboard subroutes and layout)
2. `src/app/(publicRoute)/(auth)/` (Auth pages: `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`)
3. `src/middleware.ts` (Only used to guard `/dashboard/*`)
4. `src/components/dashboard/` (All 5 components: `Sidebar`, `Topbar`, `StatCard`, `StatusBadge`, `ConfirmDialog`)
5. `src/lib/mock-api/` (`adapter.ts`, `mockStore.ts`)
6. `src/lib/axios.ts` (Replaced by native `fetch` or simple Server Actions if needed)
7. `src/services/` (`leadService`, `menuService`, `quotationService`, `bookingService`, `contentServices`)
8. `src/store/authStore.ts` (Mock authentication state)
9. `src/data/leads.ts` (Mock lead database)
10. `src/data/quotations.ts` (Mock quotation database)
11. `src/data/bookings.ts` (Mock booking database)
12. `src/data/users.ts` (Mock CMS users)
13. `src/data/roles.ts` (Mock RBAC roles)
14. `src/components/layout/AnnouncementBar.tsx` (Invented season text; remove or replace with verified news)
15. `src/components/layout/OfferPopup.tsx` (Invented discount voucher; remove)
16. Dependencies in `package.json` to prune: `recharts`, `axios`, `zustand` (if stores replaced with simple React state)

---

## 15. Known Problems, Technical Debt & Bugs

1. **`package.json` Artifacts**:
   - Project name is set to `"name": "temp-app"`.
2. **Hardcoded URLs in Metadata**:
   - In `src/app/layout.tsx:32`, `metadataBase` is hardcoded to `https://iccbcatering.com`.
3. **Google Fonts Build Network Dependency**:
   - `src/app/layout.tsx` imports `Oswald`, `Inter`, `Playfair_Display` from `next/font/google`. During `next build`, if the build environment lacks external internet access (such as in an isolated sandbox), the build terminates with `ENOTFOUND fonts.googleapis.com`.
   - *Fix for offline/isolated builds*: Fall back to local fonts (`src/app/fonts/GeistVF.woff`) or ensure network bypass during compilation.
4. **Zustand SSR / Hydration Mismatch Risk**:
   - `src/components/layout/Header.tsx` reads `locale` and `mobileMenuOpen` directly from `useUIStore()`. If localStorage or store state differs from initial server render, hydration warnings can occur.
5. **Visible Focus Outline on Home Nav Link**:
   - When clicking the Logo or Home link, some browsers display a default dark focus outline around the navigation item because of missing `focus:outline-none focus-visible:ring-2` tokens on bare `Link` tags.
6. **Artificial Latency in Form Submissions**:
   - Form submission handlers in `BookingForm.tsx`, `QuoteForm.tsx`, etc., wait on artificial `setTimeout` and mock adapter delays, causing unnecessary UI sluggishness.
7. **Recharts SSR Console Warnings**:
   - `recharts` in `/dashboard/analytics` is rendered without dynamic client-side imports (`next/dynamic` with `ssr: false`), causing hydration warnings in terminal logs.
8. **Hardcoded Calculation Values**:
   - In `PackageCalculator.tsx:55`, VAT is hardcoded to 5% (`subtotal * 0.05`), while in Bangladesh convention and event catering VAT is subject to 10%-15% depending on commercial classification.

---

*End of CODEBASE_REPORT.md*

