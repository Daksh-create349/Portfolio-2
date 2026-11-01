"use client";

import React, { useState, useEffect } from "react";
import { SiteLoader } from "@/components/SiteLoader";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { FloatingHeader } from "@/components/FloatingHeader";
import { PreviewRail } from "@/components/PreviewRail";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FigmaCursor } from "@/components/FigmaCursor";
import { HeroSection } from "@/components/HeroSection";
import { InitiativesCarousel } from "@/components/InitiativesCarousel";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { BentoWall } from "@/components/BentoWall";
import { AboutAndJourneySection } from "@/components/AboutAndJourneySection";
import { ResumeSection } from "@/components/ResumeSection";
import { StackSection } from "@/components/StackSection";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [cursorColor, setCursorColor] = useState("#0D99FF");

  useEffect(() => {
    try {
      const savedColor = localStorage.getItem("cursor_color");
      if (savedColor) {
        setCursorColor(savedColor);
      }
    } catch {}
  }, []);

  const handleSelectCursorColor = (color: string) => {
    setCursorColor(color);
    try {
      localStorage.setItem("cursor_color", color);
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      {/* Lenis Smooth Momentum Scrolling */}
      <SmoothScroll />

      {/* Single-User Smooth Figma Interactive Cursor */}
      <FigmaCursor color={cursorColor} />

      {/* Signature Site Opener Counter */}
      <SiteLoader />

      {/* Atmospheric Aurora, Particle Nodes, and Glass Blur Masks */}
      <BackgroundEffects />

      {/* Floating Center Dock Navigation with Minimal Cursor Color Selector */}
      <FloatingHeader
        onOpenContact={() => setIsContactOpen(true)}
        cursorColor={cursorColor}
        onSelectCursorColor={handleSelectCursorColor}
      />

      {/* Desktop Left Preview Rail */}
      <PreviewRail />

      {/* Main Content Sections */}
      <main className="relative isolate">
        {/* Section 1: Hero Section */}
        <HeroSection onHoldAbout={() => setIsContactOpen(true)} />

        {/* Section 2: Associated Organizations & Initiatives Carousel */}
        <InitiativesCarousel />

        {/* Section 3: Flagship Works & Deep Case Studies */}
        <ProjectShowcase />

        {/* Section 4: Popular GitHub Repositories & Open Source */}
        <BentoWall />

        {/* Section 5: Ask Me Anything, Bio & Academic Journey */}
        <AboutAndJourneySection />

        {/* Section 6: Interactive Curriculum Vitae & Official Vector Document */}
        <ResumeSection />

        {/* Section 7: Tech Stack */}
        <StackSection />
      </main>

      {/* Section 8: Footer with Live Mumbai Clock */}
      <Footer />

      {/* Interactive Contact & Booking Dialog */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
