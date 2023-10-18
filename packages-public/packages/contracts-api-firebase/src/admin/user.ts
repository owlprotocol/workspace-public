import { ethers } from "ethers";
import crypto from "node:crypto";
import { usersCRUD } from "./crudWrappers.js";
import { User } from "../models/users/User.js";

/**
 * Create user data with defaults
 * @param email
 */
export function createUserDataWithDefaults(email: string, id?: string): User {
    //initial user data
    const user: User = {
        id: id ?? crypto.randomUUID(),
        email,
        topupTotals: {
            "80001": {
                native: "0",
            },
            "1337": {
                native: "0",
            },
        },
        topupMax: {
            "80001": {
                native: ethers.utils.parseUnits("1.0").toString(),
                //TODO: Store in TS data structure (maybe something similar to @thirdweb/chains package, does this exist for tokens?)
                //LINK
                "0x326C977E6efc84E512bB9C30f76E30c160eD06FB": ethers.utils.parseUnits("1.0").toString(),
            },
            "1337": {
                native: ethers.constants.MaxUint256.toString(),
            },
        },
    };

    return user;
}

export async function incrementUserExpense(
    userId: string,
    networkId: string,
    amount: string,
    token = "native",
): Promise<void> {
    return usersCRUD._increment(userId, `topupTotals.${networkId}.${token}`, amount);
}
