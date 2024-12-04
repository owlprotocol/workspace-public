import { Client, Transport, Address, Chain, Hex, zeroAddress } from "viem";
import { readContract, getChainId } from "viem/actions";
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
    params: { address: Address },
): Promise<{ domain: number; router: Hex }[]> {
    const { address: tokenA } = params;

    const chainA = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const domains: number[] = [
        ...(await readContract(client, {
            address: tokenA,
            abi: Router.abi,
            functionName: "domains",
        })),
    ];

    const promises = domains.map((domain) =>
        readContract(client, {
            address: tokenA,
            abi: Router.abi,
            functionName: "routers",
            args: [domain],
        })
            .then((routerAddress: Hex) => (routerAddress !== zeroAddress ? { domain, router: routerAddress } : null))
            .catch((error) => {
                console.error(`Failed to fetch router for domain ${domain}:`, error);
                return null;
            }),
    );

    const results = await Promise.all(promises);

    const routes = results.filter((result): result is { domain: number; router: Hex } => result !== null);

    const tokenRouters = routes.map(({ domain, router }) => ({
        chainA,
        tokenA,
        chainB: domain,
        tokenB: router,
    }));

    await hyperlaneWarpRouteResource.setBatch(tokenRouters);

    return routes;
}
