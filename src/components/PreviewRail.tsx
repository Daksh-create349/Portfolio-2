"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Works" },
  { id: "opensource", label: "Open Source" },
  { id: "about", label: "Get in touch" },
  { id: "resume", label: "Curriculum Vitae" },
  { id: "stack", label: "My Stack" },
];

export function PreviewRail() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop - windowHeight * 0.35;
          if (scrollY >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="isolate overflow-visible pointer-events-none fixed left-4 top-1/2 z-40 hidden min-h-0 w-80 -translate-y-1/2 min-[1440px]:flex">
      <nav
        aria-label="Sections on this page"
        style={{ gridTemplateRows: "repeat(6, 28px)" }}
        className="relative z-10 grid shrink-0 w-12 content-center pointer-events-auto"
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-label={sec.label}
              aria-current={isActive ? "page" : undefined}
              style={{ height: "28px" }}
              className="group relative flex text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-7 w-12 items-center cursor-pointer"
            >
              <span
                aria-hidden="true"
                className={`block bg-current h-0.5 origin-left transition-all duration-300 ease-out ${
                  isActive
                    ? "w-12 text-foreground font-semibold"
                    : isHovered
                    ? "w-8 text-foreground"
                    : "w-4 text-muted-foreground/40"
                }`}
              />

              {/* Tooltip on hover only */}
              {isHovered && (
                <span
                  className="pointer-events-none absolute left-14 whitespace-nowrap font-mono text-xs tracking-wide px-2 py-0.5 rounded bg-background/90 border border-border shadow-sm text-foreground transition-all duration-200"
                >
                  {sec.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
