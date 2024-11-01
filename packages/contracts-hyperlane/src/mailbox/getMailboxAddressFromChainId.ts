import { Address } from "viem";
import { GithubRegistry } from "@hyperlane-xyz/registry";
import { ChainMetadata, ChainMap } from "@hyperlane-xyz/sdk";
import { ChainAddresses } from "@hyperlane-xyz/registry";

export const getMailboxAddressFromChainId = async (chainId: number): Promise<Address | null> => {
    const registry = new GithubRegistry();

    const [chainMetadata, chainAddresses] = await Promise.all([
        registry.getMetadata() as Promise<ChainMap<ChainMetadata>>,
        registry.getAddresses() as Promise<ChainMap<ChainAddresses>>,
    ]);

    const chainData = Object.values(chainMetadata).find((chain) => chain.chainId === chainId) as
        | ChainMetadata
        | undefined;

    if (!chainData) return null;

    // Retrieve and return the mailbox address for the chain
    const chainAddress = chainAddresses[chainData.name];
    return (chainAddress?.mailbox as Address) || null;
};
