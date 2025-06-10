
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import NavigationTextEditor from "./ui-text/NavigationTextEditor";
import CommonTextEditor from "./ui-text/CommonTextEditor";
import ButtonTextEditor from "./ui-text/ButtonTextEditor";
import FormTextEditor from "./ui-text/FormTextEditor";
import ApartmentTextEditor from "./ui-text/ApartmentTextEditor";
import FilterTextEditor from "./ui-text/FilterTextEditor";

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

  const updateNavigationText = (nav: typeof uiText.nav) => {
    setUIText(prev => ({ ...prev, nav }));
  };

  const updateCommonText = (common: typeof uiText.common) => {
    setUIText(prev => ({ ...prev, common }));
  };

  const updateButtonText = (buttons: typeof uiText.buttons) => {
    setUIText(prev => ({ ...prev, buttons }));
  };

  const updateFormText = (forms: typeof uiText.forms) => {
    setUIText(prev => ({ ...prev, forms }));
  };

  const updateApartmentText = (apartment: typeof uiText.apartment) => {
    setUIText(prev => ({ ...prev, apartment }));
  };

  const updateCurrencySettings = (currency: typeof uiText.currency) => {
    setUIText(prev => ({ ...prev, currency }));
  };

  const updateFilterText = (filters: typeof uiText.filters) => {
    setUIText(prev => ({ ...prev, filters }));
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
          <NavigationTextEditor
            navigationText={uiText.nav}
            onUpdate={updateNavigationText}
          />
        </TabsContent>

        <TabsContent value="common" className="space-y-4">
          <CommonTextEditor
            commonText={uiText.common}
            onUpdate={updateCommonText}
          />
        </TabsContent>

        <TabsContent value="buttons" className="space-y-4">
          <ButtonTextEditor
            buttonText={uiText.buttons}
            onUpdate={updateButtonText}
          />
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <FormTextEditor
            formText={uiText.forms}
            onUpdate={updateFormText}
          />
        </TabsContent>

        <TabsContent value="apartment" className="space-y-4">
          <ApartmentTextEditor
            apartmentText={uiText.apartment}
            currencySettings={uiText.currency}
            onUpdateApartment={updateApartmentText}
            onUpdateCurrency={updateCurrencySettings}
          />
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <FilterTextEditor
            filterText={uiText.filters}
            onUpdate={updateFilterText}
          />
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save UI Text Settings
      </Button>
    </div>
  );
}
