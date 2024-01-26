import { ethers } from "ethers";
import crypto from "node:crypto";
import { projectsCRUD } from "./crudWrappers.js";
import { Project } from "../index.js";

/**
 * Create project data with defaults
 */
export function createProjectDataWithDefaults(owner: string, name: string, description?: string, id?: string): Project {
    //initial project data
    const project: Project = {
        owner,
        name,
        description,
        totalAppUsers: 0,
        id: id ?? crypto.randomUUID(),
        topupTotals: {
            "80001": {
                native: "0",
            },
            "1337": {
                native: "0",
            },
            "59140": {
                native: "0",
            },
            "137": {
                native: "0",
            },
        },
        topupMax: {
            "80001": {
                native: ethers.utils.parseUnits("100.0").toString(),
                //TODO: Store in TS data structure (maybe something similar to @thirdweb/chains package, does this exist for tokens?)
                //LINK
                "0x326C977E6efc84E512bB9C30f76E30c160eD06FB": ethers.utils.parseUnits("1.0").toString(),
            },
            "1337": {
                native: ethers.constants.MaxUint256.toString(),
            },
            "59140": {
                native: ethers.utils.parseUnits("100.0").toString(),
            },
            "137": {
                native: ethers.utils.parseUnits("5.0").toString(),
            },
        },
    };

    return project;
}

export async function incrementProjectExpense(
    projectId: string,
    networkId: string,
    amount: string,
    token = "native",
): Promise<void> {
    return projectsCRUD._incrementStr(projectId, `topupTotals.${networkId}.${token}`, amount);
}
