import { Abi, Hex, encodeFunctionData, Address } from "viem";
import { initialize } from "./artifacts/DiamondInitMulti.js";

/**
 * Computes diamond init multi data.
 * @param initializers
 * @param diamondMultiInitAddress
 */
export function getDiamondInitMultiData(
    initializers: {
        abi: Abi;
        address: Address;
        functionName: string;
        args: any[];
    }[],
): Hex {
    const initDataArr = initializers.map(({ abi, functionName, args }) => {
        return encodeFunctionData({
            abi,
            functionName,
            args,
        });
    });

    //Merge initializers as 1 transaction to DiamondMultiInit
    return encodeFunctionData({
        abi: [initialize],
        functionName: "initialize",
        args: [initializers.map((a) => a.address), initDataArr],
    });
}
