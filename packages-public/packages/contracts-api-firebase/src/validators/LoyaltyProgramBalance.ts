import { z } from "zod";

export const loyaltyProgramBalanceZod = z.object({
    projectId: z.string().describe("the project id of the loyalty program"),
    id: z.string().describe("token id associated with the loyalty card"),
    points: z.number().nonnegative().describe("points balance"),
});
