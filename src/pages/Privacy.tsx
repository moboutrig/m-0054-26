
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/contexts/CMSContext";

export default function Privacy() {
  const { content } = useCMS();
  const pageContent = content.pageContent.privacy;
  const uiText = content.uiText;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {uiText.nav.backToHome}
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{pageContent.title}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{pageContent.title} for {content.siteName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pageContent.sections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}

              <div>
                <h3 className="text-lg font-semibold mb-2">{uiText.buttons.contactUs}</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-2 space-y-1">
                  <p><strong>Email:</strong> {content.contactEmail}</p>
                  <p><strong>Phone:</strong> {content.contactPhone}</p>
                  <p><strong>Address:</strong> {content.contactAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
