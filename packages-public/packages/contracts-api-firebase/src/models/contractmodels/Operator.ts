/**
 * Operator security model refers to a user giving full access to a smart contract
 * This model is used by ERC721/ERC1155
 */
/** Operator id components */
export interface OperatorId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly owner: string;
    readonly operator: string;
}

export interface Operator extends OperatorId {
    readonly approved: boolean;
}

export function getOperatorId({ networkId, address, owner, operator }: OperatorId): string {
    return [networkId, address, owner, operator].join("-");
}

export function getOperatorIdParams(id: string): OperatorId {
    const [networkId, address, owner, operator] = id.split("-");
    return {
        networkId,
        address,
        owner,
        operator,
    };
}
