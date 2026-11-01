"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { InteractiveAvatar } from "./InteractiveAvatar";

const TITLES = [
  { line1: "Full-Stack", line2: "Developer" },
  { line1: "AI Systems", line2: "Engineer" },
  { line1: "DevSecOps", line2: "Specialist" },
  { line1: "Geospatial AI", line2: "Builder" },
];

const ACCORDIONS = [
  {
    title: "Hi, I'm Daksh",
    content:
      "Full-stack Developer & CS Undergraduate (CGPA: 9.57) at ITM Skills University. Shipping user-centric products and AI systems from mathematical concept to production code.",
  },
  {
    title: "I engineer AI & real-time systems",
    content:
      "Architected Sonaura 2.0 (launched on Microsoft Edge Store), AQUILA (Sentinel-1 SAR climate engine), and HyperMind (Gemini Live real-time voice & Generative UI).",
  },
  {
    title: "DevSecOps & deep architecture",
    content:
      "FastAPI, React 19, Docker, Celery, Redis, PostGIS, and Three.js. Specializing in forensic Git DAG vulnerability traversal and low-latency client-side DSP.",
  },
];

interface HeroSectionProps {
  onHoldAbout: () => void;
}

export function HeroSection({ onHoldAbout }: HeroSectionProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  // Rotating title
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Liquid Hold button interaction
  useEffect(() => {
    let animationFrame: number;
    if (isHolding) {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(elapsed / 900, 1);
        setHoldProgress(p);
        if (p < 1) {
          animationFrame = requestAnimationFrame(step);
        } else {
          onHoldAbout();
          setIsHolding(false);
          setHoldProgress(0);
        }
      };
      animationFrame = requestAnimationFrame(step);
    } else {
      setHoldProgress(0);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isHolding, onHoldAbout]);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="mx-auto grid min-h-svh w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-14"
    >
      {/* Left Column: Rotating Title & CTA */}
      <div className="flex flex-col items-start gap-8 min-w-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-secondary/50 text-xs font-mono text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for AI &amp; Software Roles · Mumbai</span>
        </div>

        <div className="space-y-2">
          <p className="text-xl sm:text-2xl font-mono text-muted-foreground font-normal">
            Daksh Srivastava
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.05] tracking-tight">
            <span className="sr-only">
              Full-Stack Developer, AI Systems Engineer, DevSecOps Specialist, Geospatial AI Builder
            </span>
            <span aria-hidden="true" className="grid">
              {TITLES.map((t, idx) => {
                const isCurrent = idx === currentTitleIndex;
                return (
                  <span
                    key={`${t.line1}-${t.line2}`}
                    className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCurrent
                        ? "opacity-100 translate-y-0 filter-none"
                        : "opacity-0 -translate-y-8 blur-sm pointer-events-none"
                    }`}
                  >
                    <span className="block whitespace-nowrap">{t.line1}</span>
                    <span className="block whitespace-nowrap text-foreground/90">{t.line2}</span>
                  </span>
                );
              })}
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Liquid "About me" Hold Button */}
          <button
            type="button"
            aria-label="About me"
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            onClick={scrollToAbout}
            className="relative inline-grid touch-none place-items-center overflow-hidden rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-background h-11 min-w-0 border border-border bg-background px-5 text-foreground focus-visible:ring-ring transition-transform active:scale-95 cursor-pointer"
          >
            {/* Liquid wave fill */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 will-change-[transform] bg-foreground/15 dark:bg-foreground/20 transition-all duration-75"
                style={{
                  transform: `translateY(${(1 - holdProgress) * 105}%)`,
                }}
              >
                <svg
                  viewBox="0 0 240 24"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -top-4 left-0 h-5 w-[200%] text-foreground/15 dark:text-foreground/25 animate-[float_3s_ease-in-out_infinite]"
                >
                  <path
                    d="M0 12C20 2 40 2 60 12s40 10 60 0 40-10 60 0 40 10 60 0v12H0Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </span>

            <span className="relative z-10 grid place-items-center font-medium text-sm tracking-normal">
              {holdProgress > 0.15 ? "Keep holding..." : "About Daksh"}
            </span>
          </button>

          {/* Shimmer "See my work" Button */}
          <button
            type="button"
            onClick={scrollToWork}
            className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full px-5 text-sm font-medium text-foreground select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-[0_8px_22px_rgba(0,0,0,0.14)] h-11 transition-transform hover:scale-[1.02] cursor-pointer"
          >
            {/* Metallic animated gradient border */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-[-20%] z-0 w-[140%] rounded-[inherit] bg-[linear-gradient(105deg,#111_0%,#737373_14%,#fafafa_26%,#525252_38%,#0a0a0a_50%,#a3a3a3_64%,#fff_75%,#404040_87%,#111_100%)] animate-shimmer"
            />
            {/* Inner background mask */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[1.5px] z-[2] rounded-[inherit] bg-background transition-colors group-hover:bg-muted/40"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[1.5px] z-[3] rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.15)]"
            />
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              See my work
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>

      {/* Center Column: Interactive Cursor-Tracking Avatar */}
      <div className="flex justify-center items-center">
        <InteractiveAvatar />
      </div>

      {/* Right Column: Accordion Selector */}
      <ul className="flex flex-col w-full max-w-sm lg:justify-self-end divide-y divide-border/40">
        {ACCORDIONS.map((acc, index) => {
          const isOpen = openAccordion === index;
          return (
            <li key={acc.title} className="py-2">
              <button
                type="button"
                onClick={() => setOpenAccordion(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className={`block min-h-11 w-full rounded-md py-1.5 text-left text-lg font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                  isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {acc.title}
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground pb-2">
                  {acc.content}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
