export interface CouponDefinition {
    readonly id: string;
    readonly couponCampaign: string;
    readonly shopifyPriceRuleId: string;
    readonly shopifyDiscounCodeId: string;
    readonly oncePerCustomer: boolean;
    // Must be ERC-1155
    readonly tokenAddress: string;
    readonly tokenId: string;
    readonly promotionCode: string;
    readonly description?: string;
    // TODO: use shopify price_rule.value_type
    readonly discountType?: "fixed_amount" | "percentage";
    readonly discountValue?: number;
}
