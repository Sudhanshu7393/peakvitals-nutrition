"use client";

import React from "react";

interface PeakvitalsLogoProps {
  /** Force dark-background styling (white wordmark + original blue icon) */
  forceDark?: boolean;
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Optional current theme ("light" | "dark") */
  theme?: "light" | "dark";
}

/**
 * Renders the exact official PEAKVITALS NUTRITION logo provided by the brand:
 * - Left: Blue rounded square with white flexed bicep & dumbbell plate icon
 * - Right: "PE" + Geometric Triangle "A" + "KVITALS" + "NUTRITION"
 */
export function PeakvitalsLogo({
  forceDark = true,
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
      : "w-4 h-4 sm:w-[19px] sm:h-[19px] mx-[1px]";

  const subTextClasses =
    size === "sm"
      ? "text-[7px] tracking-[0.22em]"
      : size === "lg"
      ? "text-[9px] tracking-[0.25em]"
      : "text-[8px] sm:text-[9px] tracking-[0.24em]";

  return (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* Left: Rounded Square Emblem with Exact Traced Flexed Bicep & Dumbbell Plate */}
      <div
        className={`${iconSizeClasses} bg-[#84CC16] flex items-center justify-center shadow-sm shrink-0 border border-[#A3E635]/60 group-hover:scale-105 transition-transform`}
      >
        <svg
          viewBox="35 25 286 286"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[84%] h-[84%]"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="white"
            d="M 210.0 285.0 L 198.0 284.8 L 180.0 281.1 L 158.0 273.4 L 138.7 263.0 L 124.8 251.0 L 110.3 230.0 L 105.0 209.2 L 84.0 189.8 L 76.0 177.0 L 69.8 159.0 L 70.0 141.2 L 78.0 124.0 L 84.0 117.9 L 92.0 113.2 L 112.0 109.3 L 131.0 113.7 L 149.0 123.5 L 161.5 136.0 L 171.3 156.0 L 176.3 176.0 L 189.0 181.7 L 199.8 190.0 L 200.1 164.0 L 203.9 154.0 L 213.7 141.0 L 202.0 129.9 L 194.3 116.0 L 191.2 101.0 L 194.4 83.0 L 204.0 67.7 L 217.0 58.0 L 238.0 52.6 L 249.0 53.9 L 263.0 59.8 L 275.0 70.5 L 283.0 86.0 L 285.3 104.0 L 278.6 124.0 L 263.2 141.0 L 266.8 180.0 L 266.5 196.0 L 263.2 222.0 L 257.4 241.0 L 247.0 260.1 L 234.3 273.0 L 222.0 281.1 L 210.0 285.0 Z M 242.6 137.0 L 254.0 134.3 L 265.0 126.8 L 273.2 115.0 L 276.3 99.0 L 273.0 84.3 L 265.0 72.9 L 254.0 65.4 L 238.0 61.9 L 222.0 65.6 L 211.6 73.0 L 203.4 85.0 L 200.5 100.0 L 203.6 115.0 L 212.0 127.0 L 228.0 136.2 L 242.6 137.0 Z M 243.0 115.2 L 236.0 115.9 L 230.0 113.6 L 224.1 108.0 L 222.0 103.0 L 224.0 91.8 L 235.0 83.7 L 242.0 83.8 L 247.0 85.9 L 252.7 92.0 L 254.5 97.0 L 252.6 108.0 L 243.0 115.2 Z M 239.9 107.0 L 245.0 102.4 L 245.3 98.0 L 242.5 94.0 L 237.0 92.7 L 232.6 96.0 L 231.3 101.0 L 234.0 105.4 L 239.9 107.0 Z M 211.9 275.0 L 229.0 265.8 L 237.0 258.0 L 245.0 246.0 L 251.3 232.0 L 256.9 204.0 L 256.8 163.0 L 254.7 146.0 L 252.0 144.9 L 238.0 147.2 L 224.0 145.6 L 213.8 156.0 L 209.5 165.0 L 208.8 175.0 L 212.6 206.0 L 212.5 221.0 L 207.0 236.3 L 204.0 239.0 L 201.0 238.7 L 198.0 236.0 L 199.8 228.0 L 199.6 211.0 L 197.0 204.0 L 189.8 194.0 L 182.4 188.0 L 178.0 186.9 L 175.4 207.0 L 172.0 208.9 L 168.0 206.4 L 168.6 185.0 L 165.0 165.0 L 157.2 146.0 L 149.3 136.0 L 132.3 124.0 L 112.0 118.3 L 99.4 120.0 L 88.2 126.0 L 82.0 135.0 L 79.1 143.0 L 79.1 157.0 L 81.5 167.0 L 90.2 183.0 L 102.0 195.5 L 129.3 210.0 L 129.7 214.0 L 127.0 216.9 L 117.0 213.9 L 115.5 216.0 L 122.0 232.4 L 130.0 243.5 L 146.3 257.0 L 165.0 266.7 L 199.0 275.4 L 211.9 275.0 Z M 109.0 182.1 L 106.0 180.9 L 97.9 171.0 L 91.9 157.0 L 92.0 144.2 L 99.0 135.3 L 103.9 139.0 L 101.1 147.0 L 101.3 156.0 L 106.0 166.8 L 113.3 176.0 L 113.0 180.6 L 109.0 182.1 Z M 224.0 198.2 L 220.0 196.0 L 218.4 192.0 L 218.3 174.0 L 224.0 158.8 L 226.0 156.0 L 231.0 155.4 L 233.4 160.0 L 227.5 175.0 L 227.8 194.0 L 224.0 198.2 Z M 190.0 262.1 L 184.0 262.9 L 162.4 255.0 L 146.2 245.0 L 144.5 240.0 L 149.0 236.9 L 162.8 245.0 L 188.2 254.0 L 191.7 257.0 L 190.0 262.1 Z"
          />
        </svg>
      </div>

      {/* Right: PEAKVITALS (with Exact Traced Spiral Triangle 'A') + NUTRITION */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className={`flex items-center font-extrabold uppercase tracking-tight leading-none ${mainTextClasses} ${
            isDarkBg ? "text-white" : "text-zinc-950"
          }`}
        >
          <span>PE</span>
          {/* Exact Traced Spiral Triangle 'A' from Original Logo */}
          <svg
            viewBox="0 0 134 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${triangleSizeClasses} inline-block shrink-0 -translate-y-[0.5px]`}
            aria-label="A"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#84CC16"
              d="M 127.0 129.4 L 9.0 129.6 L 6.0 128.4 L 10.0 118.0 L 66.0 7.0 L 69.4 10.0 L 125.1 121.0 L 128.1 128.0 L 127.0 129.4 Z M 109.2 119.0 L 110.6 118.0 L 109.9 115.0 L 107.4 110.0 L 105.0 108.5 L 41.0 108.2 L 39.5 107.0 L 66.0 53.2 L 69.3 56.0 L 84.3 86.0 L 82.0 87.8 L 60.8 88.0 L 56.1 96.0 L 56.3 98.0 L 101.0 97.7 L 79.0 52.4 L 67.6 31.0 L 66.0 30.5 L 24.4 113.0 L 23.2 118.0 L 25.0 119.1 L 109.2 119.0 Z"
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
