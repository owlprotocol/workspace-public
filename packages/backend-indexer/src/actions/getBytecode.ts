import { EthBytecodeDecoded, ethBytecodeResource } from "@owlprotocol/eth-firebase/admin";
import { Chain, Client, Transport, GetBytecodeParameters, GetBytecodeReturnType } from "viem";
import { getBlockNumber, getChainId, getBytecode as getBytecodeViem } from "viem/actions";
import { getAction, keccak256 } from "viem/utils";

/**
 * Retrieves the bytecode at an address.
 *
 * - Docs: https://viem.sh/docs/contract/getCode
 * - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)
 *
 * @param client - Client to use
 * @param parameters - {@link GetCodeParameters}
 * @returns The contract's bytecode. {@link GetCodeReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBytecode } from 'viem/actions'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const code = await getBytecode(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 * })
 */
export async function getBytecode<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: GetBytecodeParameters,
): Promise<GetBytecodeReturnType> {
    const { address, blockNumber, blockTag = "latest" } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    let bytecodeIndexed: EthBytecodeDecoded | null = null;
    if (!blockNumber && blockTag === "latest") {
        bytecodeIndexed = await ethBytecodeResource.getOrNull({ chainId, address });
    }

    if (bytecodeIndexed) {
        if (
            (blockNumber && bytecodeIndexed.blockNumber <= blockNumber) ||
            blockTag === "latest" ||
            blockTag === "finalized"
        ) {
            // Bytecode cached
            //TODO: Fix this. Inconsistent behaviour as returning bytecode hash instead of bytecode
            //We store bytecodeHash as it is much more compact then storing full bytecode
            //Main use case for eth_getCode is to check if contract exists
            return bytecodeIndexed.bytecodeHash;
        }

        // Return older state
        return getBytecodeViem(client, params);
    }

    const bytecodeViem = await getBytecodeViem(client, params);
    let blockNumberCache = blockNumber;
    if (!blockNumberCache) {
        blockNumberCache = await getAction(client, getBlockNumber, "getBlockNumber")({});
    }

    if (bytecodeViem) {
        //Non empty-result, update cached earliers block
        //TODO: Seems like need to await for write to confirm?
        await ethBytecodeResource.upsert({
            chainId,
            address,
            blockNumber: blockNumberCache,
            bytecodeHash: keccak256(bytecodeViem),
        });
    }

    return bytecodeViem;
}
