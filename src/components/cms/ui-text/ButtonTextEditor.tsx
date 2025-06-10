
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ButtonText {
  viewDetails: string;
  bookNow: string;
  learnMore: string;
  contactUs: string;
  readMore: string;
  showMore: string;
  showLess: string;
}

interface ButtonTextEditorProps {
  buttonText: ButtonText;
  onUpdate: (buttonText: ButtonText) => void;
}

export default function ButtonTextEditor({ buttonText, onUpdate }: ButtonTextEditorProps) {
  const updateText = (field: keyof ButtonText, value: string) => {
    onUpdate({
      ...buttonText,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Button Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>View Details</Label>
            <Input
              value={buttonText.viewDetails}
              onChange={(e) => updateText('viewDetails', e.target.value)}
            />
          </div>
          <div>
            <Label>Book Now</Label>
            <Input
              value={buttonText.bookNow}
              onChange={(e) => updateText('bookNow', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Learn More</Label>
            <Input
              value={buttonText.learnMore}
              onChange={(e) => updateText('learnMore', e.target.value)}
            />
          </div>
          <div>
            <Label>Contact Us</Label>
            <Input
              value={buttonText.contactUs}
              onChange={(e) => updateText('contactUs', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
