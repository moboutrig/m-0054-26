
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function CMSHeader() {
  const { resetContent } = useCMS();
  const { toast } = useToast();

  const handleReset = () => {
    resetContent();
    toast({
      title: "Content Reset",
      description: "All content has been reset to default values.",
    });
  };

  return (
    <div className="border-b bg-card">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Content Management System</h1>
              <p className="text-muted-foreground">Manage your website content and settings</p>
            </div>
          </div>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
