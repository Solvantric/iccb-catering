export interface NavItem {
  label: string;
  labelBn?: string;
  href: string;
  children?: { label: string; labelBn?: string; href: string }[];
}

export const PUBLIC_NAV: NavItem[] = [
  { label: "About", labelBn: "আমাদের সম্পর্কে", href: "/about" },
  {
    label: "Services",
    labelBn: "সেবাসমূহ",
    href: "/services",
    children: [
      { label: "Corporate Catering", labelBn: "কর্পোরেট ক্যাটারিং", href: "/services/corporate-catering" },
      { label: "Wedding Catering", labelBn: "বিবাহ ক্যাটারিং", href: "/services/wedding-catering" },
      { label: "Birthday & Social", labelBn: "জন্মদিন ও সামাজিক", href: "/services/birthday-party-catering" },
      { label: "Corporate Lunch Box", labelBn: "কর্পোরেট লাঞ্চ বক্স", href: "/lunch-box" },
      { label: "Food Tasting Session", labelBn: "ফুড টেস্টিং সেশন", href: "/tasting" },
    ],
  },
  { label: "Menu", labelBn: "মেন্যু", href: "/menu" },
  { label: "Packages", labelBn: "প্যাকেজ", href: "/packages" },
  { label: "Gallery", labelBn: "গ্যালারি", href: "/gallery" },
  { label: "Venues", labelBn: "ভেন্যু", href: "/venues" },
  { label: "Blog", labelBn: "ব্লগ", href: "/blog" },
  { label: "Contact", labelBn: "যোগাযোগ", href: "/contact" },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Corporate Catering", labelBn: "কর্পোরেট ক্যাটারিং", href: "/services/corporate-catering" },
    { label: "Wedding Banquets", labelBn: "বিবাহের ভোজ", href: "/services/wedding-catering" },
    { label: "Birthday & Private", labelBn: "জন্মদিন ও ঘরোয়া পার্টি", href: "/services/birthday-party-catering" },
    { label: "Corporate Lunch Boxes", labelBn: "কর্পোরেট লাঞ্চ বক্স", href: "/lunch-box" },
    { label: "Custom Menu Packages", labelBn: "কাস্টম মেন্যু প্যাকেজ", href: "/packages" },
    { label: "Private Food Tasting", labelBn: "ফুড টেস্টিং", href: "/tasting" },
  ],
  company: [
    { label: "About ICCB", labelBn: "আইসিসিবি সম্পর্কে", href: "/about" },
    { label: "Our 4 Convention Halls", labelBn: "আমাদের ৪টি কনভেনশন হল", href: "/venues" },
    { label: "Our 5-Step Process", labelBn: "আমাদের ৫-ধাপের প্রক্রিয়া", href: "/our-process" },
    { label: "Client Testimonials", labelBn: "গ্রাহকদের মতামত", href: "/testimonials" },
    { label: "Seasonal Offers", labelBn: "বিশেষ অফার", href: "/offers" },
    { label: "Careers", labelBn: "ক্যারিয়ার", href: "/careers" },
  ],
  useful: [
    { label: "Request a Quote", labelBn: "কোটেশন অনুরোধ", href: "/quote" },
    { label: "Book an Event", labelBn: "ইভেন্ট বুকিং", href: "/booking" },
    { label: "General Inquiry", labelBn: "সাধারণ অনুসন্ধান", href: "/inquiry" },
    { label: "Frequently Asked Questions", labelBn: "সাধারণ জিজ্ঞাসা", href: "/faq" },
    { label: "Privacy Policy", labelBn: "গোপনীয়তা নীতি", href: "/privacy-policy" },
    { label: "Terms & Conditions", labelBn: "শর্তাবলী", href: "/terms" },
    { label: "Cancellation Policy", labelBn: "বাতিলকরণ নীতি", href: "/cancellation-policy" },
  ],
};

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  {
    label: "Leads & Inquiries",
    href: "/dashboard/leads",
    icon: "Users",
    children: [
      { label: "All Leads", href: "/dashboard/leads" },
      { label: "Kanban Pipeline", href: "/dashboard/leads/pipeline" },
    ],
  },
  { label: "Quotations", href: "/dashboard/quotations", icon: "FileText" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "Calendar" },
  { label: "Contact Messages", href: "/dashboard/contacts", icon: "Mail" },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: "Send" },
  {
    label: "Menu Management",
    href: "/dashboard/menu",
    icon: "Utensils",
    children: [
      { label: "Dishes & Items", href: "/dashboard/menu" },
      { label: "Add Dish", href: "/dashboard/menu/new" },
      { label: "Categories", href: "/dashboard/menu/categories" },
    ],
  },
  { label: "Packages", href: "/dashboard/packages", icon: "PackageCheck" },
  { label: "Services", href: "/dashboard/services", icon: "ConciergeBell" },
  { label: "Page Content", href: "/dashboard/pages", icon: "Layout" },
  { label: "Banners & Popups", href: "/dashboard/banners", icon: "Megaphone" },
  { label: "Gallery", href: "/dashboard/gallery", icon: "Image" },
  { label: "Media Library", href: "/dashboard/media", icon: "FolderArchive" },
  {
    label: "Blog & Articles",
    href: "/dashboard/blog",
    icon: "BookOpen",
    children: [
      { label: "All Posts", href: "/dashboard/blog" },
      { label: "New Post", href: "/dashboard/blog/new" },
      { label: "Categories", href: "/dashboard/blog/categories" },
      { label: "Tags", href: "/dashboard/blog/tags" },
    ],
  },
  { label: "News & Releases", href: "/dashboard/news", icon: "Newspaper" },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: "MessageSquareQuote" },
  { label: "FAQs", href: "/dashboard/faqs", icon: "HelpCircle" },
  { label: "Client Logos", href: "/dashboard/clients", icon: "Award" },
  { label: "SEO & Redirects", href: "/dashboard/seo", icon: "Search" },
  { label: "Forms Builder-Lite", href: "/dashboard/forms", icon: "FormInput" },
  { label: "Email Templates", href: "/dashboard/email-templates", icon: "MailCheck" },
  { label: "Audit Logs", href: "/dashboard/audit-logs", icon: "ShieldAlert" },
  { label: "Users & Roles", href: "/dashboard/users", icon: "UserCheck" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];
