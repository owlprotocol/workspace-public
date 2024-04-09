import { Address } from "abitype";
import { Chain, PublicClient, Transport } from "viem";
import { balanceOf } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";
import { ERC1155Balance } from "../models/index.js";
import { EthResources } from "../createIndexerClient.js";

/**
 * Update ERC1155Balance if no cached data or stale
 * @param erc1155Balance to update (with blockNumber to compare)
 * @param clients publicClient, erc1155BalanceResource
 * @returns
 */
export async function updateERC1155Balance(
    {
        address,
        account,
        id,
        blockNumber,
    }: {
        address: Address;
        account: Address;
        id: bigint;
        blockNumber: bigint;
    },
    {
        publicClient,
        erc1155Balance,
    }: {
        publicClient: PublicClient<Transport, Chain>;
    } & Required<Pick<EthResources, "erc1155Balance">>,
): Promise<ERC1155Balance> {
    const chainId = publicClient.chain.id;
    //TODO: Warning MUST be `id` should ALWAYS be used as decimal string
    const balance = await erc1155Balance.getOrNull({ chainId, address, account, id: id.toString(10) });
    if (!balance || balance.blockNumber < blockNumber) {
        //No data or stale data
        const balanceRpc = await publicClient.readContract({
            address,
            abi: [balanceOf],
            functionName: "balanceOf",
            args: [account, id],
        });
        const balanceUpdated = { chainId, address, account, id: id.toString(10), blockNumber, balance: balanceRpc };
        erc1155Balance.upsert(balanceUpdated);
        return balanceUpdated;
    } else {
        return balance;
    }
}
