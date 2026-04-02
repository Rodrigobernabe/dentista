"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dental/Header";
import { HeroSection } from "@/components/dental/HeroSection";
import { TreatmentsSection } from "@/components/dental/TreatmentsSection";
import { AboutSection } from "@/components/dental/AboutSection";
import { TechnologySection } from "@/components/dental/TechnologySection";
import { BeforeAfterShowcase } from "@/components/dental/BeforeAfterSlider";
import { TestimonialsSection } from "@/components/dental/TestimonialsSection";
import { Footer } from "@/components/dental/Footer";
import { CustomCursor } from "@/components/dental/CustomCursor";
import { SectionWipe } from "@/components/dental/SectionWipe";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] bg-[#1A3326] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Logo */}
              <div className="mb-8">
                <p className="font-serif text-xl text-[#D9C7AA] tracking-[0.3em]">
                  VILLA MERCEDES
                </p>
                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mt-1">
                  Clínica Dental
                </p>
              </div>

              {/* Loading bar */}
              <div className="loading-bar">
                <motion.div
                  className="loading-bar-fill"
                  style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content */}
      <main className="min-h-screen flex flex-col bg-[#FBF9F6]">
        <Header />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Animación #9: Wipe entre Hero y Tratamientos */}
        <SectionWipe color="#FBF9F6" direction="bottom" />

        {/* Treatments Section - Horizontal Scroll */}
        <TreatmentsSection />

        {/* About Section with Parallax */}
        <AboutSection />

        {/* Before/After Showcase */}
        <BeforeAfterShowcase />

        {/* Technology Section - Sticky Museum */}
        <TechnologySection />

        {/* Testimonials - Fog Effect */}
        <TestimonialsSection />

        {/* Footer */}
        <Footer />
      </main>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />
    </>
  );
}

// Scroll Progress Component
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}
