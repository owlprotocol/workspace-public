/** ERC20Allowance id components */
export interface ERC20AllowanceId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly account: string;
    readonly spender: string;
}

export interface ERC20Allowance extends ERC20AllowanceId {
    readonly balance: string;
}

export function getERC20AllowanceId({ networkId, address, account, spender }: ERC20AllowanceId): string {
    return [networkId, address, account, spender].join("-");
}

export function getERC20AllowanceIdParams(id: string): ERC20AllowanceId {
    const [networkId, address, account, spender] = id.split("-");
    return { networkId, address, account, spender };
}
