export interface NavChild {
  label: string;
  href: string;
  description?: string;
  slug?: string;
}

export interface NavSection {
  title?: string;
  items: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  columns?: NavSection[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: "About Us",
    href: "/about/overview",
    columns: [
      {
        items: [
          { label: "Overview", href: "/about/overview" },
          { label: "Mission & Values", href: "/about/mission-values" },
          { label: "Management", href: "/about/management" },
          { label: "Our Team", href: "/about/our-team" },
          { label: "Join Us", href: "/about/join-us" },
        ],
      },
    ],
  },
  {
    label: "Explore",
    href: "/venues",
    columns: [
      {
        title: "Venues",
        items: [
          { label: "Gulnaksha (Hall-1)", href: "/venues/gulnaksha", slug: "gulnaksha" },
          { label: "Pushpoguchcho (Hall-2)", href: "/venues/pushpoguchcho", slug: "pushpoguchcho" },
          { label: "Rajdarshan (Hall-3)", href: "/venues/rajdarshan", slug: "rajdarshan" },
          { label: "Noboratri (Hall-4)", href: "/venues/noboratri", slug: "noboratri" },
          { label: "Pushpanjali (Hall-5)", href: "/venues/pushpanjali", slug: "pushpanjali" },
          { label: "Seminar Hall (Hall-6)", href: "/venues/seminar-hall", slug: "seminar-hall" },
          { label: "Expo Village", href: "/venues/expo-village", slug: "expo-village" },
          { label: "ICCB Heritage Restaurant Venues", href: "/venues/heritage-restaurant", slug: "heritage-restaurant" },
        ],
      },
      {
        title: "Discover",
        items: [
          { label: "Photo Gallery", href: "/gallery" },
          { label: "Latest Events", href: "/events" },
          { label: "News & Media", href: "/news" },
          { label: "Venue Map & Direction", href: "/venue-map" },
        ],
      },
    ],
  },
  {
    label: "Plan Your Event",
    href: "/plan/wedding",
    columns: [
      {
        title: "Event Types",
        items: [
          { label: "Wedding", href: "/plan/wedding" },
          { label: "Fair & Exhibitions", href: "/plan/fair-exhibitions" },
          { label: "Corporate Events", href: "/plan/corporate-events" },
          { label: "Cultural Events", href: "/plan/cultural-events" },
          { label: "Exams", href: "/plan/exams" },
          { label: "Trainings & Seminars", href: "/plan/trainings-seminars" },
          { label: "Convocations", href: "/plan/convocations" },
          { label: "Fashion Shows", href: "/plan/fashion-shows" },
        ],
      },
      {
        title: "Pricing & Information",
        items: [
          { label: "Current Offers", href: "/plan/offers" },
          { label: "Rates & Fees", href: "/plan/rates" },
        ],
      },
    ],
  },
  {
    label: "Dining",
    href: "/catering",
    columns: [
      {
        items: [
          { label: "Catering", href: "/catering" },
          { label: "Restaurant", href: "/restaurant" },
        ],
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    columns: [
      {
        items: [
          { label: "Get in Touch", href: "/contact" },
          { label: "Event Inquiries", href: "/contact/enquiry" },
          { label: "FAQ", href: "/faq" },
        ],
      },
    ],
  },
];

export const FOOTER_NAV = {
  venues: [
    { label: "Gulnaksha (Hall-1)", href: "/venues/gulnaksha" },
    { label: "Pushpoguchcho (Hall-2)", href: "/venues/pushpoguchcho" },
    { label: "Rajdarshan (Hall-3)", href: "/venues/rajdarshan" },
    { label: "Noboratri (Hall-4)", href: "/venues/noboratri" },
    { label: "Pushpanjali (Hall-5)", href: "/venues/pushpanjali" },
    { label: "Seminar Hall (Hall-6)", href: "/venues/seminar-hall" },
    { label: "Expo Village", href: "/venues/expo-village" },
    { label: "Heritage Restaurant", href: "/venues/heritage-restaurant" },
  ],
  plan: [
    { label: "Wedding", href: "/plan/wedding" },
    { label: "Fair & Exhibitions", href: "/plan/fair-exhibitions" },
    { label: "Corporate Events", href: "/plan/corporate-events" },
    { label: "Cultural Events", href: "/plan/cultural-events" },
    { label: "Exams", href: "/plan/exams" },
    { label: "Trainings & Seminars", href: "/plan/trainings-seminars" },
    { label: "Convocations", href: "/plan/convocations" },
    { label: "Fashion Shows", href: "/plan/fashion-shows" },
  ],
  contact: [
    { label: "+88-02-41091551", href: "tel:+880241091551" },
    { label: "+88-01991-197719", href: "tel:+8801991197719" },
    { label: "More Numbers", href: "/contact" },
    { label: "iccb@bga-bd.com", href: "mailto:iccb@bga-bd.com" },
  ],
};
