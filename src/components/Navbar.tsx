
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
  
  // Use CMS navigation if available, otherwise fall back to default
  const navLinks = content.navigation?.filter(nav => nav.isActive).sort((a, b) => a.order - b.order).map(nav => ({
    name: nav.label,
    path: nav.path
  })) || [
    { name: t.nav.home, path: "/" },
    { name: t.nav.apartments, path: "/apartments" },
    { name: t.nav.amenities, path: "/amenities" },
    { name: t.nav.gallery, path: "/gallery" },
    { name: t.nav.contact, path: "/contact" }
  ];

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
      scrolled ? "bg-white/95 dark:bg-card/95 backdrop-blur-lg py-4 shadow-sm border-b border-border/10" : "bg-transparent py-8"
    )}>
      <nav className="container flex justify-between items-center relative">
        {/* Left side - Language and Theme */}
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-60">
          <Link to="/" className="flex items-center">
            {content.siteLogo ? (
              <div className="flex items-center space-x-3">
                <img 
                  src={content.siteLogo} 
                  alt={content.siteName}
                  className="h-8 w-auto max-w-[120px] object-contain"
                />
                <span className="font-display text-xl text-foreground hidden sm:block tracking-wider">
                  {content.siteName}
                </span>
              </div>
            ) : (
              <span className="font-display text-2xl text-foreground tracking-wider">
                {content.siteName}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-12">
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

        {/* Right side - Book Now Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button asChild className="minimal-button">
            <Link to="/booking">{t.nav.bookNow}</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="z-50"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg lg:hidden transition-opacity duration-300", 
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-card shadow-2xl transition-transform duration-300 ease-in-out", 
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full justify-between p-8 pt-20">
            <div>
              <ul className="space-y-8">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="font-display text-xl text-foreground transition-colors hover:text-foreground/70" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button asChild className="minimal-button w-full">
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.bookNow}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
