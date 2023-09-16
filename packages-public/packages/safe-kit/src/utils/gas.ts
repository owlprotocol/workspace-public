import { SimulateTxAccessor__factory, SafeL2__factory } from "@owlprotocol/contracts/typechain/ethers";
import type { Provider } from "@ethersproject/providers";
import type { OperationType } from "../types/SafeTransaction.js";

export async function estimateGas(
    provider: Provider,
    safeAddress: string,
    simulateTxAccessorAddress: string,
    to: string,
    valueInWei: string,
    data: string,
    operation: OperationType,
) {
    const transactionDataToEstimate = SimulateTxAccessor__factory.createInterface().encodeFunctionData("simulate", [
        to,
        valueInWei,
        data,
        operation,
    ]);
    const safeFunctionToEstimate = SafeL2__factory.createInterface().encodeFunctionData("simulateAndRevert", [
        simulateTxAccessorAddress,
        transactionDataToEstimate,
    ]);
    const transactionToEstimateGas = {
        to: safeAddress,
        value: "0",
        data: safeFunctionToEstimate,
        from: safeAddress,
    };

    // TO-DO (safe-global): Improve decoding
    /*
  const simulateAndRevertResponse = ethAdapter.decodeParameters(
    ['bool', 'bytes'],
    encodedResponse
  )
  const returnedData = ethAdapter.decodeParameters(['uint256', 'bool', 'bytes'], simulateAndRevertResponse[1])
  */
    try {
        const encodedResponse = await provider.call(transactionToEstimateGas);

        return Number("0x" + encodedResponse.slice(184).slice(0, 10)).toString();
    } catch (error: any) {
        // Ethers
        if (error?.error?.body) {
            const revertData = JSON.parse(error.error.body).error.data;
            if (revertData && revertData.startsWith("Reverted ")) {
                const [, encodedResponse] = revertData.split("Reverted ");
                const safeTxGas = Number("0x" + encodedResponse.slice(184).slice(0, 10)).toString();

                return safeTxGas;
            }
        }

        //Unknown error
        throw error;
    }
}
