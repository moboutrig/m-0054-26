
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

interface TestimonialEditFormProps {
  testimonial: Testimonial;
  onChange: (testimonial: Testimonial) => void;
}

export default function TestimonialEditForm({ testimonial, onChange }: TestimonialEditFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            value={testimonial.name}
            onChange={(e) => onChange({ ...testimonial, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Location</Label>
          <Input
            value={testimonial.location}
            onChange={(e) => onChange({ ...testimonial, location: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label>Image URL</Label>
        <Input
          value={testimonial.image}
          onChange={(e) => onChange({ ...testimonial, image: e.target.value })}
        />
      </div>
      <div>
        <Label>Rating</Label>
        <Select 
          value={testimonial.rating.toString()} 
          onValueChange={(value) => onChange({ ...testimonial, rating: parseInt(value) })}
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
          value={testimonial.comment}
          onChange={(e) => onChange({ ...testimonial, comment: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}
