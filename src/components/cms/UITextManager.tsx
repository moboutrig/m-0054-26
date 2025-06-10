
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function UITextManager() {
  const { content, updateUIText } = useCMS();
  const { toast } = useToast();
  const [uiText, setUIText] = useState(content.uiText);

  const handleSave = () => {
    updateUIText(uiText);
    toast({
      title: "UI Text Updated",
      description: "User interface text has been saved successfully.",
    });
  };

  const updateText = (category: keyof typeof uiText, field: string, value: any) => {
    setUIText(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">UI Text Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage all user interface text, labels, and messages throughout your website.
        </p>
      </div>

      <Tabs defaultValue="navigation" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="common">Common</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="apartment">Apartment</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
        </TabsList>
        
        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Book Now</Label>
                <Input
                  value={uiText.nav.bookNow}
                  onChange={(e) => updateText('nav', 'bookNow', e.target.value)}
                />
              </div>
              <div>
                <Label>Back to Home</Label>
                <Input
                  value={uiText.nav.backToHome}
                  onChange={(e) => updateText('nav', 'backToHome', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="common" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loading</Label>
                  <Input
                    value={uiText.common.loading}
                    onChange={(e) => updateText('common', 'loading', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Error</Label>
                  <Input
                    value={uiText.common.error}
                    onChange={(e) => updateText('common', 'error', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Save</Label>
                  <Input
                    value={uiText.common.save}
                    onChange={(e) => updateText('common', 'save', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cancel</Label>
                  <Input
                    value={uiText.common.cancel}
                    onChange={(e) => updateText('common', 'cancel', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Edit</Label>
                  <Input
                    value={uiText.common.edit}
                    onChange={(e) => updateText('common', 'edit', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Delete</Label>
                  <Input
                    value={uiText.common.delete}
                    onChange={(e) => updateText('common', 'delete', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Add</Label>
                  <Input
                    value={uiText.common.add}
                    onChange={(e) => updateText('common', 'add', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Remove</Label>
                  <Input
                    value={uiText.common.remove}
                    onChange={(e) => updateText('common', 'remove', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buttons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Button Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>View Details</Label>
                  <Input
                    value={uiText.buttons.viewDetails}
                    onChange={(e) => updateText('buttons', 'viewDetails', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Book Now</Label>
                  <Input
                    value={uiText.buttons.bookNow}
                    onChange={(e) => updateText('buttons', 'bookNow', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Learn More</Label>
                  <Input
                    value={uiText.buttons.learnMore}
                    onChange={(e) => updateText('buttons', 'learnMore', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Contact Us</Label>
                  <Input
                    value={uiText.buttons.contactUs}
                    onChange={(e) => updateText('buttons', 'contactUs', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name Label</Label>
                  <Input
                    value={uiText.forms.name}
                    onChange={(e) => updateText('forms', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email Label</Label>
                  <Input
                    value={uiText.forms.email}
                    onChange={(e) => updateText('forms', 'email', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone Label</Label>
                  <Input
                    value={uiText.forms.phone}
                    onChange={(e) => updateText('forms', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Message Label</Label>
                  <Input
                    value={uiText.forms.message}
                    onChange={(e) => updateText('forms', 'message', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Submit Button</Label>
                  <Input
                    value={uiText.forms.submit}
                    onChange={(e) => updateText('forms', 'submit', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Required Field Message</Label>
                  <Input
                    value={uiText.forms.required}
                    onChange={(e) => updateText('forms', 'required', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apartment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apartment & Currency Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Per Night</Label>
                  <Input
                    value={uiText.apartment.perNight}
                    onChange={(e) => updateText('apartment', 'perNight', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Guests</Label>
                  <Input
                    value={uiText.apartment.guests}
                    onChange={(e) => updateText('apartment', 'guests', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Square Meters (sqm)</Label>
                  <Input
                    value={uiText.apartment.sqm}
                    onChange={(e) => updateText('apartment', 'sqm', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Features</Label>
                  <Input
                    value={uiText.apartment.features}
                    onChange={(e) => updateText('apartment', 'features', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Currency Settings</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Currency Symbol</Label>
                    <Input
                      value={uiText.currency.symbol}
                      onChange={(e) => updateText('currency', 'symbol', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Currency Code</Label>
                    <Input
                      value={uiText.currency.code}
                      onChange={(e) => updateText('currency', 'code', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Symbol Position</Label>
                    <Select 
                      value={uiText.currency.position} 
                      onValueChange={(value: 'before' | 'after') => updateText('currency', 'position', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before">Before (€100)</SelectItem>
                        <SelectItem value="after">After (100€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter & Search Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Clear Filters Button</Label>
                <Input
                  value={uiText.filters.clearFilters}
                  onChange={(e) => updateText('filters', 'clearFilters', e.target.value)}
                />
              </div>
              <div>
                <Label>No Results Message</Label>
                <Input
                  value={uiText.filters.noResults}
                  onChange={(e) => updateText('filters', 'noResults', e.target.value)}
                />
              </div>
              <div>
                <Label>No Results Description</Label>
                <Input
                  value={uiText.filters.noResultsDescription}
                  onChange={(e) => updateText('filters', 'noResultsDescription', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save UI Text Settings
      </Button>
    </div>
  );
}
