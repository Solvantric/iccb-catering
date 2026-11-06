# AUDIT.md: Component & Architecture Audit for ICCB Catering Redesign

**Branch:** `redesign-v1`  
**Phase:** 0 (Pre-Redesign Audit)  
**Status:** Complete — Awaiting Approval  

---

## (a) Components Worth Reusing As-Is

These components are clean, accessible, generic, and free from CMS/mock dependencies:

1. **`src/components/ui/Button.tsx`**: Highly flexible button component supporting 6 variants (`primary`, `secondary`, `outline`, `ghost`, `dark`, `danger`), sizes (`sm`, `md`, `lg`), interactive hover translate, and loading spinner state.
2. **`src/components/ui/Input.tsx`**: Accessible input field with label, error message, and helper text handling.
3. **`src/components/ui/Textarea.tsx`**: Accessible multi-line input with label, row sizing, and validation state.
4. **`src/components/ui/Select.tsx`**: Custom select dropdown with custom chevron indicator and accessible labels.
5. **`src/components/ui/Modal.tsx`**: High quality dialog with backdrop blur, keyboard accessibility, and `body` scroll lock.
6. **`src/components/ui/DatePicker.tsx`**: Fully custom month-view date picker with day selection and previous/next month navigation; zero external date library dependencies.
7. **`src/components/ui/Skeleton.tsx`**: Minimal pulse loading placeholder box.
8. **`src/components/motion/index.tsx`**: Lightweight Framer Motion primitives (`FadeIn`, `SlideUp`, `ScaleIn`, `StaggerContainer`, `StaggerItem`, and native `CountUp` interpolator).
9. **`src/components/layout/Breadcrumbs.tsx`**: Standard navigational breadcrumbs with home icon.
10. **`src/components/layout/CookieConsent.tsx`**: Independent, self-contained cookie consent notice with `localStorage` persistence.
11. **`src/lib/format.ts`**: Standardized Bangladeshi Taka (`৳`) currency formatting and date formatters.
12. **`src/lib/utils.ts`**: Standard `clsx` + `tailwind-merge` class concatenator (`cn`).
13. **`src/lib/seo.ts`**: OpenGraph, Twitter card, and Schema.org `Organization` / `CateringBusiness` JSON-LD generator.
14. **`src/app/robots.ts` & `src/app/sitemap.ts`**: Search engine crawling rules and dynamic sitemap.

---

## (b) Components to Restyle & Refactor

These components contain valuable structure but require aesthetic polish, accessibility fixes, or removal of mock ties:

1. **`src/components/layout/Header.tsx`**:
   - *Issues*: Contains link to `/dashboard` CMS via lock icon; reads `locale` and `mobileMenuOpen` from `zustand` store (can trigger SSR hydration mismatch); has navigation focus outline quirks.
   - *Refactoring*: Remove CMS link; use standard React state for mobile drawer toggle; polish navigation typography and focus styling.
2. **`src/components/layout/MobileMenu.tsx`**:
   - *Issues*: Hardcoded button linking to `/dashboard`; depends on `useUIStore`.
   - *Refactoring*: Remove CMS dashboard CTA; accept open/close props directly; refine backdrop blur and link typography.
3. **`src/components/layout/Footer.tsx`**:
   - *Issues*: Heavy 5-column layout on mobile, outdated social URLs.
   - *Refactoring*: Streamline columns, enhance mobile spacing, add newsletter integration.
4. **`src/components/layout/FloatingActions.tsx`**:
   - *Issues*: Hardcoded phone numbers; awkward floating pill stacking.
   - *Refactoring*: Restyle into a refined WhatsApp + Phone + Quote floating widget.
5. **`src/components/ui/Card.tsx`**:
   - *Issues*: Disconnected border radius and shadow tokens.
   - *Refactoring*: Unify shadows and borders to match luxury hospitality branding.
6. **`src/components/ui/Badge.tsx`**:
   - *Issues*: Contains `<SampleBadge />` and variant `sample` designed for mock data tagging.
   - *Refactoring*: Delete `SampleBadge` and `sample` variant; keep standard brand/success/warning badges.
7. **`src/components/ui/Tabs.tsx`**:
   - *Issues*: Inconsistent padding and pill radius between light and dark variants.
   - *Refactoring*: Harmonize active pill transitions and typography.
8. **`src/components/ui/Accordion.tsx`**:
   - *Issues*: Low contrast border in light mode.
   - *Refactoring*: Enhance active item indicator and smooth Framer Motion height transitions.
9. **`src/components/ui/Logo.tsx`**:
   - *Issues*: Generic square box icon; needs modern, refined vector treatment for ICCB.
   - *Refactoring*: Elevate brand typography and icon emblem.
10. **Homepage Sections (`src/components/sections/*`)**:
    - `HeroSection.tsx`: Improve typography hierarchy, refine circular hero food plate presentation, eliminate synthetic claims.
    - `ChooseMenuSection.tsx`: Enhance card hover states and overlapping plate alignment.
    - `TodaysMenuSection.tsx`: Restyle dotted leader lines (`.dotted-leader`) and price typography.
    - `OccasionGridSection.tsx`: Refine bottom white overlay cards with cleaner layout.
    - `StatsSection.tsx`: Elevate counter cards with modern borders and subtle luxury glow.
    - `CTABand.tsx`: Modernize typography and CTA button group.
11. **Forms & Calculator**:
    - `QuoteForm.tsx`: Eliminate `zustand` `quoteDraft` dependency; streamline 4-step wizard into an intuitive 2-step inquiry experience.
    - `PackageCalculator.tsx`: Modernize pricing cards; make VAT rate configurable rather than hardcoded 5%.

---

## (c) Files & Folders to Delete

The existing codebase contains an entire CMS dashboard, mock authentication, in-browser mock REST adapter, and mock data tables that add dead weight to a client-facing catering website.

### 1. Route Groups & Pages (43 route files)
- **`src/app/(dashboardRoute)/`** (Delete entire directory):
  - `src/app/(dashboardRoute)/layout.tsx`
  - All 38 `/dashboard/...` page files (analytics, audit-logs, banners, blog, bookings, clients, contacts, email-templates, faqs, forms, gallery, leads, media, menu, news, notifications, packages, pages, profile, quotations, roles, seo, services, settings, subscribers, testimonials, users).
- **`src/app/(publicRoute)/(auth)/`** (Delete entire directory):
  - `src/app/(publicRoute)/(auth)/layout.tsx`
  - `/sign-in/page.tsx`
  - `/sign-up/page.tsx`
  - `/forgot-password/page.tsx`
  - `/reset-password/page.tsx`
- **`src/middleware.ts`**:
  - Delete file (only purpose is guarding `/dashboard/*` via cookie check).

### 2. Dashboard Components (5 files)
- **`src/components/dashboard/`** (Delete entire directory):
  - `Sidebar.tsx`
  - `Topbar.tsx`
  - `StatCard.tsx`
  - `StatusBadge.tsx`
  - `ConfirmDialog.tsx`

### 3. Mock REST API & Service Layer (9 files)
- **`src/lib/mock-api/`** (Delete entire directory):
  - `adapter.ts` (453 lines of mock endpoints)
  - `mockStore.ts` (157 lines of localStorage state simulation)
- **`src/lib/axios.ts`**: Delete or replace with standard `fetch` / Server Actions.
- **`src/services/`** (Delete entire directory):
  - `leadService.ts`, `menuService.ts`, `quotationService.ts`, `bookingService.ts`, `contentServices.ts`, `index.ts`.

### 4. Zustand Stores (2 files)
- **`src/store/authStore.ts`**: Delete (simulates reviewer login sessions).
- **`src/store/uiStore.ts`**: Delete (can be replaced by standard React context or local component state).

### 5. Mock Data Tables (5 files)
- `src/data/leads.ts`
- `src/data/quotations.ts`
- `src/data/bookings.ts`
- `src/data/users.ts`
- `src/data/roles.ts`

### 6. Unneeded Dependencies to Prune from `package.json`
- `recharts`: Used exclusively by dashboard analytics and overview chart.
- `axios`: Can be pruned if mock layer is replaced with native Next.js fetch/actions.
- `zustand`: Can be pruned if stores are removed.

---

## (d) Complete Inventory of Invented / Sample Data

Every place in the current repository containing synthetic or unverified information:

1. **`isSample: true` Flag**:
   - Present across almost all entities in `src/data/`:
     - Every item in `src/data/menu.ts` (`item-1` to `item-12`)
     - Every package in `src/data/packages.ts` (`pkg-1` to `pkg-4`)
     - Every service in `src/data/services.ts` (`srv-corporate`, `srv-wedding`, etc.)
     - Every photo in `src/data/gallery.ts` (`gal-1` to `gal-12`)
     - Every FAQ in `src/data/faqs.ts` (`faq-1` to `faq-6`)
     - Every blog article in `src/data/blog.ts` (`blog-1` to `blog-3`)
     - Every client in `src/data/clients.ts`
     - Every review in `src/data/testimonials.ts`
     - Every lead in `src/data/leads.ts`
     - Every quote in `src/data/quotations.ts`
     - Every booking in `src/data/bookings.ts`
2. **Fake Testimonials (`src/data/testimonials.ts`)**:
   - Tanvir Ahmed (Head of Corporate Affairs, Standard Chartered Bank Dhaka)
   - Farhana & Dr. Sadman Chowdhury (Wedding Reception at Hall 3)
   - Nabila Hossain (Managing Director, Aura Lifestyle)
   - Kamrul Islam, FCA (Convener, ICAB National Conference)
3. **Fake Client Associations (`src/data/clients.ts`)**:
   - Standard Chartered Bank, Grameenphone PLC, BRAC International, Beximco Pharmaceuticals, Apex Footwear, Unilever Bangladesh.
4. **Fake News & Milestones (`src/data/clients.ts`)**:
   - "ICCB Catering Unveils Fleet of 10 Smart Temperature-Controlled Mobile Units"
   - "Annual International Food Safety Audit Concluded with Grade A Certification"
5. **Invented Personnel & Chef Names**:
   - `src/data/blog.ts`: "Chef Rafiqul Islam (Executive Mughal Master Chef)", "Sabrina Rahman (Director of Corporate Hospitality)", "Dr. Farhan Masud (Quality Assurance Lead)".
   - `src/components/sections/SubscribeBanner.tsx:73`: "...newly curated dishes from Executive Chef Rafiqul."
6. **Synthetic Promotional Bar & Offers**:
   - `src/data/settings.ts` & `src/components/layout/AnnouncementBar.tsx`: "Winter Wedding Season 2026-2027: Limited hall dates open..."
   - `src/data/settings.ts` & `src/components/layout/OfferPopup.tsx`: "Exclusive Season Privilege", "Complimentary Borhani Station for bookings over 500 guests", promo code `ICCBWINTER26`.
7. **Unverified Claims & Stats**:
   - "Modern Slaughterhouse" (In-house automated livestock slaughter facility) — claim made throughout site, but unverified in public ICCB operational records.
   - "Quality Checking Lab" — internal lab certification claim.
   - "Served in 65°C+ Temperature via thermal transport fleet".

---

## Plan for Phase 1 (Redesign Specification)

1. **Delete Dead Weight**: Remove `/dashboard`, `(auth)`, `middleware.ts`, `mock-api`, `services/`, `store/authStore.ts`, mock CRM data files, and unneeded dependencies (`recharts`).
2. **Clean Up Data Layer**: Remove all `isSample: true` properties; replace synthetic client logos and fake testimonials with authentic hospitality messaging; normalize menu items and packages.
3. **Restyle & Modernize UI**:
   - Elevate the Header, Navigation, and Footer with clean luxury aesthetics.
   - Overhaul the Homepage sections for high conversion, luxury visual storytelling, and seamless responsiveness.
   - Enhance the Menu, Packages, Venues, and Quote Builder pages.
4. **Streamline Form Submissions**: Replace Axios mock adapter calls with clean Next.js server actions or direct handlers with toast notifications.
5. **Verify Types & Build**: Ensure zero TypeScript errors and a clean build.

