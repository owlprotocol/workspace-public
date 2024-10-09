import { hexToBytes, toHex } from "viem";
import { DefaultGasOverheads, GasOverheads } from "../models/GasOverheads.js";
import { PackedUserOperation } from "../models/PackedUserOperation.js";
import { packUserOperation } from "../models/PackedUserOperation.js";

/**
 * calculate the preVerificationGas of the given UserOperation
 * preVerificationGas (by definition) is the cost overhead that can't be calculated on-chain.
 * it is based on parameters that are defined by the Ethereum protocol for external transactions.
 * @param userOp filled userOp to calculate. The only possible missing fields can be the signature and preVerificationGas itself
 * @param overheads gas overheads to use, to override the default values
 */
export function calcDefaultPreVerificationGas(
    packedUserOperation: PackedUserOperation,
    overheads?: Partial<GasOverheads>,
): bigint {
    const ov = { ...DefaultGasOverheads, ...(overheads ?? {}) };

    const p = { ...packedUserOperation };
    // Leo: Weird this code doesn't do anything
    // p.preVerificationGas ?? 21000n; // dummy value, just for calldata cost

    //dummy signature if none for more accurate gas estimation
    p.signature = p.signature === "0x" ? toHex(Buffer.alloc(ov.sigSize, 1)) : p.signature;

    const packed = hexToBytes(packUserOperation(p));
    const lengthInWord = (packed.length + 31) / 32;
    const callDataCost = packed.map((x) => (x === 0 ? ov.zeroByte : ov.nonZeroByte)).reduce((sum, x) => sum + x);
    const ret = Math.round(callDataCost + ov.fixed / ov.bundleSize + ov.perUserOp + ov.perUserOpWord * lengthInWord);
    return BigInt(ret);
}
