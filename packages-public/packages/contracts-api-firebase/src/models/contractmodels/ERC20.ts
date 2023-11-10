/** ERC20 id components */
export interface ERC20Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
}

export interface ERC20 extends ERC20Id {
    readonly name?: string;
    readonly symbol?: string;
    readonly decimals?: number;
    readonly totalSupply?: string;
}

export function getERC20Id({ networkId, address }: ERC20Id): string {
    return [networkId, address].join("-");
}

export function getERC20IdParams(id: string): ERC20Id {
    const [networkId, address] = id.split("-");
    return { networkId, address };
}
