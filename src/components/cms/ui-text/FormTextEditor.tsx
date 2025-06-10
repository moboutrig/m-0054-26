
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormText {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  required: string;
  invalidEmail: string;
}

interface FormTextEditorProps {
  formText: FormText;
  onUpdate: (formText: FormText) => void;
}

export default function FormTextEditor({ formText, onUpdate }: FormTextEditorProps) {
  const updateText = (field: keyof FormText, value: string) => {
    onUpdate({
      ...formText,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name Label</Label>
            <Input
              value={formText.name}
              onChange={(e) => updateText('name', e.target.value)}
            />
          </div>
          <div>
            <Label>Email Label</Label>
            <Input
              value={formText.email}
              onChange={(e) => updateText('email', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Phone Label</Label>
            <Input
              value={formText.phone}
              onChange={(e) => updateText('phone', e.target.value)}
            />
          </div>
          <div>
            <Label>Message Label</Label>
            <Input
              value={formText.message}
              onChange={(e) => updateText('message', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Submit Button</Label>
            <Input
              value={formText.submit}
              onChange={(e) => updateText('submit', e.target.value)}
            />
          </div>
          <div>
            <Label>Required Field Message</Label>
            <Input
              value={formText.required}
              onChange={(e) => updateText('required', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
