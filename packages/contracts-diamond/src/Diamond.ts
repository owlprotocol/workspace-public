import { Clients } from "@owlprotocol/contracts-create2factory";
import { Abi, Address, Hex, encodeDeployData, encodeFunctionData, toFunctionSelector, zeroAddress } from "viem";
import { Diamond, DiamondInitMulti } from "./artifacts/index.js";

export function getAbiFunctionSelectors(abi: Abi): Hex[] {
    return abi
        .filter((a) => a.type === "function")
        .map((a) => {
            //Get facet selector
            return toFunctionSelector(a as any);
        });
}

export enum FacetCutAction {
    Add = 0,
    Replace = 1,
    Remove = 2,
    Set = 3,
}

/**
 * Returns correct arguments for setting the diamond to the desired state.
 * TODO: Check asynchronously for exising selectors and set accordingly
 *   - If facet is DiamondCut, check selectors match
 *   - If facet is DiamondLoupe, check selectors match
 *   - For each selector in `facets`
 *      - if selector conflicts with DiamonCut or DiamondLoupe throw Error
 *      - if selector conflicts with other `facets` throw Error
 * @param args
 * @returns
 */
export function validateDiamondCutUpgrades(
    facets: { facetAddress: Address; functionSelectors: Hex[] }[],
): { facetAddress: Address; functionSelectors: Hex[]; action: FacetCutAction }[] {
    //TODO: Add logic above, for now just return all

    return facets.map((f) => {
        return {
            facetAddress: f.facetAddress,
            functionSelectors: f.functionSelectors,
            action: FacetCutAction.Add,
        };
    });
}

/**
 * Returns correct arguments for setting the diamond to the desired state.
 * TODO: Check asynchronously for exising selectors and set accordingly
 *   - Get all existing selectors & implementations using DiamondLoupe
 *   - For each selector in `facets`
 *      - if selector conflicts with DiamonCut or DiamondLoupe throw Error
 *      - if selector conflicts with other `facets` throw Error
 *      - check if facetAddress onchain matches, otherwise SET (or use old actions?)
 *   - Remove all other unnasigned selectors (except DiamondCut & DiamondLoupe)
 * @param args
 * @returns
 */
export async function getDiamondCutUpgrades(
    _clients: Pick<Clients, "publicClient">,
    facets: { facetAddress: Address; functionSelectors: Hex[] }[],
): Promise<{ facetAddress: Address; functionSelectors: Hex[]; action: FacetCutAction }[]> {
    //TODO: Add logic above, for now just return all

    return facets.map((f) => {
        return {
            facetAddress: f.facetAddress,
            functionSelectors: f.functionSelectors,
            action: FacetCutAction.Add,
        };
    });
}

/**
 * Computes diamond multi init data.
 * If only 1 initializer provided, bypasses MultiInit to call it directly.
 * @param initializers
 * @param diamondMultiInitAddress
 */
export function getDiamondMultiInitData(
    initializers: {
        abi: Abi;
        address: Address;
        functionName: string;
        args: any[];
    }[],
    diamondMultiInitAddress = DiamondInitMulti.implementation,
): { to: Address; data: Hex } {
    if (initializers.length == 0) {
        return {
            to: zeroAddress,
            data: "0x",
        };
    }

    const diamondSingleInitData = initializers.map(({ abi, functionName, args }) => {
        return encodeFunctionData({
            abi,
            functionName,
            args,
        });
    });

    //Only 1 initializer, return that
    if (initializers.length == 1) {
        return { to: initializers[0].address, data: diamondSingleInitData[0] };
    }

    //Merge initializers as 1 transaction to DiamondMultiInit
    const diamondMultiData = encodeFunctionData({
        abi: DiamondInitMulti.abi,
        functionName: "initialize",
        args: [initializers.map((a) => a.address), diamondSingleInitData],
    });

    return {
        to: diamondMultiInitAddress,
        data: diamondMultiData,
    };
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
    const diamondInitData = getDiamondMultiInitData(deployArgs.initializers);

    const diamondCutUpgrades = validateDiamondCutUpgrades(deployArgs.facets);

    return {
        diamondCutUpgrades,
        diamondInitData,
        deployData: encodeDeployData({
            abi: Diamond.abi,
            bytecode: Diamond.bytecode,
            args: [admin, diamondCutUpgrades, diamondInitData.to, diamondInitData.data],
        }),
    };
}
