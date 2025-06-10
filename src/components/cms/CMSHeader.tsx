
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function CMSHeader() {
  const { content, resetContent } = useCMS();
  const { toast } = useToast();

  const handleReset = () => {
    resetContent();
    toast({
      title: "Content Reset",
      description: "All content has been reset to default values.",
    });
  };

  return (
    <div className="border-b bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back button */}
          <div className="flex items-center gap-3 min-w-0">
            <Button asChild variant="ghost" size="sm" className="minimal-button text-xs sm:text-sm">
              <Link to="/">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Site</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </div>
          
          {/* Centered Logo - Proper positioning */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 max-w-[50%] sm:max-w-[60%] md:max-w-none">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              {content.siteLogo && (
                <img 
                  src={content.siteLogo} 
                  alt={content.siteName || "Site Logo"}
                  className="h-6 sm:h-8 md:h-10 w-auto max-w-[80px] sm:max-w-[120px] md:max-w-[160px] object-contain"
                />
              )}
              <div className="text-center">
                <h1 className="font-display text-sm sm:text-lg md:text-xl text-primary tracking-wider truncate">
                  {content.siteName || "CMS"}
                </h1>
                <p className="luxury-subtitle text-xs hidden sm:block">Content Management</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Reset button */}
          <div className="flex items-center gap-3 min-w-0">
            <Button onClick={handleReset} variant="outline" size="sm" className="minimal-button text-xs sm:text-sm">
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Reset All</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
