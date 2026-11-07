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

### 5.1 Occasion Grid Section (`OccasionGridSection.tsx`)
- Pristine white background in white mode (`bg-white dark:bg-ink-950`).
- Removed redundant paragraphs, multi-layered badges, and cluttered taglines.
- Fresh image-first cards with high-res photography, clean occasion title, a concise 1-line description, capacity badge, and a lite one-color arrow link.

### 5.2 Today's Menu Section (`TodaysMenuSection.tsx`)
- Pristine white background in white mode (`bg-white dark:bg-ink-950`).
- Removed dietary tag walls, multi-gradient haloes, and price clutter.
- Highlighted circular plates with clean borders, dish name, concise 1-line note, and a lite one-color action link.

### 5.3 Curated Packages Page (`/packages`)
- Streamlined editorial cards focused on high-res photography, per-guest rates, 5 punchy signature dishes, included services, and direct booking button.
- Eliminates multi-level nested boxes and walls of text.

### 5.4 Multi-Step Booking Wizard (`QuoteForm.tsx`)
- 4 clear steps: Contact Details &rarr; Event Logistics &rarr; Menu & Cuisine &rarr; **Review & Payment**.
- Intercepts Enter key and prevents premature submission after Step 3.
- Full bKash merchant integration with TrxID validation and advance booking confirmation.
