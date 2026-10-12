"use client";

import React from "react";

interface PeakvitalsLogoProps {
  /** Force dark-background styling (white text) regardless of theme, e.g. in Footer or Mobile Drawer */
  forceDark?: boolean;
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Optional current theme ("light" | "dark") */
  theme?: "light" | "dark";
}

/**
 * Exact replica of the PEAKVITALS NUTRITION logo & wordmark printed on the jar:
 * - Left: Lime-green rounded square with white V-leaf / P emblem
 * - Right Top: "PE" + Lime-green double-peak triangle "A" + "KVITALS"
 * - Right Bottom: "NUTRITION" aligned beneath PEAKVITALS
 */
export function PeakvitalsLogo({
  forceDark = false,
  size = "md",
  theme = "dark",
}: PeakvitalsLogoProps) {
  const isDarkBg = forceDark || theme === "dark";

  const iconSizeClasses =
    size === "sm"
      ? "w-8 h-8 rounded-lg"
      : size === "lg"
      ? "w-11 h-11 rounded-xl"
      : "w-9 h-9 sm:w-10 sm:h-10 rounded-xl";

  const mainTextClasses =
    size === "sm"
      ? "text-base sm:text-lg"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-lg sm:text-xl";

  const triangleSizeClasses =
    size === "sm"
      ? "w-3.5 h-3.5 mx-[1px]"
      : size === "lg"
      ? "w-5 h-5 mx-[1px]"
      : "w-4 h-4 sm:w-[18px] sm:h-[18px] mx-[1px]";

  const subTextClasses =
    size === "sm"
      ? "text-[7px] tracking-[0.22em]"
      : size === "lg"
      ? "text-[9px] tracking-[0.25em]"
      : "text-[8px] sm:text-[9px] tracking-[0.24em]";

  return (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* Left: Lime Green Rounded Square Emblem from the Jar */}
      <div
        className={`${iconSizeClasses} bg-[#84CC16] flex items-center justify-center shadow-sm shrink-0 border border-[#A3E635]/60 group-hover:scale-105 transition-transform`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5"
        >
          {/* Left V-leaf / bicep wing with vein detail */}
          <path
            d="M9 17C9 15.2 10.6 14 12.2 14.8C14.8 16.1 17.5 19.6 19.8 25.4L20.5 27.2C18.2 28.4 14.7 26.8 11.6 22.8C9.8 20.5 9 18.4 9 17Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leaf vein lines on left wing */}
          <path
            d="M12.5 17.8L16.8 23.8M11.5 19.8L14.5 22.2"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Right ascending stem & P-circle top loop */}
          <path
            d="M20.2 27.4C22.2 23.6 25.5 16.8 27.2 12.2"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Top-right P badge circle */}
          <circle
            cx="26.5"
            cy="11.5"
            r="4.2"
            fill="#84CC16"
            stroke="white"
            strokeWidth="2"
          />
          {/* Tiny 'P' inside the circle */}
          <path
            d="M25.6 13.2V9.8H26.9C27.6 9.8 28 10.2 28 10.8C28 11.4 27.6 11.8 26.9 11.8H25.6"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Base curve */}
          <path
            d="M17.5 28.5C19.5 29.8 22.2 29.4 23.8 27.2"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Right: PEAKVITALS (with green double-triangle 'A') + NUTRITION */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className={`flex items-center font-extrabold uppercase tracking-tight leading-none ${mainTextClasses} ${
            isDarkBg ? "text-white" : "text-zinc-950"
          }`}
        >
          <span>PE</span>
          {/* Stylized Green Mountain Peak Triangle 'A' exactly like the jar */}
          <svg
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${triangleSizeClasses} inline-block shrink-0 -translate-y-[0.5px]`}
            aria-label="A"
          >
            {/* Outer triangle */}
            <path
              d="M12 2L22 20H2L12 2Z"
              stroke="#84CC16"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Inner peak triangle */}
            <path
              d="M12 8.5L17.2 17.5H6.8L12 8.5Z"
              stroke="#84CC16"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
          </svg>
          <span>KVITALS</span>
        </div>

        <span
          className={`font-semibold uppercase mt-1 ${subTextClasses} ${
            isDarkBg ? "text-zinc-200" : "text-zinc-700"
          }`}
        >
          NUTRITION
        </span>
      </div>
    </div>
  );
}
