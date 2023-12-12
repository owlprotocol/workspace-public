import { z } from "zod";

export const loyaltyProgramBalanceZod = z.object({
    owner: z.string().describe("the loyalty program owner"),
    id: z.string().describe("token id associated with the loyalty card"),
    points: z.number().nonnegative().describe("points balance"),
});
