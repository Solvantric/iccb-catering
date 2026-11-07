// Centralized Unsplash and fallback image assets for ICCB Catering

export interface HeroSlide {
  id: string;
  label: string;
  labelBn: string;
  src: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "iccb-1",
    label: "ICCB",
    labelBn: "আইসিসিবি",
    src: "https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1720856910.jpg",
    alt: "International Convention City Bashundhara Exterior",
  },
  {
    id: "iccb-2",
    label: "ICCB",
    labelBn: "আইসিসিবি",
    src: "https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1579495968.jpg",
    alt: "International Convention City Bashundhara Grand View",
  },
  {
    id: "wedding",
    label: "Wedding",
    labelBn: "বিবাহ উৎসব",
    src: "https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1570336154.jpg",
    alt: "ICCB Royal Wedding Celebration",
  },
  {
    id: "fair-expo",
    label: "Fair & Expo",
    labelBn: "মেলা ও প্রদর্শনী",
    src: "https://www.just-style.com/wp-content/uploads/sites/27/2022/04/thumbnail_Bangladesh-Denim-Expo-10.jpg",
    alt: "Bangladesh Denim Expo at ICCB",
  },
];

export const IMAGES = {
  heroFood: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  heroPlate: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  chefCooking: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80",
  modernKitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
  slaughterhouse: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
  qualityCheck: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  
  // Menu items
  kacchiBiryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  beefRezala: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  chickenRoast: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  muttonKorma: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80",
  grilledKebab: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  firniDessert: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  borhaniBeverage: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  shahiTukra: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
  continentalPasta: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80",
  steakFillet: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
  salmonPlatter: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
  dimSumPlatter: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
  
  // Occasions
  privateParty: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  weddingReception: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  corporateEvent: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  birthdayParty: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
  
  // Venues
  hallGulnaksha: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  hallPushpaguchha: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  hallRajdarshan: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  hallNaboratna: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
  heritageRestaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  
  // Avatars
  avatar1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  avatar3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  avatar4: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  
  // Team
  chefExecutive: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80",
  cateringDirector: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  qaManager: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
};

export const WEDDING_IMG =
  "https://img.magnific.com/free-photo/photorealistic-wedding-venue-with-intricate-decor-ornaments_23-2151481469.jpg?semt=ais_hybrid&w=740&q=80";
export const CORPORATE_IMG =
  "https://betterwork.org/wp-content/uploads/BWB-bsuiness-forum-22-1-scaled-1.jpeg";
export const SOCIAL_IMG =
  "https://www.iccbbg.com/assets/upload/wallpaper/wallpaper_1570336154.jpg";
export const BIRTHDAY_IMG =
  "https://media.istockphoto.com/id/1516488332/photo/banquet-decoration-in-hall-restaurant-festive-tables-with-flower-composition-on-black.jpg?s=612x612&w=0&k=20&c=al8ttF6djB95HfH2lxAzYLGvx8jKDgtaqHQa2NTbSb0=";

export const PLACEHOLDER_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";
