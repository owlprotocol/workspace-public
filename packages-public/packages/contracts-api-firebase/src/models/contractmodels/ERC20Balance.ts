import { addressZod } from "@owlprotocol/zod-sol";

/** ERC20Balance id components */
export interface ERC20BalanceId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly account: string;
}

export interface ERC20Balance extends ERC20BalanceId {
    readonly balance: string;
}

export function getERC20BalanceId({ networkId, address, account }: ERC20BalanceId): string {
    return [networkId, address, account].join("-");
}

export function getERC20BalanceIdParams(id: string): ERC20BalanceId {
    const [networkId, address, account] = id.split("-");
    return {
        networkId,
        address,
        account,
    };
}

export function validateERC20BalanceId({ networkId, address, account }: ERC20BalanceId): ERC20BalanceId {
    return { networkId, address: addressZod.parse(address), account: addressZod.parse(account) };
}
