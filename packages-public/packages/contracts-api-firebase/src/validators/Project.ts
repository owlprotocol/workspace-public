import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { Project } from "../models/Project.js";

export const projectZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        name: z.string().describe("name"),
        totalAppUsers: z.number().describe("totalAppUsers"),
        description: z.string().describe("description").optional(),
        store: z.string().describe("store").optional(),
        type: z.enum(["coupon"]).describe("type").optional(),
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
