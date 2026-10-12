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
  forceDark = false,
  size = "md",
  theme = "light",
}: PeakvitalsLogoProps) {
  const isDarkBg = forceDark || theme === "dark";

  const heightClasses =
    size === "sm"
      ? "h-8 sm:h-9"
      : size === "lg"
      ? "h-11 sm:h-12"
      : "h-9 sm:h-11";

  return (
    <div className="inline-flex items-center select-none group">
      <img
        src={isDarkBg ? "/images/peakvitals-logo-dark.png" : "/images/peakvitals-logo.png"}
        alt="PEAKVITALS NUTRITION Official Logo"
        className={`${heightClasses} w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]`}
      />
    </div>
  );
}
