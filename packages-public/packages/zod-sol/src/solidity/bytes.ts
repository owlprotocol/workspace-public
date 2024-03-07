import { z } from "zod";

export const bytesZod = z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/)
    .describe("An arbitrary length byte array");

//TODO: Length checks
export const bytes32Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/)
    .describe("A solidity bytes32");
export const bytes16Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{32}$/)
    .describe("A solidity bytes16");
export const bytes8Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{16}$/)
    .describe("A solidity bytes8");
export const bytes4Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{8}$/)
    .describe("A solidity bytes4");
