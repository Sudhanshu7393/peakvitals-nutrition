"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/config";
import { Mail, Phone, MessageCircle, Clock, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PeakvitalsLogo } from "@/components/PeakvitalsLogo";
import { LegalTermsModal, PolicyTab } from "@/components/LegalTermsModal";

export function FuelFooter() {
  const { setSelectedCategoryTab, setIsTrackOrderModalOpen } = useCart();
  const [policyOpen, setPolicyOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyTab>("terms");

  const handleNavClick = (tabId: string) => {
    setSelectedCategoryTab(tabId);
    const el = document.getElementById("featured-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openPolicy = (tab: PolicyTab) => {
    setActivePolicy(tab);
    setPolicyOpen(true);
  };

  return (
    <>
      <footer className="bg-black text-white border-t border-zinc-900 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
            {/* Col 1: Brand Info */}
            <div className="col-span-2 space-y-3 sm:space-y-4">
              <div>
                <PeakvitalsLogo forceDark size="lg" />
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mt-2 block">
                  Be The Boss of Your Workout • Official Brand Store
                </span>
              </div>

              <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
                Official direct-to-athlete store for{" "}
                <strong className="text-white">Peakvitals Nutrition Pre-Workout</strong> — formulated with 13 clinically dosed active ingredients per 7g scoop for explosive energy, max pump, and increased strength.
              </p>

              <div className="space-y-1.5 text-zinc-400 pt-1">
                <a
                  href="tel:+917651918284"
                  className="flex items-center gap-2 hover:text-emerald-400 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Call/WhatsApp: {SITE_CONFIG.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-[#38BDF8] transition"
                >
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span>Email: {SITE_CONFIG.email}</span>
                </a>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <span>Support Hours: {SITE_CONFIG.hours}</span>
                </p>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-black uppercase tracking-wider text-white text-[11px]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button
                    onClick={() => handleNavClick("all")}
                    className="hover:text-[#A3E635] transition cursor-pointer"
                  >
                    Peakvitals Pre-Workout (250g)
                  </button>
                </li>
                <li>
                  <a
                    href="#nutrition-facts"
                    className="hover:text-[#A3E635] transition cursor-pointer"
                  >
                    Nutrition Facts (7g Scoop)
                  </a>
                </li>
                <li>
                  <a
                    href="#faq-section"
                    className="hover:text-[#A3E635] transition cursor-pointer"
                  >
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsTrackOrderModalOpen(true)}
                    className="hover:text-[#A3E635] transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>Track My Order (PV-ID)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Store Policies & Legal Terms */}
            <div className="space-y-3">
              <h4 className="font-black uppercase tracking-wider text-white text-[11px]">
                Policies &amp; Terms
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button
                    onClick={() => openPolicy("terms")}
                    className="hover:text-[#A3E635] transition cursor-pointer text-left"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicy("privacy")}
                    className="hover:text-[#A3E635] transition cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicy("shipping")}
                    className="hover:text-[#A3E635] transition cursor-pointer text-left"
                  >
                    Shipping &amp; Delivery Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicy("returns")}
                    className="hover:text-[#A3E635] transition cursor-pointer text-left"
                  >
                    Return &amp; Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicy("disclaimer")}
                    className="hover:text-[#A3E635] transition cursor-pointer text-left"
                  >
                    FSSAI Health Disclaimer
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Support & Licensing */}
            <div className="space-y-3">
              <h4 className="font-black uppercase tracking-wider text-white text-[11px]">
                Customer Care &amp; Licensing
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      "Hello Peakvitals Nutrition Team! 👋\n\nI need assistance regarding Peakvitals Pre-Workout, batch verification, or delivery to my PIN code.\n\nPlease guide me!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#A3E635] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp: 7651918284</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-[#38BDF8] transition flex items-center gap-1.5 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    <span>{SITE_CONFIG.email}</span>
                  </a>
                </li>
                <li className="pt-1 text-[11px] font-bold text-zinc-300">
                  Marketed By: Peakvitals Pvt. Ltd.
                </li>
                <li className="text-[11px] font-mono font-bold text-[#A3E635]">
                  FSSAI Lic. No.: 12723999000427
                </li>
              </ul>
            </div>
          </div>

          {/* FSSAI Statutory Disclaimer Strip */}
          <div className="mt-8 pt-4 border-t border-zinc-900/90 text-[10px] text-zinc-500 leading-relaxed text-center sm:text-left">
            <strong className="text-zinc-400 uppercase">Health Supplement Disclaimer:</strong>{" "}
            This product is a dietary health supplement and is not intended to diagnose, treat, cure, or prevent any disease. Not for medicinal use. Consult your healthcare professional before use if pregnant, lactating, or under medical supervision.
          </div>

          {/* Payment Badges & Bottom Strip */}
          <div className="pt-4 mt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-zinc-500 text-[11px] text-center sm:text-left">
            <p>© {new Date().getFullYear()} PEAKVITALS PVT. LTD. All Rights Reserved. Official Brand Store.</p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-zinc-400 font-bold">
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-[#A3E635]">
                🛡️ FSSAI: 12723999000427
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                🇺🇸 USA Imported Actives
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                ✅ ISO 9001 &amp; GMP
              </span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-emerald-400">
                🟢 100% Vegetarian
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openPolicy("terms")}
                className="text-[10px] text-zinc-400 hover:text-white transition cursor-pointer"
              >
                Terms &amp; Privacy
              </button>
              <a
                href="/admin"
                className="text-[10px] font-bold text-zinc-600 hover:text-[#A3E635] transition"
                title="Store Admin Panel"
              >
                • Admin Panel
              </a>
            </div>
          </div>
        </div>
      </footer>

      <LegalTermsModal
        isOpen={policyOpen}
        activeTab={activePolicy}
        onSelectTab={setActivePolicy}
        onClose={() => setPolicyOpen(false)}
      />
    </>
  );
}
