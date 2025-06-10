
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/contexts/CMSContext";

export default function FAQ() {
  const { content } = useCMS();
  const pageContent = content.pageContent.faq;
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
              <CardTitle>{pageContent.subtitle} {content.siteName}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {pageContent.questions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{pageContent.contactSection.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {pageContent.contactSection.description}
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> {content.contactEmail}</p>
                <p><strong>Phone:</strong> {content.contactPhone}</p>
                <p><strong>Address:</strong> {content.contactAddress}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
