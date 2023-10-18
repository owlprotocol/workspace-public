export interface UserData {
    readonly email: string;
    readonly type?: "dev" | "user";
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

export interface User extends UserData {
    readonly id: string;
}
