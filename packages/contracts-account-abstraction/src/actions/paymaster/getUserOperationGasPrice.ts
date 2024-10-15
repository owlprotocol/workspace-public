import { Client, Transport } from "viem";
import { estimateFeesPerGas } from "viem/actions";
import { getAction } from "viem/utils";

export type GetUserOperationGasPriceReturnType = {
    slow: { maxFeePerGas: bigint; maxPriorityFeePerGas: bigint };
    standard: { maxFeePerGas: bigint; maxPriorityFeePerGas: bigint };
    fast: { maxFeePerGas: bigint; maxPriorityFeePerGas: bigint };
};

export async function getUserOperationGasPrice(
    client: Client<Transport> & { eip1559?: boolean },
): Promise<GetUserOperationGasPriceReturnType> {
    const eip1559: boolean = client.eip1559 ?? (client.chain?.custom?.eip1559 as boolean) ?? false;

    const gasPrice = await getAction(
        client,
        estimateFeesPerGas,
        "estimateFeesPerGas",
    )({
        type: eip1559 === false ? "legacy" : "eip1559",
        chain: client.chain,
    });

    if (gasPrice.gasPrice) {
        const userOperationGasPrice = {
            maxFeePerGas: gasPrice.gasPrice,
            maxPriorityFeePerGas: gasPrice.gasPrice,
        };
        return {
            slow: userOperationGasPrice,
            standard: userOperationGasPrice,
            fast: userOperationGasPrice,
        };
    } else if (gasPrice.maxFeePerGas && gasPrice.maxPriorityFeePerGas) {
        const userOperationGasPrice = {
            maxFeePerGas: gasPrice.maxFeePerGas,
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
        };
        return {
            slow: userOperationGasPrice,
            standard: userOperationGasPrice,
            fast: userOperationGasPrice,
        };
    } else {
        throw new Error("Invalid gas fee estimate");
    }
}
