import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypERC4626Collateral, initialize as initializeAbi } from "../artifacts/HypERC4626Collateral.js";

export function getHypERC4626CollateralDeployArgs(parameters: {
    vault: Address;
    mailboxAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
}) {
    const { vault, mailboxAddress, hookAddress = zeroAddress, ismAddress = zeroAddress, owner } = parameters;
    return {
        bytecode: encodeDeployData({
            abi: HypERC4626Collateral.abi,
            bytecode: HypERC4626Collateral.bytecode,
            args: [vault, mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: [initializeAbi],
            functionName: "initialize",
            args: [hookAddress, ismAddress, owner],
        }),
    };
}
