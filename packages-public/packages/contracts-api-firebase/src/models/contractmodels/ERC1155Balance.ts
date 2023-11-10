/** ERC1155Balance id components */
export interface ERC1155BalanceId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly id: string;
    readonly account: string;
}

export interface ERC1155Balance extends ERC1155BalanceId {
    readonly balance: string;
}

export function getERC1155BalanceId({ networkId, address, id, account }: ERC1155BalanceId): string {
    return [networkId, address, id, account].join("-");
}

export function getERC1155BalanceIdParams(id: string): ERC1155BalanceId {
    const [networkId, address, tokenId, account] = id.split("-");

    return {
        networkId,
        address,
        id: tokenId,
        account,
    };
}
