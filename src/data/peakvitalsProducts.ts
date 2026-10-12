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
    inStock: true,
    image: "/images/peakvitals_trans/green_apple.png",
    tagline: "Be The Boss of Your Workout - Crisp Green Apple Flavour",
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
    inStock: true,
    image: "/images/peakvitals_trans/tangy_orange.png",
    tagline: "Be The Boss of Your Workout - Tangy Orange Flavour",
    highlights: {
      caffeine: "195mg Natural Caffeine",
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
    rating: 5.0,
    reviewsCount: 0,
    image: p.image,
    weightOptions: [
      { label: "250g (35 Servings)", priceMultiplier: 1.0 },
    ],
    flavors: [
      "Green Apple Flavour",
      "Tangy Orange Flavour",
    ],
    inStock: p.inStock,
    description: `Official Peakvitals Nutrition Pre-Workout (250g / 35 Servings). Formulated with 195mg natural caffeine, 2g beta alanine, 1.5g L-citrulline malate and 2g arginine AAKG. Available in Green Apple & Tangy Orange flavours.`,
    nutritionalHighlights: {
      protein: "1.5g L-Citrulline",
      bcaa: "2g Beta-Alanine",
      calories: "0 kcal (Zero Sugar)",
      servings: p.servings,
      creatine: "2g Arginine + 195mg Caffeine",
    },
    features: [
      "195mg Natural Caffeine for Focus & Energy",
      "2g Beta-Alanine for Workout Endurance",
      "1.5g L-Citrulline Malate + 2g Arginine AAKG for Muscle Pump",
      "35 Servings per 250g Container",
      "100% Authentic Official Peakvitals Brand Supply",
    ],
    howToUse:
      "Mix 1 scoop with 200-250ml of cold water 20 to 30 minutes before your workout session. Assess tolerance with half a scoop first.",
    batchNumberSample: "PV-NW-" + p.id.substring(11, 16).toUpperCase(),
    goal: "energy-pump",
  };
}
