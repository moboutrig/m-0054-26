
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/contexts/CMSContext";

export default function About() {
  const { content } = useCMS();
  const pageContent = content.pageContent.about;
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
            <h1 className="text-3xl font-bold">{pageContent.title} {content.siteName}</h1>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{pageContent.story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {pageContent.story.content.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{pageContent.offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {pageContent.offer.content.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{pageContent.contact.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Address:</strong> {content.contactAddress}</p>
                <p><strong>Phone:</strong> {content.contactPhone}</p>
                <p><strong>Email:</strong> {content.contactEmail}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
