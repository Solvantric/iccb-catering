import { IMAGES } from "@/data/images";

export function getDishImage(
  name: string,
  overrideImage?: string
): string | null {
  if (overrideImage) return overrideImage;
  const n = name.toLowerCase();

  if (n.includes("borhani")) return IMAGES.borhaniBeverage;
  if (/biryani|kacchi/.test(n)) return IMAGES.kacchiBiryani;
  if (n.includes("rezala")) return IMAGES.beefRezala;
  if (n.includes("roast")) return IMAGES.chickenRoast;
  if (n.includes("korma")) return IMAGES.muttonKorma;
  if (/kebab|seekh/.test(n)) return IMAGES.grilledKebab;
  if (n.includes("firni")) return IMAGES.firniDessert;
  if (n.includes("tukra")) return IMAGES.shahiTukra;
  if (n.includes("pasta")) return IMAGES.continentalPasta;
  if (/steak|medallion/.test(n)) return IMAGES.steakFillet;
  if (n.includes("salmon")) return IMAGES.salmonPlatter;
  if (/wonton|dim sum/.test(n)) return IMAGES.dimSumPlatter;

  return null;
}

