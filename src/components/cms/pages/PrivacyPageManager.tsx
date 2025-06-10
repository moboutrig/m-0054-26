
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface PolicySection {
  id: string;
  title: string;
  content: string;
}

interface PrivacyPageContent {
  title: string;
  sections: PolicySection[];
}

interface PrivacyPageManagerProps {
  content: PrivacyPageContent;
  onUpdate: (content: PrivacyPageContent) => void;
}

export default function PrivacyPageManager({ content, onUpdate }: PrivacyPageManagerProps) {
  // Type field and value for updateContent
  const updateContent = (
    field: keyof PrivacyPageContent,
    value: string | PolicySection[]
  ) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const addSection = () => {
    const newSection: PolicySection = {
      id: Date.now().toString(),
      title: "",
      content: ""
    };
    updateContent('sections', [...content.sections, newSection]);
  };

  const removeSection = (id: string) => {
    updateContent('sections', content.sections.filter(s => s.id !== id));
  };

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    updateContent('sections', content.sections.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Policy Content</CardTitle>
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
          <div className="flex items-center justify-between mb-4">
            <Label>Policy Sections</Label>
            <Button onClick={addSection} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
          <div className="space-y-4">
            {content.sections.map((section) => (
              <div key={section.id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <Label>Section Title</Label>
                  <Button 
                    onClick={() => removeSection(section.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  className="mb-2"
                />
                <Label>Content</Label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
