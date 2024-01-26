import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { ProjectApiKeyPersonal } from "../../models/projects/ProjectApiKeyPersonal.js";

export const projectApiKeyPersonalZod = z
    .object({
        id: z.string().describe("id"),
        projectId: z.string().describe("project id"),
        apiKey: z.string().describe("api key"),
        createdAt: z.number().int().positive().describe("timestamp of project api key creation"),
        expiry: z.number().describe("expiry").optional(),
    })
    .describe("project api key");

type ProjectApiKeyPersonalZodInferred = Readonly<z.infer<typeof projectApiKeyPersonalZod>>;
expectType<TypeEqual<ProjectApiKeyPersonal, ProjectApiKeyPersonalZodInferred>>(true);
