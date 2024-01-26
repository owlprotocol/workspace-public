export interface LoyaltyProgramBalanceData {
    projectId: string;
    points: number;
}

// id is the token id
export interface LoyaltyProgramBalance extends LoyaltyProgramBalanceData {
    readonly id: string;
}
