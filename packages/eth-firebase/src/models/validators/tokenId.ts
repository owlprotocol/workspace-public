import { z } from "zod";

export const tokenIdZod = z.string().regex(/^\d+$/).describe("tokenId");
