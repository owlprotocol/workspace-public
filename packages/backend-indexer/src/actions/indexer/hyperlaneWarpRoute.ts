import { Client, Transport, Address, Chain, Hex, zeroAddress } from "viem";
import { readContract,getChainId } from "viem/actions";
import { Router } from "@owlprotocol/contracts-hyperlane/artifacts";
import { hyperlaneWarpRouteResource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";

/**
 * Fetch and upload all Hyperlane Warp Routes for a specific Router contract.
 * @param client publicClient
 * @param params Object containing the Router contract's address.
 * @returns A list of token routes as { domain: number; router: Hex }[].
 */
export async function getHyperlaneRoutes<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: { address: Address }
): Promise<{ domain: number; router: Hex }[]> {
    const { address: tokenA } = params;


    const chainA = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));


    const readonlyDomains = await readContract(client, {
        address: tokenA,
        abi: Router.abi,
        functionName: "domains",
    });

    const domains: number[] = [...readonlyDomains];

    const routes: { domain: number; router: Hex }[] = [];

    for (const domain of domains) {
        try {
            const routerAddress: Hex = await readContract(client, {
                address: tokenA,
                abi: Router.abi,
                functionName: "routers",
                args: [domain],
            });

            if (routerAddress !== zeroAddress) {
                routes.push({ domain, router: routerAddress });


                await hyperlaneWarpRouteResource.upsert({
                    chainA,
                    tokenA,
                    chainB: domain,
                    tokenB: routerAddress,
                });
            }
        } catch (error) {
            throw new Error(`Failed to fetch router for domain ${domain}: ${error}`);
        }
    }

    return routes;
}
