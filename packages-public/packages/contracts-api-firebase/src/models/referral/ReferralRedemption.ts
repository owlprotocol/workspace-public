/**
 * Keep track of redemptions of referral links.
 * These can be redeemed when user completes certain action or simply joins app
 */
export interface ReferralRedemptionId {
    id: string;
}

/**
 * Keep track of redemptions of referral links.
 * These can be redeemed when user completes certain action or simply joins app
 */
export interface ReferralRedemption {
    fromReferralUserId: string;
    toReferralUserId: string;
    //Owl Protocol Id to get user's web3 info
    userId: string;
    /* Web3 attributes */
    networkId: string;
    address: string;
    tokenId: string;
    txHash?: string;
}
