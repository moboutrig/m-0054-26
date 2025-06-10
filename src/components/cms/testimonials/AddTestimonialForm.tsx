
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

interface AddTestimonialFormProps {
  onAdd: (testimonial: Omit<Testimonial, 'id'>) => void;
}

export default function AddTestimonialForm({ onAdd }: AddTestimonialFormProps) {
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: "",
    location: "",
    rating: 5,
    comment: "",
    image: "",
    isActive: true
  });

  const handleAdd = () => {
    if (newTestimonial.name.trim() && newTestimonial.comment.trim()) {
      onAdd(newTestimonial);
      setNewTestimonial({
        name: "",
        location: "",
        rating: 5,
        comment: "",
        image: "",
        isActive: true
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Testimonial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="new-name">Customer Name</Label>
            <Input
              id="new-name"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
              placeholder="Customer name"
            />
          </div>
          <div>
            <Label htmlFor="new-location">Location</Label>
            <Input
              id="new-location"
              value={newTestimonial.location}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="new-image">Profile Image URL</Label>
          <Input
            id="new-image"
            value={newTestimonial.image}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <Label htmlFor="new-rating">Rating</Label>
          <Select 
            value={newTestimonial.rating.toString()} 
            onValueChange={(value) => setNewTestimonial({ ...newTestimonial, rating: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(rating => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} Star{rating !== 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="new-comment">Testimonial</Label>
          <Textarea
            id="new-comment"
            value={newTestimonial.comment}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
            placeholder="Customer testimonial text"
            rows={3}
          />
        </div>
        <Button onClick={handleAdd} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </CardContent>
    </Card>
  );
}
