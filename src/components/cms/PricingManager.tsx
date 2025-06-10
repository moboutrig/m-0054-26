
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, DollarSign } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

interface PricingInfo {
  roomId: string;
  basePrice: number;
  currency: string;
  seasonalRates: { season: string; multiplier: number }[];
}

export default function PricingManager() {
  const { content, updatePricing } = useCMS();
  const { toast } = useToast();
  const [pricing, setPricing] = useState<PricingInfo[]>(content.pricing);

  const roomTypes = [
    { id: "1", name: "Deluxe Apartment" },
    { id: "2", name: "Studio Suite" },
    { id: "3", name: "Premium Room" },
    { id: "4", name: "Ocean View Suite" },
    { id: "5", name: "Standard Room" },
    { id: "6", name: "Luxury Suite" }
  ];

  const currencies = ["EUR", "USD", "GBP"];

  const handleSave = () => {
    updatePricing(pricing);
    toast({
      title: "Pricing Updated",
      description: "Room pricing has been saved successfully.",
    });
  };

  const updateRoomPrice = (roomId: string, basePrice: number) => {
    setPricing(pricing.map(p => 
      p.roomId === roomId ? { ...p, basePrice } : p
    ));
  };

  const updateRoomCurrency = (roomId: string, currency: string) => {
    setPricing(pricing.map(p => 
      p.roomId === roomId ? { ...p, currency } : p
    ));
  };

  const addSeasonalRate = (roomId: string) => {
    setPricing(pricing.map(p => 
      p.roomId === roomId 
        ? { 
            ...p, 
            seasonalRates: [...p.seasonalRates, { season: "New Season", multiplier: 1.0 }] 
          } 
        : p
    ));
  };

  const removeSeasonalRate = (roomId: string, seasonIndex: number) => {
    setPricing(pricing.map(p => 
      p.roomId === roomId 
        ? { 
            ...p, 
            seasonalRates: p.seasonalRates.filter((_, i) => i !== seasonIndex) 
          } 
        : p
    ));
  };

  const updateSeasonalRate = (roomId: string, seasonIndex: number, field: 'season' | 'multiplier', value: string | number) => {
    setPricing(pricing.map(p => 
      p.roomId === roomId 
        ? { 
            ...p, 
            seasonalRates: p.seasonalRates.map((rate, i) => 
              i === seasonIndex ? { ...rate, [field]: value } : rate
            )
          } 
        : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5" />
        <div>
          <h3 className="text-lg font-semibold">Room Pricing</h3>
          <p className="text-sm text-muted-foreground">
            Set base prices and seasonal rates for each room type.
          </p>
        </div>
      </div>

      {roomTypes.map((room) => {
        const roomPricing = pricing.find(p => p.roomId === room.id);
        if (!roomPricing) return null;

        return (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Base Price</Label>
                  <Input
                    type="number"
                    value={roomPricing.basePrice}
                    onChange={(e) => updateRoomPrice(room.id, parseFloat(e.target.value) || 0)}
                    placeholder="150"
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select 
                    value={roomPricing.currency} 
                    onValueChange={(value) => updateRoomCurrency(room.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Seasonal Rates</Label>
                  <Button 
                    onClick={() => addSeasonalRate(room.id)} 
                    variant="outline" 
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Season
                  </Button>
                </div>
                <div className="space-y-2">
                  {roomPricing.seasonalRates.map((rate, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={rate.season}
                        onChange={(e) => updateSeasonalRate(room.id, index, 'season', e.target.value)}
                        placeholder="Season name"
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        value={rate.multiplier}
                        onChange={(e) => updateSeasonalRate(room.id, index, 'multiplier', parseFloat(e.target.value) || 1)}
                        placeholder="1.0"
                        className="w-24"
                      />
                      <Button
                        onClick={() => removeSeasonalRate(room.id, index)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Multiplier: 1.0 = base price, 1.3 = 30% increase, 0.8 = 20% decrease
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Button onClick={handleSave} className="w-full">
        Save Pricing Settings
      </Button>
    </div>
  );
}
