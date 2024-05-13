import {
    Chain,
    Transport,
    EIP1193RequestFn,
    Hex,
    createClient,
    createPublicClient,
    PublicClient,
    WalletClient,
    Address,
    encodeAbiParameters,
    concatHex,
    LocalAccount,
    Account,
    ClientConfig,
    numberToHex,
    parseEther,
} from "viem";
import { PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { pimlicoPaymasterActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { getEntryPointVersion } from "permissionless/utils";
import { type PartialBy } from "viem/chains";
import { omit } from "lodash-es";
import type { UserOperationWithBigIntAsHex } from "@owlprotocol/contracts-account-abstraction";
import { toPackedUserOperation } from "@owlprotocol/contracts-account-abstraction";
import { VerifyingPaymaster } from "@owlprotocol/contracts-account-abstraction/artifacts/VerifyingPaymaster";
import { topupPaymaster } from "@owlprotocol/contracts-account-abstraction";

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

/** Min paymaster balance, determines total sponsorable ERC4337 gas */
export const DEFAULT_MIN_PAYMASTER_BALANCE = parseEther("0.05");
/** Target paymaster balance */
export const DEFAULT_TARGET_PAYMASTER_BALANCE = parseEther("0.1");

/**
 * Paymaster configuration, extends `ClientConfig` with defined Transport, Chain, but no account
 * @field entryPoint contract address
 * @field paymaster contract address
 * @field paymaster signer that signs UserOps
 * @field publicClient (optional) to read blockchain (defaults to `createPublicClient` using client config)
 * @field topupWalletClient (optional) topup wallet
 * @field minBalance for topup trigger
 * @field targetBalance for topup
 */
export type LocalPaymasterConfig = ClientConfig<Transport, Chain, undefined> & {
    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    paymaster: Address;
    paymasterSigner: LocalAccount;
    publicClient?: PublicClient<Transport, Chain>;
} & ( //TODO: With dynamic gas estimation, make `minBalance` optional and if defined use Max(minBalance, txCost)
        | { topupWalletClient: WalletClient<Transport, Chain, Account>; minBalance: bigint; targetBalance: bigint }
        | { topupWalletClient?: undefined; minBalance?: undefined; targetBalance?: undefined }
    );

/**
 * Creates a local paymaster EIP1193 client that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to sign paymaster transactions.
 */
export function createLocalPaymasterClient(
    parameters: LocalPaymasterConfig,
): PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE> {
    const { key = "public", name = "Local Paymaster Client" } = parameters;
    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, undefined> = omit(parameters, [
        "paymaster",
        "paymasterSigner",
    ]) as any;
    //We use unknown to speedup type inference. Does this help?
    const client = createClient({
        ...clientConfig,
        key,
        name,
        type: "bundlerClient",
    }) as unknown as PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
    client.request = createLocalPaymasterEIP1193Request({ ...parameters, request: client.request });

    return client.extend(pimlicoPaymasterActions(parameters.entryPoint)) as any;
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

    const { paymasterSigner, request, topupWalletClient, minBalance, targetBalance } = parameters;
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
            if (topupWalletClient && minBalance && targetBalance) {
                const paymasterTopup = await topupPaymaster({
                    publicClient,
                    walletClient: topupWalletClient,
                    paymaster,
                    minBalance,
                    targetBalance,
                });
                if (paymasterTopup.hash) {
                    await publicClient.waitForTransactionReceipt({ hash: paymasterTopup.hash });
                }
            }

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
            const userOpPaymasterPacked = toPackedUserOperation(userOp);

            const userOpPaymasterHash = await publicClient.readContract({
                address: paymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "getHash",
                args: [userOpPaymasterPacked as any, validUntil, validAfter],
            });
            const paymasterSignature = await paymasterSigner.signMessage({
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
