
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FilterText {
  clearFilters: string;
  noResults: string;
  noResultsDescription: string;
}

interface FilterTextEditorProps {
  filterText: FilterText;
  onUpdate: (filterText: FilterText) => void;
}

export default function FilterTextEditor({ filterText, onUpdate }: FilterTextEditorProps) {
  const updateText = (field: keyof FilterText, value: string) => {
    onUpdate({
      ...filterText,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter & Search Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Clear Filters Button</Label>
          <Input
            value={filterText.clearFilters}
            onChange={(e) => updateText('clearFilters', e.target.value)}
          />
        </div>
        <div>
          <Label>No Results Message</Label>
          <Input
            value={filterText.noResults}
            onChange={(e) => updateText('noResults', e.target.value)}
          />
        </div>
        <div>
          <Label>No Results Description</Label>
          <Input
            value={filterText.noResultsDescription}
            onChange={(e) => updateText('noResultsDescription', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
