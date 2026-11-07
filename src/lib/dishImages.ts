import { IMAGES } from "@/data/images";

export function getDishImage(
  name: string,
  overrideImage?: string
): string | null {
  if (overrideImage) return overrideImage;
  const n = name.toLowerCase();

  // Beverages
  if (/borhani|sharbat|drink|beverage|juice|lassi|water|tea|coffee/.test(n))
    return IMAGES.borhaniBeverage;

  // Biryani / Rice
  if (/biryani|kacchi|pulao|rice|khichuri/.test(n)) return IMAGES.kacchiBiryani;

  // Beef / Mutton
  if (/rezala|reza/.test(n)) return IMAGES.beefRezala;
  if (/mutton|lamb|korma/.test(n)) return IMAGES.muttonKorma;

  // Chicken
  if (/chicken roast|roast chicken/.test(n)) return IMAGES.chickenRoast;
  if (/chicken|murgi|poultry/.test(n)) return IMAGES.chickenRoast;

  // Kebabs / Grills
  if (/kebab|seekh|tikka|grill|boti|satay/.test(n)) return IMAGES.grilledKebab;

  // Desserts
  if (/firni|phirni/.test(n)) return IMAGES.firniDessert;
  if (/tukra|rabri|sheer|payesh|kheer|pudding|dessert|sweet/.test(n))
    return IMAGES.shahiTukra;

  // Bread / Starters / Snacks
  if (/naan|roti|bread|paratha|singara|samosa|roll|wrap|salad|chutney/.test(n))
    return IMAGES.heroPlate;

  // Continental
  if (/pasta|spaghetti|penne|fettuccine/.test(n)) return IMAGES.continentalPasta;
  if (/steak|medallion|beef tenderloin/.test(n)) return IMAGES.steakFillet;
  if (/salmon|fish|prawn|shrimp|seafood/.test(n)) return IMAGES.salmonPlatter;
  if (/dim sum|wonton|dumpling|chinese/.test(n)) return IMAGES.dimSumPlatter;

  // Generic fallback for anything else
  return IMAGES.heroPlate;
}
