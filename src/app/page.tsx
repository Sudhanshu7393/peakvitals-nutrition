"use client";

import React, { useState } from "react";
import { FuelHeader } from "@/components/FuelHeader";
import { FuelHero } from "@/components/FuelHero";
import { IndianPincodeChecker } from "@/components/IndianPincodeChecker";
import { FuelProductGrid } from "@/components/FuelProductGrid";
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
      addToCart(defaultProd, "Green Apple Flavour", "250g", 1999, 1);
      setIsCartOpen(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#A3E635] selection:text-black transition-colors duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-[#F8FAFC] text-zinc-900"}`}>
      {/* 1. Header */}
      <FuelHeader />

      {/* 2. Hero Section */}
      <FuelHero onShopNow={handleHeroShopNow} />

      {/* 3. All-India Pincode Bar */}
      <IndianPincodeChecker />

      {/* 4. Official Products Grid (Green Apple & Tangy Orange) */}
      <FuelProductGrid
        onSelectProduct={handleSelectPeakvitalsProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Why Peakvitals Athletic Value Pillars */}
      <FuelWhySection />

      {/* 6. Frequently Asked Questions */}
      <FuelFaqSection />

      {/* 7. Clean Dark Footer */}
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
