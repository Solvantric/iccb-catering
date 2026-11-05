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
