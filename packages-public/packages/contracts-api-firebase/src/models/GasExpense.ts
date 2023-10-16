/** Total protocol gas expense daily */
export interface GasExpenseDailyPublicData {
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
export interface GasExpenseDailyPublic extends GasExpenseDailyPublicData {
    readonly id: string;
}

/** Total protocol gas expense monthly */
export interface GasExpenseMonthlyPublicData {
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
export interface GasExpenseMonthlyPublic extends GasExpenseMonthlyPublicData {
    readonly id: string;
}

/** Organization gas expense daily */
export interface GasExpenseDailyReadOnlyData {
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
export interface GasExpenseDailyReadOnly extends GasExpenseDailyReadOnlyData {
    readonly id: string;
}

/** Organization gas expense monthly */
export interface GasExpenseMonthlyReadOnlyData {
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCost: number;
}
export interface GasExpenseMonthlyReadOnly extends GasExpenseMonthlyReadOnlyData {
    readonly id: string;
}

/** Organization global gas budget rule to cap user sponsorships */
export interface GasBudgetRuleGlobalReadOnlyData {
    readonly owner: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly usdCostMax: number;
    readonly usdCostRemaining: number;
    readonly usdCostTotal: number;
}
export interface GasBudgetRuleGlobalReadOnly extends GasBudgetRuleGlobalReadOnlyData {
    readonly id: string;
}

/** Organization gas budget rule by Contract to cap user sponsorships */
export interface GasBudgetRuleByContractReadOnlyData {
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
export interface GasBudgetRuleByContractReadOnly extends GasBudgetRuleByContractReadOnlyData {
    readonly id: string;
}

//TODO: Add gas budget rules
//- by user
//- by NFT gating
//- by token payment
