
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommonText {
  loading: string;
  error: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  add: string;
  remove: string;
  close: string;
  next: string;
  previous: string;
}

interface CommonTextEditorProps {
  commonText: CommonText;
  onUpdate: (commonText: CommonText) => void;
}

export default function CommonTextEditor({ commonText, onUpdate }: CommonTextEditorProps) {
  const updateText = (field: keyof CommonText, value: string) => {
    onUpdate({
      ...commonText,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Loading</Label>
            <Input
              value={commonText.loading}
              onChange={(e) => updateText('loading', e.target.value)}
            />
          </div>
          <div>
            <Label>Error</Label>
            <Input
              value={commonText.error}
              onChange={(e) => updateText('error', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Save</Label>
            <Input
              value={commonText.save}
              onChange={(e) => updateText('save', e.target.value)}
            />
          </div>
          <div>
            <Label>Cancel</Label>
            <Input
              value={commonText.cancel}
              onChange={(e) => updateText('cancel', e.target.value)}
            />
          </div>
          <div>
            <Label>Edit</Label>
            <Input
              value={commonText.edit}
              onChange={(e) => updateText('edit', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Delete</Label>
            <Input
              value={commonText.delete}
              onChange={(e) => updateText('delete', e.target.value)}
            />
          </div>
          <div>
            <Label>Add</Label>
            <Input
              value={commonText.add}
              onChange={(e) => updateText('add', e.target.value)}
            />
          </div>
          <div>
            <Label>Remove</Label>
            <Input
              value={commonText.remove}
              onChange={(e) => updateText('remove', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
