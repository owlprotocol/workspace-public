import { dereferenceDocument, MethodCallValidator } from "@open-rpc/schema-utils-js";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

let bundlerOpenRpcSchema: OpenrpcDocument;
let bundlerRpcValidator: MethodCallValidator;

/**
 * Memoized function to get bundler open rpc schema and validator
 */
export async function getBundlerOpenRpcSchema() {
    bundlerOpenRpcSchema = bundlerOpenRpcSchema ?? (await dereferenceDocument(bundlerOpenRpcSchema_ as any));
    bundlerRpcValidator = bundlerRpcValidator ?? new MethodCallValidator(bundlerOpenRpcSchema);

    return {
        bundlerOpenRpcSchema,
        bundlerRpcValidator,
    };
}

const bundlerOpenRpcSchema_ = {
    openrpc: "1.2.4",
    info: {
        title: "Ethereum EIP-4337 bundler JSON-RPC Specification",
        description: "A specification of the standard interface for EIP-4337 clients.",
        license: {
            name: "CC0-1.0",
            url: "https://creativecommons.org/publicdomain/zero/1.0/legalcode",
        },
        version: "0.0.0",
    },
    methods: [
        {
            name: "eth_chainId",
            summary: "Returns the chain ID of the current network.",
            params: [],
            result: {
                name: "Chain ID",
                schema: {
                    title: "hex encoded unsigned integer",
                    oneOf: [
                        {
                            type: "string",
                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                        },
                        {
                            type: "number",
                        },
                    ],
                },
            },
        },
        {
            name: "eth_supportedEntryPoints",
            summary: "Returns an array of the entryPoint addresses supported by the client",
            params: [],
            result: {
                name: "Supported EntryPoints",
                schema: {
                    title: "hex encoded address",
                    type: "array",
                    items: {
                        title: "hex encoded address",
                        type: "string",
                        pattern: "^0x[0-9,a-f,A-F]{40}$",
                    },
                },
            },
        },
        {
            name: "eth_coinbase",
            summary: "Returns the client coinbase address.",
            params: [],
            result: {
                name: "Coinbase address",
                schema: {
                    title: "hex encoded address",
                    type: "string",
                    pattern: "^0x[0-9,a-f,A-F]{40}$",
                },
            },
        },
        {
            name: "eth_estimateUserOperationGas",
            summary:
                "Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.",
            params: [
                {
                    name: "UserOperation",
                    required: true,
                    schema: {
                        type: "object",
                        title: "ERC-4337 User Operation",
                        required: [
                            "sender",
                            "nonce",
                            "callData",
                            "callGasLimit",
                            "verificationGasLimit",
                            "preVerificationGas",
                            "maxFeePerGas",
                            "maxPriorityFeePerGas",
                            "signature",
                        ],
                        properties: {
                            sender: {
                                title: "sender",
                                type: "string",
                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                            },
                            nonce: {
                                title: "nonce",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            factory: {
                                title: "factory",
                                type: "string",
                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                                description: "Address of the account factory, only for new accounts",
                            },
                            factoryData: {
                                title: "factoryData",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                                description: "Data for the account factory, only if account factory is defined",
                            },
                            callData: {
                                title: "callData",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                            },
                            callGasLimit: {
                                title: "gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            verificationGasLimit: {
                                title: "verification gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            preVerificationGas: {
                                title: "preVerification gas",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            maxPriorityFeePerGas: {
                                title: "max priority fee per gas",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description: "Maximum fee per gas the sender is willing to pay to miners in wei",
                            },
                            maxFeePerGas: {
                                title: "max fee per gas",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description:
                                    "The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei",
                            },
                            paymaster: {
                                title: "paymaster address",
                                type: "string",
                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                                description:
                                    "The address of the Paymaster that will be requested to pay the UserOperation gas fees",
                            },
                            paymasterVerificationGasLimit: {
                                title: "paymaster verification gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description: "The amount of gas to allocate for the paymaster validation code",
                            },
                            paymasterPostOpGasLimit: {
                                title: "paymaster postOp gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description: "The amount of gas to allocate for the paymaster post-operation code",
                            },
                            paymasterData: {
                                title: "paymaster data",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                            },
                            signature: {
                                title: "signature",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                            },
                        },
                    },
                },
            ],
            result: {
                name: "Gas info",
                schema: {
                    type: "object",
                    title: "UserOperation Gas parameters",
                    required: ["callGasLimit", "preVerificationGas", "verificationGasLimit"],
                    properties: {
                        callGasLimit: {
                            title: "callGasLimit",
                            oneOf: [
                                {
                                    type: "string",
                                    pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                },
                                {
                                    type: "number",
                                },
                            ],
                        },
                        preVerificationGas: {
                            title: "preVerificationGas",
                            oneOf: [
                                {
                                    type: "string",
                                    pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                },
                                {
                                    type: "number",
                                },
                            ],
                        },
                        verificationGasLimit: {
                            title: "verificationGasLimit",
                            oneOf: [
                                {
                                    type: "string",
                                    pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                },
                                {
                                    type: "number",
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            name: "eth_sendUserOperation",
            summary: "Signs and submits a transaction.",
            params: [
                {
                    name: "Transaction",
                    required: true,
                    schema: {
                        type: "object",
                        title: "ERC-4337 User Operation",
                        required: [
                            "sender",
                            "nonce",
                            "callData",
                            "callGasLimit",
                            "verificationGasLimit",
                            "preVerificationGas",
                            "maxFeePerGas",
                            "maxPriorityFeePerGas",
                            "signature",
                        ],
                        properties: {
                            sender: {
                                title: "sender",
                                type: "string",
                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                            },
                            nonce: {
                                title: "nonce",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            factory: {
                                title: "factory",
                                type: "string",
                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                                description: "Address of the account factory, only for new accounts",
                            },
                            factoryData: {
                                title: "factoryData",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                                description: "Data for the account factory, only if account factory is defined",
                            },
                            callData: {
                                title: "callData",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                            },
                            callGasLimit: {
                                title: "gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            verificationGasLimit: {
                                title: "verification gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            preVerificationGas: {
                                title: "preVerification gas",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            maxPriorityFeePerGas: {
                                title: "max priority fee per gas",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description: "Maximum fee per gas the sender is willing to pay to miners in wei",
                            },
                            maxFeePerGas: {
                                title: "max fee per gas",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description:
                                    "The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei",
                            },
                            paymaster: {
                                title: "paymaster address",
                                type: "string",
                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                                description:
                                    "The address of the Paymaster that will be requested to pay the UserOperation gas fees",
                            },
                            paymasterVerificationGasLimit: {
                                title: "paymaster verification gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description: "The amount of gas to allocate for the paymaster validation code",
                            },
                            paymasterPostOpGasLimit: {
                                title: "paymaster postOp gas limit",
                                oneOf: [
                                    {
                                        type: "string",
                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                                description: "The amount of gas to allocate for the paymaster post-operation code",
                            },
                            paymasterData: {
                                title: "paymaster data",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                            },
                            signature: {
                                title: "signature",
                                type: "string",
                                pattern: "^0x[0-9a-f]*$",
                            },
                        },
                    },
                },
            ],
            result: {
                name: "Transaction hash",
                schema: {
                    title: "32 byte hex value",
                    type: "string",
                    pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                },
            },
        },
        {
            name: "eth_getUserOperationByHash",
            summary: "Returns the information about a transaction requested by transaction hash.",
            params: [
                {
                    name: "UserOperation hash",
                    required: true,
                    schema: {
                        title: "32 byte hex value",
                        type: "string",
                        pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                    },
                },
            ],
            result: {
                name: "Transaction information",
                schema: {
                    type: "object",
                    title: "UserOperation transaction information",
                    required: ["userOperation", "entryPoint", "blockNumber", "blockHash", "transactionHash"],
                    properties: {
                        userOperation: {
                            type: "object",
                            title: "UserOperation",
                            required: [
                                "sender",
                                "nonce",
                                "callData",
                                "callGasLimit",
                                "verificationGasLimit",
                                "preVerificationGas",
                                "maxFeePerGas",
                                "maxPriorityFeePerGas",
                                "signature",
                            ],
                            properties: {
                                sender: {
                                    title: "sender",
                                    type: "string",
                                    pattern: "^0x[0-9,a-f,A-F]{40}$",
                                },
                                nonce: {
                                    title: "nonce",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                },
                                factory: {
                                    title: "factory",
                                    type: "string",
                                    pattern: "^0x[0-9,a-f,A-F]{40}$",
                                    description: "Address of the account factory, only for new accounts",
                                },
                                factoryData: {
                                    title: "factoryData",
                                    type: "string",
                                    pattern: "^0x[0-9a-f]*$",
                                    description: "Data for the account factory, only if account factory is defined",
                                },
                                callData: {
                                    title: "callData",
                                    type: "string",
                                    pattern: "^0x[0-9a-f]*$",
                                },
                                callGasLimit: {
                                    title: "gas limit",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                },
                                verificationGasLimit: {
                                    title: "verification gas limit",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                },
                                preVerificationGas: {
                                    title: "preVerification gas",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                },
                                maxPriorityFeePerGas: {
                                    title: "max priority fee per gas",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description: "Maximum fee per gas the sender is willing to pay to miners in wei",
                                },
                                maxFeePerGas: {
                                    title: "max fee per gas",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description:
                                        "The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei",
                                },
                                paymaster: {
                                    title: "paymaster address",
                                    type: "string",
                                    pattern: "^0x[0-9,a-f,A-F]{40}$",
                                    description:
                                        "The address of the Paymaster that will be requested to pay the UserOperation gas fees",
                                },
                                paymasterVerificationGasLimit: {
                                    title: "paymaster verification gas limit",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description: "The amount of gas to allocate for the paymaster validation code",
                                },
                                paymasterPostOpGasLimit: {
                                    title: "paymaster postOp gas limit",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description: "The amount of gas to allocate for the paymaster post-operation code",
                                },
                                paymasterData: {
                                    title: "paymaster data",
                                    type: "string",
                                    pattern: "^0x[0-9a-f]*$",
                                },
                                signature: {
                                    title: "signature",
                                    type: "string",
                                    pattern: "^0x[0-9a-f]*$",
                                },
                            },
                        },
                        entryPoint: {
                            title: "EntryPoint address",
                            type: "string",
                            pattern: "^0x[0-9,a-f,A-F]{40}$",
                            blockNumber: {
                                title: "Block Number",
                                $ref: "#/components/schemas/uint",
                            },
                            blockHash: {
                                title: "Block Hash",
                                $ref: "#/components/schemas/hash32",
                            },
                            transactionHash: {
                                title: "Transaction Hash",
                                $ref: "#/components/schemas/hash32",
                            },
                        },
                    },
                },
            },
        },
        {
            name: "eth_getUserOperationReceipt",
            summary: "Returns the receipt of a transaction by transaction hash.",
            params: [
                {
                    name: "Transaction hash",
                    schema: {
                        title: "32 byte hex value",
                        type: "string",
                        pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                    },
                },
            ],
            result: {
                name: "Receipt Information",
                schema: {
                    type: "object",
                    title: "Receipt info",
                    required: [
                        "userOpHash",
                        "sender",
                        "nonce",
                        "actualGasCost",
                        "actualGasUsed",
                        "success",
                        "logs",
                        "receipt",
                    ],
                    properties: {
                        userOpHash: {
                            title: "user op hash",
                            type: "string",
                            pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                        },
                        sender: {
                            title: "sender",
                            type: "string",
                            pattern: "^0x[0-9,a-f,A-F]{40}$",
                        },
                        nonce: {
                            title: "nonce",
                            type: "string",
                            pattern: "^0x[0-9a-f]{0,64}$",
                        },
                        paymaster: {
                            title: "paymaster",
                            type: "string",
                            pattern: "^0x[0-9,a-f,A-F]{40}$",
                        },
                        actualGasCost: {
                            title: "actual (gas price * gas used) of the user operation",
                            oneOf: [
                                {
                                    type: "string",
                                    pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                },
                                {
                                    type: "number",
                                },
                            ],
                        },
                        actualGasUsed: {
                            title: "actual gas used of the user operation",
                            oneOf: [
                                {
                                    type: "string",
                                    pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                },
                                {
                                    type: "number",
                                },
                            ],
                        },
                        success: {
                            title: "user operation revert status",
                            type: "boolean",
                        },
                        reason: {
                            title: "If reverted, user operation revert reason",
                            type: "string",
                        },
                        logs: {
                            title: "logs",
                            type: "array",
                            items: {
                                title: "log",
                                type: "object",
                                required: ["transactionHash"],
                                properties: {
                                    removed: {
                                        title: "removed",
                                        type: "boolean",
                                    },
                                    logIndex: {
                                        title: "log index",
                                        oneOf: [
                                            {
                                                type: "string",
                                                pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                            },
                                            {
                                                type: "number",
                                            },
                                        ],
                                    },
                                    transactionIndex: {
                                        title: "transaction index",
                                        oneOf: [
                                            {
                                                type: "string",
                                                pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                            },
                                            {
                                                type: "number",
                                            },
                                        ],
                                    },
                                    transactionHash: {
                                        title: "transaction hash",
                                        type: "string",
                                        pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                    },
                                    blockHash: {
                                        title: "block hash",
                                        type: "string",
                                        pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                    },
                                    blockNumber: {
                                        title: "block number",
                                        oneOf: [
                                            {
                                                type: "string",
                                                pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                            },
                                            {
                                                type: "number",
                                            },
                                        ],
                                    },
                                    address: {
                                        title: "address",
                                        type: "string",
                                        pattern: "^0x[0-9,a-f,A-F]{40}$",
                                    },
                                    data: {
                                        title: "data",
                                        type: "string",
                                        pattern: "^0x[0-9a-f]*$",
                                    },
                                    topics: {
                                        title: "topics",
                                        type: "array",
                                        items: {
                                            title: "32 hex encoded bytes",
                                            type: "string",
                                            pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                        },
                                    },
                                },
                            },
                        },
                        receipt: {
                            type: "object",
                            title: "Transaction Receipt",
                            required: [
                                "blockHash",
                                "blockNumber",
                                "from",
                                "cumulativeGasUsed",
                                "gasUsed",
                                "logs",
                                "logsBloom",
                                "transactionHash",
                                "transactionIndex",
                                "effectiveGasPrice",
                            ],
                            description:
                                "The TransactionReceipt object. Note that the returned TransactionReceipt is for the entire bundle, not only for this UserOperation.",
                            properties: {
                                transactionHash: {
                                    title: "transaction hash",
                                    type: "string",
                                    pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                },
                                transactionIndex: {
                                    title: "transaction index",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                },
                                blockHash: {
                                    title: "block hash",
                                    type: "string",
                                    pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                },
                                blockNumber: {
                                    title: "block number",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                },
                                from: {
                                    title: "from",
                                    type: "string",
                                    pattern: "^0x[0-9,a-f,A-F]{40}$",
                                },
                                to: {
                                    title: "to",
                                    type: "string",
                                    pattern: "^0x[0-9,a-f,A-F]{40}$",
                                    description: "Address of the receiver or null in a contract creation transaction.",
                                },
                                cumulativeGasUsed: {
                                    title: "cumulative gas used",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description:
                                        "The sum of gas used by this transaction and all preceding transactions in the same block.",
                                },
                                gasUsed: {
                                    title: "gas used",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description: "The amount of gas used for this specific transaction alone.",
                                },
                                contractAddress: {
                                    title: "contract address",
                                    description:
                                        "The contract address created, if the transaction was a contract creation, otherwise null.",
                                    oneOf: [
                                        {
                                            title: "hex encoded address",
                                            type: "string",
                                            pattern: "^0x[0-9,a-f,A-F]{40}$",
                                        },
                                        {
                                            name: null,
                                            type: "null",
                                        },
                                    ],
                                },
                                logs: {
                                    title: "logs",
                                    type: "array",
                                    items: {
                                        title: "log",
                                        type: "object",
                                        required: ["transactionHash"],
                                        properties: {
                                            removed: {
                                                title: "removed",
                                                type: "boolean",
                                            },
                                            logIndex: {
                                                title: "log index",
                                                oneOf: [
                                                    {
                                                        type: "string",
                                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                                    },
                                                    {
                                                        type: "number",
                                                    },
                                                ],
                                            },
                                            transactionIndex: {
                                                title: "transaction index",
                                                oneOf: [
                                                    {
                                                        type: "string",
                                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                                    },
                                                    {
                                                        type: "number",
                                                    },
                                                ],
                                            },
                                            transactionHash: {
                                                title: "transaction hash",
                                                type: "string",
                                                pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                            },
                                            blockHash: {
                                                title: "block hash",
                                                type: "string",
                                                pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                            },
                                            blockNumber: {
                                                title: "block number",
                                                oneOf: [
                                                    {
                                                        type: "string",
                                                        pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                                    },
                                                    {
                                                        type: "number",
                                                    },
                                                ],
                                            },
                                            address: {
                                                title: "address",
                                                type: "string",
                                                pattern: "^0x[0-9,a-f,A-F]{40}$",
                                            },
                                            data: {
                                                title: "data",
                                                type: "string",
                                                pattern: "^0x[0-9a-f]*$",
                                            },
                                            topics: {
                                                title: "topics",
                                                type: "array",
                                                items: {
                                                    title: "32 hex encoded bytes",
                                                    type: "string",
                                                    pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                                },
                                            },
                                        },
                                    },
                                },
                                logsBloom: {
                                    title: "logs bloom",
                                    type: "string",
                                    pattern: "^0x[0-9a-f]{512}$",
                                },
                                root: {
                                    title: "state root",
                                    type: "string",
                                    pattern: "^0x([0-9a-f][0-9a-f]){0,32}$",
                                    description:
                                        "The post-transaction state root. Only specified for transactions included before the Byzantium upgrade.",
                                },
                                status: {
                                    title: "status",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description:
                                        "Either 1 (success) or 0 (failure). Only specified for transactions included after the Byzantium upgrade.",
                                },
                                effectiveGasPrice: {
                                    title: "effective gas price",
                                    oneOf: [
                                        {
                                            type: "string",
                                            pattern: "^0x([1-9a-f]+[0-9a-f]*|0)$",
                                        },
                                        {
                                            type: "number",
                                        },
                                    ],
                                    description:
                                        "The actual value per gas deducted from the senders account. Before EIP-1559, this is equal to the transaction's gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas).",
                                },
                            },
                        },
                    },
                },
            },
        },
    ],
    components: {},
};
