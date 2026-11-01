"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Footer() {
  const [mumbaiTime, setMumbaiTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setMumbaiTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="overflow-x-clip px-6 md:px-10 pb-16 pt-8">
      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5">
        {/* Top Decorative Line with Dot Caps */}
        <div aria-hidden="true" className="pointer-events-none relative h-px">
          <div className="absolute -inset-x-[129px] top-0 h-px bg-foreground/10" />
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-10 md:px-10">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-semibold text-sm tracking-tight text-foreground">
              Daksh Srivastava
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Full-Stack &amp; AI Systems Engineer · CGPA 9.57
            </span>
          </div>

          {/* Live Mumbai Clock */}
          <div className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-3.5 py-1.5 text-xs font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Mumbai, IN</span>
            <span className="text-foreground font-semibold tabular-nums">{mumbaiTime || "12:00:00"} IST</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Daksh-create349"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              <GithubIcon className="size-4" />
            </a>

            <a
              href="https://linkedin.com/in/daksh-srivastava-2ba851344"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              <LinkedinIcon className="size-4" />
            </a>

            <a
              href="mailto:dakshshrivastav56@gmail.com"
              aria-label="Email Daksh"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Mail className="size-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              title="Back to top"
              className="inline-flex size-9 items-center justify-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity ml-2 cursor-pointer"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
