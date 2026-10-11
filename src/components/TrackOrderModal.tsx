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
      desc: "Order details sent to S.K Nutrition Official WhatsApp Desk",
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
      desc: "Dispatched via Express Courier / S.K Local Fleet",
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
            Enter your S.K Order ID (e.g. SK-12345) or 10-digit Mobile Number for live courier status.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
              placeholder="Enter Order ID (SK-xxxxx) or Mobile No."
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

        {searched && orderQuery.trim() && (
          <div className="space-y-4 pt-1">
            <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-gray-500 font-bold block uppercase">Order Reference</span>
                <span className="font-mono font-black text-orange-600 text-sm">{orderQuery}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 font-bold block uppercase">Delivery Zone</span>
                <span className="font-bold text-gray-900">{destinationText}</span>
              </div>
            </div>

            {/* Timeline Stepper */}
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

            {/* Direct Live WhatsApp Tracking Link */}
            <div className="pt-1">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `📦 *LIVE ORDER TRACKING REQUEST - ${SITE_CONFIG.name}*\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `Hello S.K Nutrition Team! 👋\n\n` +
                  `Please share the live courier tracking link / dispatch status for my order:\n` +
                  `🆔 *Order ID / Mobile:* ${orderQuery}\n` +
                  `📍 *Destination:* ${destinationText}\n\n` +
                  `Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Live Tracking Link on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
