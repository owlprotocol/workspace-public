import { Address, StateOverride, Client, Hex, encodeFunctionData, decodeAbiParameters, decodeErrorResult } from "viem";
import { getAction } from "viem/utils";
import { call } from "viem/actions";

import { abi as PimlicoEntryPointSimulationsAbi } from "../../artifacts/PimlicoEntryPointSimulations.js";
import { abi as EntryPointV07Abi } from "../../artifacts/EntryPoint.js";

/**
 * Call PimlicoEntryPointSimulations contract and decode revert data
 * @param client
 * @param entryPoint
 * @param entryPointSimulationsCallData
 * @param entryPointSimulationsAddress
 * @param stateOverride
 * @returns
 */
export async function simulateEntryPoint(
    client: Client,
    parameters: {
        entryPoint: Address;
        entryPointSimulationsCallData: Hex[];
        entryPointSimulationsAddress: Address;
        stateOverride?: StateOverride[number];
    },
): Promise<Hex[]> {
    const { entryPoint, entryPointSimulationsCallData, entryPointSimulationsAddress, stateOverride } = parameters;
    const callData = encodeFunctionData({
        abi: PimlicoEntryPointSimulationsAbi,
        functionName: "simulateEntryPoint",
        args: [entryPoint, entryPointSimulationsCallData],
    });

    const callReturn = await getAction(
        client,
        call,
        "call",
    )({
        to: entryPointSimulationsAddress,
        data: callData,
        blockTag: "latest",
        stateOverride: [...(stateOverride ? [stateOverride] : [])],
    });

    const result = callReturn.data;
    if (!result) {
        throw new Error("simulateEntryPoint return empty data");
    }

    const returnBytes = decodeAbiParameters([{ name: "ret", type: "bytes[]" }], result);

    return returnBytes[0].map((data: Hex) => {
        const decodedDelegateAndError = decodeErrorResult({
            abi: EntryPointV07Abi,
            data: data,
        });

        if (!decodedDelegateAndError?.args?.[1]) {
            throw new Error("Unexpected error");
        }
        return decodedDelegateAndError.args[1] as Hex;
    });
}
