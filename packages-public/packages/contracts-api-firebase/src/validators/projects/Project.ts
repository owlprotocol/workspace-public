import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { Project } from "../../models/projects/Project.js";

export const projectZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        name: z.string().describe("name"),
        totalAppUsers: z.number().describe("totalAppUsers"),
        description: z.string().describe("description").optional(),
        // TODO: Move to a proper object when using shopify
        // store: z.string().describe("store").optional(),
        topupTotals: z.record(
            z.string().describe("networkId"),
            z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
        ),
        topupMax: z.record(
            z.string().describe("networkId"),
            z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
        ),
    })
    .describe("project");

type ProjectZodInferred = z.infer<typeof projectZod>;
type ReadonlyProjectZodInferred = Readonly<ProjectZodInferred>;

expectType<
    TypeEqual<
        Omit<Project, "totalAppUsers" | "description">,
        Omit<ReadonlyProjectZodInferred, "totalAppUsers" | "description">
    >
>(true);
