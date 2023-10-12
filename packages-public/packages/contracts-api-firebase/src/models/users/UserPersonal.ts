export interface UserPersonal {
    readonly id: string;
    readonly email: string;
    readonly type?: "dev" | "user";
    readonly apiKey?: string;
    readonly dfnsAddress?: string;
    readonly gnosisAddress: {
        [networkId: string]: string;
    };
    readonly topupTotals: {
        [networkId: string]: {
            [nativeOrERC20Address: string]: string;
        };
    };
    readonly topupMax: {
        [networkId: string]: {
            [nativeOrERC20Address: string]: string;
        };
    };
}