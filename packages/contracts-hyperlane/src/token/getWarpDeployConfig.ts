import { type WarpCoreConfig, TokenConfigSchema, TokenStandard } from "@hyperlane-xyz/sdk";
import { type Address } from "viem";
import { z } from "zod";

type TokenConfig = {
    standard: TokenStandard;
    routerAddress: Address;
    erc20Address?: Address;
    decimals: number;
    name: string;
    symbol: string;
    chainName: string;
    connectedRouters: { chainName: string; routerAddress: Address }[];
};

export function getWarpDeployConfigForTokens(tokenConfigs: TokenConfig[]): WarpCoreConfig {
    const tokens = tokenConfigs.map(
        ({ standard, routerAddress, erc20Address, decimals, name, symbol, chainName, connectedRouters }) => {
            return {
                standard,
                addressOrDenom: routerAddress,
                collateralAddressOrDenom: erc20Address,
                decimals,
                name,
                symbol,
                chainName,
                connections: connectedRouters.map((connection) => ({
                    token: `ethereum|${connection.chainName}|${connection.routerAddress}`,
                })),
            } satisfies z.infer<typeof TokenConfigSchema>;
        },
    );

    return { tokens };
}
