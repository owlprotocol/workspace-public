export interface CouponCampaign {
    readonly id: string;
    readonly name: string;
    readonly project: string;
    readonly description?: string;
    readonly status: "active" | "inactive";
}
