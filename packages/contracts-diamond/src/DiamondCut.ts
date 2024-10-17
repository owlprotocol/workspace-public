import { Address, Hex, Client } from "viem";

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
    _clients: Client,
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
