//viem
import {
    Address,
    Hex,
    PublicClient,
    Transport,
    Chain,
    zeroAddress,
    encodeFunctionData,
    pad,
    concatHex,
    Hash,
    Account,
} from "viem";
//permissionles
import { GetUserOperationReceiptReturnType, UserOperation, getAccountNonce } from "permissionless";
import { signUserOperationHashWithECDSA } from "permissionless/utils";
import { PimlicoBundlerClient, PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { SponsorUserOperationReturnType } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { abi as SimpleAccountAbi } from "./artifacts/SimpleAccount.js";
import { ENTRYPOINT_ADDRESS_V07 } from "./constants.js";
import { UserOperationWithBigIntAsHex, PackedUserOperation } from "./types/permissionless.js";

/**
 * Encode UserOp for RPC (BigInt as hex)
 * @param userOp
 * @returns
 */
export function encodeUserOp(userOp: UserOperation<"v0.7">): UserOperationWithBigIntAsHex<"v0.7"> {
    return {
        sender: userOp.sender,
        nonce: ("0x" + userOp.nonce.toString(16)) as Hex,
        factory: userOp.factory ?? zeroAddress,
        factoryData: userOp.factoryData ?? "0x",
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: ("0x" + userOp.callGasLimit.toString(16)) as Hex,
        verificationGasLimit: ("0x" + userOp.verificationGasLimit.toString(16)) as Hex,
        preVerificationGas: ("0x" + userOp.preVerificationGas.toString(16)) as Hex,
        maxFeePerGas: ("0x" + userOp.maxFeePerGas.toString(16)) as Hex,
        maxPriorityFeePerGas: ("0x" + userOp.maxPriorityFeePerGas.toString(16)) as Hex,
        paymaster: userOp.paymaster ?? zeroAddress,
        paymasterVerificationGasLimit: userOp.paymasterVerificationGasLimit
            ? (("0x" + userOp.paymasterVerificationGasLimit.toString(16)) as Hex)
            : "0x0",
        paymasterPostOpGasLimit: userOp.paymasterVerificationGasLimit
            ? (("0x" + userOp.paymasterVerificationGasLimit.toString(16)) as Hex)
            : "0x0",
        paymasterData: userOp.paymasterData ?? "0x",
    };
}

/**
 * Decode UserOp from RPC (Hex to BigInt)
 * @param userOp
 * @returns
 */
export function decodeUserOp(userOp: UserOperationWithBigIntAsHex<"v0.7">): UserOperation<"v0.7"> {
    return {
        sender: userOp.sender,
        nonce: BigInt(userOp.nonce),
        factory: userOp.factory ?? zeroAddress,
        factoryData: userOp.factoryData ?? "0x",
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: BigInt(userOp.callGasLimit),
        verificationGasLimit: BigInt(userOp.verificationGasLimit),
        preVerificationGas: BigInt(userOp.preVerificationGas),
        maxFeePerGas: BigInt(userOp.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(userOp.maxPriorityFeePerGas),
        paymaster: userOp.paymaster ?? zeroAddress,
        paymasterVerificationGasLimit: BigInt(userOp.paymasterVerificationGasLimit),
        paymasterPostOpGasLimit: BigInt(userOp.paymasterVerificationGasLimit),
        paymasterData: userOp.paymasterData,
    };
}

export function packUserOp(userOp: UserOperationWithBigIntAsHex<"v0.7">): PackedUserOperation {
    const accountGasLimits = packAccountGasLimits(userOp.verificationGasLimit, userOp.callGasLimit);
    const gasFees = packAccountGasLimits(userOp.maxPriorityFeePerGas, userOp.maxFeePerGas);
    let paymasterAndData: Hex = "0x";
    if (userOp.paymaster?.length >= 20 && userOp.paymaster !== zeroAddress) {
        paymasterAndData = packPaymasterData(
            userOp.paymaster,
            userOp.paymasterVerificationGasLimit,
            userOp.paymasterPostOpGasLimit,
            userOp.paymasterData,
        );
    }

    const initCode =
        userOp.factory && userOp.factory != zeroAddress ? concatHex([userOp.factory, userOp.factoryData]) : "0x";
    return {
        sender: userOp.sender,
        nonce: BigInt(userOp.nonce),
        callData: userOp.callData,
        accountGasLimits,
        initCode,
        preVerificationGas: BigInt(userOp.preVerificationGas),
        gasFees,
        paymasterAndData,
        signature: userOp.signature,
    };
}

export function packAccountGasLimits(verificationGasLimit: Hex, callGasLimit: Hex): Hex {
    return concatHex([
        pad(verificationGasLimit, { dir: "left", size: 16 }),
        pad(callGasLimit, { dir: "left", size: 16 }),
    ]);
}

/**
 *
 * paymasterAndData[:20] : address(this)
 * paymasterAndData[20:36] : paymasterVerificationGasLimit
 * paymasterAndData[36:52] : postOpGasLimit
 * paymasterAndData[52:] : paymasterData (custom data)
 * paymasterAndData[52:116] : abi.encode(validUntil, validAfter)
 * paymasterAndData[116:] : signature (64-65 bytex)
 * @param paymaster
 * @param paymasterVerificationGasLimit
 * @param postOpGasLimit
 * @param paymasterData
 * @returns
 */
export function packPaymasterData(
    paymaster: Address,
    paymasterVerificationGasLimit: Hex,
    postOpGasLimit: Hex,
    paymasterData: Hex,
): Hex {
    return concatHex([
        pad(paymaster, { dir: "left", size: 20 }),
        pad(paymasterVerificationGasLimit, { dir: "left", size: 16 }),
        pad(postOpGasLimit, { dir: "left", size: 16 }),
        paymasterData,
    ]);
}

export function unpackAccountGasLimits(accountGasLimits: string): {
    verificationGasLimit: number;
    callGasLimit: number;
} {
    return {
        verificationGasLimit: parseInt(accountGasLimits.slice(2, 34), 16),
        callGasLimit: parseInt(accountGasLimits.slice(34), 16),
    };
}

/**
 * Generic interface for smart account, includes address & factory data in case it does not exist
 */
export interface SmartAccount {
    address: Address;
    factoryAddress: Address;
    factoryData: Hex;
}
/**
 * Clients to get a UserOp
 */
export interface UserOpClients {
    publicClient: PublicClient<Transport, Chain>;
    bundlerClient: PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
    paymasterClient: PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
}

/**
 * Create userOp for smart account address
 *  - if account does not exist, add initialization data to userOp
 *  - populate userOp with gas data using paymaster
 * @param publicClient
 * @param args
 */
export async function createUserOp(
    clients: UserOpClients,
    smartAccount: SmartAccount,
    callData: Hex,
): Promise<UserOperation<"v0.7">> {
    const { publicClient, bundlerClient, paymasterClient } = clients;

    // UserOp, add data as required
    const userOpPartial: Partial<UserOperation<"v0.7">> & { sender: Address; signature: Hex } = {
        sender: smartAccount.address,
        // dummy signature, needs to be there so the SimpleAccount doesn't immediately revert because of invalid signature length
        signature:
            "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
    };
    //If no smart account, add code to first userOp
    if (!(await publicClient.getBytecode({ address: smartAccount.address }))) {
        //Initial deploy nonce = 0
        userOpPartial.nonce = 0n;
        //Add account deploy data
        userOpPartial.factory = smartAccount.factoryAddress;
        userOpPartial.factoryData = smartAccount.factoryData;
    }

    //Add callData to userOp
    userOpPartial.callData = callData;

    // Fetch gas price from Pimlico (includes bundler premium)
    const gasPrice = await bundlerClient.getUserOperationGasPrice();
    userOpPartial.maxFeePerGas = gasPrice.fast.maxFeePerGas;
    userOpPartial.maxPriorityFeePerGas = gasPrice.fast.maxPriorityFeePerGas;

    // Smart account already deployed if nonce === undefined
    if (userOpPartial.nonce === undefined) {
        // Get nonce
        // TODO: Use a key? to avoid non-conflicts in case user also sending separate userOp
        // See https://docs.pimlico.io/permissionless/reference/public-actions/getAccountNonce#key-optional
        const nonce = await getAccountNonce(publicClient, {
            sender: smartAccount.address,
            entryPoint: ENTRYPOINT_ADDRESS_V07,
        });
        userOpPartial.nonce = nonce;
    }

    // Final shape of UserOp after adding data
    const userOpData = userOpPartial as {
        sender: Address;
        signature: Hex;
        nonce: bigint;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        callData: Hex;
        factory?: Address;
        factoryData?: Hex;
    };

    const userOpSponsorResult: SponsorUserOperationReturnType<typeof ENTRYPOINT_ADDRESS_V07> =
        await paymasterClient.sponsorUserOperation({
            userOperation: userOpData,
        });

    const userOp: UserOperation<"v0.7"> = { ...userOpData, ...userOpSponsorResult };
    return userOp;
}

/**
 * High level wrapper around `SimpleAccount.executeBatch` function.
 *   -
 */
export async function executeBatchUserOp(
    clients: UserOpClients & { account: Account },
    smartAccount: {
        address: Address;
        factoryAddress: Address;
        factoryData: Hex;
    },
    calls: { address: Address; value: bigint; bytes: Hex }[],
): Promise<{
    userOp: UserOperation<"v0.7">;
    userOpHash: Hash;
    userOpReceiptPromise: Promise<GetUserOperationReceiptReturnType>;
}> {
    if (calls.length == 0) throw new Error("calls.length == 0! No data for UserOp");

    const { publicClient, bundlerClient, paymasterClient, account } = clients;
    //Encode call data
    const callData =
        calls.length > 1
            ? encodeFunctionData({
                  abi: SimpleAccountAbi,
                  functionName: "executeBatch",
                  args: [calls.map((c) => c.address), calls.map((c) => c.value), calls.map((c) => c.bytes)],
              })
            : encodeFunctionData({
                  abi: SimpleAccountAbi,
                  functionName: "execute",
                  args: [calls[0].address, calls[0].value, calls[0].bytes],
              });

    //Create userOp
    const userOp = await createUserOp({ publicClient, bundlerClient, paymasterClient }, smartAccount, callData);
    //Sign userOp
    const userOpSignature: Hex = await signUserOperationHashWithECDSA({
        account,
        userOperation: userOp,
        chainId: publicClient.chain.id,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
    userOp.signature = userOpSignature;

    //Submit userOp
    const userOpHash = await bundlerClient.sendUserOperation({
        userOperation: userOp,
    });

    //Receipt promise
    const userOpReceiptPromise = bundlerClient.waitForUserOperationReceipt({
        hash: userOpHash,
    });

    return { userOp, userOpHash, userOpReceiptPromise };
}
