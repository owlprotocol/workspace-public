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
import { simulateContract, getChainId } from "viem/actions";
import { getAction } from "viem/utils";
import { abi as EntryPointV07Abi } from "../../artifacts/EntryPoint.js";
import { PackedUserOperation, packedUserOperationToRandomDataUserOp } from "../../models/PackedUserOperation.js";

const getArbitrumL1FeeAbi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "bool",
                name: "contractCreation",
                type: "bool",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "gasEstimateL1Component",
        outputs: [
            {
                internalType: "uint64",
                name: "gasEstimateForL1",
                type: "uint64",
            },
            {
                internalType: "uint256",
                name: "baseFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "l1BaseFeeEstimate",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;

export async function calcArbitrumPreVerificationGas(
    client: Client,
    parameters: {
        packedUserOperation: PackedUserOperation;
        entryPoint: Address;
        staticFee: bigint;
    },
) {
    const { packedUserOperation, entryPoint, staticFee } = parameters;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const randomDataUserOp: PackedUserOperation = packedUserOperationToRandomDataUserOp(packedUserOperation);

    const handleOpsAbi = getAbiItem({
        abi: EntryPointV07Abi,
        name: "handleOps",
    });

    const selector = toFunctionSelector(handleOpsAbi);
    const paramData = encodeAbiParameters(handleOpsAbi.inputs, [[randomDataUserOp], entryPoint]);

    const data = concat([selector, paramData]);

    const precompileAddress = "0x00000000000000000000000000000000000000C8";

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

    const { result } = await getAction(
        client,
        simulateContract,
        "simulateContract",
    )({
        abi: getArbitrumL1FeeAbi,
        address: precompileAddress,
        functionName: "gasEstimateL1Component",
        args: [entryPoint, false, serializedTx],
    });

    return result[0] + staticFee;
}
