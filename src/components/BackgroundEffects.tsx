"use client";

import React from "react";
import PatternWaves from "./PatternWaves";

export function BackgroundEffects() {
  return (
    <>
      {/* Interactive WebGL PatternWaves Ambient Surface across entire portfolio */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <PatternWaves
          preset="silk"
          color="#ffffff"
          backgroundColor="#08090d"
          fade="none"
          opacity={0.36}
          interactive={true}
          cursorSize={65}
          cursorStrength={0.7}
          speed={0.32}
        />
      </div>

      {/* Top Header Ambient Subtle Glass Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-20 bg-gradient-to-b from-[#08090d]/80 to-transparent backdrop-blur-md"
      />
    </>
  );
}
