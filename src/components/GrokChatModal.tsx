"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ArrowUp, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface GrokChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STARTER_PROMPTS = [
  "What are Daksh's top projects?",
  "What is Sonaura 2.0?",
  "What is his technical stack?",
  "How can I contact or hire Daksh?",
];

const CLAUDE_THINKING_VERBS = [
  "Flummoxing…",
  "Discombobulating…",
  "Lollygagging…",
  "Prestidigitating…",
  "Razzle-dazzling…",
  "Whatchamacalliting…",
  "Hullaballooing…",
  "Tomfoolering…",
];

function ThinkingTypewriter() {
  const [verbs] = useState(() => {
    return [...CLAUDE_THINKING_VERBS].sort(() => Math.random() - 0.5);
  });
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = verbs[index % verbs.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        // Slow typeout: 85ms per character
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 85);
      } else {
        // Full word typed: pause so user can comfortably read it
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1100);
      }
    } else {
      if (displayedText.length > 0) {
        // Backspacing: 40ms per character
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        // Word cleared: cycle to next verb
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % verbs.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, index, verbs]);

  return (
    <span className="inline-flex items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-normal tracking-normal select-none">
      <span>{displayedText}</span>
      <span className="inline-block w-1.5 h-3.5 ml-1 bg-zinc-400 dark:bg-zinc-500 animate-pulse align-middle rounded-xs" />
    </span>
  );
}

// Helper to format clean text with bold, bullet points, and markdown links (zero emojis, zero blue)
function formatMarkdown(text: string) {
  const cleanText = text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );

  const lines = cleanText.split("\n");

  return lines.map((line, lineIdx) => {
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
    const content = isBullet ? line.trim().replace(/^[\*\-]\s+/, "") : line;

    // Parse [label](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+|mailto:[^\)]+)\)/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-900 dark:text-zinc-200 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors font-medium"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    // Process bold (**text**)
    const processedParts = parts.map((part, pIdx) => {
      if (typeof part !== "string") return part;
      const boldSegments = part.split(/(\*\*[^*]+\*\*)/g);
      return boldSegments.map((seg, sIdx) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return (
            <strong key={`bold-${pIdx}-${sIdx}`} className="text-zinc-900 dark:text-white font-semibold">
              {seg.slice(2, -2)}
            </strong>
          );
        }
        return seg;
      });
    });

    if (isBullet) {
      return (
        <li key={lineIdx} className="ml-5 list-disc text-zinc-700 dark:text-zinc-300 my-1 leading-relaxed">
          {processedParts}
        </li>
      );
    }

    if (line.trim() === "") {
      return <div key={lineIdx} className="h-2" />;
    }

    return (
      <p key={lineIdx} className="my-1.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {processedParts}
      </p>
    );
  });
}

export function GrokChatModal({ isOpen, onClose }: GrokChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingBlink, setThinkingBlink] = useState(1);
  const conversationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userScrolledUpRef = useRef(false);

  // Lock body scroll when modal is open so wheel/touch goes exclusively to modal
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Blink the mini bot while thinking
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setThinkingBlink(0.08);
      setTimeout(() => setThinkingBlink(1), 120);
    }, 1800);
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Track if user manually scrolled up to inspect previous responses
  const handleScroll = () => {
    if (!conversationRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = conversationRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 70;
    userScrolledUpRef.current = !isAtBottom;
  };

  // Auto-scroll to bottom on new content only if user hasn't scrolled up
  useEffect(() => {
    if (isOpen && conversationRef.current && !userScrolledUpRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages, isGenerating, isOpen]);

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || isGenerating) return;

    setInput("");
    userScrolledUpRef.current = false;
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `assistant-${Date.now()}`;

    const newMessages: Message[] = [
      ...messages,
      { id: userMsgId, role: "user", content: textToSend },
    ];

    setMessages(newMessages);
    setIsGenerating(true);
    setIsThinking(true);

    const minThinkingTime = 3200; // ~3.2s suspenseful delay so user experiences the Claude-style typewriter
    const startTime = Date.now();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat error (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let buffer = "";
      let streamEnded = false;

      // Start stream consumption in background while thinking delay ticks
      const streamPromise = (async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const dataStr = trimmed.slice(5).trim();
              if (dataStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.content) {
                  accumulatedText += parsed.content;
                }
              } catch {
                // Ignore partial JSON
              }
            }
          }
        } finally {
          streamEnded = true;
        }
      })();

      // Enforce the Claude-style thinking delay
      const elapsed = Date.now() - startTime;
      if (elapsed < minThinkingTime) {
        await new Promise((r) => setTimeout(r, minThinkingTime - elapsed));
      }

      // Finish thinking phase
      setIsThinking(false);

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: "assistant", content: "" },
      ]);

      // Smooth progressive streaming typewriter
      let revealedLength = 0;
      while (revealedLength < accumulatedText.length || !streamEnded) {
        if (revealedLength < accumulatedText.length) {
          const remaining = accumulatedText.length - revealedLength;
          const chunkSize = remaining > 120 ? 8 : remaining > 30 ? 4 : 2;
          revealedLength = Math.min(revealedLength + chunkSize, accumulatedText.length);
          const currentText = accumulatedText.slice(0, revealedLength);

          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId ? { ...m, content: currentText } : m
            )
          );
          await new Promise((r) => setTimeout(r, 16));
        } else {
          // Waiting for additional streaming chunks from network
          await new Promise((r) => setTimeout(r, 35));
        }
      }

      // Ensure final full text is set
      await streamPromise;
      if (accumulatedText) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId ? { ...m, content: accumulatedText } : m
          )
        );
      }
    } catch (err: unknown) {
      setIsThinking(false);
      console.warn("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Unable to connect to the assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsThinking(false);
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setIsThinking(false);
    setIsGenerating(false);
    userScrolledUpRef.current = false;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6"
    >
      {/* Dimmed Clean Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Clean, Normal Centered Window with Lenis Bypass */}
      <div
        data-lenis-prevent="true"
        className="relative z-10 flex flex-col min-h-0 w-full max-w-2xl h-[600px] max-h-[92vh] sm:h-[580px] sm:max-h-[88vh] rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#121214] shadow-2xl shadow-black/10 dark:shadow-black/70 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        
        {/* Minimal Clean Header: Only "Chat" */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/5 px-4 py-3 bg-white dark:bg-[#121214] shrink-0">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 tracking-wide">
            Chat
          </span>

          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                title="New chat"
                className="inline-flex size-7 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="inline-flex size-7 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Conversation Area with Native Scroll & Lenis Protection */}
        <div
          ref={conversationRef}
          onScroll={handleScroll}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent bg-white dark:bg-[#121214]"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
        >
          {/* Empty State */}
          {messages.length === 0 ? (
            <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-2">
                Hey, ready to dive in?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mb-8">
                Ask anything about Daksh&apos;s projects, technical stack, or background.
              </p>

              {/* Minimal Suggestion Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs text-zinc-700 bg-zinc-50 border border-zinc-200/90 hover:bg-zinc-100 hover:border-zinc-300 dark:text-zinc-300 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] dark:hover:border-white/10 rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`text-sm leading-relaxed ${
                        isUser
                          ? "bg-zinc-100 text-zinc-900 border border-zinc-200/80 dark:border-transparent dark:bg-[#27272a] dark:text-white rounded-2xl px-4 py-2.5 max-w-[85%]"
                          : "text-zinc-800 dark:text-zinc-200 max-w-[95%] py-1"
                      }`}
                    >
                      {formatMarkdown(msg.content)}
                    </div>
                  </div>
                );
              })}

              {/* Claude-style dynamic thinking status with Titanium Bot (No Pill) */}
              {isThinking && (
                <div className="flex items-center gap-2.5 py-2 px-1 animate-in fade-in duration-200">
                  <div className="relative size-6 shrink-0 opacity-85">
                    <svg
                      viewBox="-125 -125 250 250"
                      aria-hidden="true"
                      className="size-full"
                    >
                      <mask
                        id="thinking-bot-mask"
                        maskUnits="userSpaceOnUse"
                        x="-125"
                        y="-125"
                        width="250"
                        height="250"
                      >
                        <path
                          d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                          fill="#ffffff"
                        />
                        <g
                          style={{
                            transform: `scale(1, ${thinkingBlink})`,
                            transformOrigin: "0px -5px",
                            transition: "transform 0.08s ease-out",
                          }}
                        >
                          <path
                            d="M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z"
                            transform="matrix(0.98,-0.1,0.09,0.99,-17.3,-9.14)"
                            fill="#000000"
                          />
                          <path
                            d="M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z"
                            transform="matrix(0.92,-0.04,0.09,0.99,37.32,-13.26)"
                            fill="#000000"
                          />
                        </g>
                      </mask>
                      <radialGradient
                        id="thinking-bot-fill"
                        gradientUnits="userSpaceOnUse"
                        cx="-40"
                        cy="-50"
                        r="193.75"
                      >
                        <stop offset="0%" stopColor="#f4f4f5" />
                        <stop offset="35%" stopColor="#d4d4d8" />
                        <stop offset="70%" stopColor="#71717a" />
                        <stop offset="100%" stopColor="#27272a" />
                      </radialGradient>
                      <path
                        d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                        fill="#09090b"
                      />
                      <g mask="url(#thinking-bot-mask)">
                        <rect
                          x="-125"
                          y="-125"
                          width="250"
                          height="250"
                          fill="url(#thinking-bot-fill)"
                        />
                      </g>
                    </svg>
                  </div>

                  {/* Normal Claude-style slow typewriter text (No Pill) */}
                  <ThinkingTypewriter />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clean, Rounded Input Bar (Zero Blue, Full Light & Dark Support) */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#121214] shrink-0 border-t border-zinc-200/80 dark:border-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/90 dark:border-white/10 dark:bg-[#212124] px-4 py-1.5 focus-within:border-zinc-400 dark:focus-within:border-white/20 transition-all shadow-sm dark:shadow-md"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Daksh..."
              disabled={isGenerating}
              className="flex-1 bg-transparent text-base sm:text-sm text-zinc-900 placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              aria-label="Send message"
              className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-zinc-900 dark:disabled:hover:bg-white transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowUp className="size-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
