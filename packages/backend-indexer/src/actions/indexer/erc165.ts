import { Client, Chain, Hash, Transport, Address } from "viem";
import { getChainId, readContract } from "viem/actions";
import { erc165SupportsInterfaceResource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";

const defaultInterfaceIds: Hash[] = [
    "0x01ffc9a7", // ERC165
    "0x80ac58cd", // ERC721
    "0x5b5e139f", // ERC721 Metadata
    "0x780e9d63", // ERC721 Enumerable
    "0xd9b67a26", // ERC1155
    "0x36372b07", // ERC20
];

/**
 * Check if a contract supports an ERC165 interface.
 * @param client publicClient
 * @param params An object containing the address and interfaceId to check.
 * @returns Whether the contract supports the given interface.
 */
export async function checkERC165InterfaceSupport<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        interfaceId: Hash;
    },
): Promise<boolean> {
    const { address, interfaceId } = params;

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
/**
 * Check if a contract supports multiple ERC165 interfaces.
 * @param client publicClient
 * @param params An object containing the address and interfaceIds to check.
 * @returns An array of supported interfaceIds.
 */
export async function checkERC165InterfaceSupportList<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        interfaceIds?: Hash[];
    },
): Promise<Hash[]> {
    const { address, interfaceIds = defaultInterfaceIds } = params;

    const supportedInterfaces: Hash[] = [];

    for (const interfaceId of interfaceIds) {
        try {
            const supported = await checkERC165InterfaceSupport(client, { address, interfaceId });
            if (supported) {
                supportedInterfaces.push(interfaceId);
            }
        } catch (error) {
            throw new Error(
                `Error checking interface ${interfaceId} for contract ${address}: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`,
            );
        }
    }

    return supportedInterfaces;
}
