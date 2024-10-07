import { Address } from "abitype";
import { Chain, Client, Transport } from "viem";
import { ownerOf } from "@owlprotocol/contracts-diamond/artifacts/IERC721";
import { tokenURI } from "@owlprotocol/contracts-diamond/artifacts/ITokenURI";
import { ERC721 } from "@owlprotocol/eth-firebase/models";
import { NetworkId } from "@owlprotocol/eth-firebase/models";
import { erc721Resource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";
import { getChainId, readContract } from "viem/actions";

/**
 * Update ERC721 owner if no cached data or stale
 * @param erc721 to update (with blockNumber to compare)
 * @param clients publicClient, erc721Resource
 * @returns
 */
export async function getERC721Owner<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: {
        address: Address;
        tokenId: bigint;
        owner: Address;
        blockNumber: bigint;
    },
): Promise<ERC721> {
    const { address, tokenId, owner, blockNumber } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //TODO: Warning MUST be `tokenId` should ALWAYS be used as decimal string
    const token = await erc721Resource.getOrNull({ chainId, address, tokenId: tokenId.toString(10) });
    if (!token || (token?.owner != owner && (token.ownerBlockNumber ?? -1) < blockNumber)) {
        //Owner changed and data is stale
        const ownerRpcPromise = readContract(client, {
            address,
            abi: [ownerOf],
            functionName: "ownerOf",
            args: [tokenId],
        });

        const tokenURIPromise = token?.tokenURI
            ? Promise.resolve(null)
            : readContract(client, {
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
                if (metadataResponse.ok) {
                    const metadata = await metadataResponse.json();
                    tokenUpdated.metadata = metadata;
                    tokenUpdated.metadataUpdatedAt = Date.now();
                } else {
                    console.error(
                        `Error fetching metadata for ${JSON.stringify({
                            chainId,
                            address,
                            tokenId,
                        })}`,
                    );
                    console.error(metadataResponse);
                }
            } catch (error) {
                console.error(error);
            }
        }

        await erc721Resource.upsert(tokenUpdated);
        return tokenUpdated;
    } else {
        return token;
    }
}
