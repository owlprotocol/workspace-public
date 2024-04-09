import { Address } from "abitype";
import { Chain, PublicClient, Transport } from "viem";
import { ownerOf } from "@owlprotocol/contracts-diamond/artifacts/IERC721";
import { ERC721 } from "../models/index.js";
import { EthResources } from "../createIndexerClient.js";

/**
 * Update ERC721 owner if no cached data or stale
 * @param erc721 to update (with blockNumber to compare)
 * @param clients publicClient, erc721Resource
 * @returns
 */
export async function updateERC721Owner(
    {
        address,
        tokenId,
        owner,
        blockNumber,
    }: {
        address: Address;
        tokenId: bigint;
        owner: Address;
        blockNumber: bigint;
    },
    {
        publicClient,
        erc721,
    }: {
        publicClient: PublicClient<Transport, Chain>;
    } & Required<Pick<EthResources, "erc721">>,
): Promise<ERC721> {
    const chainId = publicClient.chain.id;
    //TODO: Warning MUST be `tokenId` should ALWAYS be used as decimal string
    const token = await erc721.getOrNull({ chainId, address, tokenId: tokenId.toString(10) });
    if (!token || (token?.owner != owner && (token.ownerBlockNumber ?? -1) < blockNumber)) {
        //Owner changed and data is stale
        const ownerRpc = await publicClient.readContract({
            address,
            abi: [ownerOf],
            functionName: "ownerOf",
            args: [tokenId],
        });
        const tokenUpdated = {
            chainId,
            address,
            tokenId: tokenId.toString(10),
            owner: ownerRpc,
            ownerBlockNumber: blockNumber,
        };
        erc721.upsert(tokenUpdated);
        return tokenUpdated;
    } else {
        return token;
    }
}
