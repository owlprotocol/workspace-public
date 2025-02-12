import { Client, Transport, Address, Chain, Hex, zeroAddress, padHex } from "viem";
import { readContract, getChainId } from "viem/actions";
import { Router, HypERC20Collateral } from "@owlprotocol/contracts-hyperlane/artifacts";
import { hyperlaneWarpRouteResource } from "@owlprotocol/eth-firebase/admin";
import { getAction } from "viem/utils";
import { HyperlaneWarpRouteData } from "@owlprotocol/eth-firebase/admin";

/**
 * Fetch and upload all Hyperlane Warp Routes for a specific Router contract.
 * @param client publicClient
 * @param params Object containing the Router contract's address.
 * @returns A list of token routes as { domain: number; router: Hex }[].
 */
export async function getHyperlaneRoutes<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: { address: Address; chainIds: number[] },
): Promise<{ domain: number; router: Hex; wrappedTokenAddress?: Address }[]> {
    const { address, chainIds } = params;

    let routes: { domain: number; router: Hex }[] = [];

    const tokenA = padHex(address, { size: 32 });

    const chainA = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    routes.push({ domain: chainA, router: tokenA });

    let wrappedTokenAddress: Address | undefined;
    try {
        wrappedTokenAddress = await readContract(client, {
            address,
            abi: HypERC20Collateral.abi,
            functionName: "wrappedToken",
        });
    } catch (error) {
        console.warn(`Failed to fetch wrapped token for router ${address}:`, error);
    }

    const domains = await readContract(client, {
        address,
        abi: Router.abi,
        functionName: "domains",
    });

    const invalidDomains = domains.filter((domain) => !chainIds.includes(domain, 1));
    if (invalidDomains.length > 0) {
        throw new Error(`Invalid domains found: ${invalidDomains.join(", ")}.`);
    }

    const routerResults = await Promise.all(
        domains.map((domain) =>
            readContract(client, {
                address,
                abi: Router.abi,
                functionName: "routers",
                args: [domain],
            })
                .then((routerAddress) => (routerAddress !== zeroAddress ? { domain, router: routerAddress } : null))
                .catch((error) => {
                    console.error(`Failed to fetch router for domain ${domain}:`, error);
                    return null;
                }),
        ),
    );

    const validRouterResults = routerResults.filter(
        (result): result is { domain: number; router: Hex } => result !== null,
    );
    routes = routes.concat(validRouterResults);

    const tokenRouters: HyperlaneWarpRouteData[] = [];
    for (let i = 0; i < routes.length; i++) {
        for (let j = i + 1; j < routes.length; j++) {
            const { domain: chainA, router: tokenA } = routes[i];
            const { domain: chainB, router: tokenB } = routes[j];

            tokenRouters.push({
                wrappedTokenAddress: chainA === chainIds[0] ? wrappedTokenAddress : undefined,
                chainA,
                tokenA,
                chainB,
                tokenB,
            });

            tokenRouters.push({
                wrappedTokenAddress: chainB === chainIds[0] ? wrappedTokenAddress : undefined,
                chainA: chainB,
                tokenA: tokenB,
                chainB: chainA,
                tokenB: tokenA,
            });
        }
    }

    await hyperlaneWarpRouteResource.setBatch(tokenRouters);

    return routes;
}
