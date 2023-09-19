export interface Coupon {
  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly description?: string;
  readonly status: "active" | "inactive";
  readonly discount: number;
  readonly payout: number;
}
