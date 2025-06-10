
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApartmentCard from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useCMS } from "@/contexts/CMSContext";

export default function Apartments() {
  const { content, getApartmentWithPricing, getFormattedPrice } = useCMS();
  const pageContent = content.pageContent.apartments;
  const uiText = content.uiText;
  
  // Get active apartments from CMS
  const allApartments = content.apartments
    .filter(apt => apt.isActive)
    .sort((a, b) => a.order - b.order)
    .map(apt => {
      const apartmentWithPricing = getApartmentWithPricing(apt.id);
      return apartmentWithPricing ? {
        id: apt.id,
        name: apt.name,
        description: apt.description,
        price: apartmentWithPricing.price,
        capacity: apt.capacity,
        size: apt.size,
        image: apartmentWithPricing.image,
        location: apt.location,
        features: apt.features
      } : null;
    })
    .filter(Boolean);

  const [filteredApartments, setFilteredApartments] = useState(allApartments);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([100, 350]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = allApartments;
    
    if (capacityFilter !== "all") {
      const capacity = parseInt(capacityFilter);
      result = result.filter(apt => apt.capacity >= capacity);
    }
    
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }
    
    result = result.filter(apt => apt.price >= priceRange[0] && apt.price <= priceRange[1]);
    
    setFilteredApartments(result);
  }, [capacityFilter, locationFilter, priceRange, allApartments]);
  
  // Get unique locations for filter
  const locations = ["all", ...new Set(allApartments.map(apt => apt.location))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {pageContent.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {pageContent.subtitle}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {pageContent.filters.guests}
                </label>
                <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={pageContent.filters.guests} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{pageContent.filters.anyGuests}</SelectItem>
                    <SelectItem value="1">{pageContent.filters.onePlus}</SelectItem>
                    <SelectItem value="2">{pageContent.filters.twoPlus}</SelectItem>
                    <SelectItem value="3">{pageContent.filters.threePlus}</SelectItem>
                    <SelectItem value="4">{pageContent.filters.fourPlus}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {pageContent.filters.location}
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={pageContent.filters.location} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{pageContent.filters.anyLocation}</SelectItem>
                    {locations.slice(1).map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {pageContent.filters.priceRange}: {getFormattedPrice(priceRange[0])} - {getFormattedPrice(priceRange[1])}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  min={50}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Apartments Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApartments.map((apartment, index) => (
                <div key={apartment.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ApartmentCard {...apartment} />
                </div>
              ))}
            </div>
            
            {filteredApartments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No apartments match your current filters.
                </p>
                <Button 
                  onClick={() => {
                    setCapacityFilter("all");
                    setLocationFilter("all");
                    setPriceRange([100, 350]);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
