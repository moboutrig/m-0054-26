
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function PageContentManager() {
  const { content, updatePageContent } = useCMS();
  const { toast } = useToast();
  const [pageContent, setPageContent] = useState(content.pageContent);

  const handleSave = () => {
    Object.keys(pageContent).forEach(key => {
      updatePageContent(key as any, pageContent[key as keyof typeof pageContent]);
    });
    toast({
      title: "Page Content Updated",
      description: "All page content has been saved successfully.",
    });
  };

  const updateContent = (page: keyof typeof pageContent, field: string, value: any) => {
    setPageContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value
      }
    }));
  };

  const addFAQQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: "",
      answer: ""
    };
    setPageContent(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        questions: [...prev.faq.questions, newQuestion]
      }
    }));
  };

  const removeFAQQuestion = (id: string) => {
    setPageContent(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        questions: prev.faq.questions.filter(q => q.id !== id)
      }
    }));
  };

  const updateFAQQuestion = (id: string, field: 'question' | 'answer', value: string) => {
    setPageContent(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        questions: prev.faq.questions.map(q => 
          q.id === id ? { ...q, [field]: value } : q
        )
      }
    }));
  };

  const addPrivacySection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "",
      content: ""
    };
    setPageContent(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        sections: [...prev.privacy.sections, newSection]
      }
    }));
  };

  const addTermsSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "",
      content: ""
    };
    setPageContent(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        sections: [...prev.terms.sections, newSection]
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Page Content Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage content for all static pages in your website.
        </p>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="apartments">Apartments</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={pageContent.about.title}
                  onChange={(e) => updateContent('about', 'title', e.target.value)}
                />
              </div>
              <div>
                <Label>Page Subtitle</Label>
                <Input
                  value={pageContent.about.subtitle}
                  onChange={(e) => updateContent('about', 'subtitle', e.target.value)}
                />
              </div>
              <div>
                <Label>Story Title</Label>
                <Input
                  value={pageContent.about.story.title}
                  onChange={(e) => updateContent('about', 'story', { 
                    ...pageContent.about.story, 
                    title: e.target.value 
                  })}
                />
              </div>
              <div>
                <Label>Story Content (one paragraph per line)</Label>
                <Textarea
                  rows={4}
                  value={pageContent.about.story.content.join('\n')}
                  onChange={(e) => updateContent('about', 'story', { 
                    ...pageContent.about.story, 
                    content: e.target.value.split('\n').filter(p => p.trim()) 
                  })}
                />
              </div>
              <div>
                <Label>Offer Title</Label>
                <Input
                  value={pageContent.about.offer.title}
                  onChange={(e) => updateContent('about', 'offer', { 
                    ...pageContent.about.offer, 
                    title: e.target.value 
                  })}
                />
              </div>
              <div>
                <Label>Offer Content (one paragraph per line)</Label>
                <Textarea
                  rows={4}
                  value={pageContent.about.offer.content.join('\n')}
                  onChange={(e) => updateContent('about', 'offer', { 
                    ...pageContent.about.offer, 
                    content: e.target.value.split('\n').filter(p => p.trim()) 
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apartments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apartments Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={pageContent.apartments.title}
                  onChange={(e) => updateContent('apartments', 'title', e.target.value)}
                />
              </div>
              <div>
                <Label>Page Subtitle</Label>
                <Input
                  value={pageContent.apartments.subtitle}
                  onChange={(e) => updateContent('apartments', 'subtitle', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Guests Filter Label</Label>
                  <Input
                    value={pageContent.apartments.filters.guests}
                    onChange={(e) => updateContent('apartments', 'filters', { 
                      ...pageContent.apartments.filters, 
                      guests: e.target.value 
                    })}
                  />
                </div>
                <div>
                  <Label>Location Filter Label</Label>
                  <Input
                    value={pageContent.apartments.filters.location}
                    onChange={(e) => updateContent('apartments', 'filters', { 
                      ...pageContent.apartments.filters, 
                      location: e.target.value 
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={pageContent.faq.title}
                  onChange={(e) => updateContent('faq', 'title', e.target.value)}
                />
              </div>
              <div>
                <Label>Page Subtitle</Label>
                <Input
                  value={pageContent.faq.subtitle}
                  onChange={(e) => updateContent('faq', 'subtitle', e.target.value)}
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
                  {pageContent.faq.questions.map((faq) => (
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
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={pageContent.privacy.title}
                  onChange={(e) => updateContent('privacy', 'title', e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Policy Sections</Label>
                  <Button onClick={addPrivacySection} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                <div className="space-y-4">
                  {pageContent.privacy.sections.map((section) => (
                    <div key={section.id} className="border rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Label>Section Title</Label>
                        <Button 
                          onClick={() => setPageContent(prev => ({
                            ...prev,
                            privacy: {
                              ...prev.privacy,
                              sections: prev.privacy.sections.filter(s => s.id !== section.id)
                            }
                          }))}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={section.title}
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            sections: prev.privacy.sections.map(s => 
                              s.id === section.id ? { ...s, title: e.target.value } : s
                            )
                          }
                        }))}
                        className="mb-2"
                      />
                      <Label>Content</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            sections: prev.privacy.sections.map(s => 
                              s.id === section.id ? { ...s, content: e.target.value } : s
                            )
                          }
                        }))}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={pageContent.terms.title}
                  onChange={(e) => updateContent('terms', 'title', e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Terms Sections</Label>
                  <Button onClick={addTermsSection} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                <div className="space-y-4">
                  {pageContent.terms.sections.map((section) => (
                    <div key={section.id} className="border rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Label>Section Title</Label>
                        <Button 
                          onClick={() => setPageContent(prev => ({
                            ...prev,
                            terms: {
                              ...prev.terms,
                              sections: prev.terms.sections.filter(s => s.id !== section.id)
                            }
                          }))}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={section.title}
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          terms: {
                            ...prev.terms,
                            sections: prev.terms.sections.map(s => 
                              s.id === section.id ? { ...s, title: e.target.value } : s
                            )
                          }
                        }))}
                        className="mb-2"
                      />
                      <Label>Content</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          terms: {
                            ...prev.terms,
                            sections: prev.terms.sections.map(s => 
                              s.id === section.id ? { ...s, content: e.target.value } : s
                            )
                          }
                        }))}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save All Page Content
      </Button>
    </div>
  );
}
