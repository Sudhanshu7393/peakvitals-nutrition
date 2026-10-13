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
        {/* ========================================================= */}
        {/* 1. COMPACT MOBILE FOOTER (< md) — FITS IN A SMALL STRIP!  */}
        {/* ========================================================= */}
        <div className="md:hidden px-4 py-5 space-y-3.5">
          {/* Row 1: Brand Logo + FSSAI Pill */}
          <div className="flex items-center justify-between gap-2">
            <PeakvitalsLogo forceDark size="sm" />
            <span className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-[#A3E635]">
              FSSAI: 12723999000427
            </span>
          </div>

          {/* Row 2: Direct Contact Pills (1-Click Call/WhatsApp & Email) */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-emerald-400"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>7651918284</span>
            </a>
            <button
              onClick={() => setIsTrackOrderModalOpen(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
              <span>Track Order</span>
            </button>
          </div>

          {/* Row 3: Compact Inline Policies & Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-1 text-[11px] font-semibold text-zinc-400 border-t border-zinc-900">
            <button onClick={() => openPolicy("terms")} className="hover:text-white">
              Terms
            </button>
            <span className="text-zinc-700">•</span>
            <button onClick={() => openPolicy("privacy")} className="hover:text-white">
              Privacy
            </button>
            <span className="text-zinc-700">•</span>
            <button onClick={() => openPolicy("shipping")} className="hover:text-white">
              Shipping
            </button>
            <span className="text-zinc-700">•</span>
            <button onClick={() => openPolicy("returns")} className="hover:text-white">
              Returns
            </button>
            <span className="text-zinc-700">•</span>
            <button onClick={() => openPolicy("disclaimer")} className="hover:text-white">
              Disclaimer
            </button>
            <span className="text-zinc-700">•</span>
            <a
              href="/admin"
              className="px-2 py-0.5 rounded bg-zinc-900 border border-[#A3E635]/40 text-[#A3E635] font-black uppercase text-[10px]"
            >
              🔒 Admin Panel
            </a>
          </div>

          {/* Row 4: Micro Copyright */}
          <p className="text-[10px] text-zinc-500 text-center pt-0.5">
            © {new Date().getFullYear()} Peakvitals Pvt. Ltd. • Health Supplement (Not for medicinal use)
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. DESKTOP / TABLET FOOTER (md:block)                     */}
        {/* ========================================================= */}
        <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Col 1: Brand Info */}
            <div className="col-span-2 space-y-3">
              <div>
                <PeakvitalsLogo forceDark size="md" />
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase mt-1.5 block">
                  Be The Boss of Your Workout • Official Brand Store
                </span>
              </div>

              <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
                Official direct-to-athlete store for{" "}
                <strong className="text-white">Peakvitals Nutrition Pre-Workout</strong> — formulated with 13 clinically dosed active ingredients per 7g scoop.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-zinc-400 pt-1 text-[11px]">
                <a
                  href="tel:+917651918284"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-1.5 hover:text-[#38BDF8] transition"
                >
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2.5">
              <h4 className="font-black uppercase tracking-wider text-white text-[11px]">
                Quick Links
              </h4>
              <ul className="space-y-1.5 text-zinc-400">
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
                    FAQs
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsTrackOrderModalOpen(true)}
                    className="hover:text-[#A3E635] transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span>Track My Order</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Store Policies & Legal Terms */}
            <div className="space-y-2.5">
              <h4 className="font-black uppercase tracking-wider text-white text-[11px]">
                Policies &amp; Terms
              </h4>
              <ul className="space-y-1.5 text-zinc-400">
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
                    Shipping Policy
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
              </ul>
            </div>

            {/* Col 4: Licensing */}
            <div className="space-y-2.5">
              <h4 className="font-black uppercase tracking-wider text-white text-[11px]">
                Official Licensing
              </h4>
              <ul className="space-y-1.5 text-zinc-400 text-[11px]">
                <li className="font-bold text-zinc-200">
                  Marketed By: Peakvitals Pvt. Ltd.
                </li>
                <li className="font-mono font-bold text-[#A3E635]">
                  FSSAI: 12723999000427
                </li>
                <li className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <span>{SITE_CONFIG.hours}</span>
                </li>
                <li>
                  <button
                    onClick={() => openPolicy("disclaimer")}
                    className="text-zinc-400 hover:text-[#A3E635] underline cursor-pointer"
                  >
                    View FSSAI Disclaimer
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="pt-5 mt-8 border-t border-zinc-900 flex items-center justify-between gap-4 text-zinc-500 text-[11px]">
            <p>© {new Date().getFullYear()} PEAKVITALS PVT. LTD. All Rights Reserved. Not for medicinal use.</p>

            <div className="flex items-center gap-2 text-zinc-400 font-bold">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-[#A3E635]">
                🛡️ FSSAI: 12723999000427
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                ✅ ISO 9001 &amp; GMP
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-emerald-400">
                🟢 100% Veg
              </span>
              <a
                href="/admin"
                className="ml-2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-[#A3E635]/40 text-[#A3E635] hover:bg-zinc-800 text-[10px] font-black uppercase tracking-wider transition"
              >
                🔒 Admin Panel
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
