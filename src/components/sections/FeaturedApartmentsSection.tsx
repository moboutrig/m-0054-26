
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ApartmentCard from "@/components/ApartmentCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMS } from "@/contexts/CMSContext";

export default function FeaturedApartmentsSection() {
  const { t } = useLanguage();
  const { content, getApartmentWithPricing } = useCMS();

  // Get apartments from CMS with proper fallback
  const featuredApartments = content.apartments
    ?.filter(apt => apt.isActive)
    ?.slice(0, 3)
    ?.map(apartment => {
      const apartmentWithPricing = getApartmentWithPricing(apartment.id);
      return apartmentWithPricing || {
        id: apartment.id,
        name: apartment.name,
        description: apartment.description,
        price: 150,
        capacity: apartment.capacity,
        size: apartment.size,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        location: apartment.location,
        features: apartment.features || []
      };
    }) || [];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            {t.home.featuredApartments.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {content.featuredApartmentsTitle}
          </h2>
          <p className="text-muted-foreground">
            {content.featuredApartmentsDescription}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredApartments.map((apartment, index) => (
            <div key={apartment.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <ApartmentCard 
                id={apartment.id}
                name={apartment.name}
                description={apartment.description}
                price={apartment.price}
                capacity={apartment.capacity}
                size={apartment.size}
                image={apartment.image}
                location={apartment.location}
                features={apartment.features}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="btn-primary">
            <Link to="/apartments">
              {t.home.featuredApartments.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
