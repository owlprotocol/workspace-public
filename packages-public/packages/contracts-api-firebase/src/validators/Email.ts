import { expectType, TypeEqual } from "ts-expect";
import { z } from "zod";
import { Email } from "../models/Email.js";

export const emailZod = z
    .object({
        id: z.string().describe("id"),
        to: z.array(z.string()).describe("recipients"),
        message: z.object({ subject: z.string().describe("subject"), html: z.string().describe("html") }),
    })
    .describe("email");

//Check zod validator matches interface
type EmailZodInferred = Readonly<z.infer<typeof emailZod>>;
expectType<TypeEqual<Email, EmailZodInferred>>(true);
