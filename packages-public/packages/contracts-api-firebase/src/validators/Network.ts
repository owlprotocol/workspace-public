import { z } from "zod";

export const iconZod = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
});

export const chainZod = z
    .object({
        name: z.string(),
        title: z.string().optional(),
        chain: z.string(),
        icon: iconZod.optional(),
        rpc: z.array(z.string()),
        features: z.array(z.object({ name: z.string() })).optional(),
        faucets: z.array(z.string()).optional(),
        nativeCurrency: z.object({
            name: z.string(),
            symbol: z.string(),
            decimals: z.number(),
        }),
        infoURL: z.string().optional(),
        shortName: z.string(),
        chainId: z.number(),
        networkId: z.number().optional(),
        ens: z
            .object({
                registry: z.string(),
            })
            .optional(),
        explorers: z
            .array(
                z.object({
                    name: z.string(),
                    url: z.string(),
                    icon: iconZod.optional(),
                    standard: z.string(),
                }),
            )
            .optional(),
        testnet: z.boolean(),
        slug: z.string(),
        slip44: z.number().optional(),
        status: z.string().optional(),
        redFlags: z.array(z.string()).optional(),
        parent: z.object({
            chain: z.string(),
            type: z.string(),
            bridges: z.array(z.object({ url: z.string() })),
        }),
    })
    .describe("chain");

export const chainWithDataZod = chainZod
    .extend({
        rpcThirdWeb: z.string().optional(),
        rpcAlchemy: z.string().optional(),
        rpcInfura: z.string().optional(),
        rpcAnkr: z.string().optional(),
        rpcPublic: z.string().optional(),
        rpcDefault: z.string().optional(),

        wsThirdWeb: z.string().optional(),
        wsAlchemy: z.string().optional(),
        wsInfura: z.string().optional(),
        wsAnkr: z.string().optional(),
        wsPublic: z.string().optional(),
        wsDefault: z.string().optional(),

        explorerEtherscan: z.string().optional(),
        explorerBlockscout: z.string().optional(),
        explorer: z.string().optional(),
        explorerApi: z.string().optional(),
        explorerApiKey: z.string().optional(),
    })
    .describe("chainWithData");

export const networkZod = chainWithDataZod.extend({
    id: z.string(),
    enabled: z.boolean(),
});
