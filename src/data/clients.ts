import { ClientLogo, NewsItem } from "@/types";

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "cl-1", name: "Standard Chartered Bank", logoUrl: "SCB", industry: "Banking & Finance", isSample: true },
  { id: "cl-2", name: "Grameenphone PLC", logoUrl: "GP", industry: "Telecom", isSample: true },
  { id: "cl-3", name: "BRAC International", logoUrl: "BRAC", industry: "Development", isSample: true },
  { id: "cl-4", name: "Beximco Pharmaceuticals", logoUrl: "Beximco", industry: "Healthcare", isSample: true },
  { id: "cl-5", name: "Apex Footwear", logoUrl: "Apex", industry: "Retail & Manufacturing", isSample: true },
  { id: "cl-6", name: "Unilever Bangladesh", logoUrl: "Unilever", industry: "FMCG", isSample: true },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    slug: "iccb-catering-adds-new-thermal-transport-fleet",
    title: "ICCB Catering Unveils Fleet of 10 Smart Temperature-Controlled Mobile Units",
    summary: "New insulated transport vehicles ensure off-premises catering arrives at 65°C+ across Greater Dhaka.",
    content: "To cater to increasing demand for off-premises corporate and diplomatic catering in Gulshan, Banani, and Uttara, ICCB Catering has expanded its dedicated logistics division with ten custom-engineered thermal vehicles.",
    publishedAt: "2026-10-20",
    category: "Press Release",
    isSample: true,
  },
  {
    id: "news-2",
    slug: "hygiene-audit-completion-haccp-2026",
    title: "Annual International Food Safety Audit Concluded with Grade A Certification",
    summary: "Modern slaughterhouse and central kitchen passed rigorous bi-annual chemical and microbial checks.",
    content: "Independent food safety inspectors have recertified ICCB's central catering facilities, praising the automated livestock traceability and sterile butchery environment.",
    publishedAt: "2026-09-12",
    category: "Quality Milestone",
    isSample: true,
  },
];

