import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypERC4626OwnerCollateral, initialize as initializeAbi } from "../artifacts/HypERC4626OwnerCollateral.js";

export function getHypERC4626OwnerCollateralDeployArgs(parameters: {
    vault: Address;
    mailboxAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
}) {
    const { vault, mailboxAddress, hookAddress = zeroAddress, ismAddress = zeroAddress, owner } = parameters;
    return {
        bytecode: encodeDeployData({
            abi: HypERC4626OwnerCollateral.abi,
            bytecode: HypERC4626OwnerCollateral.bytecode,
            args: [vault, mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: [initializeAbi],
            functionName: "initialize",
            args: [hookAddress, ismAddress, owner],
        }),
    };
}
