"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { HeroSection } from "@/components/sections/hero-section";
import { BeginningsSection } from "@/components/sections/beginnings-section";
import { EngineeringSection } from "@/components/sections/engineering-section";
import { BuildingSection } from "@/components/sections/building-section";
import { FutureSection } from "@/components/sections/future-section";
import { Footer } from "@/components/footer";
import { TrainTimeline } from "@/components/train-timeline";
import { VintageRadio } from "@/components/vintage-radio";
import { TicketNavigation } from "@/components/ticket-navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Console Easter Egg for Developers
    console.log(
      "%c🚂 Built with ♥, Code, and Litti-Chokha from Bihar.\n%cJourney continues at: https://github.com/itzanki",
      "color: #D4AF37; font-size: 14px; font-weight: bold; font-family: monospace;",
      "color: #888; font-size: 12px; font-family: monospace;"
    );

    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <main className="relative">
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ticket-based navigation */}
            <TicketNavigation />

            <HeroSection />

            {/* Station 1: Beginnings */}
            <BeginningsSection />

            {/* Station 2: Engineering */}
            <EngineeringSection />

            {/* Station 3: Building */}
            <BuildingSection />

            {/* Station 4: Future */}
            <FutureSection />

            {/* Footer */}
            <Footer />

            {/* Train timeline - fixed at bottom */}
            <TrainTimeline />

            {/* Vintage Radio - floating widget */}
            <VintageRadio />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
