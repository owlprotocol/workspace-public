import {
    Address,
    Chain,
    Client,
    encodeAbiParameters,
    keccak256,
    parseEther,
    StateOverride,
    toHex,
    Transport,
    zeroAddress,
} from "viem";
import { EstimateUserOperationGasReturnType, UserOperation } from "viem/account-abstraction";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";

import {
    optimismSepolia,
    optimism,
    base,
    baseSepolia,
    celoAlfajores,
    seiDevnet,
    seiTestnet,
    sei,
    celo,
} from "viem/chains";
import { getExecutionResult } from "./simulateHandleOp.js";
import { calcPreVerificationGas } from "./calcPreVerificationGas.js";
import { getSupportedEntryPoints } from "./getSupportedEntryPoints.js";
import { calcVerificationGasAndCallGasLimit } from "../../gasestimation/calcVerificationGasAndCallGasLimit.js";
import { dummySignature, encodeUserOp } from "../../models/UserOperation.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";
import { ENTRYPOINT_ADDRESS_V07 } from "../../constants.js";

export type EstimateUserOperationGasParameters07 = Pick<
    UserOperation<"0.7">,
    "sender" | "nonce" | "callData" | "factory" | "factoryData" | "paymaster" | "paymasterData" | "maxFeePerGas"
>;

// THe slot where the deposit mapping is stored
export const entryPointDepositSlot = 0;

export const getPaymasterSlot = (paymaster: Address) =>
    keccak256(encodeAbiParameters([{ type: "address" }, { type: "uint8" }], [paymaster, entryPointDepositSlot]));

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
    const { factory, factoryData, paymaster } = parameters;
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
        ...parameters,
        factory: factory ?? zeroAddress,
        factoryData: factoryData ?? "0x",
        signature: dummySignature,
        // initial dummy gas values
        // populated first, based on byte-size of the user op, this is the gas cost of encoding the user op data before any contract execution
        preVerificationGas: 0n,
        // gas cost of verifying the user op (eg. smart account signature check)
        verificationGasLimit: 10_000_000n,
        // gas cost of executing the user op
        callGasLimit: 10_000_000n,
        maxFeePerGas: parameters.maxFeePerGas,
        maxPriorityFeePerGas: parameters.maxFeePerGas,
    };

    if (userOperation.paymaster) {
        // gas cost of verifying the paymaster (eg. paymaster signer)
        userOperation.paymasterVerificationGasLimit = 5_000_000n;
        // gas cost of post-execution paymaster hook (eg. ERC20 paymaster)
        userOperation.paymasterPostOpGasLimit = 2_000_000n;
    }

    let stateOverride: StateOverride[number];
    if (paymaster) {
        const paymasterSlot = getPaymasterSlot(paymaster);

        stateOverride = {
            address: ENTRYPOINT_ADDRESS_V07,
            stateDiff: [
                {
                    slot: paymasterSlot,
                    value: toHex(parseEther("1000000"), { size: 32 }),
                },
            ],
        };
    } else {
        stateOverride = {
            // Either the paymaster or the smart account would pay. Override accordingly
            address: paymaster ?? userOperation.sender,
            balance: parseEther("1000000"),
        };
    }

    const executionResult = await getExecutionResult(client, {
        packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
        entryPoint: entryPointAddress,
        entryPointSimulationsAddress,
        stateOverride,
    });

    let { verificationGasLimit, callGasLimit } = calcVerificationGasAndCallGasLimit(
        userOperation,
        executionResult.data.executionResult,
        chainId,
        executionResult.data.callDataResult,
    );

    //Additional 20% added
    verificationGasLimit = (verificationGasLimit * 120n) / 100n;

    if (chainId === base.id || chainId === baseSepolia.id) {
        callGasLimit += 10_000n;
    }

    if (
        chainId === base.id ||
        chainId === optimism.id ||
        chainId === baseSepolia.id ||
        chainId === optimismSepolia.id
    ) {
        const currCallGasLimit = callGasLimit;
        callGasLimit = currCallGasLimit > 120_000n ? currCallGasLimit : 120_000n;
    }

    if (
        chainId === celoAlfajores.id ||
        chainId === celo.id ||
        chainId === sei.id ||
        chainId === seiDevnet.id ||
        chainId === seiTestnet.id
    ) {
        verificationGasLimit = 1_000_000n;
        callGasLimit = 1_000_000n;
    }

    //Empty call data
    if (userOperation.callData === "0x") {
        callGasLimit = 0n;
    }

    //Additional 10% added
    callGasLimit = (callGasLimit * 110n) / 100n;

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

    let preVerificationGas = await calcPreVerificationGas(client, {
        packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
        //TODO: Rename to entryPointAddress
        entryPoint: entryPointAddress,
    });
    //Additional 10% added
    preVerificationGas = (preVerificationGas * 110n) / 100n;

    const userOpGas: EstimateUserOperationGasReturnType<undefined, undefined, undefined, "0.7"> = {
        preVerificationGas,
        verificationGasLimit,
        callGasLimit,
    };
    if (userOperation.paymasterVerificationGasLimit) {
        userOpGas.paymasterVerificationGasLimit = userOperation.paymasterVerificationGasLimit;
    }
    if (userOperation.paymasterPostOpGasLimit) {
        userOpGas.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit;
    }

    return userOpGas;
}
