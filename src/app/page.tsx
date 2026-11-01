"use client";

import React, { useState } from "react";
import { SiteLoader } from "@/components/SiteLoader";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { FloatingHeader } from "@/components/FloatingHeader";
import { PreviewRail } from "@/components/PreviewRail";
import { HeroSection } from "@/components/HeroSection";
import { InitiativesCarousel } from "@/components/InitiativesCarousel";
import { BentoWall } from "@/components/BentoWall";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ExperimentsSection } from "@/components/ExperimentsSection";
import { AboutAndJourneySection } from "@/components/AboutAndJourneySection";
import { StackSection } from "@/components/StackSection";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      {/* Signature Site Opener Counter */}
      <SiteLoader />

      {/* Atmospheric Aurora, Particle Nodes, and Glass Blur Masks */}
      <BackgroundEffects />

      {/* Floating Center Dock Navigation */}
      <FloatingHeader onOpenContact={() => setIsContactOpen(true)} />

      {/* Desktop Left Preview Rail */}
      <PreviewRail />

      {/* Main Content Sections */}
      <main className="relative isolate">
        {/* Section 1: Hero Section */}
        <HeroSection onHoldAbout={() => setIsContactOpen(true)} />

        {/* Section 2: Associated Organizations & Initiatives Carousel */}
        <InitiativesCarousel />

        {/* Section 3: Selected Work Bento Gallery Wall */}
        <BentoWall />

        {/* Section 4: Flagship Works & Deep Case Studies */}
        <ProjectShowcase />

        {/* Section 5: AI Experiments & Interactive Labs */}
        <ExperimentsSection />

        {/* Section 6: Ask Me Anything, Bio & Academic Journey */}
        <AboutAndJourneySection />

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
