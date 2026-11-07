export interface VenueSeats {
  theater?: string;
  banquet?: string;
  classroom?: string;
  uShape?: string;
}

export interface VenueSize {
  mezzanine?: string;
  width?: string;
  height?: string;
  length?: string;
}

export interface Venue {
  slug: string;
  no: string;
  name: string;
  label: string;
  type: "hall" | "expo" | "dining";
  image: string;
  intro: string;
  seats?: VenueSeats;
  size?: VenueSize;
  parking?: string;
  maxEvent?: string;
  rent?: string;
  facilities?: string[];
  layouts?: string[];
  facts?: string[];
  video?: string;
  note?: string;
}

export const VENUES: Venue[] = [
  {
    slug: "gulnaksha",
    no: "01",
    name: "Gulnaksha",
    label: "Hall 01",
    type: "hall",
    image: "https://www.iccbbg.com/assets/images/pages/hall/h1.jpg",
    intro:
      "The first hall on your right as you enter ICCB, with a garden and roadside view. No pillars inside and a high ceiling, so the whole floor is open for your layout.",
    seats: {
      theater: "1,600",
      banquet: "800",
      classroom: "650",
      uShape: "300",
    },
    size: {
      mezzanine: "2,050 sq ft",
      width: "78 ft",
      height: "34 ft",
      length: "205 ft",
    },
    parking: "More than 500 cars",
    maxEvent: "Up to 1,600 people",
    rent: "BDT 4,00,000 (+ other charges)",
    facilities: [
      "2 green rooms",
      "Central air conditioning (halls only)",
      "CCTV coverage",
      "Free Wi-Fi",
      "Hygienic fresh room",
      "1 archway gate",
      "2 microphones",
      "1 raffle draw box",
    ],
  },
  {
    slug: "pushpoguchcho",
    no: "02",
    name: "Pushpoguchcho",
    label: "Hall 02",
    type: "hall",
    image: "https://www.iccbbg.com/assets/images/pages/hall/h2.jpg",
    intro:
      "A pillar-free hall with a high ceiling for weddings, exhibitions, corporate seminars and cultural events.",
    seats: {
      theater: "1,600",
      banquet: "800",
      classroom: "650",
    },
    rent: "BDT 4,00,000 (+ other charges)",
  },
  {
    slug: "rajdarshan",
    no: "03",
    name: "Rajdarshan",
    label: "Hall 03",
    type: "hall",
    image: "https://www.iccbbg.com/assets/images/pages/hall/h3.jpg",
    intro:
      "At the centre of ICCB with a flower garden in front. Pillar-free with a high ceiling, used for weddings, corporate events, cultural programmes and exhibitions.",
    seats: {
      banquet: "1,000",
    },
    rent: "BDT 4,00,000 (+ other charges)",
  },
  {
    slug: "noboratri",
    no: "04",
    name: "Noboratri",
    label: "Hall 04",
    type: "hall",
    image: "https://www.iccbbg.com/assets/images/pages/hall/h4.jpg",
    intro:
      "The largest hall at ICCB, with no pillars inside despite the very high ceiling. Space for more than 3,000 people at a time.",
    seats: {
      theater: "3,000+",
      banquet: "1,200",
      classroom: "1,000",
      uShape: "500",
    },
    size: {
      mezzanine: "5,500 sq ft",
      width: "98 ft",
      height: "38 ft",
      length: "231 ft",
    },
    parking: "More than 1,000 cars",
    maxEvent: "Up to 4,000 people",
    rent: "BDT 5,50,000 (+ other charges)",
    facilities: [
      "2 green rooms",
      "Central air conditioning (halls only)",
      "CCTV coverage",
      "Free Wi-Fi",
      "Hygienic fresh room",
      "1 archway gate",
      "2 microphones",
      "1 raffle draw box",
    ],
    layouts: [
      "Full banquet dining",
      "Banquet dining with stage",
      "Theater with stage",
      "Banquet with waiting stage",
    ],
  },
  {
    slug: "pushpanjali",
    no: "05",
    name: "Pushpanjali",
    label: "Hall 05",
    type: "hall",
    image: "https://www.iccbbg.com/assets/images/pages/hall/h5.jpg",
    intro:
      "The smallest hall at ICCB, with a garden and a view of the expo area.",
    seats: {
      theater: "600",
      banquet: "350",
      classroom: "150",
      uShape: "100",
    },
    facilities: [
      "1 green room",
      "Central air conditioning",
      "CCTV coverage",
      "Free Wi-Fi",
      "Hygienic fresh room",
      "1 archway gate",
    ],
  },
  {
    slug: "seminar-hall",
    no: "06",
    name: "Seminar Hall",
    label: "Hall 06",
    type: "hall",
    image: "https://www.iccbbg.com/assets/images/pages/hall/h6.jpg",
    intro: "A compact hall for seminars and small meetings.",
    seats: {
      theater: "120",
      banquet: "100",
      classroom: "70",
      uShape: "60",
    },
    size: {
      width: "27 ft",
      height: "12 ft",
      length: "79 ft",
    },
  },
  {
    slug: "expo-village",
    no: "07",
    name: "Expo Village",
    label: "Expo Village",
    type: "expo",
    image: "https://img.youtube.com/vi/5xrEvhLymd8/maxresdefault.jpg",
    intro:
      "The largest, most advanced and fully equipped expo venue in the country.",
    facts: [
      "12,500 sq m",
      "13 m height",
      "Four events at the same time",
      "Space for over 10,000 people",
      "Centralized air conditioning",
      "Backup power",
      "24/7 CCTV",
      "Parking",
      "Wash zone",
    ],
    video: "5xrEvhLymd8",
  },
  {
    slug: "heritage-restaurant-venues",
    no: "08",
    name: "ICCB Heritage Restaurant Venues",
    label: "Private dining",
    type: "dining",
    image:
      "https://www.iccbbg.com/assets/images/pages/hall/venues/darbar/h1.png",
    intro:
      "Private dining rooms at the ICCB Heritage Restaurant for small groups.",
    note: "Seating from 20 to 40 people",
  },
];

export const COMMON_GALLERY = [
  {
    src: "https://www.iccbbg.com/assets/images/pages/hall/venues/agomoni/h1.png",
    label: "Agomoni",
  },
  {
    src: "https://www.iccbbg.com/assets/images/pages/hall/venues/darbar/h1.png",
    label: "Darbar",
  },
  {
    src: "https://www.iccbbg.com/assets/images/pages/hall/venues/kachghar/h1.png",
    label: "Kachghar",
  },
  {
    src: "https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1570336154.jpg",
    label: "",
  },
];

