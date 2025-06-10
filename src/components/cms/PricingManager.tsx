
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
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

  const roomNames = {
    "1": "Deluxe Sea View Suite",
    "2": "Premium Family Apartment", 
    "3": "Executive Beach Studio",
    "4": "Luxury Penthouse Suite",
    "5": "Classic Double Room",
    "6": "Garden View Apartment"
  };

  const handleSave = () => {
    updatePricing(pricing);
    toast({
      title: "Pricing Updated",
      description: "Room pricing has been saved successfully.",
    });
  };

  const updateRoomPricing = (roomId: string, field: keyof PricingInfo, value: any) => {
    setPricing(prev => prev.map(item => 
      item.roomId === roomId ? { ...item, [field]: value } : item
    ));
  };

  const addSeasonalRate = (roomId: string) => {
    setPricing(prev => prev.map(item => 
      item.roomId === roomId 
        ? { 
            ...item, 
            seasonalRates: [...item.seasonalRates, { season: "New Season", multiplier: 1.0 }]
          }
        : item
    ));
  };

  const updateSeasonalRate = (roomId: string, index: number, field: 'season' | 'multiplier', value: string | number) => {
    setPricing(prev => prev.map(item => 
      item.roomId === roomId 
        ? {
            ...item,
            seasonalRates: item.seasonalRates.map((rate, i) => 
              i === index ? { ...rate, [field]: value } : rate
            )
          }
        : item
    ));
  };

  const removeSeasonalRate = (roomId: string, index: number) => {
    setPricing(prev => prev.map(item => 
      item.roomId === roomId 
        ? {
            ...item,
            seasonalRates: item.seasonalRates.filter((_, i) => i !== index)
          }
        : item
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Room Pricing</h3>
        <p className="text-sm text-muted-foreground">
          Set base prices and seasonal rates for each room type.
        </p>
      </div>

      <div className="space-y-6">
        {pricing.map((room) => (
          <Card key={room.roomId}>
            <CardHeader>
              <CardTitle>{roomNames[room.roomId as keyof typeof roomNames]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`price-${room.roomId}`}>Base Price (per night)</Label>
                  <Input
                    id={`price-${room.roomId}`}
                    type="number"
                    value={room.basePrice}
                    onChange={(e) => updateRoomPricing(room.roomId, 'basePrice', parseFloat(e.target.value))}
                    min="0"
                    step="1"
                  />
                </div>
                <div>
                  <Label htmlFor={`currency-${room.roomId}`}>Currency</Label>
                  <Select
                    value={room.currency}
                    onValueChange={(value) => updateRoomPricing(room.roomId, 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Seasonal Rates</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSeasonalRate(room.roomId)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Season
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {room.seasonalRates.map((rate, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <Input
                          value={rate.season}
                          onChange={(e) => updateSeasonalRate(room.roomId, index, 'season', e.target.value)}
                          placeholder="Season name"
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          value={rate.multiplier}
                          onChange={(e) => updateSeasonalRate(room.roomId, index, 'multiplier', parseFloat(e.target.value))}
                          step="0.1"
                          min="0"
                          placeholder="1.0"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSeasonalRate(room.roomId, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {room.seasonalRates.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No seasonal rates defined. Base price will be used year-round.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Pricing
      </Button>
    </div>
  );
}
