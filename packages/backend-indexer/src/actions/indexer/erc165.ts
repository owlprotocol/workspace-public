import { Client, Chain, Hash, Transport, Address } from "viem";
import { getChainId, readContract } from "viem/actions";
import { erc165SupportsInterfaceResource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";

/**
 * Check if a contract supports an ERC165 interface.
 * @param client publicClient
 * @param address The contract address to check.
 * @param interfaceId The ERC165 interface ID.
 * @returns Whether the contract supports the given interface.
 */
export async function checkERC165InterfaceSupport<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    address: Address,
    interfaceId: Hash,
) {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
    const cached = await erc165SupportsInterfaceResource.getOrNull({ chainId, address, interfaceId });
    if (cached) {
        return cached.supported;
    }

    const result = await readContract(client, {
        address,
        abi: [
            {
                constant: true,
                inputs: [{ name: "interfaceId", type: "bytes4" }],
                name: "supportsInterface",
                outputs: [{ name: "", type: "bool" }],
                type: "function",
            },
        ],
        functionName: "supportsInterface",
        args: [interfaceId],
    });

    const supported = Boolean(result);

    await erc165SupportsInterfaceResource.upsert({
        chainId,
        address,
        interfaceId,
        supported,
    });

    return supported;
}
