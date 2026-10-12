"use client";

import React from "react";
import { Truck, Banknote, ShieldCheck, QrCode, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export function IndianTrustBar() {
  const perks = [
    {
      icon: Truck,
      title: "Express Air Delivery",
      desc: "All India 2-4 Days Dispatch",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: QrCode,
      title: "Direct WhatsApp Order",
      desc: "Official UPI QR Deal",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: ShieldCheck,
      title: "100% Genuine Guarantee",
      desc: "FSSAI & Scratch QR Verified",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: PhoneCall,
      title: "WhatsApp Helpline",
      desc: "7651918284 Official Desk",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-3 sm:py-4 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50/80 transition-colors"
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${p.bg} ${p.color} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-xs sm:text-sm text-gray-900 truncate">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
