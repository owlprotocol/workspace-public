import { Address, ByteArray, Hex, getCreate2Address } from "viem";
import { DETERMINISTIC_DEPLOYER_ADDRESS } from "./constants.js";

export function getDeployDeterministicAddress(
    args:
        | {
              bytecode: ByteArray | Hex;
              salt: ByteArray | Hex;
          }
        | {
              bytecodeHash: ByteArray | Hex;
              salt: ByteArray | Hex;
          },
): Address {
    return getCreate2Address({ ...args, from: DETERMINISTIC_DEPLOYER_ADDRESS });
}
