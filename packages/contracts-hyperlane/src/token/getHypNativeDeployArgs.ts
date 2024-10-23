import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypNative, initialize as initializeAbi } from "../artifacts/HypNative.js";

export function getHypNativeDeployArgs(parameters: {
    mailboxAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
}) {
    const { mailboxAddress, hookAddress = zeroAddress, ismAddress = zeroAddress, owner } = parameters;
    return {
        bytecode: encodeDeployData({
            abi: HypNative.abi,
            bytecode: HypNative.bytecode,
            args: [mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: [initializeAbi],
            functionName: "initialize",
            args: [hookAddress, ismAddress, owner],
        }),
    };
}
