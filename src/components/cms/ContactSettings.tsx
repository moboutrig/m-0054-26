
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCMS } from "@/contexts/CMSContext";

export default function ContactSettings() {
  const { content, updateContent } = useCMS();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="contactAddress">Address</Label>
        <Input
          id="contactAddress"
          value={content.contactAddress}
          onChange={(e) => updateContent('contactAddress', e.target.value)}
          placeholder="Your business address"
        />
      </div>
      <div>
        <Label htmlFor="contactPhone">Phone Number</Label>
        <Input
          id="contactPhone"
          value={content.contactPhone}
          onChange={(e) => updateContent('contactPhone', e.target.value)}
          placeholder="Your phone number"
        />
      </div>
      <div>
        <Label htmlFor="contactEmail">Email Address</Label>
        <Input
          id="contactEmail"
          type="email"
          value={content.contactEmail}
          onChange={(e) => updateContent('contactEmail', e.target.value)}
          placeholder="Your email address"
        />
      </div>
    </div>
  );
}
