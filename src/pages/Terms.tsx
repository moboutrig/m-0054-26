
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/contexts/CMSContext";

export default function Terms() {
  const { content } = useCMS();

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
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terms of Service for {content.siteName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By accessing and using our services, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Booking and Reservations</h3>
                <p className="text-muted-foreground">
                  All reservations are subject to availability. We reserve the right to cancel 
                  reservations in case of overbooking or other unforeseen circumstances.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
                <p className="text-muted-foreground">
                  {content.bookingSettings.cancellationPolicy}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Check-in and Check-out</h3>
                <p className="text-muted-foreground">
                  Check-in time: {content.bookingSettings.checkInTime}<br />
                  Check-out time: {content.bookingSettings.checkOutTime}<br />
                  Minimum stay: {content.bookingSettings.minimumStay} nights<br />
                  Maximum stay: {content.bookingSettings.maximumStay} nights
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p className="text-muted-foreground">
                  For questions regarding these terms, please contact us:
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
