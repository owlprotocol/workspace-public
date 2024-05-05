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
    decodeFunctionData,
    numberToHex,
    parseEther,
} from "viem";
import { bundlerActions } from "permissionless";
import { PimlicoBundlerClient } from "permissionless/clients/pimlico";
import { pimlicoBundlerActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE, GetEntryPointVersion } from "permissionless/types";
import { getEntryPointVersion, getUserOperationHash } from "permissionless/utils";
import { omit } from "lodash-es";
import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";
import type {
    PackedUserOperation,
    UserOperationReceiptWithBigIntAsHex,
    UserOperationWithBigIntAsHex,
} from "@owlprotocol/contracts-account-abstraction";
import {
    IEntryPoint,
    UserOperationEvent,
    handleOps,
} from "@owlprotocol/contracts-account-abstraction/artifacts/IEntryPoint";
import { packUserOp, decodeUserOp, unpackUserOp } from "@owlprotocol/contracts-account-abstraction/userOp";
import { topupAddress } from "@owlprotocol/viem-utils";

export type BundlerRpcMethod = (typeof bundlerRpcMethods)[number];

export const bundlerRpcMethods = [
    "eth_sendUserOperation",
    "eth_estimateUserOperationGas",
    "eth_supportedEntryPoints",
    "eth_getUserOperationByHash",
    "eth_getUserOperationReceipt",
    //pimlico
    "eth_getUserOperationGasPrice",
    "pimlico_getUserOperationGasPrice",
    "eth_getUserOperationStatus",
    "pimlico_getUserOperationStatus",
    "eth_sendCompressedUserOperation",
    "pimlico_sendCompressedUserOperation",
] as const;

/**
 * Check if RPC method is for bundler.
 * @param method
 * @returns true if bundler rpc method
 */
export function isBundlerRpcMethod(method: string): method is BundlerRpcMethod {
    return bundlerRpcMethods.includes(method as any);
}

/** Min bundler balance, determines bandwith of bundler but does not get drained */
export const DEFAULT_MIN_BUNDLER_BALANCE = parseEther("0.05");
/** Target bundler balance. */
export const DEFAULT_TARGET_BUNDLER_BALANCE = parseEther("0.1");

/**
 * Local bundler config
 */
export type LocalBundlerConfig = ClientConfig<Transport, Chain, Account> & {
    /** EntryPoint address (only v0.7 supported) */
    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    /** Chain config */
    chain: Chain;
    /** Public client override. Use this instead of instantiating a new one */
    publicClient?: PublicClient<Transport, Chain>;
    /** Wallet client override. Use this instead of instantiating a new one */
    walletClient?: WalletClient<Transport, Chain, Account>;
    /** Rpc max block range. Max block range for fetching logs. Used by `eth_getUserOperationByHash` */
    rpcMaxBlockRange?: bigint;
} & ( //TODO: With dynamic gas estimation, make `minBalance` optional and if defined use Max(minBalance, txCost)
        | { topupWalletClient: WalletClient<Transport, Chain, Account>; minBalance: bigint; targetBalance: bigint }
        | { topupWalletClient?: undefined; minBalance?: undefined; targetBalance?: undefined }
    );

/**
 * Creates a local bundler EIP1193 client that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to submit transactions.
 */
export function createLocalBundlerClient(
    parameters: LocalBundlerConfig,
): PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE> {
    const { key = "public", name = "Local Bundler Client" } = parameters;

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
    client.request = createLocalBundlerEIP1193Request({ ...parameters, request: client.request });

    return client.extend(bundlerActions(parameters.entryPoint)).extend(pimlicoBundlerActions(parameters.entryPoint));
}

//TODO: Add BundlerRPCSchema
/**
 * Creates a local bundler EIP1193 function that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to submit transactions.
 */
export function createLocalBundlerEIP1193Request(
    parameters: Omit<LocalBundlerConfig, "key" | "name"> & { request: EIP1193RequestFn },
): EIP1193RequestFn {
    const entryPointVersion = getEntryPointVersion(parameters.entryPoint);
    if (entryPointVersion != "v0.7" && entryPointVersion != "v0.6") {
        throw new Error(`Unknown entrypoint version ${entryPointVersion} for ${parameters.entryPoint}`);
    }
    if (entryPointVersion === "v0.6") {
        throw new Error(`Known but unsupported entrypoint version ${entryPointVersion}`);
    }
    const supportedEntryPoints = [parameters.entryPoint];

    const { chain, rpcMaxBlockRange, request, topupWalletClient, minBalance, targetBalance } = parameters;
    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, [
        "walletClient",
        "publicClient",
    ]) as any;

    const publicClient: PublicClient<Transport, Chain> =
        (parameters as { publicClient: PublicClient<Transport, Chain> }).publicClient ??
        createPublicClient(clientConfig);
    const walletClient: WalletClient<Transport, Chain, Account> =
        (parameters as { walletClient: WalletClient<Transport, Chain, Account> }).walletClient ??
        createWalletClient(clientConfig);

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

            if (topupWalletClient && minBalance && targetBalance) {
                const bundlerTopup = await topupAddress({
                    publicClient,
                    walletClient: topupWalletClient,
                    address: walletClient.account.address,
                    minBalance,
                    targetBalance,
                });
                if (bundlerTopup.hash) {
                    await publicClient.waitForTransactionReceipt({ hash: bundlerTopup.hash });
                }
            }

            const userOpPacked = packUserOp(userOp);
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //TODO: Add bundling, aggregate UserOps and submit

            //Simulate userOp
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit userOp in background
            walletClient.writeContract(request as any);

            //Compute userOp hash
            const userOpHash: Hash = getUserOperationHash<ENTRYPOINT_ADDRESS_V07_TYPE>({
                userOperation: decodeUserOp(userOp),
                entryPoint,
                chainId: chain.id,
            });

            //Cache userOp
            //To get transactionHash and other post-execution data, call `eth_getUserOperationReceipt`
            ethUserOpResource.upsert({
                chainId: chain.id,
                userOpHash,
                ...userOp,
            });

            return userOpHash;
        } else if (args.method === "eth_estimateUserOperationGas") {
            //TODO: Add support v0.6
            //TODO: See alto rpcHandler.ts eth_estimateUserOperationGas
            if (entryPointVersion === "v0.7") {
                //in alto some of these are the same in the end (but lower then these defaults)
                const callGasLimit = numberToHex(10_000_000n);
                const verificationGasLimit = numberToHex(1_000_000n);
                const preVerificationGas = numberToHex(1_000_000n);
                const paymasterVerificationGasLimit = numberToHex(1_000_000n);
                const paymasterPostOpGasLimit = numberToHex(1_000_000n);

                return {
                    callGasLimit,
                    verificationGasLimit,
                    preVerificationGas,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
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
            const [userOpHash] = args.params as [Hash];
            let fromBlock: bigint | undefined = undefined;
            let toBlock: "latest" | undefined = undefined;
            if (rpcMaxBlockRange !== undefined) {
                const latestBlock = await publicClient.getBlockNumber();
                fromBlock = latestBlock - rpcMaxBlockRange;
                if (fromBlock < 0n) {
                    fromBlock = 0n;
                }
                toBlock = "latest";
            }

            const filterResult = await publicClient.getLogs({
                address: parameters.entryPoint,
                event: UserOperationEvent,
                fromBlock,
                toBlock,
                args: {
                    userOpHash,
                },
            });

            if (filterResult.length === 0) {
                return null;
            }

            const userOperationEvent = filterResult[0];
            const txHash = userOperationEvent.transactionHash;
            if (txHash === null) {
                // transaction pending
                return null;
            }
            const tx = await publicClient.getTransaction({ hash: txHash });

            let op: PackedUserOperation | undefined = undefined;
            try {
                const decoded = decodeFunctionData({
                    abi: [handleOps],
                    data: tx.input,
                });

                const ops = decoded.args[0];
                op = ops.find(
                    (op: PackedUserOperation) =>
                        op.sender === userOperationEvent.args.sender && op.nonce === userOperationEvent.args.nonce,
                );
            } catch {
                return null;
            }

            if (op === undefined) {
                return null;
            }

            const result = {
                userOperation: unpackUserOp(op),
                entryPoint: parameters.entryPoint,
                transactionHash: txHash,
                blockHash: tx.blockHash ?? "0x",
                blockNumber: numberToHex(tx.blockNumber ?? 0n),
            } as {
                userOperation: UserOperationWithBigIntAsHex<GetEntryPointVersion<ENTRYPOINT_ADDRESS_V07_TYPE>>;
                entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
                transactionHash: Hash;
                blockHash: Hash;
                blockNumber: Hex;
            };

            //Cache userOp
            ethUserOpResource.upsert({
                chainId: chain.id,
                userOpHash,
                transactionHash: txHash,
                blockHash: tx.blockHash ?? "0x",
                blockNumber: numberToHex(tx.blockNumber ?? 0n),
                ...result.userOperation,
            });

            return result;
        } else if (args.method === "eth_getUserOperationReceipt") {
            const [userOpHash] = args.params as [Hash];
            //TODO: Review filter block range logic
            let fromBlock = 0n;
            const toBlock = "latest";
            if (rpcMaxBlockRange !== undefined) {
                const latestBlock = await publicClient.getBlockNumber();
                fromBlock = latestBlock - rpcMaxBlockRange;
                if (fromBlock < 0n) {
                    fromBlock = 0n;
                }
            }

            const filterResult = await publicClient.getLogs({
                address: parameters.entryPoint,
                event: UserOperationEvent,
                fromBlock,
                toBlock,
                args: {
                    userOpHash,
                },
            });

            if (filterResult.length === 0) {
                return null;
            }

            const userOperationEvent = filterResult[0];
            // throw if any of the members of userOperationEvent are undefined
            if (
                userOperationEvent.args.actualGasCost === undefined ||
                userOperationEvent.args.sender === undefined ||
                userOperationEvent.args.nonce === undefined ||
                userOperationEvent.args.userOpHash === undefined ||
                userOperationEvent.args.success === undefined ||
                userOperationEvent.args.paymaster === undefined ||
                userOperationEvent.args.actualGasUsed === undefined
            ) {
                throw new Error("userOperationEvent has undefined members");
            }

            const txHash = userOperationEvent.transactionHash;
            if (!txHash) {
                // transaction pending
                return null;
            }
            // console.debug(txHash);

            const receipt: RpcTransactionReceipt | null = await publicClient.request({
                method: "eth_getTransactionReceipt",
                params: [txHash],
            });
            if (!receipt) {
                return null;
            }
            // console.debug(receipt);

            //We will filter the receipt logs, sanity check makes sure logs are confirmed
            //This is a bit overkill as we could also just check if receipt is confirmed
            const logs = receipt.logs;
            if (
                logs.some(
                    (log) =>
                        log.blockHash === null ||
                        log.blockNumber === null ||
                        log.transactionIndex === null ||
                        log.transactionHash === null ||
                        log.logIndex === null,
                    // log.topics.length === 0,
                )
            ) {
                // transaction pending
                return null;
            }

            //This logic filters logs emitted for this UserOp
            let startIndex = -1;
            let endIndex = -1;
            logs.forEach((log, index) => {
                if (log?.topics[0] === userOperationEvent.topics[0]) {
                    // process UserOperationEvent
                    if (log.topics[1] === userOperationEvent.topics[1]) {
                        // it's our userOpHash. save as end of logs array
                        endIndex = index;
                    } else if (endIndex === -1) {
                        // it's a different hash. remember it as beginning index, but only if we didn't find our end index yet.
                        startIndex = index;
                    }
                }
            });
            if (endIndex === -1) {
                throw new Error("fatal: no UserOperationEvent in logs");
            }

            const filteredLogs = logs.slice(startIndex + 1, endIndex);

            const response: UserOperationReceiptWithBigIntAsHex = {
                userOpHash,
                sender: userOperationEvent.args.sender,
                nonce: numberToHex(userOperationEvent.args.nonce),
                actualGasUsed: numberToHex(userOperationEvent.args.actualGasUsed),
                actualGasCost: numberToHex(userOperationEvent.args.actualGasCost),
                success: userOperationEvent.args.success,
                receipt,
                logs: filteredLogs,
            };

            //Cache userOp
            ethUserOpResource.set(
                {
                    chainId: chain.id,
                    userOpHash,
                    transactionHash: receipt.transactionHash,
                    actualGasUsed: numberToHex(userOperationEvent.args.actualGasUsed),
                    actualGasCost: numberToHex(userOperationEvent.args.actualGasCost),
                    success: userOperationEvent.args.success,
                    logIds: filteredLogs.map((l) => {
                        return { blockHash: l.blockHash, logIndex: parseInt(l.logIndex) };
                    }),
                },
                { merge: true },
            );

            return response;
        } else if (
            args.method === "eth_getUserOperationGasPrice" ||
            args.method === "pimlico_getUserOperationGasPrice"
        ) {
            const gasPrice = await publicClient.estimateFeesPerGas();
            const gasPriceHex = {
                maxFeePerGas: numberToHex(gasPrice.maxFeePerGas!),
                maxPriorityFeePerGas: numberToHex(gasPrice.maxPriorityFeePerGas!),
            } as {
                maxFeePerGas: Hex;
                maxPriorityFeePerGas: Hex;
            };
            return {
                slow: gasPriceHex,
                standard: gasPriceHex,
                fast: gasPriceHex,
            };
        } else if (args.method === "eth_getUserOperationStatus" || args.method === "pimlico_getUserOperationStatus") {
            //TODO: For now default
            return request(args as any, options);
        } else if (
            args.method === "eth_sendCompressedUserOperation" ||
            args.method === "pimlico_sendCompressedUserOperation"
        ) {
            //TODO: For now default
            return request(args as any, options);
        }

        return request(args as any, options);
    };

    //Override request function
    return requestOverride;
}
