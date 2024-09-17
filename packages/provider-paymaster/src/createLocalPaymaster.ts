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
import { omit } from "lodash-es";
import { VerifyingPaymaster } from "@owlprotocol/contracts-account-abstraction/artifacts/VerifyingPaymaster";
import {
    UserOperationWithBigIntAsHexPartialGas,
    toPackedUserOperation,
    decodeUserOpPartialGas,
    PimlicoPaymasterRpcSchema,
    estimateUserOperationGas,
    dummySignature,
    encodeUserOp,
    EstimateUserOperationGasResponseResult,
} from "@owlprotocol/contracts-account-abstraction";

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

/**
 * Paymaster configuration, extends `ClientConfig` with defined Transport, Chain, but no account
 * @field entryPoint contract address
 * @field entryPointSimulations EntryPoint simulations address (only v0.7 supported)
 * @field paymaster contract address
 * @field paymaster signer that signs UserOps
 * @field publicClient (optional) Public client override. Use this instead of instantiating a new one
 * @field topupWalletClient (optional) topup wallet
 * @field minBalance for topup trigger
 * @field targetBalance for topup
 */
export type LocalPaymasterConfig = ClientConfig<Transport, Chain, undefined> & {
    /** EntryPoint address (only v0.7 supported) */
    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    /** EntryPoint simulations addres (only v0.7 supported) */
    entryPointSimulations: Address;
    /** paymaster contract address */
    paymaster: Address;
    /** paymaster signer that signs UserOps */
    paymasterSigner: LocalAccount<string>;
    /** publicClient (optional) Public client override. Use this instead of instantiating a new one */
    publicClient?: PublicClient<Transport, Chain>;
};

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

    const { entryPointSimulations: entryPointSimulationsAddress, paymasterSigner, request } = parameters;
    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, [
        "walletClient",
        "publicClient",
    ]) as any;

    const publicClient: PublicClient<Transport, Chain> =
        (parameters as { publicClient: PublicClient<Transport, Chain> }).publicClient ??
        createPublicClient(clientConfig);

    const requestOverride: EIP1193RequestFn<PimlicoPaymasterRpcSchema<ENTRYPOINT_ADDRESS_V07_TYPE>> =
        async function requestOverride(args, options) {
            if (args.method === "pm_sponsorUserOperation") {
                const [userOpPartialGasHex, entryPoint] = args.params as [
                    //TODO: We hardcode this for now, only support v0.7
                    userOp: UserOperationWithBigIntAsHexPartialGas<"v0.7">,
                    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE,
                    //For later compatibility with Pimlico sponsorship policies
                    metadata?: {
                        sponsorshipPolicyId?: string;
                    },
                ];
                if (!supportedEntryPoints.includes(entryPoint)) {
                    throw new Error(`Unsupported entrypoint ${entryPoint}`);
                }

                //TODO: Add dummmy signature like in unit test
                const userOpPartialGas = decodeUserOpPartialGas(userOpPartialGasHex);
                //Paymaster data
                const validUntil = Date.now() + 3600;
                const validAfter = 0;
                const paymasterDataUnsigned = encodeAbiParameters(
                    [
                        { name: "validUntil", type: "uint48" },
                        { name: "validAfter", type: "uint48" },
                    ],
                    [validUntil, validAfter],
                );
                const userOpPartialGasWithPaymaster = {
                    ...userOpPartialGas,
                    paymaster,
                    paymasterData: concatHex([paymasterDataUnsigned, dummySignature]),
                };
                //Estimate gas
                const userOpGas = (await estimateUserOperationGas(
                    userOpPartialGasWithPaymaster,
                    entryPoint,
                    publicClient,
                    entryPointSimulationsAddress,
                )) as EstimateUserOperationGasResponseResult & {
                    paymasterVerificationGasLimit: bigint;
                    paymasterPostOpGasLimit: bigint;
                };
                //Merge UserOp data and UserOp gas. paymasterData should not have signature to compute the hash
                const userOp = {
                    ...userOpGas,
                    ...userOpPartialGasWithPaymaster,
                    paymasterData: paymasterDataUnsigned,
                };

                //Sign
                const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
                //TODO: Is this needed? Can be computed off-chain
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

                const result = {
                    preVerificationGas: numberToHex(userOp.preVerificationGas),
                    verificationGasLimit: numberToHex(userOp.verificationGasLimit),
                    callGasLimit: numberToHex(userOp.callGasLimit),
                    paymaster: userOp.paymaster,
                    paymasterVerificationGasLimit: numberToHex(userOp.paymasterVerificationGasLimit),
                    paymasterPostOpGasLimit: numberToHex(userOp.paymasterPostOpGasLimit),
                    paymasterData: paymasterDataSigned,
                } as {
                    preVerificationGas: Hex;
                    verificationGasLimit: Hex;
                    callGasLimit: Hex;
                    paymaster: Address;
                    paymasterVerificationGasLimit: Hex;
                    paymasterPostOpGasLimit: Hex;
                    paymasterData: Hex;
                    paymasterAndData?: never;
                };
                return result;
            } else if (args.method === "pm_validateSponsorshipPolicies") {
                //TODO: Add support for sponsorship policies. For now pass down the request (will likely error)
                return request(args as any, options);
            }

            return request(args as any, options);
        } as EIP1193RequestFn<PimlicoPaymasterRpcSchema<ENTRYPOINT_ADDRESS_V07_TYPE>>;

    return requestOverride;
}
