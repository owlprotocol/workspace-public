import { expectType, TypeEqual } from "ts-expect";
import { z } from "zod";
import { Invites } from "../models/Invites.js";

export const invitesZod = z
    .object({
        id: z.string().describe("id"),
        senderEmail: z.string().describe("senderEmail"),
        recipientEmail: z.string().describe("recipientEmail"),
        timestamp: z.number().describe("timestamp"),
    })
    .describe("invites");

type InvitesZodInferred = Readonly<z.infer<typeof invitesZod>>;
expectType<TypeEqual<Invites, InvitesZodInferred>>(true);
