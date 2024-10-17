import { Abi, Address, Hex, encodeDeployData, encodeFunctionData, toFunctionSelector, zeroAddress } from "viem";
import { Diamond } from "./artifacts/index.js";
import { getDiamondInitMultiData } from "./DiamondInitMulti.js";
import { validateDiamondCutUpgrades } from "./DiamondCut.js";
import { diamondFacets } from "./setupDiamondFacets.js";

export function getAbiFunctionSelectors(abi: Abi): Hex[] {
    return abi
        .filter((a) => a.type === "function")
        .map((a) => {
            //Get facet selector
            return toFunctionSelector(a as any);
        });
}

export interface GetDiamondDeployDataArg {
    facets: { facetAddress: Address; functionSelectors: Hex[] }[];
    initializers: {
        abi: Abi;
        address: Address;
        functionName: string;
        args: any[];
    }[];
}
/**
 * Get deploy data for Diamond
 * @param admin
 * @param deployArgs
 */
export function getDiamondDeployData(admin: Address, deployArgs: GetDiamondDeployDataArg) {
    const { initializers } = deployArgs;

    let diamondInitTransaction = { to: zeroAddress, data: "0x" } as { to: Address; data: Hex };

    if (initializers.length > 1) {
        // Multi Init
        diamondInitTransaction = {
            to: diamondFacets.diamondInitMulti,
            data: getDiamondInitMultiData(initializers),
        };
    } else if (deployArgs.initializers.length == 1) {
        // Single Init
        const { address, abi, functionName, args } = initializers[0];
        diamondInitTransaction = {
            to: address,
            data: encodeFunctionData({
                abi,
                functionName,
                args,
            }),
        };
    }

    const diamondCutUpgrades = validateDiamondCutUpgrades(deployArgs.facets);

    return {
        diamondCutUpgrades,
        diamondInitTransaction,
        deployData: encodeDeployData({
            abi: Diamond.abi,
            bytecode: Diamond.bytecode,
            args: [admin, diamondCutUpgrades, diamondInitTransaction.to, diamondInitTransaction.data],
        }),
    };
}
