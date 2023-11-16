/**
 * Keep track of redemptions of referral links.
 * These can be redeemed when user completes certain action or simply joins app
 */
export interface ReferralRedemptionId {
    id?: string;
}

/**
 * Keep track of redemptions of referral links.
 * These can be redeemed when user completes certain action or simply joins app
 */
export interface ReferralRedemptionData {
    fromReferralUserId: string;
    toReferralUserId: string;
    //Owl Protocol Ids
    fromUserId: string;
    toUserId: string;
    /* Web3 attributes */
    networkId: string;
    address: string;
    tokenId: string;
    txHash?: string;
}

export type ReferralRedemption = Required<ReferralRedemptionId> & ReferralRedemptionData;
