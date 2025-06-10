import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, Settings } from "lucide-react";
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

  const updateSetting = (field: keyof typeof bookingSettings, value: string | number | boolean) => {
    setBookingSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        <div>
          <h3 className="text-lg font-semibold">Booking Policies</h3>
          <p className="text-sm text-muted-foreground">
            Configure check-in/out times, stay requirements, and policies.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General Booking Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-booking">Enable Booking System</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Show booking buttons and forms on the website
              </p>
            </div>
            <Switch
              id="enable-booking"
              checked={bookingSettings.enableBooking}
              onCheckedChange={(checked) => updateSetting('enableBooking', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Check-in & Check-out Times
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkin-time">Check-in Time</Label>
              <Input
                id="checkin-time"
                type="time"
                value={bookingSettings.checkInTime}
                onChange={(e) => updateSetting('checkInTime', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="checkout-time">Check-out Time</Label>
              <Input
                id="checkout-time"
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
          <CardTitle>Stay Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimum-stay">Minimum Stay (nights)</Label>
              <Input
                id="minimum-stay"
                type="number"
                min="1"
                value={bookingSettings.minimumStay}
                onChange={(e) => updateSetting('minimumStay', parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <Label htmlFor="maximum-stay">Maximum Stay (nights)</Label>
              <Input
                id="maximum-stay"
                type="number"
                min="1"
                value={bookingSettings.maximumStay}
                onChange={(e) => updateSetting('maximumStay', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment & Deposits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="deposit-required">Deposit Required (%)</Label>
            <Input
              id="deposit-required"
              type="number"
              min="0"
              max="100"
              value={bookingSettings.depositRequired}
              onChange={(e) => updateSetting('depositRequired', parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Percentage of total booking amount required as deposit
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cancellation Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
            <Textarea
              id="cancellation-policy"
              value={bookingSettings.cancellationPolicy}
              onChange={(e) => updateSetting('cancellationPolicy', e.target.value)}
              placeholder="Describe your cancellation policy"
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be displayed to customers during booking and in terms of service
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Booking Settings
      </Button>
    </div>
  );
}
