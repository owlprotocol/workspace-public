export interface CouponInstance {
    readonly id: string;
    readonly couponDefinition: string;
    // The user that received the coupon
    readonly owner: string;
    readonly redeemed: boolean;
    readonly createdAt: Date;
    // Store where the coupon can be redeemed
    readonly couponProject: string;
    // The id of the Shopify order that generated the coupon
    readonly shopifyOrderId: string;
    // Store that executed the order
    readonly orderProject: string;
}
