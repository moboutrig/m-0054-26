
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function BookingSettings() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [bookingSettings, setBookingSettings] = useState(content.bookingSettings);

  const handleSave = () => {
    updateContent('bookingSettings', bookingSettings);
    toast({
      title: "Booking Settings Updated",
      description: "Booking policies have been saved successfully.",
    });
  };

  const updateSetting = (field: keyof typeof bookingSettings, value: any) => {
    setBookingSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Booking Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure booking policies, check-in/out times, and deposit requirements.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stay Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimum-stay">Minimum Stay (nights)</Label>
              <Input
                id="minimum-stay"
                type="number"
                value={bookingSettings.minimumStay}
                onChange={(e) => updateSetting('minimumStay', parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="maximum-stay">Maximum Stay (nights)</Label>
              <Input
                id="maximum-stay"
                type="number"
                value={bookingSettings.maximumStay}
                onChange={(e) => updateSetting('maximumStay', parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check-in/Check-out Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="check-in-time">Check-in Time</Label>
              <Input
                id="check-in-time"
                type="time"
                value={bookingSettings.checkInTime}
                onChange={(e) => updateSetting('checkInTime', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="check-out-time">Check-out Time</Label>
              <Input
                id="check-out-time"
                type="time"
                value={bookingSettings.checkOutTime}
                onChange={(e) => updateSetting('checkOutTime', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment & Cancellation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="deposit-required">Deposit Required (%)</Label>
            <Input
              id="deposit-required"
              type="number"
              value={bookingSettings.depositRequired}
              onChange={(e) => updateSetting('depositRequired', parseInt(e.target.value))}
              min="0"
              max="100"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Percentage of total booking amount required as deposit
            </p>
          </div>
          <div>
            <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
            <Textarea
              id="cancellation-policy"
              value={bookingSettings.cancellationPolicy}
              onChange={(e) => updateSetting('cancellationPolicy', e.target.value)}
              placeholder="Describe your cancellation policy"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Booking Settings
      </Button>
    </div>
  );
}
