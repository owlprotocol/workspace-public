import { Address, encodeDeployData, encodeFunctionData, zeroAddress } from "viem";
import { HypERC20Collateral } from "../artifacts/HypERC20Collateral.js";
import { FastHypERC20Collateral } from "../artifacts/FastHypERC20Collateral.js";
import { HypFiatToken } from "../artifacts/HypFiatToken.js";

const extensionContracts = {
    fastCollateral: FastHypERC20Collateral,
    collateralFiat: HypFiatToken,
} as const;

export function getHypERC20CollateralDeployArgs(parameters: {
    erc20Address: Address;
    mailboxAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
    extension?: "fastCollateral" | "collateralFiat";
}) {
    const {
        erc20Address,
        mailboxAddress,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
        extension,
    } = parameters;

    let contract: typeof HypERC20Collateral | typeof FastHypERC20Collateral | typeof HypFiatToken = HypERC20Collateral;
    if (extension) {
        contract = extensionContracts[extension];
    }

    return {
        bytecode: encodeDeployData({
            abi: contract.abi,
            bytecode: contract.bytecode,
            args: [erc20Address, mailboxAddress],
        }),
        initData: encodeFunctionData({
            abi: contract.abi,
            functionName: "initialize",
            args: [hookAddress, ismAddress, owner],
        }),
    };
}
