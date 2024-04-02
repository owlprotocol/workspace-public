# Referral Model

## Notation

- <subcollection>: Subcollection parameters
- ************************id component: Id components used to generate id************************
- *attribute unique*: Unique attribute
- attribute: Regular attributes in data model

**ReferralCampaign**

***********************General referral campaign, users can generate unique referral links with a code <CAMPAIGN_ID>-<LINK_CODE>***********************

- ****id****
- *campaignCode: 4 letter A-Z (O, Q), 1-9 (TB) 1185921*
- owner
- name

****Web3****

- networkId
- address
- imageDefault

*TBD*

- maxRedemptions: Max number of redemptions
- maxUsers: Max number of users / links to generate

*TBD*

- pointsPerRedemption: Points to give to referrer for existing user (TBD)
- maxRedemptionPerUser: Max number of links a user can redeem. Users can only redeem the same link once (TBD)
- pointsPerUniqueRedemption: Points to give to referrer for unique user (TBD)

******************ReferralUser (in subcollection)******************

******************************************************************************************User acquired through referral campaign, they might have joined an app or accepted a campaign. Each user is assigned a link to share to new users.******************************************************************************************

- <campaignId>
- **id**
- *userCode*
- referrerCode: Initial referrer code
- referrerId: Keep track of first referral (TBD)
- userId: Owl Protocol Id to get user’s web3 info
- points: Points collected by referring new users
- pointsUpdatedAt: When points were last increased

****Web3****

- networkId
- address
- tokenId
- image

**ReferralRedemption (in subcollection)**

*******************************************Keep track of redemptions of referral links. These can be redeemed when user completes certain action or simply joins app.*******************************************

- <campaignId>
- **id**
- fromReferralUser*Id*
- toReferralUserId
- userId: Owl Protocol Id to get user’s web3 info
- timestamp: When redeemed

****Web3****

- networkId
- address
- tokenId
- txHash

## Aggregation

********************************What is my rank?********************************

Gets all users with more points

`ReferrallUsers.where(points > me.points).count()`

`ReferralUsers.where(points == me.points & pointsUpdatedAt < me.pointsUpdatedAt).count()`

**************************************************************What is top 10 users by points?**************************************************************

Sort by highest point, and who reached that earliest.

`ReferallUsers.orderBy(points, “desc”).orderBy(pointsUpdatedAt, "asc").limit(10)`
