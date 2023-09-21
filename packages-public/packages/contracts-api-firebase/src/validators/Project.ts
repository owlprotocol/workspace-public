import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { Project } from "../models/Project.js";

export const projectZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        name: z.string().describe("name"),
        description: z.string().describe("description").optional(),
        store: z.string().describe("store").optional(),
        type: z.enum(["coupon"]).describe("type").optional(),
    })
    .describe("project");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type ProjectZodInferred = Readonly<z.infer<typeof projectZod>>;
expectType<TypeEqual<Project, ProjectZodInferred>>(true);
