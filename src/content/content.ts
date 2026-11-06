import { Venue, EventTypeItem, FAQ } from "@/types";
import { IMAGES } from "./images";

export const SITE_FACTS = {
  name: "ICCB",
  fullName: "International Convention City Bashundhara",
  parentOrg: "Bashundhara Group",
  tagline: "Taste of Happiness",
  foundedYear: "2015",
  operatingSince: "1 January 2015",
  venueCount: "6",
  architect: "Volumezero",
  siteScale: "17-acre site",
  construction: "Metal, concrete and glass structure",
  address: "Next to 300 ft Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229",
  locationShort: "Kuril Bishwa Road, Dhaka",
  bookingPhones: [
    "+88-02-41091551",
    "+88-01991-197719",
    "+88-01938-878717",
    "+88-01991-197718",
    "+88-01704-160389",
    "+88-01938-878790",
  ],
  bookingEmail: "iccb@bga-bd.com",
  cateringPhone: "+88-01969-999866",
  cateringEmail: "iccbcatering@bga-bd.com",
  socialLinks: {
    facebook: "https://www.facebook.com/iccbbashundhara",
    instagram: "https://www.instagram.com/iccbbashundhara",
    youtube: "https://www.youtube.com/@iccbbashundhara",
  },
  // UNVERIFIED FACTS HELD AS TODO:
  // TODO: Confirm exact total guest capacity (10,000 vs 20,000+)
  // TODO: Confirm exact total site area (6.5 lakh vs 8.5 lakh sq ft)
  // TODO: Confirm individual hall dimensions and seated capacities
  // TODO: Confirm management & team names
  // TODO: Confirm official rates & fee sheets
};

export const REAL_VENUES: Venue[] = [
  {
    id: "v-1",
    slug: "gulnaksha",
    name: "Gulnaksha",
    hallNumber: "Hall-1",
    tagline: "Grand Convention & Banquet Hall",
    description: "Expansive pillarless hall suited for mega wedding receptions, corporate annual conferences, and national conventions.",
    features: ["Pillarless layout", "Acoustic insulation", "Dedicated entrance loop"],
    image: IMAGES.venues.gulnaksha,
  },
  {
    id: "v-2",
    slug: "pushpoguchcho",
    name: "Pushpoguchcho",
    hallNumber: "Hall-2",
    tagline: "Multi-Purpose Hall",
    description: "Versatile venue equipped for exhibitions, corporate galas, festive banquets, and stage performances.",
    features: ["Intelligent lighting", "Direct vehicle loading access", "Pre-function foyer"],
    image: IMAGES.venues.pushpoguchcho,
  },
  {
    id: "v-3",
    slug: "rajdarshan",
    name: "Rajdarshan",
    hallNumber: "Hall-3",
    tagline: "Premier Exhibition & Summit Venue",
    description: "Our grandest auditorium designed to host international trade fairs, bilateral summits, and monumental celebrations.",
    features: ["High ceiling clearance", "Heavy machinery floor load", "VIP lounge suite"],
    image: IMAGES.venues.rajdarshan,
  },
  {
    id: "v-4",
    slug: "noboratri",
    name: "Noboratri",
    hallNumber: "Hall-4",
    tagline: "Modular Banquet & Event Hall",
    description: "Adaptable convention hall accommodating diverse floor layouts from classroom seminars to elegant social banquets.",
    features: ["Demountable partitions", "Central climate control", "Green rooms"],
    image: IMAGES.venues.noboratri,
  },
  {
    id: "v-5",
    slug: "pushpanjali",
    name: "Pushpanjali",
    hallNumber: "Hall-5",
    tagline: "Exclusive Banqueting Space",
    description: "Dedicated hall customized for private social functions, cultural evenings, and corporate dinners.",
    features: ["Integrated sound systems", "Private dining annex", "Covered porch access"],
    image: IMAGES.venues.pushpanjali,
  },
  {
    id: "v-6",
    slug: "seminar-hall",
    name: "Seminar Hall",
    hallNumber: "Hall-6",
    tagline: "Executive Conference Facility",
    description: "Executive presentation and training hall designed for board meetings, seminars, and academic examinations.",
    features: ["3,300 sq ft floor space", "50-car parking perimeter", "Audio-visual conferencing"],
    specs: {
      area: "3,300 sq ft",
      parking: "50-car parking",
    },
    image: IMAGES.venues.seminarHall,
  },
  {
    id: "v-7",
    slug: "expo-village",
    name: "Expo Village",
    tagline: "Open-Air Exhibition & Pavilion Ground",
    description: "Massive open exhibition grounds engineered for outdoor machinery expos, food carnivals, cultural festivals, and large-scale public fairs.",
    features: ["Outdoor event ground", "Direct 300ft highway access", "Heavy equipment transit"],
    image: IMAGES.venues.expoVillage,
  },
  {
    id: "v-8",
    slug: "heritage-restaurant",
    name: "ICCB Heritage Restaurant Venues",
    tagline: "Mughal Architecture Fine Dining & Private Rooms",
    description: "Authentic royal dining halls and VIP private rooms located on the ICCB premises for intimate celebrations and tastings.",
    features: ["Mughal architectural ambience", "Private tasting rooms", "Authentic dining banquets"],
    image: IMAGES.venues.heritageRestaurant,
  },
];

export const REAL_EVENT_TYPES: EventTypeItem[] = [
  {
    id: "ev-wedding",
    slug: "wedding",
    title: "Wedding",
    description: "Royal wedding celebrations, Holud & Mehendi nights, and grand Walima banquets executed with royal hospitality.",
  },
  {
    id: "ev-fair",
    slug: "fair-exhibitions",
    title: "Fair & Exhibitions",
    description: "International industrial expos, trade fairs, consumer carnivals, and commercial merchandise showcases.",
  },
  {
    id: "ev-corporate",
    slug: "corporate-events",
    title: "Corporate Events",
    description: "Annual General Meetings (AGM), corporate leadership summits, partner awards, and executive galas.",
  },
  {
    id: "ev-cultural",
    slug: "cultural-events",
    title: "Cultural Events",
    description: "Concerts, cultural celebrations, theatrical performances, and national holiday observances.",
  },
  {
    id: "ev-exams",
    slug: "exams",
    title: "Exams",
    description: "Punctual, quiet, climate-controlled testing facilities for international boards, certifications, and recruitments.",
  },
  {
    id: "ev-trainings",
    slug: "trainings-seminars",
    title: "Trainings & Seminars",
    description: "Professional capacity-building sessions, technical workshops, and industry keynote conferences.",
  },
  {
    id: "ev-convocations",
    slug: "convocations",
    title: "Convocations",
    description: "Academic graduation ceremonies for leading national and private universities honoring thousands of graduates.",
  },
  {
    id: "ev-fashion",
    slug: "fashion-shows",
    title: "Fashion Shows",
    description: "High-fashion runways, designer collections, lighting choreography, and media launch spectacles.",
  },
];

export const REAL_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "What is ICCB?",
    answer: "International Convention City Bashundhara (ICCB) is the largest integrated event and convention facility in South Asia, purpose-built with world-class infrastructure to host mega exhibitions, conventions, royal weddings, and corporate gatherings.",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Where is ICCB located?",
    answer: "ICCB is located immediately next to the 300 ft. Purbachal Express Highway, Kuril Bishwa Road, Dhaka 1229, Bangladesh. It is easily accessible via express flyovers and arterial roads from Gulshan, Banani, Uttara, and the Hazrat Shahjalal International Airport.",
    order: 2,
  },
  {
    id: "faq-3",
    question: "What venues and halls are available at ICCB?",
    answer: "ICCB features 6 dedicated convention halls — Gulnaksha (Hall-1), Pushpoguchcho (Hall-2), Rajdarshan (Hall-3), Noboratri (Hall-4), Pushpanjali (Hall-5), and Seminar Hall (Hall-6) — along with the expansive open-air Expo Village and ICCB Heritage Restaurant private rooms.",
    order: 3,
  },
  {
    id: "faq-4",
    question: "How can I book a hall or venue for an event?",
    answer: "You can submit an enquiry directly through our online Enquiry form or contact our booking desk directly by telephone (+88-02-41091551 / +88-01991-197719) or email (iccb@bga-bd.com). Our banquet and venue managers will schedule an on-site visit and provide current availability.",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Does ICCB provide on-site catering services?",
    answer: "Yes. ICCB operates its own dedicated full-service catering division delivering authentic traditional cuisine, continental selections, and custom banquet menus for events of all scales.",
    order: 5,
  },
];

