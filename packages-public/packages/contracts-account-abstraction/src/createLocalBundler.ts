import {
    Account,
    Chain,
    Transport,
    EIP1193RequestFn,
    Hash,
    Hex,
    createClient,
    RpcTransactionReceipt,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    ClientConfig,
} from "viem";
import { bundlerActions } from "permissionless";
import { PimlicoBundlerClient } from "permissionless/clients/pimlico";
import { pimlicoBundlerActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE, GetEntryPointVersion } from "permissionless/types";
import { getEntryPointVersion, getUserOperationHash } from "permissionless/utils";
import { omit } from "lodash-es";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
import { packUserOp, decodeUserOp } from "./userOp.js";
import { UserOperationReceiptWithBigIntAsHex, UserOperationWithBigIntAsHex } from "./types/permissionless.js";

/**
 * Creates a local bundler EIP1193 client that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to submit transactions.
 */
export function createLocalBundlerClient(
    parameters: ClientConfig<Transport, Chain, Account> & {
        entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
        chain: Chain;
        publicClient?: PublicClient<Transport, Chain>;
        walletClient?: WalletClient<Transport, Chain, Account>;
    },
): PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE> {
    const entryPointVersion = getEntryPointVersion(parameters.entryPoint);
    if (entryPointVersion != "v0.7" && entryPointVersion != "v0.6") {
        throw new Error(`Unknown entrypoint version ${entryPointVersion} for ${parameters.entryPoint}`);
    }
    if (entryPointVersion === "v0.6") {
        throw new Error(`Known but unsupported entrypoint version ${entryPointVersion}`);
    }
    const supportedEntryPoints = [parameters.entryPoint];

    const userOpsByHash: Record<
        string,
        {
            userOperation: UserOperationWithBigIntAsHex<GetEntryPointVersion<ENTRYPOINT_ADDRESS_V07_TYPE>>;
            entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
            transactionHash: Hash;
            blockHash: Hash;
            blockNumber: Hex;
        }
    > = {};

    const { key = "public", name = "Local Bundler Client", chain } = parameters;
    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, [
        "walletClient",
        "publicClient",
    ]) as any;
    //We use unknown to speedup type inference. Does this help?
    const client = createClient({
        ...clientConfig,
        key,
        name,
        type: "bundlerClient",
    }) as unknown as PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE>;

    const publicClient: PublicClient<Transport, Chain> =
        (parameters as { publicClient: PublicClient<Transport, Chain> }).publicClient ??
        createPublicClient(clientConfig);
    const walletClient: WalletClient<Transport, Chain, Account> =
        (parameters as { walletClient: WalletClient<Transport, Chain, Account> }).walletClient ??
        createWalletClient(clientConfig);

    const requestDefault = client.request;

    //@ts-expect-error
    const requestOverride: EIP1193RequestFn = async function requestOverride(args, options) {
        if (args.method === "eth_sendUserOperation") {
            const [userOp, entryPoint] = args.params as [
                //TODO: We hardcode this for now, only support v0.7
                UserOperationWithBigIntAsHex<"v0.7">,
                ENTRYPOINT_ADDRESS_V07_TYPE,
            ];
            if (!supportedEntryPoints.includes(entryPoint)) {
                throw new Error(`Unsupported entrypoint ${entryPoint}`);
            }

            const userOpPacked = packUserOp(userOp);
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //TODO: Add bundling, aggregate UserOps and submit

            //Submit userOp
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });
            const hash = await walletClient.writeContract(request as any);

            //Compute userOp hash
            const userOpHash: Hash = getUserOperationHash<ENTRYPOINT_ADDRESS_V07_TYPE>({
                userOperation: decodeUserOp(userOp),
                entryPoint,
                chainId: chain.id,
            });

            //Asynchronously fetch receipt
            publicClient.waitForTransactionReceipt({ hash }).then((receipt) => {
                userOpsByHash[userOpHash] = {
                    userOperation: userOp,
                    entryPoint,
                    transactionHash: hash,
                    blockHash: receipt.blockHash,
                    blockNumber: ("0x" + receipt.blockNumber.toString(16)) as Hex,
                };
            });
            return userOpHash;
        } else if (args.method === "eth_estimateUserOperationGas") {
            //TODO: Add support v0.6
            //TODO: See alto rpcHandler.ts eth_estimateUserOperationGas
            if (entryPointVersion === "v0.7") {
                const preVerificationGas = 1_000_000n;
                const callGasLimit = 10_000_000n;

                //in alto all 3 are same in the end (but lower then this default)
                const verificationGasLimit = 10_000_000n;
                const paymasterVerificationGasLimit = verificationGasLimit;
                const paymasterPostOpGasLimit = verificationGasLimit;
                return {
                    preVerificationGas: "0x" + preVerificationGas.toString(16),
                    verificationGasLimit: "0x" + verificationGasLimit.toString(16),
                    callGasLimit: "0x" + callGasLimit.toString(16),
                    paymasterVerificationGasLimit: "0x" + paymasterVerificationGasLimit.toString(16),
                    paymasterPostOpGasLimit: "0x" + paymasterPostOpGasLimit.toString(16),
                } as {
                    preVerificationGas: Hex;
                    verificationGasLimit: Hex;
                    callGasLimit: Hex;
                    paymasterVerificationGasLimit?: Hex;
                    paymasterPostOpGasLimit?: Hex;
                };
            }
        } else if (args.method === "eth_supportedEntryPoints") {
            return supportedEntryPoints;
        } else if (args.method === "eth_getUserOperationByHash") {
            const [hash] = args.params as [Hash];
            return userOpsByHash[hash];
        } else if (args.method === "eth_getUserOperationReceipt") {
            const [hash] = args.params as [Hash];
            const userOp = userOpsByHash[hash];
            if (!userOp) return null;
            const receipt: RpcTransactionReceipt = await publicClient.request({
                method: "eth_getTransactionReceipt",
                params: [userOp.transactionHash],
            });
            //TODO: Add data here
            const response: UserOperationReceiptWithBigIntAsHex = {
                userOpHash: hash,
                sender: userOp.userOperation.sender,
                nonce: userOp.userOperation.nonce,
                //TODO: Return full gas for now
                actualGasUsed: receipt.gasUsed,
                //TODO: unkown, is this gasUsed * effectiveGasPrice?
                actualGasCost: "0x0",
                success: true,
                receipt,
                logs: receipt.logs,
            };
            return response;
        } else if (args.method === "pimlico_getUserOperationGasPrice") {
            const gasPrice = await publicClient.estimateFeesPerGas();
            const gasPriceHex = {
                maxFeePerGas: "0x" + gasPrice.maxFeePerGas!.toString(16),
                maxPriorityFeePerGas: "0x" + gasPrice.maxPriorityFeePerGas!.toString(16),
            } as {
                maxFeePerGas: Hex;
                maxPriorityFeePerGas: Hex;
            };
            return {
                slow: gasPriceHex,
                standard: gasPriceHex,
                fast: gasPriceHex,
            };
        } else if (args.method === "pimlico_getUserOperationStatus") {
            //TODO: For now default
            return requestDefault(args as any, options);
        } else if (args.method === "pimlico_sendCompressedUserOperation") {
            //TODO: For now default
            return requestDefault(args as any, options);
        }

        return requestDefault(args as any, options);
    };

    //Override request function
    client.request = requestOverride;
    return client.extend(bundlerActions(parameters.entryPoint)).extend(pimlicoBundlerActions(parameters.entryPoint));
}
