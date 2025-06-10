
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import BookingSection from "@/components/sections/BookingSection";
import FeaturedApartmentsSection from "@/components/sections/FeaturedApartmentsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";

export default function Index() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Booking Form Section */}
        <BookingSection />
        
        {/* Featured Apartments */}
        <FeaturedApartmentsSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
