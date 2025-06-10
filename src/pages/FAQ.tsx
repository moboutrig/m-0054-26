
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

  const faqs = [
    {
      question: "What are your check-in and check-out times?",
      answer: `Check-in time is ${content.bookingSettings.checkInTime} and check-out time is ${content.bookingSettings.checkOutTime}.`
    },
    {
      question: "What is your cancellation policy?",
      answer: content.bookingSettings.cancellationPolicy
    },
    {
      question: "What is the minimum and maximum stay?",
      answer: `The minimum stay is ${content.bookingSettings.minimumStay} nights and the maximum stay is ${content.bookingSettings.maximumStay} nights.`
    },
    {
      question: "Do you require a deposit?",
      answer: `Yes, we require a ${content.bookingSettings.depositRequired}% deposit of the total booking amount to secure your reservation.`
    },
    {
      question: "How can I contact you?",
      answer: `You can reach us by phone at ${content.contactPhone}, email at ${content.contactEmail}, or visit us at ${content.contactAddress}.`
    },
    {
      question: "What amenities do you offer?",
      answer: content.amenitiesDescription
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Common Questions About {content.siteName}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you couldn't find the answer you're looking for, feel free to contact us directly:
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
