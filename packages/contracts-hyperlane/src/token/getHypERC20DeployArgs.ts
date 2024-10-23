import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypERC20, initialize as initializeAbi } from "../artifacts/HypERC20.js";

export function getHypERC20DeployArgs(parameters: {
    mailboxAddress: Address;
    decimals?: number;
    totalSupply?: bigint;
    name: string;
    symbol: string;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
}) {
    const {
        mailboxAddress,
        decimals = 18,
        totalSupply = 0n,
        name,
        symbol,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
    } = parameters;

    return {
        bytecode: encodeDeployData({
            abi: HypERC20.abi,
            bytecode: HypERC20.bytecode,
            args: [decimals, mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: [initializeAbi],
            functionName: "initialize",
            args: [totalSupply, name, symbol, hookAddress, ismAddress, owner],
        }),
    };
}
