/**
 * General referral campaign, users can generate unique referral links
 * with a code <CAMPAIGN_ID>-<LINK_CODE>
 */
export interface ReferralCampaignId {
    id: string;
}

/**
 * General referral campaign, users can generate unique referral links
 * with a code <CAMPAIGN_ID>-<LINK_CODE>
 */
export interface ReferralCampaign {
    //letter A-Z (exclude O, Q), 1-9 34^4 = 1185921 combinations
    campaignCode?: string;
    owner: string;
    name?: string;
    /* Web3 attributes */
    networkId: string;
    address: string;
    imageDefault?: string;
    /* TBD */
    //Max number of redemptions
    //maxRedemptions: number
    //Max number of users / links to generate
    //maxUsers: number
    //Points to give to referrer for existing user
    //pointsPerRedemption: number
    //Max number of links a user can redeem. Users can only redeem the same link once (TBD)
    //maxRedemptionPerUser: number
    //Points to give to referrer for unique user (TBD)
    //pointsPerUniqueRedemption: number
}
