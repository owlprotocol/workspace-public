import { z } from "zod";
import { bytes32Zod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";
import { uint256Zod } from "../solidity/integer.js";

//Timestamp
export const timestampZod = z.number().describe("timestamp");
//Addresses
export const fromZod = addressZod.describe("from address");
export const toZod = addressZod.describe("to address");
//Block
export const blockNumberZod = z.number().describe("block number");
export const blockHashZod = bytes32Zod.describe("block hash");
export const confirmationsZod = z.number().describe("block confirmations");
//Tx
export const txHashZod = bytes32Zod.describe("transaction hash");
export const txIndexZod = z.number().describe("transaction index");
//Gas
export const gasLimitZod = uint256Zod.describe("gas limit");
export const gasUsedZod = uint256Zod.describe("gas used");
export const cumulativeGasUsedZod = uint256Zod.describe("cumulative gas used");
export const effectiveGasPriceZod = uint256Zod.describe("effective gas price");
