"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export type GrokFace =
  | "Attentive"
  | "Surprised"
  | "Excited"
  | "Happy"
  | "Laughing"
  | "Angry"
  | "Sad"
  | "Scared"
  | "Suspicious"
  | "Confused"
  | "Curious"
  | "Proud"
  | "Shy"
  | "Unimpressed"
  | "Sleepy"
  | "Neutral";

const GROK_FACES: Record<
  GrokFace,
  {
    leftEye: { d: string; transform: string };
    rightEye: { d: string; transform: string };
  }
> = {
  Attentive: {
    leftEye: {
      d: "M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z",
      transform: "matrix(0.98,-0.1,0.09,0.99,-17.3,-9.14)",
    },
    rightEye: {
      d: "M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z",
      transform: "matrix(0.92,-0.04,0.09,0.99,37.32,-13.26)",
    },
  },
  Surprised: {
    leftEye: {
      d: "M-22.5 -1A22.5 22.5 0 0 1 0 -23.5L0 -23.5A22.5 22.5 0 0 1 22.5 -1L22.5 1A22.5 22.5 0 0 1 0 23.5L0 23.5A22.5 22.5 0 0 1 -22.5 1Z",
      transform: "matrix(0.97,0,0,1,-24.16,2.34)",
    },
    rightEye: {
      d: "M-22.5 -1A22.5 22.5 0 0 1 0 -23.5L0 -23.5A22.5 22.5 0 0 1 22.5 -1L22.5 1A22.5 22.5 0 0 1 0 23.5L0 23.5A22.5 22.5 0 0 1 -22.5 1Z",
      transform: "matrix(0.91,-0.01,0,1,40.71,1.98)",
    },
  },
  Excited: {
    leftEye: {
      d: "M-20 -8A20 20 0 0 1 0 -28L0 -28A20 20 0 0 1 20 -8L20 8A20 20 0 0 1 0 28L0 28A20 20 0 0 1 -20 8Z",
      transform: "matrix(0.97,-0.11,0.15,0.97,-20.2,20.28)",
    },
    rightEye: {
      d: "M-20 -8A20 20 0 0 1 0 -28L0 -28A20 20 0 0 1 20 -8L20 8A20 20 0 0 1 0 28L0 28A20 20 0 0 1 -20 8Z",
      transform: "matrix(0.87,0.1,-0.18,0.98,45.93,19.92)",
    },
  },
  Happy: {
    leftEye: {
      d: "M-13.5 0A8.5 8.5 0 0 1 -5 -8.5L5 -8.5A8.5 8.5 0 0 1 13.5 0L13.5 0A8.5 8.5 0 0 1 5 8.5L-5 8.5A8.5 8.5 0 0 1 -13.5 0Z",
      transform: "matrix(0.96,0.18,-0.21,0.97,-17.54,-17.58)",
    },
    rightEye: {
      d: "M-13.5 0A8.5 8.5 0 0 1 -5 -8.5L5 -8.5A8.5 8.5 0 0 1 13.5 0L13.5 0A8.5 8.5 0 0 1 5 8.5L-5 8.5A8.5 8.5 0 0 1 -13.5 0Z",
      transform: "matrix(0.88,-0.19,0.25,0.96,40.5,-17.9)",
    },
  },
  Laughing: {
    leftEye: {
      d: "M-17 0A6.5 6.5 0 0 1 -10.5 -6.5L10.5 -6.5A6.5 6.5 0 0 1 17 0L17 0A6.5 6.5 0 0 1 10.5 6.5L-10.5 6.5A6.5 6.5 0 0 1 -17 0Z",
      transform: "matrix(0.93,0.24,-0.3,0.93,-21.13,-25.55)",
    },
    rightEye: {
      d: "M-17 0A6.5 6.5 0 0 1 -10.5 -6.5L10.5 -6.5A6.5 6.5 0 0 1 17 0L17 0A6.5 6.5 0 0 1 10.5 6.5L-10.5 6.5A6.5 6.5 0 0 1 -17 0Z",
      transform: "matrix(0.85,-0.25,0.34,0.93,40.33,-25.88)",
    },
  },
  Angry: {
    leftEye: {
      d: "M-17 0A7.5 7.5 0 0 1 -9.5 -7.5L9.5 -7.5A7.5 7.5 0 0 1 17 0L17 0A7.5 7.5 0 0 1 9.5 7.5L-9.5 7.5A7.5 7.5 0 0 1 -17 0Z",
      transform: "matrix(0.86,0.45,-0.47,0.88,-20.85,-14.29)",
    },
    rightEye: {
      d: "M-17 0A7.5 7.5 0 0 1 -9.5 -7.5L9.5 -7.5A7.5 7.5 0 0 1 17 0L17 0A7.5 7.5 0 0 1 9.5 7.5L-9.5 7.5A7.5 7.5 0 0 1 -17 0Z",
      transform: "matrix(0.79,-0.46,0.48,0.88,37.4,-14.61)",
    },
  },
  Sad: {
    leftEye: {
      d: "M-11 -9A11 11 0 0 1 0 -20L0 -20A11 11 0 0 1 11 -9L11 9A11 11 0 0 1 0 20L0 20A11 11 0 0 1 -11 9Z",
      transform: "matrix(0.87,-0.42,0.45,0.89,-19.21,19)",
    },
    rightEye: {
      d: "M-11 -9A11 11 0 0 1 0 -20L0 -20A11 11 0 0 1 11 -9L11 9A11 11 0 0 1 0 20L0 20A11 11 0 0 1 -11 9Z",
      transform: "matrix(0.82,0.41,-0.45,0.89,35.72,18.7)",
    },
  },
  Scared: {
    leftEye: {
      d: "M-20 -10A20 20 0 0 1 0 -30L0 -30A20 20 0 0 1 20 -10L20 10A20 20 0 0 1 0 30L0 30A20 20 0 0 1 -20 10Z",
      transform: "matrix(0.96,0.1,-0.02,0.95,-28.69,29.62)",
    },
    rightEye: {
      d: "M-20 -10A20 20 0 0 1 0 -30L0 -30A20 20 0 0 1 20 -10L20 10A20 20 0 0 1 0 30L0 30A20 20 0 0 1 -20 10Z",
      transform: "matrix(0.91,-0.11,-0.02,0.95,41.19,29.26)",
    },
  },
  Suspicious: {
    leftEye: {
      d: "M-10.5 -9.5A10.5 10.5 0 0 1 0 -20L0 -20A10.5 10.5 0 0 1 10.5 -9.5L10.5 9.5A10.5 10.5 0 0 1 0 20L0 20A10.5 10.5 0 0 1 -10.5 9.5Z",
      transform: "matrix(0.99,-0.14,0.14,0.98,-3.41,-9.86)",
    },
    rightEye: {
      d: "M-11 0A7.5 7.5 0 0 1 -3.5 -7.5L3.5 -7.5A7.5 7.5 0 0 1 11 0L11 0A7.5 7.5 0 0 1 3.5 7.5L-3.5 7.5A7.5 7.5 0 0 1 -11 0Z",
      transform: "matrix(0.86,-0.07,0.14,0.98,49.56,-15.87)",
    },
  },
  Confused: {
    leftEye: {
      d: "M-10 -12A10 10 0 0 1 0 -22L0 -22A10 10 0 0 1 10 -12L10 12A10 10 0 0 1 0 22L0 22A10 10 0 0 1 -10 12Z",
      transform: "matrix(0.87,-0.21,0.13,0.97,-47.29,-11.63)",
    },
    rightEye: {
      d: "M-14 0A8.5 8.5 0 0 1 -5.5 -8.5L5.5 -8.5A8.5 8.5 0 0 1 14 0L14 0A8.5 8.5 0 0 1 5.5 8.5L-5.5 8.5A8.5 8.5 0 0 1 -14 0Z",
      transform: "matrix(0.92,0.39,-0.38,0.92,7.63,-4.06)",
    },
  },
  Curious: {
    leftEye: {
      d: "M-12 -11A12 12 0 0 1 0 -23L0 -23A12 12 0 0 1 12 -11L12 11A12 12 0 0 1 0 23L0 23A12 12 0 0 1 -12 11Z",
      transform: "matrix(0.94,-0.35,0.35,0.92,3.09,19.64)",
    },
    rightEye: {
      d: "M-10 -9A10 10 0 0 1 0 -19L0 -19A10 10 0 0 1 10 -9L10 9A10 10 0 0 1 0 19L0 19A10 10 0 0 1 -10 9Z",
      transform: "matrix(0.76,-0.42,0.32,0.91,55.78,4.75)",
    },
  },
  Proud: {
    leftEye: {
      d: "M-15 0A7.5 7.5 0 0 1 -7.5 -7.5L7.5 -7.5A7.5 7.5 0 0 1 15 0L15 0A7.5 7.5 0 0 1 7.5 7.5L-7.5 7.5A7.5 7.5 0 0 1 -15 0Z",
      transform: "matrix(0.95,0.2,-0.26,0.93,-17.95,-30.48)",
    },
    rightEye: {
      d: "M-15 0A7.5 7.5 0 0 1 -7.5 -7.5L7.5 -7.5A7.5 7.5 0 0 1 15 0L15 0A7.5 7.5 0 0 1 7.5 7.5L-7.5 7.5A7.5 7.5 0 0 1 -15 0Z",
      transform: "matrix(0.86,-0.21,0.33,0.93,40.08,-30.79)",
    },
  },
  Shy: {
    leftEye: {
      d: "M-8.5 -6.5A8.5 8.5 0 0 1 0 -15L0 -15A8.5 8.5 0 0 1 8.5 -6.5L8.5 6.5A8.5 8.5 0 0 1 0 15L0 15A8.5 8.5 0 0 1 -8.5 6.5Z",
      transform: "matrix(0.84,-0.07,0.18,0.97,-50.45,23.7)",
    },
    rightEye: {
      d: "M-8.5 -6.5A8.5 8.5 0 0 1 0 -15L0 -15A8.5 8.5 0 0 1 8.5 -6.5L8.5 6.5A8.5 8.5 0 0 1 0 15L0 15A8.5 8.5 0 0 1 -8.5 6.5Z",
      transform: "matrix(0.98,-0.17,0.18,0.97,-4.94,17.67)",
    },
  },
  Unimpressed: {
    leftEye: {
      d: "M-15 0A6 6 0 0 1 -9 -6L9 -6A6 6 0 0 1 15 0L15 0A6 6 0 0 1 9 6L-9 6A6 6 0 0 1 -15 0Z",
      transform: "matrix(0.81,-0.02,-0.02,1,-58.66,-6.04)",
    },
    rightEye: {
      d: "M-15 0A6 6 0 0 1 -9 -6L9 -6A6 6 0 0 1 15 0L15 0A6 6 0 0 1 9 6L-9 6A6 6 0 0 1 -15 0Z",
      transform: "matrix(1,0.01,-0.02,1,-6.87,-6.34)",
    },
  },
  Sleepy: {
    leftEye: {
      d: "M-10 -11A10 10 0 0 1 0 -21L0 -21A10 10 0 0 1 10 -11L10 11A10 10 0 0 1 0 21L0 21A10 10 0 0 1 -10 11Z",
      transform: "matrix(0.99,-0.01,0.04,0.45,-13.97,13.81)",
    },
    rightEye: {
      d: "M-10 -11A10 10 0 0 1 0 -21L0 -21A10 10 0 0 1 10 -11L10 11A10 10 0 0 1 0 21L0 21A10 10 0 0 1 -10 11Z",
      transform: "matrix(0.91,-0.04,0.04,0.45,40.59,10.65)",
    },
  },
  Neutral: {
    leftEye: {
      d: "M-9.3 -11.3A9.3 9.3 0 0 1 0 -20.6L0 -20.6A9.3 9.3 0 0 1 9.3 -11.3L9.3 11.3A9.3 9.3 0 0 1 0 20.6L0 20.6A9.3 9.3 0 0 1 -9.3 11.3Z",
      transform: "matrix(0.87,-0.33,0.45,0.84,21.42,-43.32)",
    },
    rightEye: {
      d: "M-9.3 -11.3A9.3 9.3 0 0 1 0 -20.6L0 -20.6A9.3 9.3 0 0 1 9.3 -11.3L9.3 11.3A9.3 9.3 0 0 1 0 20.6L0 20.6A9.3 9.3 0 0 1 -9.3 11.3Z",
      transform: "matrix(0.64,-0.06,0.45,0.84,62.98,-53.9)",
    },
  },
};

const INTERACTIVE_REACTIONS: GrokFace[] = [
  "Attentive",
  "Excited",
  "Happy",
  "Laughing",
  "Surprised",
  "Curious",
  "Proud",
  "Suspicious",
  "Confused",
  "Shy",
];

export function GrokCompanion() {
  const [mounted, setMounted] = useState(false);
  const [currentFace, setCurrentFace] = useState<GrokFace>("Attentive");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rx: 0, ry: 0 });
  const [blink, setBlink] = useState(1);
  const [isSquishing, setIsSquishing] = useState(false);
  const botRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const faceResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Temporary expression switch with auto-return to Attentive
  const triggerReactionFace = useCallback((face: GrokFace, durationMs = 2800) => {
    if (faceResetTimerRef.current) clearTimeout(faceResetTimerRef.current);
    setCurrentFace(face);

    if (face !== "Attentive") {
      faceResetTimerRef.current = setTimeout(() => {
        setCurrentFace("Attentive");
      }, durationMs);
    }
  }, []);

  // Mouse tracking for eyes and 3D head tilt + velocity reaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - botCenterX;
      const deltaY = e.clientY - botCenterY;
      const dist = Math.hypot(deltaX, deltaY);

      // Eye gaze tracking displacement
      const maxEyeDist = 10;
      const eyeFactor = Math.min(dist / 400, 1);
      const angle = Math.atan2(deltaY, deltaX);

      const ex = Math.cos(angle) * maxEyeDist * eyeFactor;
      const ey = Math.sin(angle) * (maxEyeDist * 0.75) * eyeFactor;

      setEyeOffset({ x: ex, y: ey });

      // 3D Perspective Tilt
      const maxTilt = 15;
      const rx = Math.max(-maxTilt, Math.min(maxTilt, -(deltaY / window.innerHeight) * maxTilt));
      const ry = Math.max(-maxTilt, Math.min(maxTilt, (deltaX / window.innerWidth) * maxTilt));
      setHeadTilt({ rx, ry });

      // Velocity calculation (fast flick = surprised reaction)
      const now = performance.now();
      const dt = now - lastMousePos.current.time;
      if (dt > 16) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const speed = Math.hypot(dx, dy) / dt;

        if (speed > 4.5 && currentFace === "Attentive") {
          triggerReactionFace("Surprised", 1600);
        }

        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
      }

      // Wake up from sleepy if was idle
      if (currentFace === "Sleepy" || currentFace === "Unimpressed") {
        setCurrentFace("Attentive");
      }

      // Reset idle timer (14s without cursor movement -> Sleepy)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setCurrentFace("Sleepy");
      }, 14000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [currentFace, triggerReactionFace]);

  // Natural periodic blinking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      setBlink(0.08);
      setTimeout(() => {
        setBlink(1);
        const nextDelay = Math.random() * 4000 + 2600;
        timeoutId = setTimeout(triggerBlink, nextDelay);
      }, 120);
    };

    timeoutId = setTimeout(triggerBlink, 3200);
    return () => clearTimeout(timeoutId);
  }, []);

  // Click interaction: squish and cycle to a new reaction face
  const handleClick = () => {
    setIsSquishing(true);
    setBlink(0.08);

    setTimeout(() => {
      setBlink(1);
      setIsSquishing(false);
    }, 180);

    // Pick a new reaction face different from current
    const available = INTERACTIVE_REACTIONS.filter((f) => f !== currentFace);
    const nextFace = available[Math.floor(Math.random() * available.length)];
    triggerReactionFace(nextFace, 3400);
  };

  // Hover reaction: happy glance
  const handleMouseEnter = () => {
    if (currentFace === "Attentive" || currentFace === "Sleepy") {
      triggerReactionFace("Happy", 2200);
    }
  };

  if (!mounted) return null;

  const activeFaceData = GROK_FACES[currentFace] || GROK_FACES.Attentive;

  return (
    <aside
      aria-label="Interactive Grok Bot"
      className="fixed bottom-6 right-6 z-40 select-none pointer-events-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Grok Bot Container — No speech bubbles or text messages */}
        <div
          ref={botRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          title={`Grok Bot (${currentFace}) — click to trigger reactions`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
          style={{
            transform: `perspective(600px) rotateX(${headTilt.rx}deg) rotateY(${headTilt.ry}deg) scale(${
              isSquishing ? 0.88 : 1
            })`,
            transition: isSquishing
              ? "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              : "transform 0.08s ease-out",
          }}
          className="pointer-events-auto relative flex size-16 sm:size-20 items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 drop-shadow-[0_12px_24px_rgba(59,147,240,0.3)]"
        >
          {/* Subtle ambient cyan glow halo */}
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
              {/* Mask with Squircle Body + Authentic Cut-out Reaction Eyes */}
              <mask
                id="grok-studio-mask"
                maskUnits="userSpaceOnUse"
                x="-125"
                y="-125"
                width="250"
                height="250"
              >
                {/* Official Studio Head Squircle Shape (White = visible) */}
                <path
                  d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                  fill="#ffffff"
                />

                {/* Reaction Eyes Container (Black = transparent holes in mask) with Cursor Gaze Offset & Blinking */}
                <g
                  style={{
                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px) scale(1, ${blink})`,
                    transformOrigin: "0px -5px",
                    transition: "transform 0.08s ease-out",
                  }}
                >
                  {/* Left Reaction Eye */}
                  <path
                    d={activeFaceData.leftEye.d}
                    transform={activeFaceData.leftEye.transform}
                    opacity="1"
                    fill="#000000"
                  />
                  {/* Right Reaction Eye */}
                  <path
                    d={activeFaceData.rightEye.d}
                    transform={activeFaceData.rightEye.transform}
                    opacity="1"
                    fill="#000000"
                  />
                </g>
              </mask>

              {/* Authentic Studio Metallic Cyan-Blue Radial Gradient */}
              <radialGradient
                id="grok-studio-fill"
                gradientUnits="userSpaceOnUse"
                cx="-40"
                cy="-50"
                r="193.75"
              >
                <stop offset="0%" stopColor="#b5d6f9" />
                <stop offset="32%" stopColor="#62a9f3" />
                <stop offset="72%" stopColor="#3b93f0" />
                <stop offset="100%" stopColor="#275c95" />
              </radialGradient>
            </defs>

            {/* Deep Obsidian Socket Underlayer for Eyes */}
            <path
              d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
              fill="#080b11"
            />

            {/* Masked Grok Metallic Body with Cut-out Reaction Eyes */}
            <g mask="url(#grok-studio-mask)">
              <rect
                x="-125"
                y="-125"
                width="250"
                height="250"
                fill="url(#grok-studio-fill)"
              />
            </g>
          </svg>
        </div>
      </div>
    </aside>
  );
}
