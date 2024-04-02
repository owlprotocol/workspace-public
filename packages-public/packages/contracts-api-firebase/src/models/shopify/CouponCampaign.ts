export interface CouponCampaignData {
    readonly projectId: string;
    readonly name?: string;
    readonly description?: string;
    readonly status: "active" | "inactive";
}

export interface CouponCampaign extends CouponCampaignData {
    readonly id: string;
}
