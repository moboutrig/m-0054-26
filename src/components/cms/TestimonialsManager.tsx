
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Plus, Star } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

export default function TestimonialsManager() {
  const { content, updateTestimonials } = useCMS();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(content.testimonials);

  const handleSave = () => {
    updateTestimonials(testimonials);
    toast({
      title: "Testimonials Updated",
      description: "Customer testimonials have been saved successfully.",
    });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: "New Customer",
      location: "City, Country",
      rating: 5,
      comment: "Amazing experience! Would definitely recommend.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isActive: true
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: any) => {
    setTestimonials(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Customer Testimonials</h3>
          <p className="text-sm text-muted-foreground">
            Manage customer reviews and testimonials displayed on your website.
          </p>
        </div>
        <Button onClick={addTestimonial} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">{testimonial.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${testimonial.id}`}>Customer Name</Label>
                  <Input
                    id={`name-${testimonial.id}`}
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <Label htmlFor={`location-${testimonial.id}`}>Location</Label>
                  <Input
                    id={`location-${testimonial.id}`}
                    value={testimonial.location}
                    onChange={(e) => updateTestimonial(testimonial.id, 'location', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`rating-${testimonial.id}`}>Rating</Label>
                  <Select
                    value={testimonial.rating.toString()}
                    onValueChange={(value) => updateTestimonial(testimonial.id, 'rating', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{rating}</span>
                            <div className="flex">{renderStars(rating)}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`image-${testimonial.id}`}>Profile Image URL</Label>
                  <Input
                    id={`image-${testimonial.id}`}
                    value={testimonial.image}
                    onChange={(e) => updateTestimonial(testimonial.id, 'image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`comment-${testimonial.id}`}>Review Comment</Label>
                <Textarea
                  id={`comment-${testimonial.id}`}
                  value={testimonial.comment}
                  onChange={(e) => updateTestimonial(testimonial.id, 'comment', e.target.value)}
                  placeholder="Customer's review comment"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`active-${testimonial.id}`}
                  checked={testimonial.isActive}
                  onCheckedChange={(checked) => updateTestimonial(testimonial.id, 'isActive', checked)}
                />
                <Label htmlFor={`active-${testimonial.id}`}>Display on website</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No testimonials yet. Add your first customer review!</p>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSave} className="w-full">
        Save Testimonials
      </Button>
    </div>
  );
}
