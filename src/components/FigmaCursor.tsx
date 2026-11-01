"use client";

import React, { useEffect, useRef, useState } from "react";

export const CURSOR_COLORS = [
  { name: "Figma Blue", hex: "#0D99FF" },
  { name: "Purple", hex: "#A259FF" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Coral", hex: "#FF7262" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Hot Pink", hex: "#EC4899" },
  { name: "Cyan", hex: "#06B6D4" },
];

interface FigmaCursorProps {
  color?: string;
}

export function FigmaCursor({ color = "#0D99FF" }: FigmaCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, [role='button'], input, textarea, select");
        setIsHoveringClickable(!!interactive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animId: number;
    const updateLoop = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.35;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] select-none transition-opacity duration-200"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
      }}
    >
      <div
        className={`transition-transform duration-150 ease-out ${
          isMouseDown ? "scale-95" : isHoveringClickable ? "scale-105" : "scale-100"
        }`}
      >
        {/* Prominent Large Figma Cursor Arrow (Without Name Badge) */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
