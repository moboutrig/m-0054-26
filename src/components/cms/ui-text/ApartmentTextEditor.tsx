
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApartmentText {
  perNight: string;
  guests: string;
  sqm: string;
  features: string;
  availability: string;
  checkAvailability: string;
}

interface CurrencySettings {
  symbol: string;
  code: string;
  position: 'before' | 'after';
}

interface ApartmentTextEditorProps {
  apartmentText: ApartmentText;
  currencySettings: CurrencySettings;
  onUpdateApartment: (apartmentText: ApartmentText) => void;
  onUpdateCurrency: (currencySettings: CurrencySettings) => void;
}

export default function ApartmentTextEditor({ 
  apartmentText, 
  currencySettings, 
  onUpdateApartment, 
  onUpdateCurrency 
}: ApartmentTextEditorProps) {
  const updateApartmentText = (field: keyof ApartmentText, value: string) => {
    onUpdateApartment({
      ...apartmentText,
      [field]: value
    });
  };

  const updateCurrencySettings = (field: keyof CurrencySettings, value: any) => {
    onUpdateCurrency({
      ...currencySettings,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apartment & Currency Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Per Night</Label>
            <Input
              value={apartmentText.perNight}
              onChange={(e) => updateApartmentText('perNight', e.target.value)}
            />
          </div>
          <div>
            <Label>Guests</Label>
            <Input
              value={apartmentText.guests}
              onChange={(e) => updateApartmentText('guests', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Square Meters (sqm)</Label>
            <Input
              value={apartmentText.sqm}
              onChange={(e) => updateApartmentText('sqm', e.target.value)}
            />
          </div>
          <div>
            <Label>Features</Label>
            <Input
              value={apartmentText.features}
              onChange={(e) => updateApartmentText('features', e.target.value)}
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-4">Currency Settings</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Currency Symbol</Label>
              <Input
                value={currencySettings.symbol}
                onChange={(e) => updateCurrencySettings('symbol', e.target.value)}
              />
            </div>
            <div>
              <Label>Currency Code</Label>
              <Input
                value={currencySettings.code}
                onChange={(e) => updateCurrencySettings('code', e.target.value)}
              />
            </div>
            <div>
              <Label>Symbol Position</Label>
              <Select 
                value={currencySettings.position} 
                onValueChange={(value: 'before' | 'after') => updateCurrencySettings('position', value)}
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
  );
}
