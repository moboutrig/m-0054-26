
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutPageContent {
  title: string;
  subtitle: string;
  story: {
    title: string;
    content: string[];
  };
  offer: {
    title: string;
    content: string[];
  };
}

interface AboutPageManagerProps {
  content: AboutPageContent;
  onUpdate: (content: AboutPageContent) => void;
}

export default function AboutPageManager({ content, onUpdate }: AboutPageManagerProps) {
  // Type field and value for updateContent
  const updateContent = (
    field: keyof AboutPageContent,
    value: string | { title: string; content: string[] }
  ) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Content</CardTitle>
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
        <div>
          <Label>Story Title</Label>
          <Input
            value={content.story.title}
            onChange={(e) => updateContent('story', { 
              ...content.story, 
              title: e.target.value 
            })}
          />
        </div>
        <div>
          <Label>Story Content (one paragraph per line)</Label>
          <Textarea
            rows={4}
            value={content.story.content.join('\n')}
            onChange={(e) => updateContent('story', { 
              ...content.story, 
              content: e.target.value.split('\n').filter(p => p.trim()) 
            })}
          />
        </div>
        <div>
          <Label>Offer Title</Label>
          <Input
            value={content.offer.title}
            onChange={(e) => updateContent('offer', { 
              ...content.offer, 
              title: e.target.value 
            })}
          />
        </div>
        <div>
          <Label>Offer Content (one paragraph per line)</Label>
          <Textarea
            rows={4}
            value={content.offer.content.join('\n')}
            onChange={(e) => updateContent('offer', { 
              ...content.offer, 
              content: e.target.value.split('\n').filter(p => p.trim()) 
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
