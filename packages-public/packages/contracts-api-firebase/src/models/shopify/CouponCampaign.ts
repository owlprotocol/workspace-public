export interface CouponCampaignData {
    readonly owner: string;
    readonly project?: string;
    readonly name?: string;
    readonly description?: string;
    readonly status: "active" | "inactive";
}

export interface CouponCampaign extends CouponCampaignData {
    readonly id: string;
}
