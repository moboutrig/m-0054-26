
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCMS } from "@/contexts/CMSContext"; // Import useCMS

export default function Footer() {
  const { t } = useLanguage();
  const { content } = useCMS(); // Get CMS content
  const currentYear = new Date().getFullYear();
  
  const {
    contactAddress,
    contactPhone,
    contactEmail,
    footerContent,
    socialMedia
  } = content;

  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in [animation-delay:100ms]">
            <h4 className="text-xl font-bold mb-4">MareSereno</h4>
            <p className="text-muted-foreground mb-4">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in [animation-delay:200ms]">
            <h4 className="text-xl font-bold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {footerContent.quickLinks.map((link) => (
                <li key={link.label}> {/* Use label as key if unique, or generate id */}
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {/* Assuming labels in quickLinks are already translated or are keys for t() if needed */}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:300ms]">
            <h4 className="text-xl font-bold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              {contactAddress && (
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground whitespace-pre-line">{contactAddress}</span>
                </li>
              )}
              {contactPhone && (
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                  <a href={`tel:${contactPhone}`} className="text-muted-foreground hover:text-primary">{contactPhone}</a>
                </li>
              )}
              {contactEmail && (
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                  <a href={`mailto:${contactEmail}`} className="text-muted-foreground hover:text-primary">{contactEmail}</a>
                </li>
              )}
              {footerContent.contactInfo?.hours && (
                 <li className="flex items-center">
                   {/* Consider an icon for hours if available, e.g., ClockIcon */}
                   <span className="text-muted-foreground ml-7">{footerContent.contactInfo.hours}</span> {/* Assuming no icon for now, align with others */}
                 </li>
              )}
            </ul>
          </div>
          
          <div className="animate-fade-in [animation-delay:400ms]">
            <h4 className="text-xl font-bold mb-4">{t.footer.newsletter}</h4>
            <p className="text-muted-foreground mb-4">
              {t.footer.newsletterDesc}
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder={t.footer.yourEmail} 
                className="rounded-md px-4 py-2 bg-muted text-foreground"
                required 
              />
              <button 
                type="submit" 
                className="btn-primary mt-2"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} MareSereno. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  );
}
