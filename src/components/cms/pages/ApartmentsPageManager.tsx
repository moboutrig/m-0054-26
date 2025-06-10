
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApartmentsPageContent {
  title: string;
  subtitle: string;
  description: string;
  filters: {
    guests: string;
    location: string;
    priceRange: string;
    anyGuests: string;
    onePlus: string;
    twoPlus: string;
    threePlus: string;
    fourPlus: string;
    anyLocation: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

interface ApartmentsPageManagerProps {
  content: ApartmentsPageContent;
  onUpdate: (content: ApartmentsPageContent) => void;
}

export default function ApartmentsPageManager({ content, onUpdate }: ApartmentsPageManagerProps) {
  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updateFilter = (filterKey: string, value: string) => {
    onUpdate({
      ...content,
      filters: {
        ...content.filters,
        [filterKey]: value
      }
    });
  };

  const updateSEO = (seoKey: string, value: string) => {
    onUpdate({
      ...content,
      seo: {
        ...content.seo,
        [seoKey]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Apartments Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Page Title</Label>
            <Input
              value={content.title}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Our Apartments"
            />
          </div>
          <div>
            <Label>Page Subtitle</Label>
            <Input
              value={content.subtitle}
              onChange={(e) => updateContent('subtitle', e.target.value)}
              placeholder="Find your perfect accommodation"
            />
          </div>
          <div>
            <Label>Page Description</Label>
            <Textarea
              value={content.description}
              onChange={(e) => updateContent('description', e.target.value)}
              placeholder="Detailed description of your apartments and what makes them special..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filter Labels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Guests Filter Label</Label>
              <Input
                value={content.filters.guests}
                onChange={(e) => updateFilter('guests', e.target.value)}
                placeholder="Guests"
              />
            </div>
            <div>
              <Label>Location Filter Label</Label>
              <Input
                value={content.filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                placeholder="Location"
              />
            </div>
          </div>
          <div>
            <Label>Price Range Filter Label</Label>
            <Input
              value={content.filters.priceRange}
              onChange={(e) => updateFilter('priceRange', e.target.value)}
              placeholder="Price Range"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>"Any Guests" Option</Label>
              <Input
                value={content.filters.anyGuests}
                onChange={(e) => updateFilter('anyGuests', e.target.value)}
                placeholder="Any number of guests"
              />
            </div>
            <div>
              <Label>"Any Location" Option</Label>
              <Input
                value={content.filters.anyLocation}
                onChange={(e) => updateFilter('anyLocation', e.target.value)}
                placeholder="Any location"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>"1+" Option</Label>
              <Input
                value={content.filters.onePlus}
                onChange={(e) => updateFilter('onePlus', e.target.value)}
                placeholder="1+"
              />
            </div>
            <div>
              <Label>"2+" Option</Label>
              <Input
                value={content.filters.twoPlus}
                onChange={(e) => updateFilter('twoPlus', e.target.value)}
                placeholder="2+"
              />
            </div>
            <div>
              <Label>"3+" Option</Label>
              <Input
                value={content.filters.threePlus}
                onChange={(e) => updateFilter('threePlus', e.target.value)}
                placeholder="3+"
              />
            </div>
            <div>
              <Label>"4+" Option</Label>
              <Input
                value={content.filters.fourPlus}
                onChange={(e) => updateFilter('fourPlus', e.target.value)}
                placeholder="4+"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Meta Title</Label>
            <Input
              value={content.seo?.metaTitle || ''}
              onChange={(e) => updateSEO('metaTitle', e.target.value)}
              placeholder="Apartments | Your Site Name"
            />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Textarea
              value={content.seo?.metaDescription || ''}
              onChange={(e) => updateSEO('metaDescription', e.target.value)}
              placeholder="Discover our beautiful apartments with stunning views..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
