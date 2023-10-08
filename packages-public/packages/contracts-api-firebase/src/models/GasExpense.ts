/** Total protocol gas expense daily */
export interface GasExpenseDailyPublic {
    readonly id: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
/** Total protocol gas expense monthly */
export interface GasExpenseMonthlyPublic {
    readonly id: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
/** Organization gas expense daily */
export interface GasExpenseDailyReadOnly {
    readonly id: string;
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
/** Organization gas expense monthly */
export interface GasExpenseMonthlyReadOnly {
    readonly id: string;
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}

/** Organization global gas budget rule to cap user sponsorships */
export interface GasBudgetRuleGlobalReadOnly {
    readonly id: string;
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCostMax: number;
    readonly usdCostRemaining: number;
    readonly usdCostTotal: number;
}

/** Organization gas budget rule by Contract to cap user sponsorships */
export interface GasBudgetRuleByContractReadOnly {
    readonly id: string;
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCostMax: number;
    readonly usdCostRemaining: number;
    readonly usdCostTotal: number;
    /** Target contracts, if undefined,  */
    readonly contracts: {
        [networkId: string]: {
            [address: string]: boolean;
        };
    };
}

//TODO: Add gas budget rules
//- by user
//- by NFT gating
//- by token payment
