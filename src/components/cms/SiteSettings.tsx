
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SiteSettings() {
  const { content, updateContent } = useCMS();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={content.siteName}
              onChange={(e) => updateContent('siteName', e.target.value)}
              placeholder="Your site name"
            />
          </div>
        </CardContent>
      </Card>

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
              placeholder="Main hero title"
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input
              id="heroSubtitle"
              value={content.heroSubtitle}
              onChange={(e) => updateContent('heroSubtitle', e.target.value)}
              placeholder="Hero subtitle"
            />
          </div>
          <div>
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              value={content.heroDescription}
              onChange={(e) => updateContent('heroDescription', e.target.value)}
              placeholder="Hero description text"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="heroImage">Hero Image URL</Label>
            <Input
              id="heroImage"
              value={content.heroImage}
              onChange={(e) => updateContent('heroImage', e.target.value)}
              placeholder="https://example.com/hero-image.jpg"
            />
          </div>
        </CardContent>
      </Card>

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
              placeholder="Welcome section title"
            />
          </div>
          <div>
            <Label htmlFor="welcomeDescription1">Welcome Description 1</Label>
            <Textarea
              id="welcomeDescription1"
              value={content.welcomeDescription1}
              onChange={(e) => updateContent('welcomeDescription1', e.target.value)}
              placeholder="First welcome paragraph"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="welcomeDescription2">Welcome Description 2</Label>
            <Textarea
              id="welcomeDescription2"
              value={content.welcomeDescription2}
              onChange={(e) => updateContent('welcomeDescription2', e.target.value)}
              placeholder="Second welcome paragraph"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contactAddress">Address</Label>
            <Input
              id="contactAddress"
              value={content.contactAddress}
              onChange={(e) => updateContent('contactAddress', e.target.value)}
              placeholder="Your address"
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input
              id="contactPhone"
              value={content.contactPhone}
              onChange={(e) => updateContent('contactPhone', e.target.value)}
              placeholder="Your phone number"
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              value={content.contactEmail}
              onChange={(e) => updateContent('contactEmail', e.target.value)}
              placeholder="Your email address"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
