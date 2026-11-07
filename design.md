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

### 1.2 Neutral & Background Tokens
- **`ink-950` (`#0B0B0C`)**: Deep luxury black used for Hero, Today's Menu, Video Story, and Footer sections.
- **`ink-900` (`#141416`)**: Card surfaces in dark sections, dropdown menus, and elevated containers.
- **`ink-800` (`#27272A`)**: Borders, subtle dividers, and dark input backgrounds.
- **`ink-600` (`#52525B`)**: High-contrast readable secondary typography on light surfaces.
- **`ink-50` (`#F4F4F5`)**: Light gray background tint for section contrast.
- **`whatsapp-green` (`#25D366`)**: Authentic WhatsApp emerald green gradient for floating contact concierge.
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

## 4. Premium Iconography System

1. **WhatsApp Trigger**:
   - Authentic emerald green gradient (`bg-gradient-to-tr from-[#128C7E] to-[#25D366]`), white authentic WhatsApp badge, subtle emerald ping ring, and direct Bangladesh chat hotline.
2. **Phone Concierge Trigger**:
   - Rich brand crimson gradient (`bg-gradient-to-tr from-[#7D0208] to-[#DC0511]`), crisp telephone handset icon, radiating soundwave animation, and direct hotline display.
3. **Sculpted Directional Arrows**:
   - Circular glass/metallic backplates with directional arrow glide on hover (`group-hover:translate-x-1 group-hover:-translate-y-0.5`).
4. **bKash Payment Badge**:
   - Distinctive bKash magenta card (`#E2136E`) with merchant number badge and one-click clipboard copy.

---

## 5. Section Upgrades & Refinements

### 5.1 Occasion Grid Section (`OccasionGridSection.tsx`)
- Editorial format with cinematic banquet photography, deep ambient dark gradients, dark frosted glassmorphism (`backdrop-blur-xl bg-ink-950/75`), verified capacity badges, and sculpted circular arrow buttons.

### 5.2 Today's Menu Section (`TodaysMenuSection.tsx`)
- Removed price clutter to elevate luxury positioning.
- Magnified circular plates with glowing ambient halo and chef signature details.

### 5.3 Curated Packages Page (`/packages`)
- Streamlined editorial cards focused on high-res photography, per-guest rates, 5 punchy signature dishes, included services, and direct booking button.
- Eliminates multi-level nested boxes and walls of text.

### 5.4 Multi-Step Booking Wizard (`QuoteForm.tsx`)
- 4 clear steps: Contact Details &rarr; Event Logistics &rarr; Menu & Cuisine &rarr; **Review & Payment**.
- Intercepts Enter key and prevents premature submission after Step 3.
- Full bKash merchant integration with TrxID validation and advance booking confirmation.
