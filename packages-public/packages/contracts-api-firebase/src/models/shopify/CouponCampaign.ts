export interface CouponCampaign {
    readonly id: string;
    readonly owner: string;
    readonly project?: string;
    readonly name?: string;
    readonly description?: string;
    readonly status: "active" | "inactive";
}
