import { addressZod } from "@owlprotocol/zod-sol";
import { TypeEqual, expectType } from "ts-expect";
import { z } from "zod";
import { AddressPublic, AddressPersonal } from "../../models/ethmodels/Address.js";

export const addressPublicZod = z.object({
    id: z.string().describe("id"),
    networkId: z.string().describe("networkId"),
    address: addressZod,
    ens: z.string().describe("ens").optional(),
});

type AddressPublicZodInferred = Readonly<z.infer<typeof addressPublicZod>>;
expectType<TypeEqual<AddressPublic, AddressPublicZodInferred>>(true);

export const addressPersonalZod = z.object({
    id: z.string().describe("id"),
    networkId: z.string().describe("networkId"),
    address: addressZod,
    owner: z.string().describe("owner"),
    name: z.string().describe("name"),
});

type AddressPersonalZodInferred = Readonly<z.infer<typeof addressPersonalZod>>;
expectType<TypeEqual<AddressPersonal, AddressPersonalZodInferred>>(true);
