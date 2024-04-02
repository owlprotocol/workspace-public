import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { ProjectTemplate } from "../models/ProjectTemplate.js";

export const projectTemplateZod = z
    .object({
        id: z.string().describe("id"),
        name: z.string().describe("name"),
        description: z.string().describe("description"),
        imgUrl: z.string().describe("image url"),
    })
    .describe("project");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type ProjectTemplateZodInferred = Readonly<z.infer<typeof projectTemplateZod>>;
expectType<TypeEqual<ProjectTemplate, ProjectTemplateZodInferred>>(true);
