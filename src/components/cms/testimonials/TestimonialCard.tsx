
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Save, X, Star } from "lucide-react";
import TestimonialEditForm from "./TestimonialEditForm";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isEditing: boolean;
  editingData: Testimonial | null;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditChange: (testimonial: Testimonial) => void;
  onToggleActive: () => void;
  onRemove: () => void;
}

export default function TestimonialCard({
  testimonial,
  isEditing,
  editingData,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditChange,
  onToggleActive,
  onRemove
}: TestimonialCardProps) {
  return (
    <Card>
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
              onCheckedChange={onToggleActive}
            />
            <Label>Active</Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Button onClick={onSaveEdit} size="sm">
                  <Save className="h-4 w-4" />
                </Button>
                <Button onClick={onCancelEdit} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button onClick={onStartEdit} variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={onRemove} variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && editingData ? (
          <TestimonialEditForm 
            testimonial={editingData}
            onChange={onEditChange}
          />
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
  );
}
