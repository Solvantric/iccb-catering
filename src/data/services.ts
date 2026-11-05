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

