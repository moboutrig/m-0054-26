
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/contexts/CMSContext";
import { Heart, Dumbbell, Waves, Activity, Utensils, Wine, Coffee, Clock, Car, Plane, Car as CarIcon, MapPin, Users, Music, BookOpen } from "lucide-react";

export default function Amenities() {
  const { content } = useCMS();
  const amenitiesContent = content.pageContent.amenities;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Helper function to get the appropriate icon for each amenity
  const getIcon = (iconName: string) => {
    const icons = {
      Heart: <Heart />,
      Dumbbell: <Dumbbell />,
      Waves: <Waves />,
      Activity: <Activity />,
      Utensils: <Utensils />,
      Wine: <Wine />,
      Coffee: <Coffee />,
      Clock: <Clock />,
      Car: <CarIcon />,
      Plane: <Plane />,
      MapPin: <MapPin />,
      Users: <Users />,
      Music: <Music />,
      BookOpen: <BookOpen />
    };
    
    return icons[iconName as keyof typeof icons] || <Coffee />;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container relative z-10 pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                {content.siteName}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                {amenitiesContent.title}
              </h1>
              <p className="text-muted-foreground">
                {amenitiesContent.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Description Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                {amenitiesContent.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Categories Sections */}
        {amenitiesContent.categories.map((category, categoryIndex) => {
          const isEven = categoryIndex % 2 === 0;
          
          return (
            <section key={category.id} className={`py-16 ${isEven ? 'bg-card' : ''}`}>
              <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="glass-card p-6 rounded-xl flex flex-col items-center text-center animate-fade-in"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                        {getIcon(item.icon)}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        
        {/* Gallery Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {content.pageContent.gallery.title}
              </h2>
              <p className="text-muted-foreground">
                {content.pageContent.gallery.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content.pageContent.gallery.images.filter(img => img.category === 'amenities').slice(0, 8).map((image, index) => (
                <div 
                  key={image.id} 
                  className="aspect-square rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                >
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
