"use client";

import React, { useEffect, useState } from "react";

export function SiteLoader() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Quick, smooth counting from 0 to 100
    const duration = 650; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easedProgress * 100);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setIsHidden(true), 500);
        }, 150);
      }
    };

    requestAnimationFrame(updateCounter);
  }, []);

  if (isHidden) return null;

  const formattedCount = String(count).padStart(3, "0");

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`site-loader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background text-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isLoaded ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="text-xl font-mono font-medium tracking-tight">
          DAKSH SRIVASTAVA
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Full-Stack &amp; AI Systems Engineer
        </div>
      </div>

      <div aria-hidden="true" className="flex w-44 flex-col gap-3">
        <div className="h-0.5 w-full bg-foreground/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-foreground transition-all duration-75 ease-out rounded-full"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-xs text-muted-foreground">
          <span>Loading portfolio</span>
          <span className="tabular-nums font-semibold text-foreground">{formattedCount}</span>
        </div>
      </div>
    </div>
  );
}
