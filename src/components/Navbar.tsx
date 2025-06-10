
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMS } from "@/contexts/CMSContext";

export default function Navbar() {
  const { t } = useLanguage();
  const { content } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Use CMS navigation - no fallback hardcoded navigation
  const navLinks = content.navigation?.filter(nav => nav.isActive).sort((a, b) => a.order - b.order).map(nav => ({
    name: nav.label,
    path: nav.path
  })) || [];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500", 
      scrolled ? "bg-background/95 backdrop-blur-lg py-2 sm:py-3 shadow-sm border-b border-border/10" : "bg-transparent py-4 sm:py-6"
    )}>
      <nav className="container flex justify-between items-center relative">
        {/* Left side - Language and Theme */}
        <div className="flex items-center space-x-2 sm:space-x-3 z-40 min-w-0">
          <LanguageSelector />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        {/* Centered Logo - Fixed positioning with proper z-index */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-50 max-w-[50%] sm:max-w-[60%] md:max-w-none">
          <Link to="/" className="flex items-center justify-center group">
            {content.siteLogo ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={content.siteLogo} 
                  alt={content.siteName || "Site Logo"}
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {content.siteName && (
                  <span className="font-display text-sm sm:text-lg md:text-xl text-foreground hidden sm:block tracking-wider truncate">
                    {content.siteName}
                  </span>
                )}
              </div>
            ) : content.siteName ? (
              <span className="font-display text-base sm:text-xl md:text-2xl text-foreground tracking-wider text-center">
                {content.siteName}
              </span>
            ) : null}
          </Link>
        </div>

        {/* Desktop Navigation - Only show if navigation exists */}
        {navLinks.length > 0 && (
          <ul className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map(link => (
              <li key={link.name} className="relative">
                <Link 
                  to={link.path} 
                  className="luxury-subtitle text-foreground hover:text-foreground/70 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Right side - Book Now Button (only if configured) */}
        <div className="hidden lg:flex items-center space-x-3 z-40 min-w-0">
          {content.bookingSettings?.enableBooking && (
            <Button asChild className="minimal-button">
              <Link to="/booking">{t.nav.bookNow}</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center space-x-2 z-40">
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="z-50 h-8 w-8 sm:h-9 sm:w-9"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {navLinks.length > 0 && (
        <div className={cn(
          "fixed inset-0 z-40 bg-background/98 backdrop-blur-lg lg:hidden transition-opacity duration-300", 
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className={cn(
            "fixed inset-y-0 right-0 w-full max-w-sm bg-card/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out border-l border-border/20", 
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}>
            <div className="flex flex-col h-full justify-between p-6 sm:p-8 pt-16 sm:pt-20">
              <div>
                <div className="text-center mb-8">
                  {content.siteLogo && (
                    <img 
                      src={content.siteLogo} 
                      alt={content.siteName || "Site Logo"}
                      className="h-8 w-auto max-w-[120px] object-contain mx-auto mb-2"
                    />
                  )}
                  {content.siteName && (
                    <h2 className="font-display text-xl text-foreground tracking-wider">
                      {content.siteName}
                    </h2>
                  )}
                </div>
                
                <ul className="space-y-6">
                  {navLinks.map(link => (
                    <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="font-display text-lg text-foreground transition-colors hover:text-foreground/70 block py-2" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {content.bookingSettings?.enableBooking && (
                <Button asChild className="minimal-button w-full">
                  <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                    {t.nav.bookNow}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
