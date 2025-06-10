
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NavigationText {
  bookNow: string;
  backToHome: string;
}

interface NavigationTextEditorProps {
  navigationText: NavigationText;
  onUpdate: (navigationText: NavigationText) => void;
}

export default function NavigationTextEditor({ navigationText, onUpdate }: NavigationTextEditorProps) {
  const updateText = (field: keyof NavigationText, value: string) => {
    onUpdate({
      ...navigationText,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Book Now</Label>
          <Input
            value={navigationText.bookNow}
            onChange={(e) => updateText('bookNow', e.target.value)}
          />
        </div>
        <div>
          <Label>Back to Home</Label>
          <Input
            value={navigationText.backToHome}
            onChange={(e) => updateText('backToHome', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
