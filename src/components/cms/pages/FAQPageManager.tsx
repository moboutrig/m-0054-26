
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
}

interface FAQPageContent {
  title: string;
  subtitle: string;
  questions: FAQQuestion[];
}

interface FAQPageManagerProps {
  content: FAQPageContent;
  onUpdate: (content: FAQPageContent) => void;
}

export default function FAQPageManager({ content, onUpdate }: FAQPageManagerProps) {
  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const addFAQQuestion = () => {
    const newQuestion: FAQQuestion = {
      id: Date.now().toString(),
      question: "",
      answer: ""
    };
    updateContent('questions', [...content.questions, newQuestion]);
  };

  const removeFAQQuestion = (id: string) => {
    updateContent('questions', content.questions.filter(q => q.id !== id));
  };

  const updateFAQQuestion = (id: string, field: 'question' | 'answer', value: string) => {
    updateContent('questions', content.questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>FAQ Page Content</CardTitle>
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
          <div className="flex items-center justify-between mb-4">
            <Label>FAQ Questions</Label>
            <Button onClick={addFAQQuestion} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
          <div className="space-y-4">
            {content.questions.map((faq) => (
              <div key={faq.id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <Label>Question</Label>
                  <Button 
                    onClick={() => removeFAQQuestion(faq.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFAQQuestion(faq.id, 'question', e.target.value)}
                  className="mb-2"
                />
                <Label>Answer</Label>
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQQuestion(faq.id, 'answer', e.target.value)}
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
