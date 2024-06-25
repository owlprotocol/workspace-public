import { z } from "zod";

export const slugZod = z
    .string()
    .min(4)
    .max(30)
    .toLowerCase()
    .regex(/[a-z0-9-]+/)
    .describe("slug");

export const projectSlugZod = z
    .string()
    .min(4)
    .max(100)
    .toLowerCase()
    .regex(/[a-z0-9-]+/)
    .describe("slug");
