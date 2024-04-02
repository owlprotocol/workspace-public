/**
 * User acquired through referral campaign, they might have joined an app
 * or accepted a campaign. Each user is assigned a link to share to new users.
 */
export interface ReferralUserId {
    id?: string;
}

/**
 * User acquired through referral campaign, they might have joined an app
 * or accepted a campaign. Each user is assigned a link to share to new users.
 */
export interface ReferralUserData {
    //Initial ReferralUser that referred this user
    fromReferralUserId?: string;
    //letter A-Z (exclude O, Q), 1-9 34^4 = 1185921 combinations
    userCode: string;
    //Owl Protocol Id to get user's web3 info
    userId: string;
    //Points collected by referring new users
    points?: number;
    //When points were last increased
    pointsUpdatedAt?: number;
    /* Web3 attributes */
    networkId: string;
    address: string;
    tokenId: string;
    image?: string;
}

export type ReferralUser = Required<ReferralUserId> & ReferralUserData;
