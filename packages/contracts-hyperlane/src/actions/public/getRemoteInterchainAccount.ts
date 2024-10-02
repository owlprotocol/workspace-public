import type { Address, Client } from "viem"
import { readContract } from "viem/actions"
import { getAction } from "viem/utils"
import {
        getRemoteInterchainAccount_address_address_address as getRemoteInterchainAccountAbi,
} from "../../artifacts/InterchainAccountRouter.js";

export type GetRemoteInterchainAccountParams = {
    router: Address;
    owner: Address;
    remoteRouter: Address;
    remoteIsm: Address;
}

/**
 * Returns the local interchain account
 *
 * @param client {@link client} that you created using viem's createPublicClient.
 * @param args {@link GetRemoteInterchainAccountParams} router, owner, remoteRouter, remoteIsm
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
 * const address = await getRemoteInterchainAccount(client, {
 *      router,
 *      owner,
 *      remoteRouter,
 *      remoteIsm
 * })
 *
 * // Return address 
 */
export const getRemoteInterchainAccount = async (
    client: Client,
    args: GetRemoteInterchainAccountParams
): Promise<Address> => {
    const { router, owner, remoteRouter, remoteIsm } = args

    return await getAction(
        client,
        readContract,
        "readContract"
    )({
        address: router,
        abi: [getRemoteInterchainAccountAbi],
        functionName: "getRemoteInterchainAccount",
        args: [owner, remoteRouter, remoteIsm]
    })
}
