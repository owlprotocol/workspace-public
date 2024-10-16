import { getCloneDeterministicBytecode, getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, encodeFunctionData, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { initialize as initializeAbi } from "../artifacts/HypNative.js";

export async function getOrDeployHypNativeProxy(
    client: Client<Transport, Chain, Account>,
    parameters: {
        hypNativeImplAddress: Address;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const {
        hypNativeImplAddress,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
        salt = zeroHash,
    } = parameters;
    const deployNative = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: getCloneDeterministicBytecode(hypNativeImplAddress),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [hookAddress, ismAddress, owner],
            }),
            salt,
        },
    ]);

    const native = deployNative.addresses[0];
    return { hash: deployNative.hash, address: native.address, exists: native.exists };
}
