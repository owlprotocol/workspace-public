/**
 *  Each state-changing operation on Ethereum requires a transaction.
 *
 *  @_section api/transaction:Transactions  [about-transactions]
 */

import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { addressZod } from "../solidity/address.js";
import { bytes32Zod } from "../solidity/bytes.js";

/**
 *  A single [[AccessList]] entry of storage keys (slots) for an address.
 */
export type AccessListEntry = { address: string; storageKeys: Array<string> };
export const accessListEntryZod = z
    .object({
        address: addressZod,
        storageKeys: z.array(bytes32Zod),
    })
    .describe("A single [[AccessList]] entry of storage keys (slots) for an address.");
expectType<TypeEqual<AccessListEntry, z.output<typeof accessListEntryZod>>>(true);

/**
 *  An ordered collection of [[AccessList]] entries.
 */
export type AccessList = Array<AccessListEntry>;
export const acessListZod = z.array(accessListEntryZod).describe("An ordered collection of [[AccessList]] entries.");
expectType<TypeEqual<AccessList, z.output<typeof acessListZod>>>(true);
