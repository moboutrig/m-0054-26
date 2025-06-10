
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Youtube, Star } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function SocialMediaSettings() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [socialMedia, setSocialMedia] = useState(content.socialMedia);

  const handleSave = () => {
    updateContent('socialMedia', socialMedia);
    toast({
      title: "Social Media Links Updated",
      description: "Social media links have been saved successfully.",
    });
  };

  const updateSocial = (platform: keyof typeof socialMedia, value: string) => {
    setSocialMedia(prev => ({ ...prev, [platform]: value }));
  };

  const socialPlatforms = [
    { key: 'facebook' as const, label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/yourpage' },
    { key: 'instagram' as const, label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/yourpage' },
    { key: 'twitter' as const, label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/yourpage' },
    { key: 'youtube' as const, label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/yourchannel' },
    { key: 'tripadvisor' as const, label: 'TripAdvisor', icon: Star, placeholder: 'https://tripadvisor.com/yourhotel' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Social Media Links</h3>
        <p className="text-sm text-muted-foreground">
          Add links to your social media profiles to increase engagement and visibility.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialPlatforms.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key}>
              <Label htmlFor={`social-${key}`} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </Label>
              <Input
                id={`social-${key}`}
                value={socialMedia[key]}
                onChange={(e) => updateSocial(key, e.target.value)}
                placeholder={placeholder}
                type="url"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Social Media Links
      </Button>
    </div>
  );
}
