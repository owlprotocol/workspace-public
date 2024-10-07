import { Address } from "abitype";
import { Chain, Client, Transport } from "viem";
import { getAction } from "viem/utils";
import { getChainId, readContract } from "viem/actions";
import { balanceOf } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";
import { ERC1155Balance } from "@owlprotocol/eth-firebase/models";
import { erc1155BalanceResource } from "@owlprotocol/eth-firebase/admin";

/**
 * Update ERC1155Balance if no cached data or stale
 * @param erc1155Balance to update (with blockNumber to compare)
 * @param clients publicClient, erc1155BalanceResource
 * @returns
 */
export async function getERC1155Balance<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        account: Address;
        id: bigint;
        blockNumber: bigint;
    },
): Promise<ERC1155Balance> {
    const { address, account, id, blockNumber } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //TODO: Warning MUST be `id` should ALWAYS be used as decimal string
    const balance = await erc1155BalanceResource.getOrNull({ chainId, address, account, id: id.toString(10) });
    if (!balance || balance.blockNumber < blockNumber) {
        //No data or stale data
        const balanceRpc = await readContract(client, {
            address,
            abi: [balanceOf],
            functionName: "balanceOf",
            args: [account, id],
        });
        const balanceUpdated = { chainId, address, account, id: id.toString(10), blockNumber, balance: balanceRpc };
        await erc1155BalanceResource.upsert(balanceUpdated);
        return balanceUpdated;
    } else {
        return balance;
    }
}
