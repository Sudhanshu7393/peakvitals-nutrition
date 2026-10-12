"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import { X, Search, Truck, CheckCircle2, Clock, MessageCircle } from "lucide-react";

export function TrackOrderModal() {
  const { isTrackOrderModalOpen, setIsTrackOrderModalOpen, activeOrder, pincodeInfo, selectedPostOffice } = useCart();
  const [orderQuery, setOrderQuery] = useState(activeOrder ? activeOrder.orderId : "");
  const [searched, setSearched] = useState(Boolean(activeOrder));

  React.useEffect(() => {
    if (activeOrder) {
      setOrderQuery(activeOrder.orderId);
      setSearched(true);
    }
  }, [activeOrder]);

  if (!isTrackOrderModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setSearched(true);
    }
  };

  const destinationText = activeOrder?.city
    ? `${activeOrder.city}${activeOrder.pincode ? ` (${activeOrder.pincode})` : ""}`
    : pincodeInfo && pincodeInfo.valid
    ? `${selectedPostOffice || pincodeInfo.area ? (selectedPostOffice || pincodeInfo.area) + ", " : ""}${pincodeInfo.district}`
    : "All India Express Courier";

  const steps = [
    {
      title: "Order Received",
      desc: "Order details sent to Peakvitals Official WhatsApp Desk",
      done: true,
      time: "Verified",
    },
    {
      title: "Quality & Batch Seal Checked",
      desc: "100% Genuine Peakvitals Nutrition factory seal verified",
      done: true,
      time: "Ready",
    },
    {
      title: "Courier Dispatch & AWB Assigned",
      desc: "Dispatched via Express Courier / Official Local Fleet",
      done: false,
      time: "Fast Dispatch",
    },
    {
      title: "Doorstep Delivery",
      desc: "Safe & secure delivery to your registered PIN code",
      done: false,
      time: "Estimated",
    },
  ];

  const cleanQuery = orderQuery.trim().toUpperCase();
  const cleanDigits = orderQuery.replace(/\D/g, "");
  const isMatchedActiveOrder = Boolean(
    activeOrder &&
      (cleanQuery === activeOrder.orderId.toUpperCase() ||
        (cleanDigits.length >= 10 && cleanDigits === activeOrder.customerPhone.replace(/\D/g, "")))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-gray-200 text-gray-900 space-y-5">
        {/* Close Button */}
        <button
          onClick={() => setIsTrackOrderModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-[11px] font-black uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>All India Live Order Tracking</span>
          </div>
          <h3 className="text-xl font-black text-gray-900 mt-1">Track Your Order</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Enter your Peakvitals Order ID (e.g. PV-12345) or 10-digit Mobile Number for live courier status.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => {
                setOrderQuery(e.target.value.toUpperCase());
                setSearched(false);
              }}
              placeholder="Enter Order ID (PV-xxxxx) or Mobile No."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 text-sm font-bold text-gray-900 uppercase outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase rounded-xl transition shadow-xs cursor-pointer"
          >
            Track
          </button>
        </form>

        {searched && cleanQuery && (
          <div className="space-y-4 pt-1">
            {isMatchedActiveOrder ? (
              <>
                <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">Order Reference</span>
                    <span className="font-mono font-black text-orange-600 text-sm">{activeOrder?.orderId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase">Delivery Zone</span>
                    <span className="font-bold text-gray-900">{destinationText}</span>
                  </div>
                </div>

                {/* Timeline Stepper for Real Active Session Order */}
                <div className="space-y-4 pl-2 border-l-2 border-orange-200 ml-4 py-1">
                  {steps.map((st, i) => (
                    <div key={i} className="relative pl-6">
                      <div
                        className={`absolute -left-[17px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          st.done
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-gray-100 text-gray-400 border border-gray-300"
                        }`}
                      >
                        {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${st.done ? "text-gray-900" : "text-gray-500"}`}>
                            {st.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-semibold">{st.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-800 font-black uppercase">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Direct WhatsApp Dispatch Verification</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  No recent checkout found in this browser session for{" "}
                  <span className="font-mono font-black text-gray-900">{cleanQuery}</span>. Since all Peakvitals Nutrition orders are processed &amp; dispatched directly via our Official WhatsApp Desk, click below to get your real-time courier AWB / delivery status on WhatsApp.
                </p>
              </div>
            )}

            {/* Direct Live WhatsApp Tracking Link */}
            <div className="pt-1">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `📦 *LIVE ORDER TRACKING REQUEST - ${SITE_CONFIG.name}*\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `Hello Peakvitals Team! 👋\n\n` +
                  `Please share the live courier tracking link / dispatch status for my order:\n` +
                  `🆔 *Order ID / Mobile:* ${cleanQuery}\n` +
                  `📍 *Destination:* ${destinationText}\n\n` +
                  `Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Live Status on WhatsApp (+91 76519 18284)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
