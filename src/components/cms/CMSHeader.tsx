
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
    <div className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="minimal-button">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Site</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </div>
          
          {/* Centered Logo - Fixed positioning */}
          <div className="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
            {content.siteLogo && (
              <img 
                src={content.siteLogo} 
                alt={content.siteName}
                className="h-8 w-auto max-w-[80px] sm:max-w-[120px] object-contain"
              />
            )}
            <div className="text-center">
              <h1 className="font-display text-lg sm:text-2xl text-primary tracking-wider">
                {content.siteName}
              </h1>
              <p className="luxury-subtitle text-xs hidden sm:block">Content Management</p>
            </div>
          </div>
          
          <Button onClick={handleReset} variant="outline" size="sm" className="minimal-button">
            <RotateCcw className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Reset All</span>
            <span className="sm:hidden">Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
