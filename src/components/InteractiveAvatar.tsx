"use client";

import React, { useEffect, useRef, useState } from "react";

export function InteractiveAvatar() {
  const [blink, setBlink] = useState(1);
  const containerRef = useRef<SVGSVGElement>(null);
  const centerXRef = useRef(0);

  // Measure center once and update on resize/scroll (zero layout thrashing)
  useEffect(() => {
    const updateCenter = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      centerXRef.current = rect.left + rect.width / 2;
    };

    updateCenter();
    window.addEventListener("resize", updateCenter, { passive: true });
    window.addEventListener("scroll", updateCenter, { passive: true });

    return () => {
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter);
    };
  }, []);

  // Direct DOM CSS variable update — zero React re-renders on mousemove
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const centerX = centerXRef.current;
        if (!centerX) return;

        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const clampedLook = Math.max(-1, Math.min(1, deltaX));
        containerRef.current.style.setProperty("--look", clampedLook.toFixed(3));
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Natural periodic blinking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      setBlink(0.1);
      setTimeout(() => {
        setBlink(1);
        const nextBlinkDelay = Math.random() * 4000 + 2500;
        timeoutId = setTimeout(triggerBlink, nextBlinkDelay);
      }, 140);
    };

    const initialDelay = Math.random() * 2000 + 1000;
    timeoutId = setTimeout(triggerBlink, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative flex justify-center items-center py-4 select-none">
      <svg
        ref={containerRef}
        viewBox="0 0 1096 1240"
        role="img"
        aria-label="Portrait illustration of Daksh"
        className="mx-auto block w-48 sm:w-56 lg:w-64 xl:w-80 transition-transform duration-75 ease-out dark:[filter:drop-shadow(2px_0_0_white)_drop-shadow(-2px_0_0_white)_drop-shadow(0_-2px_0_white)]"
        style={
          {
            ["--look" as string]: 0,
            ["--blink" as string]: blink,
          } as React.CSSProperties
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <clipPath id="daksh-avatar-shirt">
            <path d="M350 883 L212 938 C150 962 110 990 88 1012 C55 1045 38 1110 22 1250 L1078 1250 C1062 1110 1045 1045 1008 1012 C986 990 950 962 890 938 L748 883 Z" />
          </clipPath>
        </defs>

        {/* Torso & Tech Hoodie / Shirt */}
        <g>
          <path
            d="M350 883 L212 938 C150 962 110 990 88 1012 C55 1045 38 1110 22 1250 L1078 1250 C1062 1110 1045 1045 1008 1012 C986 990 950 962 890 938 L748 883 Z"
            className="fill-stone-200"
          />
          <g clipPath="url(#daksh-avatar-shirt)">
            {/* Minimalist Tech Hoodie Texture Stripes */}
            <g>
              <rect x="0" y="959" width="1096" height="20" className="fill-white" />
              <path d="M0 955 C400 960 700 960 1096 955" className="fill-none stroke-black" strokeWidth="11" />
            </g>
            <g>
              <rect x="0" y="1044" width="1096" height="20" className="fill-white" />
              <path d="M0 1040 C400 1045 700 1045 1096 1040" className="fill-none stroke-black" strokeWidth="11" />
            </g>
            <g>
              <rect x="0" y="1129" width="1096" height="20" className="fill-white" />
              <path d="M0 1125 C400 1130 700 1130 1096 1125" className="fill-none stroke-black" strokeWidth="11" />
            </g>
            <g>
              <rect x="0" y="1214" width="1096" height="20" className="fill-white" />
              <path d="M0 1210 C400 1215 700 1215 1096 1210" className="fill-none stroke-black" strokeWidth="11" />
            </g>
            <path d="M128 1046 C166 1090 196 1160 206 1245" className="fill-none stroke-black" strokeWidth="11" />
            <path d="M998 1042 C950 1085 905 1150 886 1245" className="fill-none stroke-black" strokeWidth="11" />
          </g>

          {/* Shoulders Outline */}
          <path
            d="M350 883 L212 938 C150 962 110 990 88 1012 C55 1045 38 1110 22 1250 L1078 1250 C1062 1110 1045 1045 1008 1012 C986 990 950 962 890 938 L748 883"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Neck */}
        <g>
          <path
            d="M448 765 C448 830 455 880 460 910 L636 910 C641 880 648 830 648 765 Z"
            className="fill-stone-100"
          />
          <path
            d="M448 765 C448 830 455 880 460 910"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
          <path
            d="M648 765 C648 830 641 880 636 910"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Head / Face Base */}
        <g>
          <path
            d="M340 450 C320 620 380 770 548 790 C716 770 776 620 756 450 C740 280 680 200 548 200 C416 200 356 280 340 450 Z"
            className="fill-stone-100"
          />
          <path
            d="M340 450 C320 620 380 770 548 790 C716 770 776 620 756 450 C740 280 680 200 548 200 C416 200 356 280 340 450 Z"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Hair — Distinctive Volume & Waves */}
        <g>
          <path
            d="M330 420 C310 250 400 130 548 130 C696 130 786 250 766 420 C755 350 710 240 650 220 C600 200 560 210 520 225 C470 245 420 240 380 270 C345 300 335 360 330 420 Z"
            className="fill-black"
          />
          <path
            d="M380 270 C410 210 490 190 548 190 C630 190 710 230 735 310"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
          <path
            d="M430 180 C480 140 560 140 620 170"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Ears */}
        <g>
          {/* Left Ear */}
          <path
            d="M338 480 C305 480 300 560 335 570"
            className="fill-stone-100 stroke-black"
            strokeWidth="11"
          />
          {/* Right Ear */}
          <path
            d="M758 480 C791 480 796 560 761 570"
            className="fill-stone-100 stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Dynamic Gaze Group (Eyes, Eyebrows, Pupils) driven directly by --look and --blink */}
        <g
          style={{
            transform: "translateX(calc(var(--look, 0) * 16px))",
            transition: "transform 0.05s ease-out",
          }}
        >
          {/* Eyebrows */}
          <path
            d="M410 430 Q465 415 505 435"
            className="fill-none stroke-black"
            strokeWidth="14"
          />
          <path
            d="M591 435 Q631 415 686 430"
            className="fill-none stroke-black"
            strokeWidth="14"
          />

          {/* Glasses Frame — Modern Sleek Tech Frames */}
          <rect
            x="395"
            y="450"
            width="120"
            height="85"
            rx="24"
            className="fill-white/80 stroke-black"
            strokeWidth="11"
          />
          <rect
            x="581"
            y="450"
            width="120"
            height="85"
            rx="24"
            className="fill-white/80 stroke-black"
            strokeWidth="11"
          />
          {/* Bridge */}
          <path d="M515 485 Q548 475 581 485" className="fill-none stroke-black" strokeWidth="11" />

          {/* Eyes with Blinking Scale */}
          <g
            style={{
              transformOrigin: "548px 492px",
              transform: "scaleY(var(--blink, 1))",
              transition: "transform 0.08s ease-out",
            }}
          >
            {/* Left Eye Pupil */}
            <circle cx="455" cy="492" r="14" className="fill-black" />
            <circle cx="459" cy="488" r="4" className="fill-white" />

            {/* Right Eye Pupil */}
            <circle cx="641" cy="492" r="14" className="fill-black" />
            <circle cx="645" cy="488" r="4" className="fill-white" />
          </g>
        </g>

        {/* Nose */}
        <path
          d="M548 495 L542 580 L560 585"
          className="fill-none stroke-black"
          strokeWidth="11"
        />

        {/* Mouth — Subtle Confident Smile */}
        <path
          d="M485 650 Q548 685 611 650"
          className="fill-none stroke-black"
          strokeWidth="11"
        />
      </svg>
    </div>
  );
}
