export interface CouponInstance {
    readonly id: string;
    // The user that received the coupon
    readonly owner: string;
    readonly couponDefinition: string;
    redeemed: boolean;
    minted: boolean;
    promotionCode?: string;
    readonly createdAt?: number;
    // Store where the coupon can be redeemed
    readonly couponStore: string;
    // The id of the Shopify order that generated the coupon
    readonly shopifyOrderId: number;
    // Store that executed the order
    readonly orderStore: string;
}
