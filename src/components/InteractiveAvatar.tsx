"use client";

import React, { useEffect, useRef } from "react";

export function InteractiveAvatar() {
  const containerRef = useRef<SVGSVGElement>(null);
  const centerXRef = useRef(0);

  // Cache center X on mount, resize, and scroll to prevent layout thrashing
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

  // Update CSS custom property --look directly via RAF (zero React re-renders for fluid 120fps)
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

  // Natural periodic blinking using CSS custom property --blink
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--blink", "0.08");
      }
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.setProperty("--blink", "1");
        }
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
        aria-label="Portrait illustration of Daksh that looks toward your cursor"
        className="mx-auto block w-48 sm:w-56 lg:w-64 xl:w-80 transition-transform duration-75 ease-out dark:[filter:drop-shadow(2px_0_0_white)_drop-shadow(-2px_0_0_white)_drop-shadow(0_-2px_0_white)]"
        style={
          {
            ["--look" as string]: "0",
            ["--blink" as string]: "1",
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

          {/* Neck */}
          <path
            d="M402 735 L402 885 C440 975 500 992 548 992 C596 992 656 975 694 885 L694 735 Z"
            className="fill-stone-50"
          />
          <path d="M402 735 L402 879 L384 884" className="fill-none stroke-black" strokeWidth="11" />
          <path d="M694 735 L694 879 L712 884" className="fill-none stroke-black" strokeWidth="11" />
          
          {/* Collar */}
          <path
            d="M340 890 C400 1005 480 1024 548 1024 C616 1024 696 1005 756 890 L712 878 C660 965 600 987 548 987 C496 987 436 965 384 878 Z"
            className="fill-black"
          />
        </g>

        {/* Ears (parallaxes slightly in reverse for depth) */}
        <g style={{ transform: "translateX(calc(var(--look) * -10px))" }}>
          <path
            d="M352 520 C300 500 262 540 270 602 C278 662 318 700 358 690 L372 600 Z"
            className="fill-stone-50 stroke-black"
            strokeWidth="11"
          />
          <path
            d="M744 520 C796 500 834 540 826 602 C818 662 778 700 738 690 L724 600 Z"
            className="fill-stone-50 stroke-black"
            strokeWidth="11"
          />
          <path d="M316 578 C338 590 346 606 345 628" className="fill-none stroke-black" strokeWidth="10" />
          <path d="M780 578 C758 590 750 606 751 628" className="fill-none stroke-black" strokeWidth="10" />
        </g>

        {/* Head Shape & Chin */}
        <g style={{ transform: "translateX(calc(var(--look) * 4px))" }}>
          <path
            d="M362 430 C362 300 734 300 734 430 L742 690 C730 770 690 835 630 868 C600 882 496 882 466 868 C406 835 366 770 354 690 Z"
            className="fill-stone-50"
          />
          <path
            d="M351 664 C360 760 400 832 466 866 C500 882 596 882 630 866 C696 832 736 760 745 664"
            className="fill-none stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Modern Haircut */}
        <g style={{ transform: "translateX(calc(var(--look) * 8px))" }}>
          <path
            d="M318 522 C308 450 315 370 345 318 C362 290 385 268 402 256 C440 215 500 200 548 200 C605 200 660 215 696 262 C735 285 770 320 782 380 C792 430 790 480 782 524 L745 532 C742 470 725 410 668 345 C610 392 480 392 416 343 C385 390 370 450 368 528 Z"
            className="fill-zinc-800 stroke-black"
            strokeWidth="11"
          />
        </g>

        {/* Facial Features (Eyebrows, Nose, Smile, Eyes with Blink) */}
        <g style={{ transform: "translateX(calc(var(--look) * 30px))" }}>
          {/* Eyebrows */}
          <path
            d="M400 494 C430 466 478 466 498 486 C470 481 432 483 400 494 Z"
            className="fill-stone-50 stroke-black"
            strokeWidth="9"
          />
          <path
            d="M696 494 C666 466 618 466 598 486 C626 481 664 483 696 494 Z"
            className="fill-stone-50 stroke-black"
            strokeWidth="9"
          />

          {/* Nose */}
          <path
            d="M524 586 C512 616 494 636 494 652 C494 676 535 682 570 666"
            className="fill-none stroke-black"
            strokeWidth="11"
          />

          {/* Confident Smile */}
          <path
            d="M458 732 C495 768 590 768 632 730"
            className="fill-none stroke-black"
            strokeWidth="11"
          />

          {/* Pupils & Eyes tracking and blinking */}
          <ellipse
            cx="454"
            cy="566"
            rx="20"
            ry="22"
            className="fill-black"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: `translateX(calc(var(--look) * 9px)) scaleY(var(--blink))`,
            }}
          />
          <ellipse
            cx="636"
            cy="566"
            rx="20"
            ry="22"
            className="fill-black"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: `translateX(calc(var(--look) * 9px)) scaleY(var(--blink))`,
            }}
          />
        </g>

        {/* Glasses Frame (Signature Tech Look) */}
        <g
          style={{ transform: "translateX(calc(var(--look) * 38px))" }}
          className="fill-none stroke-black"
        >
          <path d="M386 536 L352 525" strokeWidth="20" />
          <path d="M706 532 L748 536" strokeWidth="20" />
          <path d="M512 552 C530 540 562 540 580 552" strokeWidth="13" />
          <rect x="382" y="511" width="134" height="122" rx="46" strokeWidth="14" />
          <rect x="576" y="511" width="134" height="122" rx="46" strokeWidth="14" />
        </g>
      </svg>
    </div>
  );
}
