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
} from "viem";
import { PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { pimlicoPaymasterActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { getEntryPointVersion } from "permissionless/utils";
import { PartialBy } from "viem/types/utils";
import { omit } from "lodash-es";
import { UserOperationWithBigIntAsHex } from "./types/permissionless.js";
import { packUserOp } from "./userOp.js";
import { VerifyingPaymaster } from "./artifacts/VerifyingPaymaster.js";

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
    const entryPointVersion = getEntryPointVersion(parameters.entryPoint);
    if (entryPointVersion != "v0.7" && entryPointVersion != "v0.6") {
        throw new Error(`Unknown entrypoint version ${entryPointVersion} for ${parameters.entryPoint}`);
    }
    if (entryPointVersion === "v0.6") {
        throw new Error(`Known but unsupported entrypoint version ${entryPointVersion}`);
    }
    const supportedEntryPoints = [parameters.entryPoint];
    const paymaster = parameters.paymaster;

    const { key = "public", name = "Local Paymaster Client", paymasterOwner } = parameters;
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

    const publicClient: PublicClient<Transport, Chain> =
        (parameters as { publicClient: PublicClient<Transport, Chain> }).publicClient ??
        createPublicClient(clientConfig);

    const requestDefault = client.request;

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

            //Gas estimation mock
            const callGasLimit = userOperation.callGasLimit ?? (("0x" + 10_000_000n.toString(16)) as Hex);
            const verificationGasLimit = userOperation.verificationGasLimit ?? callGasLimit;
            const preVerificationGas = userOperation.preVerificationGas ?? (("0x" + 1_000_000n.toString(16)) as Hex);
            const paymasterVerificationGasLimit = userOperation.paymasterVerificationGasLimit ?? callGasLimit;
            const paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit ?? callGasLimit;

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
            return requestDefault(args as any, options);
        }

        return requestDefault(args as any, options);
    };

    //Override request function
    client.request = requestOverride;
    return client.extend(pimlicoPaymasterActions(parameters.entryPoint));
}
