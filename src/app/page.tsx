"use client";

import React, { useState } from "react";
import { FuelHeader } from "@/components/FuelHeader";
import { FuelHero } from "@/components/FuelHero";
import { IndianPincodeChecker } from "@/components/IndianPincodeChecker";
import { FuelCategoryCards } from "@/components/FuelCategoryCards";
import { FuelProductGrid } from "@/components/FuelProductGrid";
import { FuelBundleSection } from "@/components/FuelBundleSection";
import { FuelWhySection } from "@/components/FuelWhySection";
import { FuelFaqSection } from "@/components/FuelFaqSection";
import { FuelFooter } from "@/components/FuelFooter";

// Interactive E-Commerce Drawers & Modals
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { TrackOrderModal } from "@/components/TrackOrderModal";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

import {
  PEAKVITALS_PREWORKOUTS,
  PeakvitalsProduct,
  peakvitalsToProduct,
} from "@/data/peakvitalsProducts";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addToCart, setIsCartOpen } = useCart();
  const { theme } = useTheme();

  const handleSelectPeakvitalsProduct = (pvProd: PeakvitalsProduct) => {
    const fullProd = peakvitalsToProduct(pvProd);
    setQuickViewProduct(fullProd);
  };

  const handleAddToCart = (pvProd: PeakvitalsProduct) => {
    const fullProd = peakvitalsToProduct(pvProd);
    addToCart(
      fullProd,
      pvProd.flavor,
      pvProd.weight,
      pvProd.numericPrice,
      1
    );
  };

  const handleHeroShopNow = () => {
    const el = document.getElementById("featured-products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const defaultProd = peakvitalsToProduct(PEAKVITALS_PREWORKOUTS[0]);
      addToCart(defaultProd, "Green Apple Flavour", "250g", 1299, 1);
      setIsCartOpen(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#A3E635] selection:text-black transition-colors duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-[#F8FAFC] text-zinc-900"}`}>
      {/* 1. Header (Black Nav + Search + WhatsApp + Cart) */}
      <FuelHeader />

      {/* 2. Hero Section: DISCIPLINE. NUTRITION. DOMINATION. */}
      <FuelHero onShopNow={handleHeroShopNow} />

      {/* 3. Sleek Single-Line All-India Pincode Bar */}
      <IndianPincodeChecker />

      {/* 4. Flavour Category Showcase */}
      <FuelCategoryCards />

      {/* 5. Featured Products Grid (3D Glowing Cards + Neon Buttons) */}
      <FuelProductGrid
        onSelectProduct={handleSelectPeakvitalsProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Twin Pack Bundle Offer (Stack & Save + Free Shaker) */}
      <FuelBundleSection />

      {/* 7. Why Peakvitals Athletic Value Pillars */}
      <FuelWhySection />

      {/* 8. Frequently Asked Questions */}
      <FuelFaqSection />

      {/* 9. Clean Dark Footer (Store Address, Mughalsarai, WhatsApp Order, Helpline) */}
      <FuelFooter />

      {/* Interactive Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <TrackOrderModal />
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Floating 1-Click WhatsApp Support */}
      <WhatsAppFloatingButton />
    </div>
  );
}
