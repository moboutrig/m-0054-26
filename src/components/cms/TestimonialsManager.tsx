
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import TestimonialsHeader from "./testimonials/TestimonialsHeader";
import AddTestimonialForm from "./testimonials/AddTestimonialForm";
import TestimonialCard from "./testimonials/TestimonialCard";

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

  const handleSave = () => {
    updateTestimonials(testimonials);
    toast({
      title: "Testimonials Updated",
      description: "Customer testimonials have been saved successfully.",
    });
  };

  const addTestimonial = (newTestimonialData: Omit<Testimonial, 'id'>) => {
    const testimonial: Testimonial = {
      id: Date.now().toString(),
      ...newTestimonialData
    };
    
    setTestimonials([...testimonials, testimonial]);
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
      <TestimonialsHeader onSave={handleSave} />

      <AddTestimonialForm onAdd={addTestimonial} />

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isEditing={isEditing === testimonial.id}
            editingData={editingData}
            onStartEdit={() => startEditing(testimonial)}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onEditChange={setEditingData}
            onToggleActive={() => toggleActive(testimonial.id)}
            onRemove={() => removeTestimonial(testimonial.id)}
          />
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save All Testimonials
      </Button>
    </div>
  );
}
