# ICCB Catering Design System Specification (`design.md`)

## 1. Brand Identity & Color Palette

### 1.1 Primary Brand Color: `#DC0511` (Luxury Crimson Red)
The primary brand color has been upgraded to `#DC0511`, an authoritative, rich crimson red that commands presence and signals luxury culinary excellence, South Asian regal heritage, and hospitality warmth.

| Token | Hex Value | Role & Usage |
|---|---|---|
| `brand-50` | `#FFF5F5` | Ultra-soft section backgrounds, subtle highlight tints |
| `brand-100` | `#FCE5E7` | Soft card fills, badge backgrounds |
| `brand-200` | `#F8A3A9` | Delicate border strokes, divider accents |
| `brand-300` | `#F0656E` | Hover borders, secondary badge text |
| `brand-400` | `#E6303B` | Bright accent, icon glows, active states |
| `brand-500` | `#DC0511` | **Core Brand Color**: Primary buttons, key titles, CTA banners, hero highlights |
| `brand-600` | `#BE040E` | Button hover states, bold text on light backgrounds |
| `brand-700` | `#9E030B` | Active / pressed states, deep contrast accents |
| `brand-800` | `#7D0208` | Dark background accents, borders in dark mode |
| `brand-900` | `#5C0106` | Deep crimson shadow tints, vignette overlays |

### 1.2 Neutral & Background Tokens (Strict Light/Dark Separation)
- **Light / White Mode Rule**: NO dark background colors in white mode. The website is exclusively **pristine white (`#FFFFFF`)**, soft clean brand tint (`#FFF5F5`), and **primary brand red (`#DC0511`)**.
- **Dark Mode (`dark:`)**: When toggled to dark mode, sections switch to `dark:bg-ink-950` (`#0B0B0C`), dark cards `dark:bg-ink-900` (`#141416`), and `dark:text-white`.
- **`ink-600` (`#52525B`)**: High-contrast readable secondary typography on light surfaces.
- **`whatsapp-green` (`#25D366`)**: Solid emerald green for WhatsApp action.
- **`bkash-pink` (`#E2136E`)**: Authentic bKash brand magenta for payment vouchers and transaction confirmation badges.

---

## 2. Typography Hierarchy

- **Display & Headings**: `Plus Jakarta Sans` (`font-display`)
  - Modern luxury geometric typography, balanced uppercase proportions, wide airy tracking (`tracking-tight` or `tracking-wider`), bold to black weight (700-800).
  - Replaces cramped condensed fonts (like Oswald) with prestigious, world-class five-star hotel branding.
- **Body & UI**: `Inter` (`font-sans`)
  - Clean, legible, modern grotesk with high x-height for clear reading of menus, dish notes, and booking forms.
- **Accent & Taglines**: `Playfair Display` Italic (`font-serif`)
  - Reserved for *"Taste of Happiness"*, culinary flourishes, and chef quotes.
- **Bangla Typography**: `Noto Sans Bengali` & `Noto Serif Bengali`
  - Perfectly paired with English typography for natural Bengali bilingual reading.

---

## 3. Bangladeshi Localization & UX Terminology

Western catering terms like "Request a Quote" or "Get a Quote" are unnatural for Bangladeshi event hosts, wedding families, and corporate planners.
- **Primary CTAs**:
  - English: **"Book Catering"**, **"Check Pricing & Availability"**, **"Book This Package"**, **"Confirm Catering Booking"**
  - Bengali: **"ক্যাটারিং বুকিং"**, **"মেনু ও রেট দেখুন"**, **"প্যাকেজটি বুক করুন"**, **"বুকিং নিশ্চিত করুন"**
- **Date Locking & Token Deposit Flow**:
  - Bangladeshi banquet clients lock event dates using a token advance deposit via bKash.
  - Step 4 of the booking wizard is titled **"Review & Payment"** (`রিভিউ ও পেমেন্ট`) with official ICCB Merchant bKash details (`01991-197719`), customer account number, Transaction ID (TrxID), and advance amount.

---

## 4. Lite, One-Color Premium Iconography System

Moving away from glossy gradients, complex multi-color shadows, and animated ping rings:
1. **One-Color Solid Treatment**:
   - Icons use a single solid color: primary brand red (`#DC0511`), solid WhatsApp green (`#25D366`), or crisp monochrome.
2. **Lite Stroke Weight**:
   - Elegant `strokeWidth={1.75}`, crisp vector geometry, no heavy pill backplates on every arrow.
3. **Floating Actions**:
   - Clean, lightweight circular buttons. Back-to-Top is clean white in light mode (`bg-white text-ink-700`). WhatsApp is solid `#25D366`. Phone is solid `#DC0511`. No glossy gradient reflection.

---

## 5. Streamlined Sections: Less Content, Fresh & Premium

### 5.1 "Choose Your Menu" Cards (Homepage & /menu Consistency)
- Replaced the overlapping circular plate style with the clean, modern `/menu` card layout.
- High-resolution rectangular dish banner with subtle hover scale (`scale-105`), category/cuisine badges, bold typography, italic tagline, description, service tag, and clean outline button with directional arrow.
- Pure white background in light mode with delicate `border-ink-100` and dark mode compatibility.

### 5.2 Banquet Occasion Grid (`OccasionGridSection.tsx`)
- Elevated from generic split-card boxes to **luxury full-bleed editorial portals** inspired by 5-star international hospitality groups (Marriott Luxury, Rosewood, Aman).
- Full-bleed photography with cinematic multi-stop gradient scrims (`from-black via-black/55 to-black/25`) ensuring high-contrast readable typography.
- Frosted glass badges for category index (`01 • Grand Weddings`) and guest capacity (`Users` icon with badge).
- Romantic serif italic accents, bold uppercase display headings, and sleek floating pill CTAs (`bg-white text-ink-950 font-bold hover:bg-brand-500 hover:text-white`).

### 5.3 Multi-Step Booking Wizard & Customization (`QuoteForm.tsx`)
- 4 clear steps: Contact Details &rarr; Event Logistics &rarr; **Menu & Cuisine** &rarr; **Review & Payment**.
- **Dedicated Custom Dish Section**: Allows clients to specify exact custom items, live counters, or specialty dishes.
- **Dedicated Inquiries & Chef Notes Field**: Dedicated space for spice preferences, slaughterhouse inquiries, allergy notes, or VIP dining requests.
- **Review & Payment Step 4**: Both custom dishes and special notes are prominently reflected in the client's order summary card before bKash advance booking.
- Intercepts Enter key and prevents premature submission after Step 3.
- Full bKash integration with TrxID validation and advance booking confirmation.

### 5.4 Dashboard Layout & Curated Navigation
- **Responsive Top-Left Logo**: Responsive scaling across mobile, tablet, and desktop with container constraints, preventing distortion or clipping.
- **Curated Executive Routes**: Reordered to prioritize high-level management:
  1. `Overview` (`/dashboard`)
  2. `Analytics` (`/dashboard/analytics`)
  3. `User Management` (`/dashboard/users`)
  4. `Product Management` (`/dashboard/menu`, with Dishes, Categories, and Packages)
  5. `Leads & Inquiries` (`/dashboard/leads`)
  6. `Quotations` (`/dashboard/quotations`)
  7. `Bookings` (`/dashboard/bookings`)
  8. `Settings` (`/dashboard/settings`)
- 40%+ secondary routes (such as blog tags, email templates, audit logs, raw forms) commented out to keep the CMS dashboard clean, focused, and executive-ready.
