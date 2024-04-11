import { Address } from "abitype";
import { Chain, PublicClient, Transport } from "viem";
import { ownerOf } from "@owlprotocol/contracts-diamond/artifacts/IERC721";
import { tokenURI } from "@owlprotocol/contracts-diamond/artifacts/ITokenURI";
import { ERC721 } from "@owlprotocol/eth-firebase/models";
import { NetworkId } from "@owlprotocol/eth-firebase/models";
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
        const ownerRpcPromise = publicClient.readContract({
            address,
            abi: [ownerOf],
            functionName: "ownerOf",
            args: [tokenId],
        });

        const tokenURIPromise = token?.tokenURI
            ? Promise.resolve(null)
            : publicClient.readContract({
                  address,
                  abi: [tokenURI],
                  functionName: "tokenURI",
                  args: [tokenId],
              });

        //Use allSettled, avoids throwing if any promise rejects
        const [ownerRpcSettled, tokenURIRpcSettled] = await Promise.allSettled([ownerRpcPromise, tokenURIPromise]);
        if (ownerRpcSettled.status === "rejected") {
            //Get owner failed throw, we do not throw if get tokenUri failed (as some ERC721 may not support it)
            throw new Error(ownerRpcSettled.reason);
        }

        const tokenUpdated: ERC721 & NetworkId = {
            chainId,
            address,
            tokenId: tokenId.toString(10),
            owner: ownerRpcSettled.value,
            ownerBlockNumber: blockNumber,
        };
        if (tokenURIRpcSettled.status === "fulfilled" && tokenURIRpcSettled.value) {
            //tokenURI fulfilled, and result not null
            tokenUpdated.tokenURI = tokenURIRpcSettled.value;

            //tokenURI updated, fetch metadata cache
            try {
                const metadataResponse = await fetch(tokenURIRpcSettled.value);
                const metadata = await metadataResponse.json();
                tokenUpdated.metadata = metadata;
                tokenUpdated.metadataUpdatedAt = Date.now();
            } catch (error) {
                console.error(error);
            }
        }

        erc721.upsert(tokenUpdated);
        return tokenUpdated;
    } else {
        return token;
    }
}
