
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CMSInfoCard() {
  return (
    <Card className="mt-8 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle className="text-green-800 dark:text-green-200">Fully Dynamic CMS-Driven Website</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 text-green-700 dark:text-green-300">
          <div className="space-y-2">
            <p>• <strong>Dynamic Content:</strong> All content is now CMS-managed</p>
            <p>• <strong>Room Customization:</strong> Individual room images and amenities</p>
            <p>• <strong>Navigation Control:</strong> Fully dynamic menu system</p>
            <p>• <strong>SEO Optimization:</strong> Dynamic meta tags and settings</p>
            <p>• <strong>Social Integration:</strong> Configurable social media links</p>
            <p>• <strong>Pricing Management:</strong> Dynamic rates and seasonal pricing</p>
            <p>• <strong>Theme Customization:</strong> Dynamic colors and typography</p>
          </div>
          <div className="space-y-2">
            <p>• <strong>Customer Reviews:</strong> Dynamic testimonials management</p>
            <p>• <strong>Footer Content:</strong> Fully configurable footer sections</p>
            <p>• <strong>Booking Policies:</strong> Dynamic check-in/out and rules</p>
            <p>• <strong>Image Management:</strong> Dynamic image galleries</p>
            <p>• <strong>Contact Settings:</strong> Dynamic business information</p>
            <p>• <strong>Page Routing:</strong> All footer links now functional</p>
            <p>• <strong>No Static Data:</strong> Everything is dynamically managed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
