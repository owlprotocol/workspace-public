import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypERC20Collateral, initialize as initializeAbi } from "../artifacts/HypERC20Collateral.js";

export function getHypERC20CollateralDeployArgs(parameters: {
    erc20Address: Address;
    mailboxAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
}) {
    const { erc20Address, mailboxAddress, hookAddress = zeroAddress, ismAddress = zeroAddress, owner } = parameters;
    return {
        bytecode: encodeDeployData({
            abi: HypERC20Collateral.abi,
            bytecode: HypERC20Collateral.bytecode,
            args: [erc20Address, mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: [initializeAbi],
            functionName: "initialize",
            args: [hookAddress, ismAddress, owner],
        }),
    };
}
