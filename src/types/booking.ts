
export interface BookingSettings {
  enableBooking: boolean;
  minimumStay: number;
  maximumStay: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  depositRequired: number;
}
