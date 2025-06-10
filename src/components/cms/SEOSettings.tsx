
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function SEOSettings() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [seoSettings, setSeoSettings] = useState(content.seoSettings);

  const handleSave = () => {
    updateContent('seoSettings', seoSettings);
    toast({
      title: "SEO Settings Updated",
      description: "SEO settings have been saved successfully.",
    });
  };

  const updateSetting = (field: keyof typeof seoSettings, value: string) => {
    setSeoSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        <p className="text-sm text-muted-foreground">
          Optimize your website for search engines with custom meta tags and descriptions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meta Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seo-title">Page Title</Label>
            <Input
              id="seo-title"
              value={seoSettings.title}
              onChange={(e) => updateSetting('title', e.target.value)}
              placeholder="Page title for search engines"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 50-60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea
              id="seo-description"
              value={seoSettings.description}
              onChange={(e) => updateSetting('description', e.target.value)}
              placeholder="Brief description of your website"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 150-160 characters
            </p>
          </div>

          <div>
            <Label htmlFor="seo-keywords">Keywords</Label>
            <Input
              id="seo-keywords"
              value={seoSettings.keywords}
              onChange={(e) => updateSetting('keywords', e.target.value)}
              placeholder="luxury hotel, beachfront, vacation, etc."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate keywords with commas
            </p>
          </div>

          <div>
            <Label htmlFor="seo-og-image">Open Graph Image URL</Label>
            <Input
              id="seo-og-image"
              value={seoSettings.ogImage}
              onChange={(e) => updateSetting('ogImage', e.target.value)}
              placeholder="https://example.com/og-image.jpg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Image shown when sharing on social media (1200x630px recommended)
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save SEO Settings
      </Button>
    </div>
  );
}
