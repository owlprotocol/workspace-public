/**
 * Typescript implementation of Clones library pure functions
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol
 */
import { isAddress, Hex, Address, getContractAddress } from "viem";

const clone1167BytecodePrefix = "3d602d80600a3d3981f3363d3d373d3d3d363d73" as const;
const clone1167BytecodeSuffix = "5af43d82803e903d91602b57fd5bf3" as const;

export function getCloneDeterministicBytecode(implementation: Address): Hex {
    if (!isAddress(implementation)) {
        throw new Error("implementation is not an address");
    }
    const bytesImplementation = implementation.replace("0x", "");

    return `0x${clone1167BytecodePrefix}${bytesImplementation}${clone1167BytecodeSuffix}`;
}

export function predictDeterministicAddress(implementation: Address, salt: Hex, deployer: Address): Address {
    const bytecode = getCloneDeterministicBytecode(implementation);
    return getContractAddress({ opcode: "CREATE2", bytecode, from: deployer, salt });
}
