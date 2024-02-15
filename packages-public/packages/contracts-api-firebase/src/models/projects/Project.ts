export interface ProjectData {
    owner: string;
    name: string;
    totalAppUsers: number;
    description?: string;
    // TODO: Move to a proper object when using shopify
    //  store?: string;
    topupTotals: {
        [networkId: string]: {
            [nativeOrERC20Address: string]: string;
        };
    };
    topupMax: {
        [networkId: string]: {
            [nativeOrERC20Address: string]: string;
        };
    };
    authorizedDomains?: string[];
}

export interface Project extends ProjectData {
    id: string;
}
