
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApartmentsSEO {
  metaTitle: string;
  metaDescription: string;
}

interface ApartmentsSEOEditorProps {
  seo: ApartmentsSEO;
  onUpdate: (seo: ApartmentsSEO) => void;
}

export default function ApartmentsSEOEditor({ seo, onUpdate }: ApartmentsSEOEditorProps) {
  const updateSEO = (seoKey: keyof ApartmentsSEO, value: string) => {
    onUpdate({
      ...seo,
      [seoKey]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Meta Title</Label>
          <Input
            value={seo.metaTitle || ''}
            onChange={(e) => updateSEO('metaTitle', e.target.value)}
            placeholder="Apartments | Your Site Name"
          />
        </div>
        <div>
          <Label>Meta Description</Label>
          <Textarea
            value={seo.metaDescription || ''}
            onChange={(e) => updateSEO('metaDescription', e.target.value)}
            placeholder="Discover our beautiful apartments with stunning views..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
