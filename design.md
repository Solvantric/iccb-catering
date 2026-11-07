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
- **`gold-500` (`#D4AF37`) & `gold-400` (`#F3E5AB`)**: Subtle metallic gold highlights for prestige banquet seals and luxury badges.
- **`whatsapp-green` (`#25D366`)**: Authentic WhatsApp green with gradient depth for floating contact triggers.

---

## 2. Typography Hierarchy

- **Display & Section Headings**: `Oswald` / `Barlow Condensed` (`font-display`)
  - All-caps, tight tracking (`tracking-tight` or `tracking-wider`), bold to black weight (700-900).
  - Gives a bold, prestigious culinary magazine editorial aesthetic.
- **Body & UI**: `Inter` (`font-sans`)
  - Clean, legible, modern grotesk with high x-height for clear reading of menus and banquet specs.
- **Accent & Taglines**: `Playfair Display` Italic (`font-serif`)
  - Reserved for *"Taste of Happiness"*, culinary flourishes, and chef quotes.

---

## 3. Premium Iconography System

Moving away from bare minimal monochrome line icons towards luxury, contextually enriched icons:
1. **WhatsApp Trigger**:
   - Iconic WhatsApp green gradient (`bg-gradient-to-tr from-[#128C7E] to-[#25D366]`), white authentic WhatsApp badge, subtle emerald ping ring, and tooltip with Bangladesh contact details.
2. **Phone Concierge Trigger**:
   - Rich brand crimson gradient (`bg-gradient-to-tr from-[#9E030B] to-[#DC0511]`), crisp telephone handset icon, radiating soundwave animation, and direct hotline display.
3. **Sculpted Directional Arrows**:
   - Circular glass/metallic backplates with directional arrow glide on hover (`group-hover:translate-x-1 group-hover:-translate-y-0.5`).
   - Replaces flat inline arrows with elevated action badges.
4. **Culinary & Specialty Seals**:
   - Double-ringed circular icons with crimson/gold gradients for slaughterhouse purity, temperature assurance (65°C+), and executive chef certifications.

---

## 4. Section Upgrades & Refinements

### 4.1 Occasion Grid Section (`OccasionGridSection.tsx`)
- **Problem**: Previous version felt generic with basic white floating bottom boxes and flat cards.
- **Redesign**:
  - Transform into an ultra-luxury editorial showcase.
  - High-resolution banquet imagery with deep ambient dark gradients and warm lighting.
  - Glassmorphic bottom panel with micro-blur (`backdrop-blur-xl bg-ink-950/75 border border-white/10`), gold-accented guest capacity badges, sculpted circular arrow buttons with hover fill, and smooth zoom interaction.
  - Category tags (e.g., *"Grand Banquets"*, *"Regal Celebrations"*, *"Corporate Summits"*).

### 4.2 Today's Menu Section (`TodaysMenuSection.tsx`)
- **Problem**: Showing prices made it look like a casual street restaurant rather than a South Asia premier convention caterer.
- **Redesign**:
  - **Eliminate prices entirely** from Today's Menu to emphasize exclusivity, custom banquet tailoring, and high-end culinary craftsmanship.
  - **Heroize Dish Imagery**: Magnified circular plate presentations with warm radiant underglow (`shadow-[0_0_25px_rgba(220,5,17,0.35)]`), golden rim borders, and zoom dynamics.
  - Enhanced course descriptors: Chef secret spices, dum-pukht techniques, dietary tags (Halal, Slow-Cooked 12h, Royal Mughal), and an interactive *"Inquire About This Dish"* drawer/modal action.

### 4.3 Packages Page (`/packages`)
- **Problem**: Packages looked like flat text lists without appetite appeal or visual luxury.
- **Redesign**:
  - Feature a captivating culinary hero image for every package (Wedding Kacchi Feast, Executive Corporate Buffet, High-Tea Gala, Social Milestones).
  - Premium tier badging (e.g., *"Prestige Gold Tier"*, *"Executive Summit Choice"*, *"Royal Heirloom"*).
  - Structured tabbed or pill navigation between course categories (Welcome Drinks, Main Entrees, Royal Desserts, Amenities).
  - Prominent per-head price callout with transparent BDT currency formatting and a direct *"Request Quote for this Package"* one-click bridge into the multi-step quote wizard.

---

## 5. Micro-Interactions & Motion
- Framer Motion scroll reveals (`whileInView`, `viewport: { once: true }`).
- Subtle 3D lift on cards (`hover:-translate-y-1.5 hover:shadow-2xl`).
- Dynamic hover border transitions using brand crimson `#DC0511`.
