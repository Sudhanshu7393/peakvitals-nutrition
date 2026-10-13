import { Product } from "@/types";

export interface NutritionFactRow {
  nutrient: string;
  amount: string;
  rda: string;
  category?: "energy" | "pump" | "focus" | "vitamin";
}

export const PEAKVITALS_NUTRITION_FACTS: NutritionFactRow[] = [
  { nutrient: "Calories (Kcal)", amount: "8", rda: "0.2%", category: "energy" },
  { nutrient: "Vitamin B1", amount: "1050 mcg", rda: "61.76%", category: "vitamin" },
  { nutrient: "Vitamin B6", amount: "1500 mcg", rda: "75%", category: "vitamin" },
  { nutrient: "Beta-Alanine", amount: "2g", rda: "**", category: "energy" },
  { nutrient: "L-Citrulline Malate", amount: "1.5g", rda: "**", category: "pump" },
  { nutrient: "Arginine AKG", amount: "2g", rda: "**", category: "pump" },
  { nutrient: "Taurine", amount: "140mg", rda: "**", category: "energy" },
  { nutrient: "Betaine Anhydrous", amount: "110mg", rda: "**", category: "pump" },
  { nutrient: "N-Acetyl L-Tyrosine", amount: "150mg", rda: "**", category: "focus" },
  { nutrient: "Natural Caffeine", amount: "195mg", rda: "**", category: "energy" },
  { nutrient: "Tryptophan", amount: "200mg", rda: "**", category: "focus" },
  { nutrient: "Choline Bitartrate", amount: "100mg", rda: "**", category: "focus" },
  { nutrient: "Piperine", amount: "5mg", rda: "**", category: "focus" },
  { nutrient: "Theanine", amount: "200mg", rda: "**", category: "focus" },
];

export const PEAKVITALS_BOX_INFO = {
  servingSize: "7g (1 Scoop Approx)",
  servingsPerContainer: "35 (Approx)",
  netWeight: "250 Gram",
  mrp: "₹1,999/- (Incl. of all taxes)",
  usp: "₹7.99 / gram",
  batchNo: "PVPW/02/26",
  mfd: "FEB/2026",
  shelfLife: "Best Before 18 Months from the Date of Manufacture",
  marketedBy: "Peakvitals Pvt. Ltd.",
  manufacturedBy: "Bioxent Health and Nutrition Pvt. Ltd. (An ISO 9001 & GMP Certified Company)",
  fssaiLicNo: "12723999000427",
  certifications: [
    "FSSAI Lic. No.: 12723999000427",
    "ISO 9001 & GMP Certified",
    "FDA Registered Facility",
    "Ingredients Imported From USA",
    "Lab Tested Quality",
    "100% Vegetarian Dietary Supplement",
  ],
  ingredientsList:
    "Vitamin B1, Vitamin B6, Beta-Alanine, L-Citrulline Malate, Arginine AKG, Taurine, Betaine Anhydrous, N-Acetyl L-Tyrosine, Natural Caffeine, Tryptophan, Choline Bitartrate, Piperine, Theanine, Artificial Sweeteners INS (955), Artificial-flavours & colour, Citric Acid INS (330).",
  suggestedUseSummary:
    "Mix one scoop of Peakvitals Pre-Workout in 400ml of water and drink 15-30 minutes before your workout.",
  suggestedUseSteps: [
    {
      step: "Step 01",
      title: "1 Scoop (7g Approx)",
      desc: "Take 1 rounded scoop of Peakvitals Pre-Workout powder *(7g Approx).",
    },
    {
      step: "Step 02",
      title: "400ml Cold Water",
      desc: "Pour into a shaker bottle with 400ml of chilled water.",
    },
    {
      step: "Step 03",
      title: "Shake & Drink (15-30m Pre)",
      desc: "Shake or blend until completely mixed and drink 15–30 minutes before your workout.",
    },
  ],
  boxDescription:
    "Peakvitals Nutrition's formulated Pre-Workout contains all the essential Pre-Workout ingredients in the correct dosages for instant pump, energy, focus and forces you to perform to your next level during intense training or activity.",
  keyBenefits: [
    {
      ingredient: "L-Citrulline Malate (1.5g)",
      badge: "MAX PUMP",
      desc: "For Unreal Muscle Pump, Better Blood Flow and Increase in Growth Hormone (GH).",
    },
    {
      ingredient: "Arginine AKG (2g)",
      badge: "INCREASED STRENGTH",
      desc: "Gives maximum strength, nitric oxide vasodilation and muscle growth.",
    },
    {
      ingredient: "Beta-Alanine (2g)",
      badge: "PEAK ENDURANCE",
      desc: "Helps increase your Time To Exhaustion (TTE), Increase Muscle Mass and Improve Athletic Performance.",
    },
    {
      ingredient: "Betaine Anhydrous (110mg)",
      badge: "LEAN MASS & OUTPUT",
      desc: "Improves Exercise Performance, Increases Nitric Oxide, Increases Lean Mass and Decreases Body Fat.",
    },
    {
      ingredient: "Natural Caffeine (195mg) + Theanine (200mg)",
      badge: "EXPLOSIVE ENERGY & FOCUS",
      desc: "Caffeine increases Alertness, Endurance and Muscle Strength while 200mg Theanine + 150mg N-Acetyl L-Tyrosine lock in smooth, zero-crash tunnel focus.",
    },
  ],
  warningText:
    "Consult Your Healthcare Professional Prior To Using This Supplement If You Have Or Suspect A Medical Condition, Are Taking Prescription Drugs Or Are Pregnant Or Lactating. This Product Is Not Intended To Diagnose, Treat, Cure Or Prevent Any Disease. Not For Medicinal Use. Health Supplement. Do Not Consume If You Are Allergic To Any Of The Ingredient In This Product Label.",
  boxSidePhotos: [
    {
      id: "front",
      label: "Front Label",
      caption: "35 Servings • 1.5g L-Citrulline • 2g Arginine AKG • 195mg Caffeine • 2g Beta-Alanine",
      image: "/images/box_sides/side1_front.png",
    },
    {
      id: "nutrition",
      label: "Nutrition Facts",
      caption: "Serving Size: 7g • 13 Active Ingredients • 8 Kcal per Scoop",
      image: "/images/box_sides/side2_nutrition.png",
    },
    {
      id: "ingredients",
      label: "FSSAI & Certifications",
      caption: "Marketed By Peakvitals Pvt. Ltd. • FSSAI Lic. No. 12723999000427 • Imported USA Ingredients",
      image: "/images/box_sides/side3_ingredients_fssai.png",
    },
    {
      id: "suggested-use",
      label: "Suggested Use & MRP",
      caption: "1 Scoop (7g) in 400ml Cold Water • Batch PVPW/02/26 • MRP ₹1,999/-",
      image: "/images/box_sides/side4_suggested_use_mrp.jpg",
    },
    {
      id: "benefits",
      label: "Key Benefits Panel",
      caption: "Explosive Energy • Max Pump • Increased Strength",
      image: "/images/box_sides/side5_key_benefits.png",
    },
  ],
};

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
    name: "PEAKVITALS PRE-WORKOUT",
    flavor: "Green Apple Flavour",
    servings: "35 Servings",
    weight: "250g",
    price: "₹1,199",
    numericPrice: 1199,
    originalPrice: "₹1,999",
    numericOriginalPrice: 1999,
    discountBadge: "40% OFF",
    inStock: true,
    image: "/images/peakvitals_trans/green_apple_v2.png",
    tagline: "Be The Boss of Your Workout • High-Performance Pre-Workout",
    highlights: {
      caffeine: "195mg Natural Caffeine",
      citrulline: "1.5g L-Citrulline Malate",
      arginine: "2g Arginine AKG",
      betaAlanine: "2g Beta-Alanine",
    },
  },
  {
    id: "peakvitals-tangy-orange",
    name: "PEAKVITALS PRE-WORKOUT",
    flavor: "Tangy Orange Flavour",
    servings: "35 Servings",
    weight: "250g",
    price: "₹1,199",
    numericPrice: 1199,
    originalPrice: "₹1,999",
    numericOriginalPrice: 1999,
    discountBadge: "40% OFF",
    inStock: true,
    image: "/images/peakvitals_trans/tangy_orange_v2.png",
    tagline: "Be The Boss of Your Workout • High-Performance Pre-Workout",
    highlights: {
      caffeine: "195mg Natural Caffeine",
      citrulline: "1.5g L-Citrulline Malate",
      arginine: "2g Arginine AKG",
      betaAlanine: "2g Beta-Alanine",
    },
  },
];

export function peakvitalsToProduct(p: PeakvitalsProduct): Product {
  return {
    id: p.id,
    name: p.name,
    brand: "Peakvitals Pvt. Ltd.",
    tagline: p.tagline,
    category: "pre-workout",
    price: p.numericPrice,
    originalPrice: p.numericOriginalPrice,
    rating: 5.0,
    reviewsCount: 0,
    image: p.image,
    weightOptions: [
      { label: "250g (35 Servings • 7g Scoop)", priceMultiplier: 1.0 },
    ],
    flavors: [
      "Green Apple Flavour",
      "Tangy Orange Flavour",
    ],
    inStock: p.inStock,
    description: PEAKVITALS_BOX_INFO.boxDescription,
    nutritionalHighlights: {
      protein: "1.5g L-Citrulline Malate",
      bcaa: "2g Beta-Alanine",
      calories: "8 Kcal per 7g Scoop",
      servings: "35 Servings (7g Scoop)",
      creatine: "2g Arginine AKG + 195mg Caffeine",
    },
    features: [
      "1.5g L-Citrulline Malate + 2g Arginine AKG + 110mg Betaine for Unreal Muscle Pump",
      "195mg Natural Caffeine + 200mg Theanine + 150mg N-Acetyl L-Tyrosine for Focus & Energy",
      "2g Beta-Alanine + 140mg Taurine for Peak Endurance & Time To Exhaustion (TTE)",
      "200mg Tryptophan + 100mg Choline Bitartrate + 5mg Piperine + Vit B1 & B6",
      "FSSAI Lic. No.: 12723999000427 • ISO 9001 & GMP • USA Imported Ingredients",
    ],
    howToUse:
      PEAKVITALS_BOX_INFO.suggestedUseSummary,
    batchNumberSample: PEAKVITALS_BOX_INFO.batchNo,
    goal: "energy-pump",
  };
}
