import {
    Chain,
    Transport,
    EIP1193RequestFn,
    Hex,
    createClient,
    createPublicClient,
    PublicClient,
    Address,
    encodeAbiParameters,
    concatHex,
    LocalAccount,
    Account,
    ClientConfig,
    numberToHex,
} from "viem";
import { PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { pimlicoPaymasterActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { getEntryPointVersion } from "permissionless/utils";
import { PartialBy } from "viem/types/utils";
import { omit } from "lodash-es";
import type { UserOperationWithBigIntAsHex } from "@owlprotocol/contracts-account-abstraction";
import { packUserOp } from "@owlprotocol/contracts-account-abstraction/userOp";
import { VerifyingPaymaster } from "@owlprotocol/contracts-account-abstraction/artifacts/VerifyingPaymaster";

export type PaymasterRpcMethod = (typeof paymasterRpcMethods)[number];

export const paymasterRpcMethods = ["pm_sponsorUserOperation", "pm_validateSponsorshipPolicies"] as const;

/**
 * Check if RPC method is for paymaster.
 * @param method
 * @returns true if paymaster rpc method
 */
export function isPaymasterRpcMethod(method: string): method is PaymasterRpcMethod {
    return paymasterRpcMethods.includes(method as any);
}

export type LocalPaymasterConfig = ClientConfig<Transport, Chain, Account> & {
    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    paymaster: Address;
    paymasterOwner: LocalAccount;
    publicClient?: PublicClient<Transport, Chain>;
};

/**
 * Creates a local paymaster EIP1193 client that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to sign paymaster transactions.
 */
export function createLocalPaymasterClient(
    parameters: ClientConfig<Transport, Chain, Account> & {
        entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
        paymaster: Address;
        paymasterOwner: LocalAccount;
        publicClient?: PublicClient<Transport, Chain>;
    },
): PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE> {
    const { key = "public", name = "Local Paymaster Client" } = parameters;
    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, [
        "paymaster",
        "paymasterOwner",
    ]) as any;
    //We use unknown to speedup type inference. Does this help?
    const client = createClient({
        ...clientConfig,
        key,
        name,
        type: "bundlerClient",
    }) as unknown as PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
    client.request = createLocalPaymasterEIP1193Request({ ...parameters, request: client.request });

    return client.extend(pimlicoPaymasterActions(parameters.entryPoint));
}

//TODO: Add PaymasterRPCSchema
/**
 * Creates a local paymaster EIP1193 function that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to sign paymaster transactions.
 */
export function createLocalPaymasterEIP1193Request(
    parameters: Omit<LocalPaymasterConfig, "key" | "name"> & { request: EIP1193RequestFn },
): EIP1193RequestFn {
    const entryPointVersion = getEntryPointVersion(parameters.entryPoint);
    if (entryPointVersion != "v0.7" && entryPointVersion != "v0.6") {
        throw new Error(`Unknown entrypoint version ${entryPointVersion} for ${parameters.entryPoint}`);
    }
    if (entryPointVersion === "v0.6") {
        throw new Error(`Known but unsupported entrypoint version ${entryPointVersion}`);
    }
    const supportedEntryPoints = [parameters.entryPoint];
    const paymaster = parameters.paymaster;

    const { paymasterOwner, request } = parameters;
    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, [
        "walletClient",
        "publicClient",
    ]) as any;

    const publicClient: PublicClient<Transport, Chain> =
        (parameters as { publicClient: PublicClient<Transport, Chain> }).publicClient ??
        createPublicClient(clientConfig);

    //@ts-expect-error
    const requestOverride: EIP1193RequestFn = async function requestOverride(args, options) {
        if (args.method === "pm_sponsorUserOperation") {
            const [userOperation, entryPoint] = args.params as [
                PartialBy<
                    UserOperationWithBigIntAsHex<"v0.7">,
                    | "callGasLimit"
                    | "preVerificationGas"
                    | "verificationGasLimit"
                    | "paymasterVerificationGasLimit"
                    | "paymasterPostOpGasLimit"
                >,
                ENTRYPOINT_ADDRESS_V07_TYPE,
            ];
            if (!supportedEntryPoints.includes(entryPoint)) {
                throw new Error(`Unsupported entrypoint ${entryPoint}`);
            }

            //TODO: Proper gas estimation, remove hardcoded
            //Default values, if defined & not 0x, we set value
            let callGasLimit = numberToHex(10_000_000n);
            if (userOperation.callGasLimit && userOperation.callGasLimit != "0x") {
                callGasLimit = userOperation.callGasLimit;
            }
            let verificationGasLimit = numberToHex(1_000_000n);
            if (userOperation.verificationGasLimit && userOperation.verificationGasLimit != "0x") {
                verificationGasLimit = userOperation.verificationGasLimit;
            }
            let preVerificationGas = numberToHex(1_000_000n);
            if (userOperation.preVerificationGas && userOperation.preVerificationGas != "0x") {
                preVerificationGas = userOperation.preVerificationGas;
            }
            let paymasterVerificationGasLimit = numberToHex(1_000_000n);
            if (userOperation.paymasterVerificationGasLimit && userOperation.paymasterVerificationGasLimit != "0x") {
                paymasterVerificationGasLimit = userOperation.paymasterVerificationGasLimit;
            }
            let paymasterPostOpGasLimit = numberToHex(1_000_000n);
            if (userOperation.paymasterPostOpGasLimit && userOperation.paymasterPostOpGasLimit != "0x") {
                paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit;
            }

            //Sign
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            const userOp: UserOperationWithBigIntAsHex<"v0.7"> = {
                ...userOperation,
                callGasLimit,
                verificationGasLimit,
                preVerificationGas,
                paymaster,
                //Empty, will be replaced with signature
                paymasterData: paymasterDataUnsigned,
                paymasterVerificationGasLimit,
                paymasterPostOpGasLimit,
            };
            const userOpPaymasterPacked = packUserOp(userOp);

            const userOpPaymasterHash = await publicClient.readContract({
                address: paymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "getHash",
                args: [userOpPaymasterPacked as any, validUntil, validAfter],
            });
            const paymasterSignature = await paymasterOwner.signMessage({
                message: {
                    raw: userOpPaymasterHash,
                },
            });
            const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);

            //TODO: For now default
            const result = {
                callGasLimit,
                verificationGasLimit,
                preVerificationGas,
                paymaster,
                paymasterVerificationGasLimit,
                paymasterPostOpGasLimit,
                paymasterData: paymasterDataSigned,
            } as {
                preVerificationGas: Hex;
                verificationGasLimit: Hex;
                callGasLimit: Hex;
                paymaster: Address;
                paymasterVerificationGasLimit: Hex;
                paymasterPostOpGasLimit: Hex;
                paymasterData: Hex;
            };
            return result;
        } else if (args.method === "pm_validateSponsorshipPolicies") {
            //TODO: For now default
            return request(args as any, options);
        }

        return request(args as any, options);
    };

    return requestOverride;
}
