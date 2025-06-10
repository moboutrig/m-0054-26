
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Save, LogOut } from "lucide-react"; // Added Save and LogOut icons
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function CMSHeader() {
  const { content, resetContent } = useCMS(); // Assuming useCMS provides the latest content state
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReset = () => {
    resetContent(); // This function is from useCMS, assumes it handles local state reset
    toast({
      title: "Content Reset",
      description: "Local content has been reset to default values. Click 'Save Changes' to persist this to the server.",
    });
  };

  const handleSaveChanges = async () => {
    toast({
      title: "Saving...",
      description: "Attempting to save changes to the server.",
    });
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // JWT cookie should be sent automatically by the browser
        },
        body: JSON.stringify(content), // Send the entire current content state
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Changes Saved",
          description: result.message || "Content updated successfully on the server.",
          variant: "default",
        });
      } else {
        const errorResult = await response.json();
        toast({
          title: "Save Failed",
          description: errorResult.message || `Server responded with ${response.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Save Error",
        description: "An unexpected error occurred while saving changes.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    toast({
      title: "Logging out...",
    });
    try {
      // Assuming POST request for logout as implemented in api/logout.ts
      const response = await fetch('/api/logout', { method: 'POST' });
      if (!response.ok) {
        // Even if logout API fails, proceed to redirect to login for UX
        console.error("Logout API call failed, but redirecting.");
      }
    } catch (error) {
      console.error("Error during logout API call:", error);
      // Still redirect even if API call fails
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="border-b bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back button */}
          <div className="flex items-center gap-1 sm:gap-3 min-w-0">
            <Button asChild variant="ghost" size="sm" className="minimal-button text-xs sm:text-sm">
              <Link to="/">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Site</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </div>
          
          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 max-w-[40%] sm:max-w-[50%] md:max-w-none">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              {content.siteLogo && (
                <img 
                  src={content.siteLogo} 
                  alt={content.siteName || "Site Logo"}
                  className="h-6 sm:h-8 md:h-10 w-auto max-w-[60px] sm:max-w-[100px] md:max-w-[140px] object-contain"
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
          
          {/* Right side - Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <Button onClick={handleSaveChanges} variant="outline" size="sm" className="minimal-button text-xs sm:text-sm">
              <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="minimal-button text-xs sm:text-sm">
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
              <span className="sm:hidden">Reset</span>
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="minimal-button text-xs sm:text-sm">
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
