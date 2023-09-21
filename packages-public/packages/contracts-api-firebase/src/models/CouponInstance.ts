export interface CouponInstance {
    readonly id: string;
    readonly owner: string;
    readonly couponDefinition: string;
    // The user that received the coupon
    readonly redeemed?: boolean;
    readonly createdAt?: Date;
    // Store where the coupon can be redeemed
    readonly couponStore?: string;
    // The id of the Shopify order that generated the coupon
    readonly shopifyOrderId: string;
    // Store that executed the order
    readonly orderStore?: string;
}
