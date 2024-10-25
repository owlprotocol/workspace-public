import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypERC20 } from "../artifacts/HypERC20.js";
import { FastHypERC20 } from "../artifacts/FastHypERC20.js";

export function getHypERC20DeployArgs(parameters: {
    mailboxAddress: Address;
    decimals?: number;
    totalSupply?: bigint;
    name: string;
    symbol: string;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
    extension?: "fastSynthetic";
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
        extension,
    } = parameters;

    let contract: typeof HypERC20 | typeof FastHypERC20 = HypERC20;
    if (extension === "fastSynthetic") {
        contract = FastHypERC20;
    }

    return {
        bytecode: encodeDeployData({
            abi: contract.abi,
            bytecode: contract.bytecode,
            args: [decimals, mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: contract.abi,
            functionName: "initialize",
            args: [totalSupply, name, symbol, hookAddress, ismAddress, owner],
        }),
    };
}
