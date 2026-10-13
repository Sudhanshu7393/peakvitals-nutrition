"use client";

import React from "react";
import { X, ShieldCheck, FileText, Truck, RotateCcw, Lock, AlertTriangle } from "lucide-react";

export type PolicyTab = "terms" | "privacy" | "shipping" | "returns" | "disclaimer";

interface LegalTermsModalProps {
  isOpen: boolean;
  activeTab: PolicyTab;
  onSelectTab: (tab: PolicyTab) => void;
  onClose: () => void;
}

export function LegalTermsModal({
  isOpen,
  activeTab,
  onSelectTab,
  onClose,
}: LegalTermsModalProps) {
  if (!isOpen) return null;

  const tabs: { id: PolicyTab; label: string; icon: React.ElementType }[] = [
    { id: "terms", label: "Terms & Conditions", icon: FileText },
    { id: "privacy", label: "Privacy Policy", icon: Lock },
    { id: "shipping", label: "Shipping Policy", icon: Truck },
    { id: "returns", label: "Return & Refund", icon: RotateCcw },
    { id: "disclaimer", label: "FSSAI Disclaimer", icon: AlertTriangle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-zinc-950 text-white border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#A3E635]" />
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
                Peakvitals Pvt. Ltd. • Official Store Policies &amp; Terms
              </h3>
              <p className="text-[11px] text-zinc-400">
                FSSAI Lic. No.: <span className="text-[#A3E635] font-mono">12723999000427</span> • ISO 9001 &amp; GMP Certified
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 px-5 sm:px-7 py-3 bg-zinc-950 border-b border-zinc-800/80">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition cursor-pointer border ${
                  isActive
                    ? "bg-[#A3E635] text-black border-[#A3E635]"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Policy Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {activeTab === "terms" && (
            <div className="space-y-3">
              <h4 className="text-base font-black uppercase text-[#A3E635]">
                1. Terms &amp; Conditions of Sale
              </h4>
              <p>
                Welcome to the official brand store of <strong>Peakvitals Pvt. Ltd.</strong> (&ldquo;Peakvitals Nutrition&rdquo;). By browsing or placing an order on this website, you agree to comply with and be bound by the following Terms &amp; Conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>
                  <strong>Age Eligibility (18+ Only):</strong> Peakvitals Pre-Workout contains high-potency performance ingredients including 195mg Natural Caffeine per 7g serving. Customers must be 18 years of age or older to purchase and consume this product.
                </li>
                <li>
                  <strong>Official Pricing &amp; Taxes:</strong> All prices listed on the website (Official Box MRP: <strong>₹1,999/-</strong> per 250g / 35-serving tub, U.S.P. ₹7.99/gram) are inclusive of all applicable Indian GST and taxes.
                </li>
                <li>
                  <strong>Direct-to-Athlete Authenticity:</strong> Every order placed on our official store is fulfilled directly from certified fresh batches (Current Batch: <span className="font-mono text-white">PVPW/02/26</span>, Best Before 18 Months from Manufacture).
                </li>
                <li>
                  <strong>Order Confirmation:</strong> Orders placed via our official WhatsApp Order Desk (<span className="text-white font-semibold">+91 76519 18284</span>) are confirmed upon verification of delivery PIN code and payment receipt.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-3">
              <h4 className="text-base font-black uppercase text-[#A3E635]">
                2. Privacy &amp; Data Protection Policy
              </h4>
              <p>
                <strong>Peakvitals Pvt. Ltd.</strong> respects your privacy and is committed to protecting the personal details you share when ordering:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>
                  <strong>Information Collected:</strong> We only collect essential order-fulfillment details — Customer Name, Phone/WhatsApp Number, Delivery Address, and PIN Code.
                </li>
                <li>
                  <strong>How Your Information Is Used:</strong> Your contact and address details are used strictly for order confirmation, courier dispatch, live tracking updates, and customer support.
                </li>
                <li>
                  <strong>Zero Third-Party Selling:</strong> We never sell, rent, or trade your personal phone number or address to external marketing agencies or spam lists.
                </li>
                <li>
                  <strong>Support &amp; Data Inquiries:</strong> For any privacy-related queries, contact our official desk at <span className="text-white font-semibold">Peakvitalsnutrition@gmail.com</span>.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3">
              <h4 className="text-base font-black uppercase text-[#A3E635]">
                3. All-India Shipping &amp; Delivery Policy
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>
                  <strong>Pan-India Coverage:</strong> We ship across 28,000+ serviceable PIN codes across India via reputed express air and surface courier partners.
                </li>
                <li>
                  <strong>Dispatch Timeline:</strong> Confirmed orders are packed and dispatched within <strong>24 business hours</strong> with tamper-evident outer packaging.
                </li>
                <li>
                  <strong>Estimated Delivery Time:</strong> Metro &amp; Tier-1 cities typically receive delivery within <strong>2–3 business days</strong>; rest of India within <strong>3–5 business days</strong>.
                </li>
                <li>
                  <strong>Order Tracking:</strong> Every customer receives an Order Reference ID (`PV-XXXXXX`) and courier tracking details directly on WhatsApp.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "returns" && (
            <div className="space-y-3">
              <h4 className="text-base font-black uppercase text-[#A3E635]">
                4. Return, Replacement &amp; Refund Policy
              </h4>
              <p>
                Due to health, safety, and hygiene regulations governing consumable dietary supplements, please review our replacement guidelines carefully:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>
                  <strong>Non-Returnable Once Opened:</strong> Opened, unsealed, or partially consumed supplement jars cannot be returned or exchanged.
                </li>
                <li>
                  <strong>100% Free Replacement for Transit Damage / Wrong Item:</strong> If you receive a physically damaged tub, broken safety seal, or incorrect flavour, we provide a <strong>100% free replacement</strong> or full refund.
                </li>
                <li>
                  <strong>Mandatory Unboxing Video:</strong> To claim a damage or seal-tamper replacement, please share a continuous, unedited <strong>360° parcel unboxing video</strong> on our official WhatsApp (<span className="text-white font-semibold">7651918284</span>) or email (<span className="text-white font-semibold">Peakvitalsnutrition@gmail.com</span>) within <strong>48 hours of delivery</strong>.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "disclaimer" && (
            <div className="space-y-3">
              <h4 className="text-base font-black uppercase text-[#A3E635]">
                5. FSSAI &amp; Health Supplement Advisory Disclaimer
              </h4>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <p className="font-bold text-white">
                  As Printed on Official Peakvitals Pre-Workout Packaging:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  &ldquo;Consult Your Healthcare Professional Prior To Using This Supplement If You Have Or Suspect A Medical Condition, Are Taking Prescription Drugs Or Are Pregnant Or Lactating. This Product Is Not Intended To Diagnose, Treat, Cure Or Prevent Any Disease. Not For Medicinal Use. Health Supplement. Do Not Consume If You Are Allergic To Any Of The Ingredient In This Product Label.&rdquo;
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-400">
                <li>
                  <strong>Marketed By:</strong> Peakvitals Pvt. Ltd.
                </li>
                <li>
                  <strong>FSSAI License No.:</strong> 12723999000427
                </li>
                <li>
                  <strong>Recommended Usage:</strong> Mix 1 scoop (7g approx) in 400ml cold water and consume 15–30 minutes before workout. Do not exceed recommended daily serving size.
                </li>
                <li>
                  <strong>Storage:</strong> Store in a cool, dry place away from direct sunlight. Keep out of reach of children.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-5 sm:px-7 py-3.5 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-400">
            Questions? WhatsApp: <strong className="text-white">+91 76519 18284</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#A3E635] text-black font-black uppercase tracking-wider cursor-pointer hover:bg-[#86efac] transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
