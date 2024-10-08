import { Address, Client, Transport } from "viem";
import { entryPoint07Address, GetSupportedEntryPointsReturnType } from "viem/account-abstraction";

/**
 * Returns the EntryPoints that the bundler supports.
 *
 * - Docs: https://viem.sh/actions/bundler/getSupportedEntryPoints
 *
 * @param client - Client to use
 * @param parameters - {@link GetSupportedEntryPointsParameters}
 * @returns Supported Entry Points. {@link GetSupportedEntryPointsReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getSupportedEntryPoints } from 'viem/actions'
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const addresses = await getSupportedEntryPoints(bundlerClient)
 */
export async function getSupportedEntryPoints(
    client: Client<Transport> & { supportedEntryPoints?: Address[] },
): Promise<GetSupportedEntryPointsReturnType> {
    return client.supportedEntryPoints ?? [entryPoint07Address];
}
