
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApartmentsHeaderContent {
  title: string;
  subtitle: string;
  description: string;
}

interface ApartmentsHeaderEditorProps {
  content: ApartmentsHeaderContent;
  onUpdate: (content: ApartmentsHeaderContent) => void;
}

export default function ApartmentsHeaderEditor({ content, onUpdate }: ApartmentsHeaderEditorProps) {
  const updateContent = (field: keyof ApartmentsHeaderContent, value: string) => {
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
            placeholder="Our Apartments"
          />
        </div>
        <div>
          <Label>Page Subtitle</Label>
          <Input
            value={content.subtitle}
            onChange={(e) => updateContent('subtitle', e.target.value)}
            placeholder="Find your perfect accommodation"
          />
        </div>
        <div>
          <Label>Page Description</Label>
          <Textarea
            value={content.description}
            onChange={(e) => updateContent('description', e.target.value)}
            placeholder="Detailed description of your apartments and what makes them special..."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
