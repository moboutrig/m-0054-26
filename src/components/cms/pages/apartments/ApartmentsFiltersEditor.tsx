
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApartmentsFilters {
  guests: string;
  location: string;
  priceRange: string;
  anyGuests: string;
  onePlus: string;
  twoPlus: string;
  threePlus: string;
  fourPlus: string;
  anyLocation: string;
}

interface ApartmentsFiltersEditorProps {
  filters: ApartmentsFilters;
  onUpdate: (filters: ApartmentsFilters) => void;
}

export default function ApartmentsFiltersEditor({ filters, onUpdate }: ApartmentsFiltersEditorProps) {
  const updateFilter = (filterKey: keyof ApartmentsFilters, value: string) => {
    onUpdate({
      ...filters,
      [filterKey]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Labels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Guests Filter Label</Label>
            <Input
              value={filters.guests}
              onChange={(e) => updateFilter('guests', e.target.value)}
              placeholder="Guests"
            />
          </div>
          <div>
            <Label>Location Filter Label</Label>
            <Input
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              placeholder="Location"
            />
          </div>
        </div>
        <div>
          <Label>Price Range Filter Label</Label>
          <Input
            value={filters.priceRange}
            onChange={(e) => updateFilter('priceRange', e.target.value)}
            placeholder="Price Range"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>"Any Guests" Option</Label>
            <Input
              value={filters.anyGuests}
              onChange={(e) => updateFilter('anyGuests', e.target.value)}
              placeholder="Any number of guests"
            />
          </div>
          <div>
            <Label>"Any Location" Option</Label>
            <Input
              value={filters.anyLocation}
              onChange={(e) => updateFilter('anyLocation', e.target.value)}
              placeholder="Any location"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>"1+" Option</Label>
            <Input
              value={filters.onePlus}
              onChange={(e) => updateFilter('onePlus', e.target.value)}
              placeholder="1+"
            />
          </div>
          <div>
            <Label>"2+" Option</Label>
            <Input
              value={filters.twoPlus}
              onChange={(e) => updateFilter('twoPlus', e.target.value)}
              placeholder="2+"
            />
          </div>
          <div>
            <Label>"3+" Option</Label>
            <Input
              value={filters.threePlus}
              onChange={(e) => updateFilter('threePlus', e.target.value)}
              placeholder="3+"
            />
          </div>
          <div>
            <Label>"4+" Option</Label>
            <Input
              value={filters.fourPlus}
              onChange={(e) => updateFilter('fourPlus', e.target.value)}
              placeholder="4+"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
