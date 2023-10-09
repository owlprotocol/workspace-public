import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { Blog } from "../models/Blog.js";

export const blogZod = z
    .object({
        id: z.string().describe("id"),
        title: z.string().describe("title"),
        url: z.string().describe("url"),
        timestamp: z.number().describe("description"),
    })
    .describe("blog");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type BlogZodInferred = Readonly<z.infer<typeof blogZod>>;
expectType<TypeEqual<Blog, BlogZodInferred>>(true);
