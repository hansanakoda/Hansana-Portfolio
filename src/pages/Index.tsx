import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EarlyEducationSection from "@/components/EarlyEducationSection";
import HigherEducationSection from "@/components/HigherEducationSection";
import CareerTimeline from "@/components/CareerTimeline";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatePresence mode="wait">
        {loading && <PageLoader key="loader" onComplete={handleComplete} />}
      </AnimatePresence>
      {!loading && (
        <>
          <BackgroundEffects />
          <div className="relative z-10">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <EarlyEducationSection />
            <HigherEducationSection />
            <section className="py-24 relative">
              <div className="container mx-auto px-4">
                <CareerTimeline />
              </div>
            </section>
            <EducationSection />
            <ExperienceSection />
            <SkillsSection />
            <ServicesSection />
            <ContactSection />
            <Footer />
            <ScrollToTop />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
