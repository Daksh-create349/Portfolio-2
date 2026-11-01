"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Sparkles, MessageSquare } from "lucide-react";

const REACTIONS = [
  "tracking cursor coordinates...",
  "smooth 60fps detected.",
  "inspecting dom tree...",
  "0 vulnerabilities found.",
  "is-a-dev pr looking clean.",
  "vibing with your cursor.",
  "9.57 cgpa efficiency.",
  "calculating next scroll vector...",
  "sentinel-1 radar signal steady.",
  "10/10 cursor velocity.",
  "spatial audio engine ready.",
  "no bugs in sight today.",
  "nice hover precision.",
  "psst... click me again.",
  "portfolio architecture approved.",
  "observing from orbit.",
];

export function GrokCompanion() {
  const [mounted, setMounted] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rx: 0, ry: 0 });
  const [blink, setBlink] = useState(1);
  const [isSquishing, setIsSquishing] = useState(false);
  const [reaction, setReaction] = useState<string>("hey there");
  const [showReaction, setShowReaction] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const botRef = useRef<HTMLDivElement>(null);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse tracking for eyes and 3D head tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - botCenterX;
      const deltaY = e.clientY - botCenterY;
      const dist = Math.hypot(deltaX, deltaY);

      // Max eye displacement inside the head
      const maxEyeDist = 12;
      const eyeFactor = Math.min(dist / 400, 1);
      const angle = Math.atan2(deltaY, deltaX);

      const ex = Math.cos(angle) * maxEyeDist * eyeFactor;
      const ey = Math.sin(angle) * (maxEyeDist * 0.8) * eyeFactor;

      setEyeOffset({ x: ex, y: ey });

      // Subtle 3D tilt
      const maxTilt = 14;
      const rx = Math.max(-maxTilt, Math.min(maxTilt, -(deltaY / window.innerHeight) * maxTilt));
      const ry = Math.max(-maxTilt, Math.min(maxTilt, (deltaX / window.innerWidth) * maxTilt));
      setHeadTilt({ rx, ry });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Periodic natural blinking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      setBlink(0.08);
      setTimeout(() => {
        setBlink(1);
        const nextDelay = Math.random() * 4000 + 2500;
        timeoutId = setTimeout(triggerBlink, nextDelay);
      }, 120);
    };

    timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Trigger a new reaction
  const triggerReaction = useCallback((customText?: string) => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);

    const text = customText || REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    setReaction(text);
    setShowReaction(true);

    reactionTimerRef.current = setTimeout(() => {
      setShowReaction(false);
    }, 4200);
  }, []);

  // Periodic ambient reactions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMinimized && Math.random() > 0.45) {
        triggerReaction();
      }
    }, 11000);

    return () => clearInterval(interval);
  }, [isMinimized, triggerReaction]);

  // Click on bot
  const handleClick = () => {
    setIsSquishing(true);
    setBlink(0.08);

    setTimeout(() => {
      setBlink(1);
      setIsSquishing(false);
    }, 180);

    triggerReaction();
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Interactive Grok Bot Companion"
      className="fixed bottom-6 right-6 z-40 select-none pointer-events-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Floating Reaction Bubble */}
        {!isMinimized && showReaction && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto mb-3 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="relative rounded-2xl border border-white/15 bg-background/95 px-3.5 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:bg-card/95">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
                <p className="font-mono text-xs text-foreground tracking-tight font-medium">
                  {reaction}
                </p>
              </div>
              {/* Bubble Tail Pointing to Bot */}
              <div
                className="absolute -bottom-1.5 right-6 size-3 rotate-45 border-b border-r border-white/15 bg-background/95 dark:bg-card/95"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* Minimized Dock Icon */}
        {isMinimized ? (
          <button
            type="button"
            onClick={() => {
              setIsMinimized(false);
              triggerReaction("i'm back.");
            }}
            title="Wake up Grok companion"
            aria-label="Wake up Grok companion"
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/80 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur-md hover:border-foreground/30 transition-all hover:scale-105 cursor-pointer text-xs font-mono text-muted-foreground"
          >
            <Sparkles className="size-3 text-blue-400" />
            <span>Wake bot</span>
          </button>
        ) : (
          /* Main Grok Bot Container */
          <div className="relative pointer-events-auto flex items-center justify-center">
            {/* Minimal controls toolbar above bot */}
            <div className="absolute -top-3 -right-2 z-10 flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title="Minimize companion"
                aria-label="Minimize companion"
                className="flex size-5 items-center justify-center rounded-full bg-background border border-border/70 text-muted-foreground hover:text-foreground text-[10px] shadow-sm cursor-pointer"
              >
                <X className="size-3" />
              </button>
            </div>

            {/* Interactive Bot SVG */}
            <div
              ref={botRef}
              onClick={handleClick}
              onMouseEnter={() => triggerReaction("looking right at you.")}
              title="Grok Companion &mdash; click to interact"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick();
                }
              }}
              style={{
                transform: `perspective(600px) rotateX(${headTilt.rx}deg) rotateY(${headTilt.ry}deg) scale(${
                  isSquishing ? 0.9 : 1
                })`,
                transition: isSquishing
                  ? "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  : "transform 0.08s ease-out",
              }}
              className="relative flex size-16 sm:size-20 items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-[0_10px_20px_rgba(59,147,240,0.25)]"
            >
              {/* Pulsing ambient halo behind bot */}
              <div
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse pointer-events-none"
                aria-hidden="true"
              />

              <svg
                viewBox="-125 -125 250 250"
                aria-hidden="true"
                className="relative size-full overflow-visible"
              >
                <defs>
                  {/* Mask for the squircle body with cut-out eyes */}
                  <mask
                    id="grok-companion-mask"
                    maskUnits="userSpaceOnUse"
                    x="-158"
                    y="-158"
                    width="316"
                    height="316"
                  >
                    {/* Head Squircle Shape (White = visible) */}
                    <path
                      d="M100.19 0.09C100.19 3.35 100.03 6.62 99.71 9.86C99.39 13.11 98.91 16.35 98.27 19.54C97.63 22.74 96.83 25.92 95.88 29.03C94.93 32.15 93.83 35.24 92.58 38.25C91.33 41.26 89.92 44.22 88.38 47.09C86.84 49.97 85.15 52.78 83.34 55.49C81.52 58.19 79.56 60.83 77.49 63.35C75.42 65.86 73.21 68.29 70.9 70.6C68.59 72.9 66.15 75.1 63.63 77.17C61.1 79.23 58.46 81.19 55.75 83C53.03 84.81 50.21 86.49 47.33 88.03C44.45 89.56 41.48 90.96 38.46 92.21C35.44 93.46 32.34 94.56 29.22 95.51C26.09 96.45 22.9 97.25 19.7 97.88C16.49 98.52 13.24 99 9.99 99.32C6.74 99.64 3.46 99.8 0.19 99.8C-3.08 99.8 -6.36 99.64 -9.61 99.32C-12.86 99 -16.12 98.52 -19.32 97.88C-22.52 97.25 -25.71 96.45 -28.84 95.51C-31.97 94.56 -35.06 93.46 -38.08 92.21C-41.1 90.96 -44.07 89.56 -46.95 88.03C-49.83 86.49 -52.65 84.81 -55.37 83C-58.08 81.19 -60.72 79.23 -63.25 77.17C-65.78 75.1 -68.21 72.9 -70.52 70.6C-72.83 68.29 -75.04 65.86 -77.11 63.35C-79.18 60.83 -81.14 58.19 -82.96 55.49C-84.77 52.78 -86.46 49.97 -88 47.09C-89.54 44.22 -90.95 41.26 -92.2 38.25C-93.45 35.24 -94.56 32.15 -95.5 29.03C-96.45 25.92 -97.25 22.74 -97.89 19.54C-98.53 16.35 -99.01 13.11 -99.33 9.86C-99.65 6.62 -99.81 3.35 -99.81 0.09C-99.81 -3.17 -99.65 -6.44 -99.33 -9.68C-99.01 -12.92 -98.53 -16.17 -97.89 -19.36C-97.25 -22.56 -96.45 -25.74 -95.5 -28.85C-94.56 -31.97 -93.45 -35.06 -92.2 -38.07C-90.95 -41.08 -89.54 -44.04 -88 -46.91C-86.46 -49.78 -84.77 -52.6 -82.96 -55.3C-81.14 -58.01 -79.18 -60.65 -77.11 -63.16C-75.04 -65.68 -72.83 -68.11 -70.52 -70.41C-68.21 -72.72 -65.78 -74.92 -63.25 -76.98C-60.72 -79.05 -58.08 -81 -55.37 -82.81C-52.65 -84.62 -49.83 -86.31 -46.95 -87.84C-44.07 -89.38 -41.1 -90.78 -38.08 -92.03C-35.06 -93.27 -31.97 -94.38 -28.84 -95.32C-25.71 -96.27 -22.52 -97.07 -19.32 -97.7C-16.12 -98.34 -12.86 -98.82 -9.61 -99.14C-6.36 -99.46 -3.08 -99.62 0.19 -99.62C3.46 -99.62 6.74 -99.46 9.99 -99.14C13.24 -98.82 16.49 -98.34 19.7 -97.7C22.9 -97.07 26.09 -96.27 29.22 -95.32C32.34 -94.38 35.44 -93.27 38.46 -92.03C41.48 -90.78 44.45 -89.38 47.33 -87.84C50.21 -86.31 53.03 -84.62 55.75 -82.81C58.46 -81 61.1 -79.05 63.63 -76.98C66.15 -74.92 68.59 -72.72 70.9 -70.41C73.21 -68.11 75.42 -65.68 77.49 -63.16C79.56 -60.65 81.52 -58.01 83.34 -55.3C85.15 -52.6 86.84 -49.78 88.38 -46.91C89.92 -44.04 91.33 -41.08 92.58 -38.07C93.83 -35.06 94.93 -31.97 95.88 -28.85C96.83 -25.74 97.63 -22.56 98.27 -19.36C98.91 -16.17 99.39 -12.92 99.71 -9.68C100.03 -6.44 100.19 -3.17 100.19 0.09Z"
                      fill="#ffffff"
                    />

                    {/* Dynamic Moving Eyes (Black = transparent hole in mask) */}
                    <g
                      style={{
                        transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px) scale(1, ${blink})`,
                        transformOrigin: "0px 20px",
                        transition: "transform 0.07s ease-out",
                      }}
                    >
                      {/* Left Eye */}
                      <path
                        d="M-11 -9A11 11 0 0 1 0 -20L0 -20A11 11 0 0 1 11 -9L11 9A11 11 0 0 1 0 20L0 20A11 11 0 0 1 -11 9Z"
                        transform="matrix(0.85,-0.4,0.45,0.89,-26.48,21.71)"
                        opacity="1"
                        fill="#000000"
                      />
                      {/* Right Eye */}
                      <path
                        d="M-11 -9A11 11 0 0 1 0 -20L0 -20A11 11 0 0 1 11 -9L11 9A11 11 0 0 1 0 20L0 20A11 11 0 0 1 -11 9Z"
                        transform="matrix(0.85,0.4,-0.45,0.89,28.65,21.71)"
                        opacity="1"
                        fill="#000000"
                      />
                    </g>
                  </mask>

                  {/* Grok Metallic Cyan-Blue Radial Gradient */}
                  <radialGradient
                    id="grok-companion-fill"
                    gradientUnits="userSpaceOnUse"
                    cx="-50.56"
                    cy="-63.2"
                    r="244.9"
                  >
                    <stop offset="0%" stopColor="#b5d6f9" />
                    <stop offset="32%" stopColor="#62a9f3" />
                    <stop offset="72%" stopColor="#3b93f0" />
                    <stop offset="100%" stopColor="#275c95" />
                  </radialGradient>
                </defs>

                {/* Base Dark Eye Socket Color */}
                <path
                  d="M100.19 0.09C100.19 3.35 100.03 6.62 99.71 9.86C99.39 13.11 98.91 16.35 98.27 19.54C97.63 22.74 96.83 25.92 95.88 29.03C94.93 32.15 93.83 35.24 92.58 38.25C91.33 41.26 89.92 44.22 88.38 47.09C86.84 49.97 85.15 52.78 83.34 55.49C81.52 58.19 79.56 60.83 77.49 63.35C75.42 65.86 73.21 68.29 70.9 70.6C68.59 72.9 66.15 75.1 63.63 77.17C61.1 79.23 58.46 81.19 55.75 83C53.03 84.81 50.21 86.49 47.33 88.03C44.45 89.56 41.48 90.96 38.46 92.21C35.44 93.46 32.34 94.56 29.22 95.51C26.09 96.45 22.9 97.25 19.7 97.88C16.49 98.52 13.24 99 9.99 99.32C6.74 99.64 3.46 99.8 0.19 99.8C-3.08 99.8 -6.36 99.64 -9.61 99.32C-12.86 99 -16.12 98.52 -19.32 97.88C-22.52 97.25 -25.71 96.45 -28.84 95.51C-31.97 94.56 -35.06 93.46 -38.08 92.21C-41.1 90.96 -44.07 89.56 -46.95 88.03C-49.83 86.49 -52.65 84.81 -55.37 83C-58.08 81.19 -60.72 79.23 -63.25 77.17C-65.78 75.1 -68.21 72.9 -70.52 70.6C-72.83 68.29 -75.04 65.86 -77.11 63.35C-79.18 60.83 -81.14 58.19 -82.96 55.49C-84.77 52.78 -86.46 49.97 -88 47.09C-89.54 44.22 -90.95 41.26 -92.2 38.25C-93.45 35.24 -94.56 32.15 -95.5 29.03C-96.45 25.92 -97.25 22.74 -97.89 19.54C-98.53 16.35 -99.01 13.11 -99.33 9.86C-99.65 6.62 -99.81 3.35 -99.81 0.09C-99.81 -3.17 -99.65 -6.44 -99.33 -9.68C-99.01 -12.92 -98.53 -16.17 -97.89 -19.36C-97.25 -22.56 -96.45 -25.74 -95.5 -28.85C-94.56 -31.97 -93.45 -35.06 -92.2 -38.07C-90.95 -41.08 -89.54 -44.04 -88 -46.91C-86.46 -49.78 -84.77 -52.6 -82.96 -55.3C-81.14 -58.01 -79.18 -60.65 -77.11 -63.16C-75.04 -65.68 -72.83 -68.11 -70.52 -70.41C-68.21 -72.72 -65.78 -74.92 -63.25 -76.98C-60.72 -79.05 -58.08 -81 -55.37 -82.81C-52.65 -84.62 -49.83 -86.31 -46.95 -87.84C-44.07 -89.38 -41.1 -90.78 -38.08 -92.03C-35.06 -93.27 -31.97 -94.38 -28.84 -95.32C-25.71 -96.27 -22.52 -97.07 -19.32 -97.7C-16.12 -98.34 -12.86 -98.82 -9.61 -99.14C-6.36 -99.46 -3.08 -99.62 0.19 -99.62C3.46 -99.62 6.74 -99.46 9.99 -99.14C13.24 -98.82 16.49 -98.34 19.7 -97.7C22.9 -97.07 26.09 -96.27 29.22 -95.32C32.34 -94.38 35.44 -93.27 38.46 -92.03C41.48 -90.78 44.45 -89.38 47.33 -87.84C50.21 -86.31 53.03 -84.62 55.75 -82.81C58.46 -81 61.1 -79.05 63.63 -76.98C66.15 -74.92 68.59 -72.72 70.9 -70.41C73.21 -68.11 75.42 -65.68 77.49 -63.16C79.56 -60.65 81.52 -58.01 83.34 -55.3C85.15 -52.6 86.84 -49.78 88.38 -46.91C89.92 -44.04 91.33 -41.08 92.58 -38.07C93.83 -35.06 94.93 -31.97 95.88 -28.85C96.83 -25.74 97.63 -22.56 98.27 -19.36C98.91 -16.17 99.39 -12.92 99.71 -9.68C100.03 -6.44 100.19 -3.17 100.19 0.09Z"
                  fill="#090d16"
                  className="dark:fill-[#07090e]"
                />

                {/* Grok Gradient Masked Body */}
                <g mask="url(#grok-companion-mask)">
                  <rect
                    x="-158"
                    y="-158"
                    width="316"
                    height="316"
                    fill="url(#grok-companion-fill)"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
