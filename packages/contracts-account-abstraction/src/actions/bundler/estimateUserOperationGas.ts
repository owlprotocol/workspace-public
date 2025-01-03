import { Address, Chain, Client, Transport } from "viem";
import { EstimateUserOperationGasReturnType, UserOperation } from "viem/account-abstraction";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";

import { getExecutionResult } from "./simulateHandleOp.js";
import { calcPreVerificationGas } from "./calcPreVerificationGas.js";
import { getSupportedEntryPoints } from "./getSupportedEntryPoints.js";
import { calcVerificationGasAndCallGasLimit } from "../../gasestimation/calcVerificationGasAndCallGasLimit.js";
import { dummySignature, encodeUserOp } from "../../models/UserOperation.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";

export type UserOperationGasLimitFields =
    | "preVerificationGas"
    | "verificationGasLimit"
    | "callGasLimit"
    | "paymasterPostOpGasLimit"
    | "paymasterVerificationGasLimit";

export type EstimateUserOperationGasParameters07 = Pick<
    UserOperation<"0.7">,
    "sender" | "nonce" | "callData" | "factory" | "factoryData" | "paymaster" | "paymasterData"
>;

const chainsWithCallAndVerficationGasLimitOverrides: number[] = [
    chains.celoAlfajores.id,
    chains.celo.id,
    chains.sei.id,
    chains.seiDevnet.id,
    chains.sepolia.id,
];

/**
 * Returns an estimate of gas values necessary to execute the User Operation.
 *
 * - Docs: https://viem.sh/actions/bundler/estimateUserOperationGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateUserOperationGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateUserOperationGasReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { toSmartAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { estimateUserOperationGas } from 'viem/actions'
 *
 * const account = await toSmartAccount({ ... })
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const values = await estimateUserOperationGas(bundlerClient, {
 *   account,
 *   calls: [{ to: '0x...', value: parseEther('1') }],
 * })
 */
export async function estimateUserOperationGas(
    client: Client<Transport, Chain | undefined> & {
        entryPointSimulationsAddress: Address;
    },
    parameters: EstimateUserOperationGasParameters07,
): Promise<EstimateUserOperationGasReturnType<undefined, undefined, undefined, "0.7">> {
    const { sender, nonce, callData, factory, factoryData, paymaster, paymasterData } = parameters;
    const { entryPointSimulationsAddress } = client;

    // Default entryPoint
    const supportedEntryPoints = await getAction(client, getSupportedEntryPoints, "getSupportedEntryPoints")({});
    const entryPointAddress = supportedEntryPoints[0];
    // Chain id for custom gas overrides
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //TODO: Get fee per gas if undefined???
    // if (parameters.maxFeePerGas === 0n) {
    // throw new Error("user operation max fee per gas must be larger than 0 during gas estimation");
    // }

    //TODO: This defines minimum paymaster balance required for initial gas estimation
    const userOperation: UserOperation<"0.7"> = {
        sender,
        nonce,
        callData,
        factory,
        factoryData,
        signature: dummySignature,
        // initial dummy gas values
        // populated first, based on byte-size of the user op, this is the gas cost of encoding the user op data before any contract execution
        preVerificationGas: 0n,
        // gas cost of verifying the user op (eg. smart account signature check)
        verificationGasLimit: 1_000_000n,
        // gas cost of executing the user op
        callGasLimit: 10_000_000n,
        paymaster,
        paymasterData,
        // hard-coded to zero to avoid reverts for the initial large gas estimate
        maxFeePerGas: 0n,
        maxPriorityFeePerGas: 0n,
    };
    if (userOperation.paymaster) {
        // gas cost of verifying the paymaster (eg. paymaster signer)
        userOperation.paymasterVerificationGasLimit = 5_000_000n;
        // gas cost of post-execution paymaster hook (eg. ERC20 paymaster)
        userOperation.paymasterPostOpGasLimit = 2_000_000n;
    }

    //Additional 10% added
    userOperation.preVerificationGas =
        ((await calcPreVerificationGas(client, {
            packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
            //TODO: Rename to entryPointAddress
            entryPoint: entryPointAddress,
        })) *
            110n) /
        100n;

    //TODO: See if we can do without when using zero gas estimation
    if (chainId === chains.base.id) {
        userOperation.verificationGasLimit = 5_000_000n;
    }

    if (chainsWithCallAndVerficationGasLimitOverrides.includes(chainId)) {
        userOperation.verificationGasLimit = 1_000_000n;
        userOperation.callGasLimit = 1_000_000n;
    }

    const executionResult = await getExecutionResult(client, {
        packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
        entryPoint: entryPointAddress,
        entryPointSimulationsAddress,
    });

    const verificationGasAndCallGasLimit = calcVerificationGasAndCallGasLimit(
        userOperation,
        executionResult.data.executionResult,
        chainId,
        executionResult.data.callDataResult,
    );
    //Additional 10% added
    userOperation.verificationGasLimit = (verificationGasAndCallGasLimit.verificationGasLimit * 110n) / 100n;

    //Additional 10% added
    userOperation.callGasLimit = (verificationGasAndCallGasLimit.callGasLimit * 110n) / 100n;

    //Empty call data
    if (userOperation.callData === "0x") {
        userOperation.callGasLimit = 0n;
    }

    //Paymaster gas
    if (userOperation.paymaster != null) {
        userOperation.paymasterVerificationGasLimit = 100_000n;
        userOperation.paymasterPostOpGasLimit = 100_000n;
    }
    /*
    // Too complex, right now estimation is always null for paymaster gas data, so we just hard-code
    if (
        userOperation.paymaster !== null &&
        "paymasterVerificationGasLimit" in executionResult.data.executionResult &&
        "paymasterPostOpGasLimit" in executionResult.data.executionResult
    ) {
        // Paymaster enabled
        userOperation.paymasterVerificationGasLimit =
            executionResult.data.executionResult.paymasterVerificationGasLimit || 1n;
        userOperation.paymasterPostOpGasLimit = executionResult.data.executionResult.paymasterPostOpGasLimit || 1n;
    } else if (userOperation.paymaster) {
        // Paymaster enabled, default to UserOp gas limits
        // VerifyingPaymaster has constant verification cost so lower is better
        // VerifyingPaymaster does NOT have a postOp call (unlike ERC20Paymaster) so lower is better
        //TODO: Hard-coded to 100k for now as that's what got tests passing
        // Does this scale with tx data? => No. All contract does is verify signature.
        userOperation.paymasterVerificationGasLimit = 100_000n;
        userOperation.paymasterPostOpGasLimit = 100_000n;
    }
    */

    const userOpGas: EstimateUserOperationGasReturnType<undefined, undefined, undefined, "0.7"> = {
        preVerificationGas: userOperation.preVerificationGas,
        verificationGasLimit: userOperation.verificationGasLimit,
        callGasLimit: userOperation.callGasLimit,
    };
    if (userOperation.paymasterVerificationGasLimit) {
        userOpGas.paymasterVerificationGasLimit = userOperation.paymasterVerificationGasLimit;
    }
    if (userOperation.paymasterPostOpGasLimit) {
        userOpGas.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit;
    }

    return userOpGas;
}
