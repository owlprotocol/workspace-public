import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { addressZod } from "@owlprotocol/zod-sol";
import type { TokenLazyMintReadOnly } from "../../models/tokens/TokenLazyMint.js";

export const tokenLazyMintReadOnlyZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        networkId: z.string().describe("networkId"),
        tokenAddress: addressZod.describe("token address"),
        tokenId: z.string().describe("token id"),
        tokenAmount: z.string().describe("token amount"),
        to: addressZod.describe("to"),
        status: z.enum(["created", "mintPending", "mintConfirmed"]),
    })
    .describe("token lazy mint");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type TokenLazyMintReadOnlyZodInferred = Readonly<z.infer<typeof tokenLazyMintReadOnlyZod>>;
expectType<TypeEqual<TokenLazyMintReadOnly, TokenLazyMintReadOnlyZodInferred>>(true);
