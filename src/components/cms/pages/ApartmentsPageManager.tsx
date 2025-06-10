
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApartmentsPageContent {
  title: string;
  subtitle: string;
  filters: {
    guests: string;
    location: string;
    priceRange: string;
    anyGuests: string;
    onePlus: string;
    twoPlus: string;
    threePlus: string;
    fourPlus: string;
    anyLocation: string;
  };
}

interface ApartmentsPageManagerProps {
  content: ApartmentsPageContent;
  onUpdate: (content: ApartmentsPageContent) => void;
}

export default function ApartmentsPageManager({ content, onUpdate }: ApartmentsPageManagerProps) {
  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apartments Page Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Page Title</Label>
          <Input
            value={content.title}
            onChange={(e) => updateContent('title', e.target.value)}
          />
        </div>
        <div>
          <Label>Page Subtitle</Label>
          <Input
            value={content.subtitle}
            onChange={(e) => updateContent('subtitle', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Guests Filter Label</Label>
            <Input
              value={content.filters.guests}
              onChange={(e) => updateContent('filters', { 
                ...content.filters, 
                guests: e.target.value 
              })}
            />
          </div>
          <div>
            <Label>Location Filter Label</Label>
            <Input
              value={content.filters.location}
              onChange={(e) => updateContent('filters', { 
                ...content.filters, 
                location: e.target.value 
              })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
