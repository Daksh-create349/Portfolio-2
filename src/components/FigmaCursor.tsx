"use client";

import React, { useEffect, useRef, useState } from "react";
import { CursorUser, CURSOR_COLORS } from "./JoinCanvasModal";

interface PeerCursor {
  id: string;
  name: string;
  color: string;
  x: number; // percentage 0 - 100
  y: number; // document scroll Y + clientY
  action: string;
  currentX?: number;
  currentY?: number;
  targetX?: number;
  targetY?: number;
  lastSeen?: number;
}

interface FigmaCursorProps {
  currentUser?: CursorUser | null;
  onOpenCanvasModal?: () => void;
}

export function FigmaCursor({ currentUser, onOpenCanvasModal }: FigmaCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [actionLabel, setActionLabel] = useState(currentUser?.name || "Daksh");
  const [peers, setPeers] = useState<PeerCursor[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const peersRef = useRef<Map<string, PeerCursor>>(new Map());
  const peerDomsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const lastBroadcastRef = useRef<number>(0);

  const localUserColor = currentUser?.color || "#0D99FF";
  const localUserName = currentUser?.name || "Daksh";

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const channel = typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel("figma_multiplayer_canvas")
      : null;

    // Listen to local BroadcastChannel from other tabs/windows
    if (channel) {
      channel.onmessage = (event) => {
        const { type, peer } = event.data || {};
        if (type === "cursor_move" && peer && peer.id !== currentUser?.id) {
          const existing = peersRef.current.get(peer.id) || peer;
          existing.targetX = peer.x;
          existing.targetY = peer.y;
          existing.name = peer.name;
          existing.color = peer.color;
          existing.action = peer.action;
          existing.lastSeen = Date.now();
          peersRef.current.set(peer.id, existing);
          setPeers(Array.from(peersRef.current.values()));
        } else if (type === "cursor_leave" && peer?.id) {
          peersRef.current.delete(peer.id);
          setPeers(Array.from(peersRef.current.values()));
        }
      };
    }

    // Periodic sync with server API
    const syncInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/cursors");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.peers)) {
            const now = Date.now();
            data.peers.forEach((p: PeerCursor) => {
              if (p.id !== currentUser?.id) {
                const existing = peersRef.current.get(p.id) || p;
                existing.targetX = p.x;
                existing.targetY = p.y;
                existing.name = p.name;
                existing.color = p.color;
                existing.action = p.action;
                existing.lastSeen = now;
                peersRef.current.set(p.id, existing);
              }
            });
            setPeers(Array.from(peersRef.current.values()));
          }
        }
      } catch {}
    }, 2800);

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      let activeAction = localUserName;

      if (target) {
        const interactive = target.closest("a, button, [role='button'], input, textarea, select");
        if (interactive) {
          setIsHoveringClickable(true);
          if (target.closest("input, textarea")) {
            activeAction = "Type";
          } else if (target.closest("a")) {
            activeAction = "Open";
          } else {
            activeAction = "Click";
          }
        } else {
          setIsHoveringClickable(false);
          activeAction = localUserName;
        }
      }

      setActionLabel(activeAction);

      // Throttled Broadcast (every 45ms)
      const now = performance.now();
      if (now - lastBroadcastRef.current > 45 && currentUser) {
        lastBroadcastRef.current = now;
        const normalizedX = (e.clientX / window.innerWidth) * 100;
        const absoluteY = window.scrollY + e.clientY;

        const peerPayload = {
          id: currentUser.id,
          name: currentUser.name,
          color: currentUser.color,
          x: normalizedX,
          y: absoluteY,
          action: activeAction,
        };

        // Broadcast to tabs
        if (channel) {
          channel.postMessage({ type: "cursor_move", peer: peerPayload });
        }

        // Send to API
        fetch("/api/cursors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(peerPayload),
        }).catch(() => {});
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      if (channel && currentUser) {
        channel.postMessage({ type: "cursor_leave", peer: { id: currentUser.id } });
      }
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth RAF loop: local cursor + remote peers
    let animId: number;
    const updateLoop = () => {
      // 1. Local cursor lerp
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.35;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      // 2. Remote peer cursors lerp
      const currentScrollY = window.scrollY;
      const currentInnerWidth = window.innerWidth;

      peersRef.current.forEach((peer, peerId) => {
        const dom = peerDomsRef.current.get(peerId);
        if (!dom) return;

        const targetClientX = ((peer.targetX ?? peer.x) / 100) * currentInnerWidth;
        const targetClientY = (peer.targetY ?? peer.y) - currentScrollY;

        peer.currentX = peer.currentX ?? targetClientX;
        peer.currentY = peer.currentY ?? targetClientY;

        peer.currentX += (targetClientX - peer.currentX) * 0.22;
        peer.currentY += (targetClientY - peer.currentY) * 0.22;

        dom.style.transform = `translate3d(${peer.currentX}px, ${peer.currentY}px, 0)`;
      });

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (channel) {
        channel.close();
      }
      cancelAnimationFrame(animId);
    };
  }, [isVisible, currentUser, localUserName]);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Primary Local User Cursor */}
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
            isMouseDown ? "scale-95" : isHoveringClickable ? "scale-110" : "scale-100"
          }`}
        >
          {/* Iconic Figma Cursor Arrow */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
          >
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={localUserColor}
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          {/* Figma User Name Tag */}
          <div
            className="ml-1.5 -mt-0.5 flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-tight text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] border border-white/35 whitespace-nowrap transition-colors"
            style={{ backgroundColor: localUserColor }}
          >
            <span className="font-mono text-[11px] font-medium leading-none">
              {actionLabel}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Real-Time Remote Peer Cursors (Display-Only: Zero clicks or DOM interference) */}
      {peers.map((peer) => (
        <div
          key={peer.id}
          ref={(el) => {
            if (el) {
              peerDomsRef.current.set(peer.id, el);
            } else {
              peerDomsRef.current.delete(peer.id);
            }
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[99998] select-none transition-opacity duration-300"
          style={{
            willChange: "transform",
          }}
        >
          <div className="relative flex items-start">
            {/* Remote Pointer SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={peer.color || "#A259FF"}
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>

            {/* Remote Name Badge */}
            <div
              className="ml-1 -mt-0.5 flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-tight text-white shadow-md border border-white/35 whitespace-nowrap"
              style={{ backgroundColor: peer.color || "#A259FF" }}
            >
              <span className="font-mono text-[10px] font-medium leading-none">
                {peer.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
