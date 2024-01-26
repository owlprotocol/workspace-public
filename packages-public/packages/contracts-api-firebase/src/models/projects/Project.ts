export interface ProjectData {
    readonly owner: string;
    readonly name: string;
    totalAppUsers: number;
    readonly description?: string;
    // TODO: Move to a proper object when using shopify
    // readonly store?: string;
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

export interface Project extends ProjectData {
    readonly id: string;
}
