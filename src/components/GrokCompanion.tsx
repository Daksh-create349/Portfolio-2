"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { GrokChatModal } from "./GrokChatModal";

// Official Grok Bot "Attentive" Eye Definition from grokbots.ai
const ATTENTIVE_EYES = {
  leftEye: {
    d: "M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z",
    transform: "matrix(0.98,-0.1,0.09,0.99,-17.3,-9.14)",
  },
  rightEye: {
    d: "M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z",
    transform: "matrix(0.92,-0.04,0.09,0.99,37.32,-13.26)",
  },
};

export function GrokCompanion() {
  const [mounted, setMounted] = useState(false);
  const [blink, setBlink] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Direct DOM refs for instant 60/120fps tracking without React re-render overhead
  const botRef = useRef<HTMLDivElement>(null);
  const eyesGroupRef = useRef<SVGGElement>(null);
  const headContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Natural eyelid blinking
  const triggerBlink = useCallback(() => {
    setBlink(0.06);
    setTimeout(() => {
      setBlink(1);
    }, 110);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleBlink = () => {
      const delay = Math.random() * 3000 + 2200;
      timeoutId = setTimeout(() => {
        triggerBlink();
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [triggerBlink]);

  // Active cursor tracking — eyes directly and visibly follow mouse coordinates
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!botRef.current) return;
        const rect = botRef.current.getBoundingClientRect();
        const botCenterX = rect.left + rect.width / 2;
        const botCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - botCenterX;
        const deltaY = e.clientY - botCenterY;
        const dist = Math.hypot(deltaX, deltaY);

        // SVG coordinate space is 250x250.
        // Travel limits (maxEyeX = 24, maxEyeY = 20) make gaze direction distinctly clear across screen
        const maxEyeX = 24;
        const maxEyeY = 20;
        const normX = deltaX / Math.max(dist, 1);
        const normY = deltaY / Math.max(dist, 1);
        const travelFactor = Math.min(dist / 320, 1);

        const targetEyeX = normX * maxEyeX * travelFactor;
        const targetEyeY = normY * maxEyeY * travelFactor;

        // Directly translate eye cut-outs inside SVG mask
        if (eyesGroupRef.current) {
          eyesGroupRef.current.setAttribute(
            "transform",
            `translate(${targetEyeX.toFixed(2)}, ${targetEyeY.toFixed(2)})`
          );
        }

        // Subtle 3D perspective tilt facing the cursor
        const maxTilt = 16;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, (deltaX / window.innerWidth) * maxTilt));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -(deltaY / window.innerHeight) * maxTilt));

        if (headContainerRef.current) {
          headContainerRef.current.style.transform = `perspective(500px) rotateX(${tiltY.toFixed(
            2
          )}deg) rotateY(${tiltX.toFixed(2)}deg)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleBotClick = () => {
    triggerBlink();
    setIsChatOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      <aside
        aria-label="Interactive Grok Companion"
        className="fixed bottom-6 right-6 z-40 select-none pointer-events-none"
      >
        <div className="relative flex flex-col items-end group">
          {/* Subtle Hover Cue Pill */}
          <div className="pointer-events-none mb-2 px-3 py-1 rounded-full bg-[#0a0d14]/90 border border-white/10 text-[11px] font-medium text-blue-300 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 translate-y-1 group-hover:translate-y-0">
            <Sparkles className="size-3 text-blue-400" />
            <span>Chat with Daksh AI</span>
          </div>

          {/* Main Grok Bot Container */}
          <div
            ref={botRef}
            onClick={handleBotClick}
            title="Chat with Daksh AI (Grok)"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleBotClick();
              }
            }}
            className="pointer-events-auto relative flex size-16 sm:size-20 items-center justify-center cursor-pointer drop-shadow-[0_12px_24px_rgba(59,147,240,0.3)] transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            {/* Subtle ambient cyan glow halo */}
            <div
              className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse pointer-events-none"
              aria-hidden="true"
            />

            {/* 3D Tilting Head Container */}
            <div
              ref={headContainerRef}
              className="size-full will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg
                viewBox="-125 -125 250 250"
                aria-hidden="true"
                className="relative size-full overflow-visible"
              >
                <defs>
                  {/* Mask with Squircle Body + Authentic Cut-out Reaction Eyes */}
                  <mask
                    id="grok-studio-mask"
                    maskUnits="userSpaceOnUse"
                    x="-125"
                    y="-125"
                    width="250"
                    height="250"
                  >
                    {/* Official Studio Head Squircle Shape (White = visible) */}
                    <path
                      d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                      fill="#ffffff"
                    />

                    {/* Reaction Eyes Container directly driven by cursor coordinates */}
                    <g ref={eyesGroupRef}>
                      <g
                        style={{
                          transform: `scale(1, ${blink})`,
                          transformOrigin: "0px -5px",
                          transition: "transform 0.07s ease-out",
                        }}
                      >
                        {/* Left Eye Cut-out */}
                        <path
                          d={ATTENTIVE_EYES.leftEye.d}
                          transform={ATTENTIVE_EYES.leftEye.transform}
                          opacity="1"
                          fill="#000000"
                        />
                        {/* Right Eye Cut-out */}
                        <path
                          d={ATTENTIVE_EYES.rightEye.d}
                          transform={ATTENTIVE_EYES.rightEye.transform}
                          opacity="1"
                          fill="#000000"
                        />
                      </g>
                    </g>
                  </mask>

                  {/* Authentic Studio Metallic Cyan-Blue Radial Gradient */}
                  <radialGradient
                    id="grok-studio-fill"
                    gradientUnits="userSpaceOnUse"
                    cx="-40"
                    cy="-50"
                    r="193.75"
                  >
                    <stop offset="0%" stopColor="#b5d6f9" />
                    <stop offset="32%" stopColor="#62a9f3" />
                    <stop offset="72%" stopColor="#3b93f0" />
                    <stop offset="100%" stopColor="#275c95" />
                  </radialGradient>
                </defs>

                {/* Deep Obsidian Socket Underlayer for Eyes */}
                <path
                  d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                  fill="#080b11"
                />

                {/* Masked Grok Metallic Body with Cut-out Reaction Eyes */}
                <g mask="url(#grok-studio-mask)">
                  <rect
                    x="-125"
                    y="-125"
                    width="250"
                    height="250"
                    fill="url(#grok-studio-fill)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Centered ChatGPT-like Modal Dialog */}
      <GrokChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}
