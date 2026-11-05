import { Package } from "@/types";

export const PACKAGES: Package[] = [
  {
    id: "pkg-1",
    slug: "royal-mughal-wedding-feast",
    name: "Royal Mughal Wedding Feast",
    tagline: "The quintessential regal banquet for unforgettable weddings",
    tag: "Most Popular",
    description:
      "A lavish royal spread featuring our legendary Shahi Kacchi Biryani, tender mutton rezala, golden chicken roast, and traditional Dhaka desserts, served with warm hospitality.",
    pricePerHead: 1450,
    minGuests: 150,
    cuisineType: "Traditional Mughal & Bengali",
    courses: [
      {
        name: "Welcome Drinks & Starters",
        items: ["Chilled Dhakai Borhani", "Zafrani Sharbat", "Crispy Vegetable Singara", "Fresh Mint Chutney"],
      },
      {
        name: "Main Course",
        items: [
          "Signature Mutton Kacchi Biryani with Aloo & Boiled Egg",
          "Shahi Mutton Rezala",
          "Golden Dhakai Chicken Roast",
          "Roghni Naan / Butter Naan",
          "Mixed Onion Cucumber Salad with Lime & Green Chilies",
        ],
      },
      {
        name: "Desserts & Sweets",
        items: ["Clay Pot Zafrani Shahi Firni", "Mini Shahi Tukra with Rabri", "Traditional Sweet Paan"],
      },
    ],
    inclusions: [
      "Full Chafing Dish & Buffet Counter Setup",
      "Premium Porcelain Dinnerware & Silver Cutlery",
      "Uniformed Banquet Waitstaff & Hall Captains",
      "Hot-Holding Thermal Transport to maintain serving temperature",
      "VIP Table Service for Bride & Groom family",
    ],
    popular: true,
    isSample: true,
  },
  {
    id: "pkg-2",
    slug: "executive-corporate-buffet",
    name: "Executive Corporate Buffet",
    tagline: "Flawless catering tailored for summits, conferences, and AGMs",
    tag: "Corporate Choice",
    description:
      "A balanced multi-cuisine menu designed for high-profile business gatherings. Offers quick-service efficiency without sacrificing taste or hygiene.",
    pricePerHead: 1150,
    minGuests: 50,
    cuisineType: "Continental & Multi-Cuisine",
    courses: [
      {
        name: "Salad & Starters",
        items: ["Classic Chicken Caesar Salad", "Sweet Corn Vegetable Soup", "Warm Bread Rolls & Butter"],
      },
      {
        name: "Main Course",
        items: [
          "Herb-Crusted Beef Medallions in Peppercorn Glaze",
          "Grilled Chicken Breast with Mushroom Demi-Glace",
          "Steamed Jasmine / Basmati Rice",
          "Penne Pasta with Sun-Dried Tomato Cream",
          "Sautéed Seasonal Butter Vegetables",
        ],
      },
      {
        name: "Desserts & Beverages",
        items: ["Fresh Fruit Tartlets", "Chocolate Mousse Cups", "Freshly Brewed Tea & Coffee Station"],
      },
    ],
    inclusions: [
      "Live Hot Beverage Station throughout the event",
      "Modern Minimalist Buffet Line Presentation",
      "Professional Food Handlers with Safety Gear",
      "Strict Timetable Adherence for Tight Agendas",
    ],
    popular: false,
    isSample: true,
  },
  {
    id: "pkg-3",
    slug: "social-birthday-celebration",
    name: "Social & Birthday Celebration",
    tagline: "Festive, colorful, and crowd-pleasing for family milestones",
    tag: "Family Favorite",
    description:
      "A vibrant spread designed for birthdays, anniversaries, and family reunions with favorites loved by both children and elders.",
    pricePerHead: 890,
    minGuests: 30,
    cuisineType: "Bengali & Asian Fusion",
    courses: [
      {
        name: "Starters & Finger Foods",
        items: ["Crispy Fried Chicken Wontons", "Mini Seekh Kebabs", "Tangy Tamarind Dip"],
      },
      {
        name: "Main Course",
        items: [
          "Saffron Polao with Ghee Rice",
          "Spicy Beef Bhuna",
          "Chicken Korma with Golden Almonds",
          "Chinese Vegetable Fried Rice",
          "Szechuan Chilli Chicken Gravy",
        ],
      },
      {
        name: "Desserts & Refreshments",
        items: ["Creamy Caramel Custard", "Gulab Jamun in Warm Syrup", "Soft Drinks & Mineral Water"],
      },
    ],
    inclusions: [
      "Custom Kids Dining Station if needed",
      "Cake Cutting Table Setup with Plates & Forks",
      "Dedicated Service Staff for Tables",
      "Post-Event Cleanup Service",
    ],
    popular: false,
    isSample: true,
  },
  {
    id: "pkg-4",
    slug: "high-tea-reception",
    name: "Grand High-Tea Reception",
    tagline: "Elegant tea, savoury bites, and confections for mid-day gatherings",
    tag: "Light & Elegant",
    description:
      "Perfect for afternoon seminars, product launches, or post-ceremony receptions with a wide assortment of hot savouries, sandwiches, and artisanal pastries.",
    pricePerHead: 650,
    minGuests: 40,
    cuisineType: "Continental & Bakery High-Tea",
    courses: [
      {
        name: "Savouries & Canapés",
        items: [
          "Smoked Chicken & Cucumber Finger Sandwiches",
          "Mini Beef Sausage Rolls",
          "Crispy Paneer Pakora",
          "Chicken Quiche Bites",
        ],
      },
      {
        name: "Sweet Bites",
        items: ["Freshly Baked Scones with Cream & Jam", "Mini Éclairs", "Fruit Skewers with Honey Glaze"],
      },
      {
        name: "Beverages",
        items: ["Masala Milk Tea", "English Breakfast Tea", "Artisanal Black Coffee", "Chilled Lemon Mint Ice Tea"],
      },
    ],
    inclusions: [
      "Antique / Contemporary High-Tea Tiered Displays",
      "Continuous Hot Water Urn & Tea Barrels",
      "Napkins, Cutlery, and Clean Beverage Stations",
    ],
    popular: false,
    isSample: true,
  },
];

