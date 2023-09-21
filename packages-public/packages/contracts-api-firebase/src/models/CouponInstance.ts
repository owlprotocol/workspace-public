export interface CouponInstance {
    readonly id: string;
    // The user that received the coupon
    readonly owner: string;
    readonly couponDefinition: string;
    readonly redeemed?: boolean;
    readonly minted?: boolean;
    readonly createdAt?: Date;
    // Store where the coupon can be redeemed
    readonly couponStore?: string;
    // The id of the Shopify order that generated the coupon
    readonly shopifyOrderId: string;
    // Store that executed the order
    readonly orderStore?: string;
}
