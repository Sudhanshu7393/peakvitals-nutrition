import { Product } from "@/types";

export interface PeakvitalsProduct {
  id: string;
  name: string;
  flavor: string;
  servings: string;
  weight: string;
  price: string;
  numericPrice: number;
  originalPrice: string;
  numericOriginalPrice: number;
  discountBadge?: string;
  dealBadge?: string;
  inStock: boolean;
  image: string;
  tagline: string;
  highlights: {
    caffeine: string;
    citrulline: string;
    arginine: string;
    betaAlanine: string;
  };
}

export const PEAKVITALS_PREWORKOUTS: PeakvitalsProduct[] = [
  {
    id: "peakvitals-green-apple",
    name: "PEAKVITALS PRE-WORKOUT - GREEN APPLE",
    flavor: "Green Apple Flavour",
    servings: "35 Servings",
    weight: "250g",
    price: "₹1,299",
    numericPrice: 1299,
    originalPrice: "₹1,999",
    numericOriginalPrice: 1999,
    discountBadge: "-35%",
    dealBadge: "FLAGSHIP BEST SELLER",
    inStock: true,
    image: "/images/peakvitals_trans/green_apple.png",
    tagline: "Be The Boss of Your Workout - Crisp Green Apple Rush",
    highlights: {
      caffeine: "195mg Natural Caffeine",
      citrulline: "1.5g L-Citrulline Malate",
      arginine: "2g Arginine AAKG",
      betaAlanine: "2g Beta Alanine",
    },
  },
  {
    id: "peakvitals-tangy-orange",
    name: "PEAKVITALS PRE-WORKOUT - TANGY ORANGE",
    flavor: "Tangy Orange Flavour",
    servings: "35 Servings",
    weight: "250g",
    price: "₹1,299",
    numericPrice: 1299,
    originalPrice: "₹1,999",
    numericOriginalPrice: 1999,
    discountBadge: "-35%",
    dealBadge: "CITRUS BLAST",
    inStock: true,
    image: "/images/peakvitals_trans/tangy_orange.png",
    tagline: "Sustained Endurance, Explosive Pump & Zero Crash Energy",
    highlights: {
      caffeine: "195mg Natural Caffeine",
      citrulline: "1.5g L-Citrulline Malate",
      arginine: "2g Arginine AAKG",
      betaAlanine: "2g Beta Alanine",
    },
  },
  {
    id: "peakvitals-twin-pack",
    name: "PEAKVITALS TWIN PACK COMBO (2x 250G)",
    flavor: "Green Apple + Tangy Orange",
    servings: "70 Servings Total",
    weight: "500g (2 Tubs)",
    price: "₹2,399",
    numericPrice: 2399,
    originalPrice: "₹3,999",
    numericOriginalPrice: 3999,
    discountBadge: "-40%",
    dealBadge: "FREE SHAKER BOTTLE",
    inStock: true,
    image: "/images/peakvitals_trans/twin_pack.png",
    tagline: "Green Apple + Tangy Orange Combo + Free Peakvitals Shaker",
    highlights: {
      caffeine: "195mg Per Scoop",
      citrulline: "1.5g L-Citrulline Malate",
      arginine: "2g Arginine AAKG",
      betaAlanine: "2g Beta Alanine",
    },
  },
  {
    id: "peakvitals-triple-stack",
    name: "PEAKVITALS TRIPLE POWER STACK (3x 250G)",
    flavor: "Green Apple & Tangy Orange Pack",
    servings: "105 Servings Total",
    weight: "750g (3 Tubs)",
    price: "₹3,499",
    numericPrice: 3499,
    originalPrice: "₹5,999",
    numericOriginalPrice: 5999,
    discountBadge: "-42%",
    dealBadge: "MAXIMUM VALUE",
    inStock: true,
    image: "/images/peakvitals_trans/triple_stack.png",
    tagline: "Complete 3-Month Hardcore Supply (Green Apple & Orange)",
    highlights: {
      caffeine: "195mg Per Scoop",
      citrulline: "1.5g L-Citrulline Malate",
      arginine: "2g Arginine AAKG",
      betaAlanine: "2g Beta Alanine",
    },
  },
];

export function peakvitalsToProduct(p: PeakvitalsProduct): Product {
  return {
    id: p.id,
    name: p.name,
    brand: "Peakvitals Nutrition",
    tagline: p.tagline,
    category: "pre-workout",
    price: p.numericPrice,
    originalPrice: p.numericOriginalPrice,
    rating: 4.9,
    reviewsCount: 184,
    image: p.image,
    weightOptions: [
      { label: "1 Tub (250g / 35 Servings)", priceMultiplier: 1.0 },
      { label: "2 Tubs (500g / 70 Servings + Free Shaker)", priceMultiplier: 1.85 },
      { label: "3 Tubs (750g / 105 Servings)", priceMultiplier: 2.7 },
    ],
    flavors: [
      "Green Apple Flavour",
      "Tangy Orange Flavour",
    ],
    inStock: p.inStock,
    description: `Official Peakvitals Nutrition Pre-Workout. Formulated with 195mg natural caffeine, 2g beta alanine, 1.5g L-citrulline malate and 2g arginine AAKG. Available in refreshing Green Apple & Tangy Orange flavours for aggressive energy, extreme vascularity, and laser focus.`,
    nutritionalHighlights: {
      calories: "0 kcal (Zero Sugar)",
      servings: p.servings,
      creatine: "0g",
    },
    features: [
      "195mg Natural Caffeine for Explosive Power & Zero Crash",
      "2g Beta-Alanine for Endurance & Delaying Muscle Fatigue",
      "1.5g L-Citrulline Malate + 2g Arginine AAKG for Skin-Tearing Muscle Pumps",
      "100% Authentic Official Peakvitals Brand Supply with Batch Code",
      "All India Express Dispatch & Same-Day Local Delivery",
    ],
    howToUse:
      "Mix 1 scoop with 200-250ml of cold water 20 to 30 minutes before your workout session. Assess tolerance with half a scoop first.",
    batchNumberSample: "PV-NW-" + p.id.substring(11, 16).toUpperCase(),
    goal: "energy-pump",
  };
}
