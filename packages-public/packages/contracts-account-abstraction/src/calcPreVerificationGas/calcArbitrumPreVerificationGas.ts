import {
    Address,
    Chain,
    PublicClient,
    Transport,
    concat,
    encodeAbiParameters,
    getAbiItem,
    getContract,
    maxUint64,
    serializeTransaction,
    toFunctionSelector,
} from "viem";
import { abi as EntryPointV07Abi } from "../artifacts/EntryPoint.js";
import { PackedUserOperation, packedUserOperationToRandomDataUserOp } from "../PackedUserOperation.js";

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
    publicClient: PublicClient<Transport, Chain>,
    packedUserOperation: PackedUserOperation,
    entryPoint: Address,
    staticFee: bigint,
) {
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
            chainId: publicClient.chain.id,
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

    const arbGasPriceOracle = getContract({
        abi: getArbitrumL1FeeAbi,
        address: precompileAddress,
        client: {
            public: publicClient,
        },
    });

    const { result } = await arbGasPriceOracle.simulate.gasEstimateL1Component([entryPoint, false, serializedTx]);

    return result[0] + staticFee;
}
