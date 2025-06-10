
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    </div>
  );
}
