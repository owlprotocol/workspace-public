export interface CouponItem {
  readonly id: string;
  readonly projectId: string;
  readonly couponId: string;
  readonly tokenId: string;
  readonly minterUserId: string;
  readonly customerId: string;
  readonly description?: string;
}