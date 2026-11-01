"use client";

import React, { useEffect, useRef, useState } from "react";

export function FigmaCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringInput, setIsHoveringInput] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [actionLabel, setActionLabel] = useState("Daksh");

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

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      if (interactive) {
        setIsHoveringClickable(true);
        if (target.closest("input, textarea")) {
          setIsHoveringInput(true);
          setActionLabel("Type");
        } else if (target.closest("a")) {
          setIsHoveringInput(false);
          setActionLabel("Open");
        } else {
          setIsHoveringInput(false);
          setActionLabel("Click");
        }
      } else {
        setIsHoveringClickable(false);
        setIsHoveringInput(false);
        setActionLabel("Daksh");
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

    // Smooth RAF loop with linear interpolation (lerp)
    let animId: number;
    const updateCursor = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.32;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.32;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    animId = requestAnimationFrame(updateCursor);

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
        className={`relative flex items-start transition-transform duration-150 ease-out ${
          isMouseDown ? "scale-90" : isHoveringClickable ? "scale-105" : "scale-100"
        }`}
      >
        {/* Iconic Figma Cursor Arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill="#0D99FF"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Figma Multiplayer User Name Tag */}
        <div className="ml-1 -mt-1 flex items-center gap-1.5 rounded-full bg-[#0D99FF] px-2.5 py-0.5 text-[11px] font-semibold tracking-tight text-white shadow-[0_2px_8px_rgba(13,153,255,0.4)] border border-white/30 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-[10px] leading-tight">{actionLabel}</span>
        </div>
      </div>
    </div>
  );
}

