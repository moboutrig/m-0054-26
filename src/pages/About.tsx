
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
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
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {uiText.nav.backToHome}
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageContent.title} {content.siteName}
            </h1>
            <p className="text-xl text-muted-foreground">
              {pageContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Story Section */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">{pageContent.story.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pageContent.story.content.map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">{pageContent.offer.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pageContent.offer.content.map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{pageContent.contact.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{content.contactAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{content.contactPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{content.contactEmail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Card */}
                <Card className="border-0 shadow-lg bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Ready to Book?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Experience our hospitality and comfort
                    </p>
                    <Button asChild className="w-full">
                      <Link to="/booking">{uiText.nav.bookNow}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
