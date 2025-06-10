import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Edit, Save, X, Star } from "lucide-react";
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
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: "",
    location: "",
    rating: 5,
    comment: "",
    image: "",
    isActive: true
  });

  const handleSave = () => {
    updateTestimonials(testimonials);
    toast({
      title: "Testimonials Updated",
      description: "Customer testimonials have been saved successfully.",
    });
  };

  const addTestimonial = () => {
    if (newTestimonial.name.trim() && newTestimonial.comment.trim()) {
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        ...newTestimonial
      };
      
      setTestimonials([...testimonials, testimonial]);
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

  const startEditing = (testimonial: Testimonial) => {
    setIsEditing(testimonial.id);
    setEditingData({ ...testimonial });
  };

  const saveEdit = () => {
    if (editingData) {
      setTestimonials(testimonials.map(t => 
        t.id === editingData.id ? editingData : t
      ));
      setIsEditing(null);
      setEditingData(null);
    }
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditingData(null);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const toggleActive = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Customer Testimonials</h3>
        <p className="text-sm text-muted-foreground">
          Manage customer reviews and testimonials displayed on your website.
        </p>
      </div>

      {/* Add New Testimonial */}
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
          <Button onClick={addTestimonial} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </CardContent>
      </Card>

      {/* Existing Testimonials */}
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{testimonial.name}</CardTitle>
                  <div className="flex items-center">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={testimonial.isActive}
                    onCheckedChange={() => toggleActive(testimonial.id)}
                  />
                  <Label>Active</Label>
                  {isEditing === testimonial.id ? (
                    <div className="flex gap-2">
                      <Button onClick={saveEdit} size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => startEditing(testimonial)} variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => removeTestimonial(testimonial.id)} variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing === testimonial.id && editingData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editingData.name}
                        onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={editingData.location}
                        onChange={(e) => setEditingData({ ...editingData, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={editingData.image}
                      onChange={(e) => setEditingData({ ...editingData, image: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Select 
                      value={editingData.rating.toString()} 
                      onValueChange={(value) => setEditingData({ ...editingData, rating: parseInt(value) })}
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
                    <Label>Testimonial</Label>
                    <Textarea
                      value={editingData.comment}
                      onChange={(e) => setEditingData({ ...editingData, comment: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-sm">{testimonial.comment}</p>
                  {testimonial.image && (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save All Testimonials
      </Button>
    </div>
  );
}
