
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMS } from "@/contexts/CMSContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const { content } = useCMS();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Calculate parallax effect
  const backgroundY = scrollY * 0.3;
  const contentY = scrollY * 0.1;

  // Don't render if no hero content is configured
  if (!content.heroTitle && !content.heroImage) {
    return null;
  }
  
  return (
    <section className="relative h-screen overflow-hidden bg-background">
      {/* Background image with parallax */}
      {content.heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${content.heroImage}')`,
            transform: `translateY(${backgroundY}px)`,
            backgroundPosition: `center ${50 + scrollY * 0.02}%`
          }}
        />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div
        className="relative h-full flex flex-col justify-center items-center text-center px-6"
        style={{ transform: `translateY(${contentY}px)` }}
      >
        <div className="max-w-4xl animate-fade-in-up">
          {/* Luxury subtitle */}
          {content.heroSubtitle && (
            <div className="luxury-subtitle text-white/80 mb-8">
              {content.heroSubtitle}
            </div>
          )}
          
          {/* Decorative line */}
          <div className="w-16 h-px bg-white/40 mx-auto mb-12" />
          
          {/* Main title */}
          {content.heroTitle && (
            <h1 className="font-display text-white mb-8 tracking-wider">
              {content.heroTitle}
            </h1>
          )}
          
          {/* Decorative line */}
          <div className="w-16 h-px bg-white/40 mx-auto mb-12" />
          
          {/* Description */}
          {content.heroDescription && (
            <p className="luxury-text text-white/90 mb-16 max-w-2xl mx-auto text-lg">
              {content.heroDescription}
            </p>
          )}
          
          {/* CTA Buttons - Only show if booking is enabled */}
          {content.bookingSettings?.enableBooking && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild className="minimal-button bg-white text-black hover:bg-white/90 min-w-[180px]">
                <Link to="/booking">{t.hero.bookStay}</Link>
              </Button>
              {content.navigation?.find(nav => nav.path === "/rooms" && nav.isActive) && ( // Updated path
                <Button asChild variant="outline" className="minimal-button border-white text-white hover:bg-white hover:text-black min-w-[180px]">
                  <Link to="/rooms">{t.hero.exploreApartments}</Link> {/* Updated path, text from t.hero.exploreApartments will be updated via localization files later */}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-float">
        <a 
          href="#welcome" 
          className="flex flex-col items-center transition-opacity hover:text-white"
        >
          <span className="luxury-subtitle mb-4">{t.hero.scrollDown}</span>
          <ChevronDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
