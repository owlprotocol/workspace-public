import { z } from "zod";

export interface NetworkId {
    readonly chainId: number;
}
export const chainIdZod = z.number().describe("Network chain id");
export const chainIdZodObject = z.object({ chainId: chainIdZod });

export const chainIdEncodeZod = z
    .union([z.string().regex(/^\d+$/), z.object({ chainId: z.number() })])
    .transform((arg) => (typeof arg === "string" ? arg : `${arg.chainId}`));

export const encodeNetworkId: (id: string | NetworkId) => string = chainIdEncodeZod.parse;
export const decodeNetworkId: (id: string) => NetworkId = (id) => {
    return { chainId: parseInt(id) };
};
