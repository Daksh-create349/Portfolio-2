"use client";

import React, { useState, useRef, useEffect } from "react";
import { getDakshAnswer } from "@/data/askDakshKnowledge";
import { Send, Bot, User, Sparkles, CornerDownLeft, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  followUps?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "What makes Sonaura 2.0 unique?",
  "Explain AQUILA's flood prediction pipeline",
  "What is your GPA and university standing?",
  "What awards have you won?",
  "How can I contact or hire Daksh?",
];

export function AskDakshSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      sender: "bot",
      text: "Hi! I'm Daksh's interactive portfolio assistant. Ask me anything about his projects (**Sonaura 2.0**, **AQUILA**, **GitHub Guardian**, **HyperMind**), academic record (**CGPA 9.57** at ITM Skills University), hackathon wins, or engineering stack!",
      followUps: DEFAULT_SUGGESTIONS.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (queryToSend?: string) => {
    const text = (queryToSend || input).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate smart thinking and typing
    setTimeout(() => {
      const { response, followUps } = getDakshAnswer(text);
      const botMessage: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: response,
        followUps,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "intro-reset",
        sender: "bot",
        text: "Chat cleared! Ask me anything about Daksh's projects, coursework, or awards.",
        followUps: DEFAULT_SUGGESTIONS.slice(0, 3),
      },
    ]);
  };

  return (
    <div className="w-full">
      <div className="rounded-[24px] border border-foreground/[0.08] bg-secondary/30 p-4 sm:p-6 backdrop-blur-sm shadow-sm flex flex-col gap-4">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Bot className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold tracking-tight">Daksh AI Agent</h3>
              <p className="text-[11px] font-mono text-muted-foreground">
                Trained on portfolio architecture &amp; background
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetChat}
            title="Reset conversation"
            className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-secondary cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex flex-col gap-4 min-h-[280px] max-h-[460px] overflow-y-auto pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[78%] rounded-[18px] p-4 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-foreground text-background font-medium"
                    : "bg-background border border-border/80 text-foreground shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>

              {/* Follow-up Suggestions from Bot */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 max-w-[88%] sm:max-w-[78%]">
                  {msg.followUps.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleSend(chip)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono px-3 py-1 rounded-full border border-border/60 bg-background/80 hover:bg-secondary hover:text-foreground text-muted-foreground transition-all cursor-pointer"
                    >
                      <Sparkles className="size-2.5 text-blue-500" />
                      <span>{chip}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pl-2 py-1">
              <span className="size-2 rounded-full bg-blue-500 animate-ping" />
              <span>Daksh AI is synthesizing response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2 border-t border-border/40 pt-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Sonaura, AQUILA, GPA, awards, or internship availability..."
            className="w-full rounded-full border border-border/80 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send query"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <CornerDownLeft className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
