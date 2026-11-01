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
import { StackSection } from "@/components/StackSection";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { JoinCanvasModal, CursorUser } from "@/components/JoinCanvasModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CursorUser | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("figma_cursor_user");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      } else {
        // Prompt visitor to pick their cursor on arrival
        const timer = setTimeout(() => {
          setIsCanvasModalOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleJoinCanvas = (user: CursorUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("figma_cursor_user", JSON.stringify(user));
    } catch {}
    setIsCanvasModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      {/* Lenis Smooth Momentum Scrolling */}
      <SmoothScroll />

      {/* Figma Multiplayer Interactive Cursor */}
      <FigmaCursor
        currentUser={currentUser}
        onOpenCanvasModal={() => setIsCanvasModalOpen(true)}
      />

      {/* Signature Site Opener Counter */}
      <SiteLoader />

      {/* Atmospheric Aurora, Particle Nodes, and Glass Blur Masks */}
      <BackgroundEffects />

      {/* Floating Center Dock Navigation */}
      <FloatingHeader
        onOpenContact={() => setIsContactOpen(true)}
        currentUser={currentUser}
        onOpenCanvas={() => setIsCanvasModalOpen(true)}
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

        {/* Section 6: Tech Stack */}
        <StackSection />
      </main>

      {/* Section 7: Footer with Live Mumbai Clock */}
      <Footer />

      {/* Interactive Contact & Booking Dialog */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Multiplayer Canvas Cursor Customizer Dialog */}
      <JoinCanvasModal
        isOpen={isCanvasModalOpen}
        onClose={() => setIsCanvasModalOpen(false)}
        onJoin={handleJoinCanvas}
        currentUser={currentUser || undefined}
      />
    </div>
  );
}
