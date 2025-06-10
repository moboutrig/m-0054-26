
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCMS } from "@/contexts/CMSContext";

export default function ContentEditor() {
  const { content, updateContent } = useCMS();

  return (
    <div className="space-y-6">
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
              placeholder="Hero description"
              rows={3}
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
          <CardTitle>Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ctaTitle">CTA Title</Label>
            <Input
              id="ctaTitle"
              value={content.ctaTitle}
              onChange={(e) => updateContent('ctaTitle', e.target.value)}
              placeholder="Call to action title"
            />
          </div>
          <div>
            <Label htmlFor="ctaDescription">CTA Description</Label>
            <Textarea
              id="ctaDescription"
              value={content.ctaDescription}
              onChange={(e) => updateContent('ctaDescription', e.target.value)}
              placeholder="Call to action description"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
