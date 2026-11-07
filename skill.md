---
name: iccb-luxury-catering
description: Design, development, and engineering skill for building and maintaining the ICCB Catering website, design system, and administrative CMS dashboard with luxury hospitality aesthetics, brand color #DC0511, Bangladeshi localization & bKash booking flow, and verified South Asian convention data.
---

# ICCB Luxury Catering Engineering Skill

This skill defines the technical, visual, and operational standards for developing and maintaining the **ICCB Catering (International Convention City Bashundhara)** platform.

## 1. Verified Brand & Data Guidelines
- **Brand Name**: ICCB Catering (International Convention City Bashundhara, Dhaka).
- **Primary Brand Color**: `#DC0511` (Luxury Crimson Red). Never revert to faded pink or green.
- **Tagline**: *"Taste of Happiness"*.
- **Verified Fact Base**:
  - Operating since: 1 January 2015.
  - Scale: Largest event venue in South Asia, hosting 10,000+ guests simultaneously across 4 grand halls (*Gulnaksha*, *Pushpaguchha*, *Rajdarshan*, *Naboratna*).
  - Address: Next to 300 ft. Purbachal Express Highway, Dhaka 1229 (Kuril Bishwa Road).
  - Catering Hotline: `+88-01991-197719` / `+88-02-41091551`.
  - The 4 Verified Pillars:
    1. *Modern Slaughterhouse* (Vet-supervised halal meat processing)
    2. *Quality Checking* (Strict ingredient & finished food laboratory QA)
    3. *Served in Proper Temperature* (65°C+ guaranteed with mobile thermal transport)
    4. *Well-Equipped Modern Kitchen* (Industrial culinary facilities)
  - Any demo figures or unverified items must have `isSample: true` in the data layer.

## 2. Visual & Architectural Standards
- **Typography**:
  - `font-display`: `Plus Jakarta Sans` (modern luxury geometric, prestigious, airy letter-spacing).
  - `font-sans`: `Inter` (neutral, readable body text).
  - `font-serif`: `Playfair Display` (italic flourishes).
  - `font-bengali`: `Noto Sans Bengali` & `Noto Serif Bengali`.
- **Bangladeshi Localization & Terminology**:
  - Avoid literal Western terms like "Request a Quote" / "Get a Quote".
  - Use natural terms: **"Book Catering"** / **"ক্যাটারিং বুকিং"**, **"Check Pricing & Availability"**, **"Book This Package"** / **"প্যাকেজটি বুক করুন"**.
  - Reservation & Date Locking: Step 4 of the booking wizard is **"Review & Payment"** with official ICCB Merchant bKash integration (`01991-197719`), customer mobile number, Transaction ID (TrxID), and advance booking token deposit (BDT `৳`).
- **Light & Dark Mode Standards**:
  - **White Mode Rule**: Absolutely NO dark background colors in white mode. The website is exclusively pristine white (`#FFFFFF`), soft clean brand tint (`#FFF5F5`), and primary brand red (`#DC0511`).
  - **Dark Mode**: Fully supported via theme toggle (`dark:bg-ink-950 text-white`).
- **Iconography Standards**:
  - Solid one-color treatment (primary brand red `#DC0511`, solid WhatsApp green `#25D366`).
  - Lite, elegant stroke weight (`strokeWidth={1.75}`).
  - No glossy multi-color gradients, complex drop shadows, or animated ping rings.
- **Occasion Cards**:
  - Content-light, fresh, and modern: clean white cards, high-res photography, concise 1-line copy, capacity badge, and a lite one-color arrow link.
- **Today's Menu**:
  - Content-light and fresh: clean white cards, circular plate presentation, 1-line description, and a lite one-color link. Zero price clutter.
- **Packages**:
  - To-the-point, high-impact cards with high-res photography, per-guest rates, 5 signature dishes, included services, and direct booking button.
  - Eliminates multi-level course nesting and wall-of-text clutter.

## 3. Engineering Workflows
- **Next.js App Router**:
  - All public routes stay inside `src/app/(publicRoute)/`.
  - Never place a conflicting `page.tsx` directly in `src/app/`.
  - All dashboard routes stay inside `src/app/(dashboardRoute)/dashboard/`.
- **Theme Tokens**:
  - Keep `tailwind.config.ts` and `src/app/globals.css` in sync with `#DC0511`.
- **Card Design Conventions**:
  - Home "Choose Your Menu" cards follow `/menu` page card design pattern (rectangular hero image banner, tags, description, outline button).
  - Occasion Grid cards follow full-bleed luxury editorial pattern with multi-stop dark scrims and pill badges.
- **Booking Customization**:
  - `/quote` Step 3 includes custom dish items and special chef notes, persisted into Step 4 Review.
- **Dashboard Navigation**:
  - Order: Overview &rarr; Analytics &rarr; User Management &rarr; Product Management &rarr; Leads &rarr; Quotations &rarr; Bookings &rarr; Settings. Secondary routes remain commented out.
- **Validation**:
  - Run `npm run build` after changes to verify zero TypeScript errors and ensure 100/100 routes compile.
- **Git Safety Rule**:
  - **NEVER RUN `git push`**. All commits must remain strictly local.
