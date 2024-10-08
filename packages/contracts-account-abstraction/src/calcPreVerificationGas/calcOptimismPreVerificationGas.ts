import {
    Address,
    Client,
    concat,
    encodeAbiParameters,
    getAbiItem,
    maxUint64,
    serializeTransaction,
    toFunctionSelector,
} from "viem";
import { getChainId, getBlock, simulateContract } from "viem/actions";
import { getAction } from "viem/utils";
import { packedUserOperationToRandomDataUserOp } from "../models/PackedUserOperation.js";
import { abi as EntryPointV07Abi } from "../artifacts/EntryPoint.js";
import { PackedUserOperation, unpackGasLimits } from "../models/PackedUserOperation.js";

const getL1FeeAbi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "getL1Fee",
        outputs: [
            {
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "l1BaseFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
] as const;

export async function calcOptimismPreVerificationGas(
    client: Client,
    packedUserOperation: PackedUserOperation,
    entryPoint: Address,
    staticFee: bigint,
) {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const randomDataUserOp: PackedUserOperation = packedUserOperationToRandomDataUserOp(packedUserOperation);

    const handleOpsAbi = getAbiItem({
        abi: EntryPointV07Abi,
        name: "handleOps",
    });

    const selector = toFunctionSelector(handleOpsAbi);
    const paramData = encodeAbiParameters(handleOpsAbi.inputs, [[randomDataUserOp], entryPoint]);

    const data = concat([selector, paramData]);

    const latestBlock = await getAction(client, getBlock, "getBlock")({});
    if (latestBlock.baseFeePerGas === null) {
        throw new Error("block does not have baseFeePerGas");
    }

    const precompileAddress = "0x420000000000000000000000000000000000000F";
    const serializedTx = serializeTransaction(
        {
            to: entryPoint,
            chainId,
            nonce: 999999,
            gasLimit: maxUint64,
            gasPrice: maxUint64,
            data,
        },
        {
            r: "0x123451234512345123451234512345123451234512345123451234512345",
            s: "0x123451234512345123451234512345123451234512345123451234512345",
            v: 28n,
        },
    );

    const { result: l1Fee } = await getAction(
        client,
        simulateContract,
        "simulateContract",
    )({
        abi: getL1FeeAbi,
        address: precompileAddress,
        functionName: "getL1Fee",
        args: [serializedTx],
    });

    const { maxFeePerGas, maxPriorityFeePerGas } = unpackGasLimits(packedUserOperation.gasFees);
    const l2MaxFee = maxFeePerGas;
    const l2PriorityFee = latestBlock.baseFeePerGas + maxPriorityFeePerGas;

    const l2price = l2MaxFee < l2PriorityFee ? l2MaxFee : l2PriorityFee;

    return staticFee + l1Fee / l2price;
}
