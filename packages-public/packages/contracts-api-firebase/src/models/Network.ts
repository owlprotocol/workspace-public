export interface NetworkReadonly {
    readonly id: string;
    readonly networkId: string;
    readonly name: string;
    //TODO: Add more
}

export interface NetworkPrivate {
    readonly id: string;
    readonly networkId: string;
    readonly rpc: string;
}
