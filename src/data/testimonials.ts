import { Testimonial } from "@/types";
import { IMAGES } from "./images";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Tanvir Ahmed",
    role: "Head of Corporate Affairs",
    company: "Standard Chartered Bank Dhaka",
    eventType: "Annual Corporate Gala (800 Guests)",
    content:
      "ICCB Catering set an unprecedented benchmark for our annual corporate gala. Serving 800 high-profile guests simultaneously without a minute's delay, with food served piping hot and tasting like a luxury boutique kitchen, is something only ICCB can pull off in Bangladesh.",
    rating: 5,
    avatarUrl: IMAGES.avatar2,
    date: "14 October, 2026",
    approved: true,
    isSample: true,
  },
  {
    id: "test-2",
    author: "Farhana & Dr. Sadman Chowdhury",
    role: "Bride & Groom",
    company: "Wedding Reception",
    eventType: "Wedding Reception at Hall 3 (1,200 Guests)",
    content:
      "Our relatives still talk about the Shahi Kacchi Biryani and the Borhani served at our wedding! What amazed us most was the hygiene and temperature of every dish. The dedicated VIP table service gave our parents total peace of mind.",
    rating: 5,
    avatarUrl: IMAGES.avatar1,
    date: "28 September, 2026",
    approved: true,
    isSample: true,
  },
  {
    id: "test-3",
    author: "Nabila Hossain",
    role: "Managing Director",
    company: "Aura Lifestyle",
    eventType: "Brand Launch High-Tea (250 Guests)",
    content:
      "From the initial tasting session to the final event execution, the ICCB Catering team was exceptionally professional. The Continental canapés, live pasta bar, and presentation were world-class. Highly recommended!",
    rating: 5,
    avatarUrl: IMAGES.avatar4,
    date: "05 August, 2026",
    approved: true,
    isSample: true,
  },
  {
    id: "test-4",
    author: "Kamrul Islam, FCA",
    role: "Convener",
    company: "ICAB National Conference",
    eventType: "National Summit (2,000 Delegates)",
    content:
      "Managing food logistics for a two-day national conference is a monumental challenge. ICCB's modern kitchen infrastructure, automated slaughterhouse meat tracking, and punctual delivery made the catering seamless.",
    rating: 5,
    avatarUrl: IMAGES.avatar3,
    date: "12 July, 2026",
    approved: true,
    isSample: true,
  },
];

