//////////////////////
// Transaction Response

import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { AccessList, acessListZod } from "./AccessList.js";
import { Signature, signatureZod } from "./Signature.js";
import {
    bigIntLikeToBigIntZod,
    bigIntLikeToHexStringZod,
    numberLikeToHexStringZod,
    numberLikeToNumberZod,
} from "./math.js";
import { NumberBigintAsString } from "../utils/NumberBigintAsString.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";
import { uint256BigIntLikeZod } from "../solidity/integer.js";

export const transactionResponseZod = z
    .object({
        blockNumber: numberLikeToNumberZod
            .nullable()
            .describe("The block number of the block that included this transaction."),
        blockHash: bytes32Zod.nullable().describe("The block hash of the block that included this transaction."),
        hash: bytes32Zod.describe("The transaction hash."),
        index: numberLikeToNumberZod.describe("The transaction index."),
        type: numberLikeToNumberZod.describe("The https://eips.ethereum.org/EIPS/eip-2718 transaction type."),
        to: addressZod
            .nullable()
            .describe(
                "The target of the transaction. If ``null``, the ``data`` is initcode and this transaction is a deployment transaction.",
            ),
        from: addressZod.describe("The sender of the transaction."),
        nonce: numberLikeToNumberZod.describe("The nonce of the transaction, used for replay protection."),
        gasLimit: bigIntLikeToBigIntZod.describe(
            "The maximum amount of gas this transaction is authorized to consume.",
        ),
        gasPrice: bigIntLikeToBigIntZod.describe("For legacy transactions, this is the gas price per gas to pay."),
        maxPriorityFeePerGas: bigIntLikeToBigIntZod
            .nullable()
            .default(null)
            .describe(
                "For https://eips.ethereum.org/EIPS/eip-1559 transactions, this is the maximum priority fee to allow a producer to claim.",
            ),
        maxFeePerGas: bigIntLikeToBigIntZod
            .nullable()
            .default(null)
            .describe(
                "For https://eips.ethereum.org/EIPS/eip-1559 transactions, this is the maximum fee that will be paid.",
            ),
        maxFeePerBlobGas: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe(
                "For https://eips.ethereum.org/EIPS/eip-4844 transactions, this is the maximum fee that will be paid per BLOb.",
            ),
        data: bytesZod.describe("The transaction data."),
        value: uint256BigIntLikeZod.describe("The transaction value (in wei)."),
        chainId: bigIntLikeToBigIntZod.optional().describe("The chain ID this transaction is valid on."),
        signature: signatureZod.describe("The signature of the transaction."),
        accessList: acessListZod.optional().nullable().describe("The transaction access list."),
        blobVersionedHashes: z
            .array(bytesZod)
            .optional()
            .nullable()
            .describe("The https://eips.ethereum.org/EIPS/eip-4844 BLOb versioned hashes."),
    })
    .passthrough()
    .describe(
        "a **TransactionResponse** encodes the minimal required properties for a formatted transaction response.",
    );
expectType<TypeOf<TransactionResponse, z.output<typeof transactionResponseZod>>>(true);

export const transactionResponseFromRpcZod = transactionResponseZod.omit({ signature: true }).extend({
    blockNumber: numberLikeToHexStringZod.describe("The block number of the block that included this transaction."),
    index: numberLikeToHexStringZod.describe("The transaction index."),
    type: numberLikeToHexStringZod.describe("The https://eips.ethereum.org/EIPS/eip-2718 transaction type."),
    nonce: numberLikeToHexStringZod.describe("The nonce of the transaction, used for replay protection."),
    gasLimit: bigIntLikeToHexStringZod.describe("The maximum amount of gas this transaction is authorized to consume."),
    gasPrice: bigIntLikeToHexStringZod.describe("For legacy transactions, this is the gas price per gas to pay."),
    maxPriorityFeePerGas: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe(
            "For https://eips.ethereum.org/EIPS/eip-1559 transactions, this is the maximum priority fee to allow a producer to claim.",
        ),
    maxFeePerGas: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe(
            "For https://eips.ethereum.org/EIPS/eip-1559 transactions, this is the maximum fee that will be paid.",
        ),
    maxFeePerBlobGas: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe(
            "For https://eips.ethereum.org/EIPS/eip-4844 transactions, this is the maximum fee that will be paid per BLOb.",
        ),
    value: uint256BigIntLikeZod.transform((n) => "0x" + n.toString(16)).describe("The transaction value (in wei)."),
    chainId: bigIntLikeToHexStringZod.optional().describe("The chain ID this transaction is valid on."),
    r: bytesZod.describe("signature r"),
    s: bytesZod.describe("signature s"),
    v: numberLikeToHexStringZod.describe("signature r, recovery identifier"),
});
expectType<TypeOf<TransactionResponseFromRpc, z.output<typeof transactionResponseFromRpcZod>>>(true);

/**
 *  a **TransactionResponse** encodes the minimal required properties
 *  for a formatted transaction response.
 */
export interface TransactionResponse {
    /**
     *  The block number of the block that included this transaction.
     */
    blockNumber: null | number;

    /**
     *  The block hash of the block that included this transaction.
     */
    blockHash: null | string;

    /**
     *  The transaction hash.
     */
    hash: string;

    /**
     *  The transaction index.
     */
    index: number;

    /**
     *  The https://eips.ethereum.org/EIPS/eip-2718 transaction type.
     */
    type: number;

    /**
     *  The target of the transaction. If ``null``, the ``data`` is initcode
     *  and this transaction is a deployment transaction.
     */
    to: null | string;

    /**
     *  The sender of the transaction.
     */
    from: string;

    /**
     *  The nonce of the transaction, used for replay protection.
     */
    nonce: number;

    /**
     *  The maximum amount of gas this transaction is authorized to consume.
     */
    gasLimit: bigint;

    /**
     *  For legacy transactions, this is the gas price per gas to pay.
     */
    gasPrice: bigint;

    /**
     *  For https://eips.ethereum.org/EIPS/eip-1559 transactions, this is the maximum priority
     *  fee to allow a producer to claim.
     */
    maxPriorityFeePerGas?: null | bigint;

    /**
     *  For https://eips.ethereum.org/EIPS/eip-1559 transactions, this is the maximum fee that
     *  will be paid.
     */
    maxFeePerGas?: null | bigint;

    /**
     *  For https://eips.ethereum.org/EIPS/eip-4844 transactions, this is the maximum fee that
     *  will be paid per BLOb.
     */
    maxFeePerBlobGas?: null | bigint;

    /**
     *  The transaction data.
     */
    data: string;

    /**
     *  The transaction value (in wei).
     */
    value: bigint;

    /**
     *  The chain ID this transaction is valid on.
     */
    chainId?: bigint;

    /**
     *  The signature of the transaction.
     */
    signature: Signature;

    /**
     *  The transaction access list.
     */
    accessList?: null | AccessList;

    /**
     *  The https://eips.ethereum.org/EIPS/eip-4844 BLOb versioned hashes.
     */
    blobVersionedHashes?: null | Array<string>;
}

/** JSON-RPC encoded response */
export type TransactionResponseFromRpc = Omit<NumberBigintAsString<TransactionResponse>, "signature"> & {
    r: string;
    s: string;
    v: string;
};

/**
 *  a **TransactionInput** encodes the minimal required properties
 *  for a formatted transaction input (eth_call, eth_sign).
 */
export type TransactionInput = Omit<TransactionResponse, "hash" | "blockNumber" | "blockHash" | "index" | "signature">;
export const transactionInputZod = transactionResponseZod.omit({
    hash: true,
    blockNumber: true,
    blockHash: true,
    index: true,
    signature: true,
});

export type TransactionInputFromRpc = Omit<
    TransactionResponseFromRpc,
    "hash" | "blockNumber" | "blockHash" | "index" | "signature"
>;
export const transactionInputFromRpcZod = transactionResponseZod.omit({
    hash: true,
    blockNumber: true,
    blockHash: true,
    index: true,
    signature: true,
});
