
export interface PricingInfo {
  roomId: string;
  basePrice: number;
  currency: string;
  seasonalRates: { season: string; multiplier: number }[];
}
