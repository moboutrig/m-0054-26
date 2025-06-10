
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMS } from "@/contexts/CMSContext";

export default function WelcomeSection() {
  const { t } = useLanguage();
  const { content } = useCMS();

  return (
    <section id="welcome" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in [animation-delay:100ms]">
            <span className="text-sm text-primary font-medium uppercase tracking-wider">
              {t.home.welcome.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              {content.welcomeTitle}
            </h2>
            <p className="text-muted-foreground mb-6">
              {content.welcomeDescription1}
            </p>
            <p className="text-muted-foreground mb-8">
              {content.welcomeDescription2}
            </p>
            <Button asChild className="btn-primary">
              <Link to="/about">
                {t.home.welcome.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="relative animate-fade-in [animation-delay:300ms]">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop"
                alt="Seaside view" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=400&h=300&fit=crop"
                alt="Luxury apartment interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop"
                alt="Pool view" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
