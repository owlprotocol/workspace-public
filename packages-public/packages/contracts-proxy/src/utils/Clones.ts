/**
 * Typescript implementation of Clones library pure functions
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol
 */
import { utils } from "ethers";
import { Buffer } from "buffer";
import { computeAddress } from "./Create2.js";

export function getCloneDeterministicBytecode(implementation: string) {
    const bytecodePrefix = Buffer.from("3d602d80600a3d3981f3363d3d373d3d3d363d73", "hex");
    const bytecodeAddress = Buffer.from(implementation.replace("0x", ""), "hex");
    const bytecodeSuffix = Buffer.from("5af43d82803e903d91602b57fd5bf3", "hex");
    const bytecode = Buffer.concat([bytecodePrefix, bytecodeAddress, bytecodeSuffix]);
    return bytecode;
}

export function predictDeterministicAddress(implementation: string, salt: string, deployer: string): string {
    const bytecode = getCloneDeterministicBytecode(implementation);
    const bytecodeHash = utils.keccak256(bytecode);
    return computeAddress(salt, bytecodeHash, deployer);
}
