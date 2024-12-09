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
    params: { address: Address },
): Promise<{ domain: number; router: Hex; wrappedTokenAddress?: Address }[]> {
    const { address } = params;

    const tokenA = padHex(address, { size: 32 });

    const chainA = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

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

    const domains: number[] = [
        ...(await readContract(client, {
            address,
            abi: Router.abi,
            functionName: "domains",
        })),
    ];

    const promises = domains.map((domain) =>
        readContract(client, {
            address,
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

    const tokenRouters: HyperlaneWarpRouteData[] = routes.flatMap(({ domain, router }) => [
        {
            wrappedTokenAddress,
            chainA,
            tokenA,
            chainB: domain,
            tokenB: router,
        },
        {
            wrappedTokenAddress,
            chainA: domain,
            tokenA: router,
            chainB: chainA,
            tokenB: tokenA,
        },
    ]);

    await hyperlaneWarpRouteResource.setBatch(tokenRouters);

    return routes;
}
