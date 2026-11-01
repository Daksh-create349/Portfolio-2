"use client";

import React, { useEffect, useState } from "react";
import {
  House,
  BriefcaseBusiness,
  UserRound,
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { CURSOR_COLORS } from "./FigmaCursor";

interface FloatingHeaderProps {
  onOpenContact: () => void;
  cursorColor?: string;
  onSelectCursorColor?: (color: string) => void;
}

export function FloatingHeader({
  onOpenContact,
  cursorColor = "#0D99FF",
  onSelectCursorColor,
}: FloatingHeaderProps) {
  const [activeItem, setActiveItem] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const colorMenuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside handler for cursor color menu
    const handleClickOutside = (e: MouseEvent) => {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(e.target as Node)
      ) {
        setIsColorMenuOpen(false);
      }
    };

    if (isColorMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorMenuOpen]);

  useEffect(() => {
    // Check initial theme
    const checkDark = document.documentElement.classList.contains("dark");
    setIsDark(checkDark);

    // Scroll spy for active item
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ["home", "work", "opensource", "about", "stack"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollY >= el.offsetTop - 220) {
          setActiveItem(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    if (isCurrentlyDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveItem(id);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: House },
    { id: "work", label: "Work", icon: BriefcaseBusiness },
    { id: "opensource", label: "Open Source", icon: GithubIcon },
    { id: "about", label: "About", icon: UserRound },
    { id: "stack", label: "Stack", icon: Layers },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-2 sm:px-4">
      <div className="pointer-events-auto relative flex max-w-full items-center gap-2">
        {/* Main Nav Pill */}
        <nav aria-label="Primary" className="min-w-0">
          <div className="inline-flex max-w-full">
            <div className="scrollbar-hide relative inline-flex max-w-full items-center overflow-x-auto overflow-y-hidden rounded-full border border-white/50 bg-white/40 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.2),inset_0_1px_0_rgb(255_255_255/0.8),inset_0_-1px_0_rgb(255_255_255/0.2)] backdrop-blur-2xl backdrop-saturate-200 dark:border-white/15 dark:bg-white/10 dark:shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.2),inset_0_-1px_0_rgb(255_255_255/0.05)] min-h-13 gap-0 p-1 text-base sm:gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    onClick={() => scrollTo(item.id)}
                    className={`relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium outline-none transition-[color,background-color] duration-150 ease-out focus-visible:text-foreground h-11 min-w-11 px-3.5 focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 -z-10 rounded-full bg-muted/80 shadow-sm" />
                    )}
                    <span className="inline-flex shrink-0 items-center justify-center size-4">
                      <Icon className="size-full" />
                    </span>
                    <span className="hidden sm:inline-block ml-2 text-sm tracking-normal">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Switch between light and dark mode"
          className="border-white/50 bg-white/40 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.2),inset_0_1px_0_rgb(255_255_255/0.8),inset_0_-1px_0_rgb(255_255_255/0.2)] backdrop-blur-2xl backdrop-saturate-200 dark:border-white/15 dark:bg-white/10 dark:shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.2),inset_0_-1px_0_rgb(255_255_255/0.05)] inline-flex size-13 shrink-0 items-center justify-center rounded-full border text-foreground/80 outline-none transition-transform duration-200 hover:scale-105 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          {isDark ? (
            <Sun className="size-4 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-90" />
          ) : (
            <Moon className="size-4 text-slate-700 transition-transform duration-300 rotate-0 hover:-rotate-45" />
          )}
        </button>

        {/* Minimal, Normal Cursor Color Switcher */}
        {onSelectCursorColor && (
          <div className="relative" ref={colorMenuRef}>
            <button
              type="button"
              onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
              title="Change cursor color"
              aria-label="Change cursor color"
              className="border-white/50 bg-white/40 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.2),inset_0_1px_0_rgb(255_255_255/0.8),inset_0_-1px_0_rgb(255_255_255/0.2)] backdrop-blur-2xl backdrop-saturate-200 dark:border-white/15 dark:bg-white/10 dark:shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.2),inset_0_-1px_0_rgb(255_255_255/0.05)] inline-flex size-13 shrink-0 items-center justify-center rounded-full border text-foreground/85 outline-none transition-transform duration-200 hover:scale-105 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                  fill={cursorColor}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Clean, Non-intrusive Popover */}
            {isColorMenuOpen && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2.5 rounded-full border border-border/80 bg-background/95 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                {CURSOR_COLORS.map((c) => {
                  const isSelected = cursorColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => {
                        onSelectCursorColor(c.hex);
                        setIsColorMenuOpen(false);
                      }}
                      title={c.name}
                      aria-label={`Select ${c.name} cursor color`}
                      className={`size-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                        isSelected
                          ? "scale-115 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                          : "hover:scale-110 opacity-75 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* "Book a Call" / Contact Button with Sliding Dot Matrix */}
        <button
          type="button"
          onClick={onOpenContact}
          className="group relative inline-flex items-center overflow-hidden bg-primary p-1.5 text-primary-foreground select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-13 w-13 min-w-0 shrink-0 rounded-full shadow-[0_10px_40px_-10px_rgb(0_0_0/0.35)] sm:w-auto transition-transform hover:scale-[1.02] cursor-pointer"
        >
          {/* Slider Pill with Dots */}
          <span
            aria-hidden="true"
            className="absolute inset-y-1.5 left-1.5 z-10 overflow-hidden bg-secondary text-secondary-foreground transition-all duration-300 group-hover:w-[calc(100%-12px)]"
            style={{ width: "40px", borderRadius: "20px" }}
          >
            <span className="absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 20 28" fill="none" aria-hidden="true" className="h-6 w-4">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <circle cx="10" cy="9" r="2" fill="currentColor" />
                <circle cx="16" cy="14" r="2" fill="currentColor" />
                <circle cx="10" cy="19" r="2" fill="currentColor" />
                <circle cx="4" cy="24" r="2" fill="currentColor" />
              </svg>
            </span>
          </span>

          <span className="relative z-0 mr-5 whitespace-nowrap font-medium ml-[54px] text-sm tracking-normal">
            Get in touch
          </span>
        </button>
      </div>
    </header>
  );
}

