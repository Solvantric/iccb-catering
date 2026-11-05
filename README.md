# ICCB Catering Website + CMS Dashboard

A complete, production-grade catering website and administrative CMS dashboard built for **ICCB Catering** (International Convention City Bashundhara, Dhaka, Bangladesh).

Designed with a high-end luxury hospitality aesthetic, matching the layout, card styling, typography, and sections of the reference design (`cat5.jpg`), recolored to the official brand palette (`#E24F5F` primary red + dark neutrals `#0B0B0C`).

---

## 1. Verified Brand & Business Facts

All business facts and core data strictly match verified information:
- **Brand / Entity**: ICCB Catering (International Convention City Bashundhara)
- **Tagline**: *"Taste of Happiness"*
- **Location**: Next to 300 ft. Purbachal Express Highway, Dhaka 1229, Bangladesh (Kuril Bishwa Road)
- **Catering Hotlines**: `+88-01991-197719` / `+88-02-41091551`
- **Official Inquiries Email**: `iccbcatering@bga-bd.com` / `iccb@bga-bd.com`
- **Venue Scale**: Largest event venue in South Asia, operating since 1 January 2015, featuring 4 grand convention halls (*Gulnaksha*, *Pushpaguchha*, *Rajdarshan*, *Naboratna*), with simultaneous hospitality capacity for **10,000+ guests**.
- **Cuisine Specialties**: Authentic Local Mughal (Dum Pukht Kacchi, Shahi Rezala), Continental, and Multi-Cuisine Fusion.
- **The 4 Verified Pillars / Specialties**:
  1. *Modern Slaughterhouse* (Vet-supervised halal meat processing)
  2. *Quality Checking* (Strict raw ingredient & microbiological lab QA testing)
  3. *Served in Proper Temperature* (Ensuring hot foods remain at 65°C+ via mobile heating units)
  4. *Well-Equipped Modern Kitchen* (Industrial-grade stainless steel facilities)
- **Sample Data Flagging**: Any non-verified menu dishes, sample client testimonials, or demo figures carry `isSample: true` in the data layer and display a subtle `Sample` badge in the dashboard.

---

## 2. Tech Stack

- **Framework**: Next.js 14+ (App Router, strict TypeScript)
- **Styling**: Tailwind CSS with custom design tokens (`brand-50` to `brand-700`, `ink-50` to `ink-950`)
- **Typography**: Display: `Oswald` / `Barlow Condensed` (tight uppercase display), Body: `Inter`, Accent: `Playfair Display` (italic)
- **Animation**: Framer Motion (`FadeIn`, `SlideUp`, `ScaleIn`, `StaggerContainer`, `CountUp`)
- **Icons**: `lucide-react`
- **Charts**: `recharts` (Responsive Area, Bar, and Pie charts)
- **Forms & Validation**: `react-hook-form` + `zod`
- **State Management**: `zustand` (Auth & UI state with `localStorage` persistence)
- **Notifications**: `sonner` Toaster
- **Images**: `next/image` configured for Unsplash remote domains
- **API Architecture**: Axios instance (`src/lib/axios.ts`) + mock adapter (`src/lib/mock-api/adapter.ts`) persisting to `localStorage`.

---

## 3. Demo Credentials

The CMS Dashboard is protected via Next.js middleware and cookie tokens. Demo login accounts are pre-configured:

| Role | Email | Password | Access Scope |
|---|---|---|---|
| **Admin** | `admin@iccb.demo` | `Admin@123` | Full administrative access to all modules, settings, and logs |
| **Sales Manager** | `sales@iccb.demo` | `Sales@123` | Inbound leads pipeline, quote builder, and bookings calendar |
| **Content Editor** | `editor@iccb.demo` | `Editor@123` | Dish catalog, today's menu, blog, and press releases |
| **Viewer** | `viewer@iccb.demo` | `Viewer@123` | Read-only inspection of reports and schedules |

*Tip: On the Sign-in page (`/sign-in`), one-click demo credentials autofill pills are provided for rapid testing.*

---

## 4. Switching to a Real REST Backend

The application is architected for zero-refactoring transition from the mock layer to a live REST backend:

1. Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/v1
```

2. When `NEXT_PUBLIC_USE_MOCK=false`, `src/lib/axios.ts` bypasses `handleMockRequest` and sends all network requests directly over HTTP/HTTPS to `NEXT_PUBLIC_API_URL` with bearer tokens attached automatically in the `Authorization: Bearer <token>` header.

---

## 5. Project Directory Structure

```
iccb/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (dashboardRoute)/
│   │   │   └── dashboard/
│   │   │       ├── analytics/
│   │   │       ├── audit-logs/
│   │   │       ├── banners/
│   │   │       ├── blog/ (list, new, [id]/edit, categories, tags)
│   │   │       ├── bookings/
│   │   │       ├── clients/
│   │   │       ├── contacts/
│   │   │       ├── email-templates/
│   │   │       ├── faqs/
│   │   │       ├── forms/
│   │   │       ├── gallery/
│   │   │       ├── leads/ (table, [id] detail, pipeline Kanban)
│   │   │       ├── media/
│   │   │       ├── menu/ (catalog, new, [id]/edit, categories)
│   │   │       ├── news/
│   │   │       ├── notifications/
│   │   │       ├── packages/
│   │   │       ├── pages/
│   │   │       ├── profile/
│   │   │       ├── quotations/ (list, new builder, [id] PDF invoice)
│   │   │       ├── roles/
│   │   │       ├── seo/
│   │   │       ├── services/
│   │   │       ├── settings/
│   │   │       ├── subscribers/
│   │   │       ├── testimonials/
│   │   │       └── users/
│   │   ├── (publicRoute)/
│   │   │   ├── page.tsx (15-section Home matching cat5.jpg)
│   │   │   ├── about/
│   │   │   ├── services/ (+ corporate, wedding, birthday, [slug])
│   │   │   ├── menu/ (+ [slug])
│   │   │   ├── packages/ (+ [slug])
│   │   │   ├── cuisines/[slug]/ (mughal, continental, multi-cuisine)
│   │   │   ├── events/[type]/ (wedding, conference, iftar, engagement, annual-gala)
│   │   │   ├── quote/ (4-step interactive quotation request)
│   │   │   ├── booking/ (banquet hall booking request)
│   │   │   ├── tasting/ (private menu tasting session)
│   │   │   ├── inquiry/
│   │   │   ├── contact/
│   │   │   ├── gallery/
│   │   │   ├── testimonials/
│   │   │   ├── blog/ (+ [slug])
│   │   │   ├── faq/
│   │   │   ├── our-process/
│   │   │   ├── venues/
│   │   │   ├── lunch-box/
│   │   │   ├── offers/
│   │   │   ├── careers/
│   │   │   ├── legal/ (privacy-policy, terms, cancellation-policy)
│   │   │   ├── search/
│   │   │   └── thank-you/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── calculator/ (PackageCalculator)
│   │   ├── dashboard/ (Sidebar, Topbar, StatCard, StatusBadge, ConfirmDialog)
│   │   ├── forms/ (QuoteForm, BookingForm, TastingForm, InquiryForm, ContactForm)
│   │   ├── layout/ (Header, Footer, MobileMenu, AnnouncementBar, FloatingActions, OfferPopup)
│   │   ├── motion/ (FadeIn, SlideUp, ScaleIn, Stagger, CountUp)
│   │   ├── sections/ (15 homepage sections: Hero, FeatureStrip, ChooseMenu, VideoStory, ...)
│   │   └── ui/ (Button, Input, Textarea, Select, Badge, Card, Modal, Tabs, Logo, ...)
│   ├── data/ (Raw typed verified facts, menu, packages, services, gallery, faqs, ...)
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── format.ts (BDT ৳ formatting, DD/MM/YYYY dates)
│   │   ├── i18n.ts (English & Bangla dictionary)
│   │   ├── mock-api/ (adapter.ts, mockStore.ts)
│   │   ├── seo.ts (JSON-LD schemas)
│   │   └── utils.ts
│   ├── services/ (leadService, quotationService, bookingService, menuService, contentServices)
│   ├── store/ (authStore, uiStore)
│   ├── types/ (Strict TypeScript interfaces)
│   └── middleware.ts (Route guard for /dashboard/*)
```

---

## 6. Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd iccb

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verifying the Production Build

```bash
npm run build
```

Both static generation (100 static routes) and server-rendered dynamic paths pass with zero type errors.

---

## 7. Features & Highlights

1. **Design Reference Alignment (`cat5.jpg`)**:
   - Circular plate images overlapping cards in *Choose Your Menu*
   - Dotted leader lines connecting dishes to prices in *Today's Menu*
   - 2x2 occasion cards with white overlay text boxes
   - Near-black `#0B0B0C` dark sections and `#E24F5F` primary red accents
2. **Interactive Banquet Quote Builder**:
   - Multi-step progress form with guest count, hall selection, cuisine preferences, and package matching.
   - Built-in live budget calculator with service charge and VAT computation.
3. **Admin CMS Suite**:
   - Leads Kanban pipeline with drag/status progression.
   - Quotation builder generating print-ready formal PDF-style invoices with ICCB letterhead.
   - Live "Today's Menu" toggles that reflect immediately on the public website.
   - Audit logs tracking administrative actions.
   - "Reset Demo Data" button in Settings to return the local store to verified factory defaults.
4. **Localization (i18n)**:
   - Header switcher supports English and Bangla (বাংলা).
5. **SEO & Accessibility**:
   - Complete JSON-LD Schema (Organization, CateringService, FAQPage, BreadcrumbList).
   - Dynamic XML sitemap (`/sitemap.xml`) and `robots.txt`.
