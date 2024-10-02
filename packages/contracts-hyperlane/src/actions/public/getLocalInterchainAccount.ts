import type { Address, Client } from "viem"
import { readContract } from "viem/actions"
import { getAction, padHex } from "viem/utils"
import {
    getLocalInterchainAccount_uint32_bytes32_bytes32_address as getLocalInterchainAccountAbi,
} from "../../artifacts/InterchainAccountRouter.js";


export type GetLocalInterchainAccountParams = {
    origin: number;
    owner: Address;
    router: Address;
    ism: Address;
}

/**
 * Returns the local interchain account
 *
 * @param client {@link client} that you created using viem's createPublicClient.
 * @param args {@link GetLocalInterchainAccountParams} origin, owner, router, ism
 * @returns Address
 *
 * @example
 * import { createPublicClient } from "viem"
 * import { getAccountNonce } from "@owlprotocol/hyperlane-contracts/actions"
 *
 * const client = createPublicClient({
 *      chain: goerli,
 *      transport: http("https://goerli.infura.io/v3/your-infura-key")
 * })
 *
 * const address = await getLocalInterchainAccount(client, {
 *      origin,
 *      owner,
 *      router,
 *      ism
 * })
 *
 * // Return address
 */
export const getLocalInterchainAccount = async (
    client: Client,
    args: GetLocalInterchainAccountParams
): Promise<Address> => {
    const { origin, router, owner, ism } = args

    const ownerBytes32 = padHex(owner, { size: 32 });
    const routerBytes32 = padHex(router, { size: 32 });

    return await getAction(
        client,
        readContract,
        "readContract"
    )({
        address: router,
        abi: [getLocalInterchainAccountAbi],
        functionName: "getLocalInterchainAccount",
        args: [origin, ownerBytes32, routerBytes32, ism]
    })
}
