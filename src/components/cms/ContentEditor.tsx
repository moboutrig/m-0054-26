
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContentEditor() {
  const { content, updateContent } = useCMS();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={content.heroTitle}
              onChange={(e) => updateContent('heroTitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input
              id="heroSubtitle"
              value={content.heroSubtitle}
              onChange={(e) => updateContent('heroSubtitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              value={content.heroDescription}
              onChange={(e) => updateContent('heroDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="welcomeTitle">Welcome Title</Label>
            <Input
              id="welcomeTitle"
              value={content.welcomeTitle}
              onChange={(e) => updateContent('welcomeTitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="welcomeDescription1">Welcome Description (First Paragraph)</Label>
            <Textarea
              id="welcomeDescription1"
              value={content.welcomeDescription1}
              onChange={(e) => updateContent('welcomeDescription1', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="welcomeDescription2">Welcome Description (Second Paragraph)</Label>
            <Textarea
              id="welcomeDescription2"
              value={content.welcomeDescription2}
              onChange={(e) => updateContent('welcomeDescription2', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Section */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bookingTitle">Booking Title</Label>
            <Input
              id="bookingTitle"
              value={content.bookingTitle}
              onChange={(e) => updateContent('bookingTitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bookingDescription">Booking Description</Label>
            <Textarea
              id="bookingDescription"
              value={content.bookingDescription}
              onChange={(e) => updateContent('bookingDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Apartments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Apartments Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="featuredApartmentsTitle">Featured Apartments Title</Label>
            <Input
              id="featuredApartmentsTitle"
              value={content.featuredApartmentsTitle}
              onChange={(e) => updateContent('featuredApartmentsTitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="featuredApartmentsDescription">Featured Apartments Description</Label>
            <Textarea
              id="featuredApartmentsDescription"
              value={content.featuredApartmentsDescription}
              onChange={(e) => updateContent('featuredApartmentsDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Amenities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amenitiesTitle">Amenities Title</Label>
            <Input
              id="amenitiesTitle"
              value={content.amenitiesTitle}
              onChange={(e) => updateContent('amenitiesTitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="amenitiesDescription">Amenities Description</Label>
            <Textarea
              id="amenitiesDescription"
              value={content.amenitiesDescription}
              onChange={(e) => updateContent('amenitiesDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Call-to-Action Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ctaTitle">CTA Title</Label>
            <Input
              id="ctaTitle"
              value={content.ctaTitle}
              onChange={(e) => updateContent('ctaTitle', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ctaDescription">CTA Description</Label>
            <Textarea
              id="ctaDescription"
              value={content.ctaDescription}
              onChange={(e) => updateContent('ctaDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
