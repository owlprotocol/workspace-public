import {
    Account,
    Address,
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
    StateOverride,
    decodeFunctionData,
    numberToHex,
    Log,
    GetTransactionReturnType,
} from "viem";
import { bundlerActions } from "permissionless";
import { PimlicoBundlerClient } from "permissionless/clients/pimlico";
import { pimlicoBundlerActions } from "permissionless/actions/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { getEntryPointVersion, getUserOperationHash } from "permissionless/utils";
import { omit } from "lodash-es";
import {
    IEntryPoint,
    UserOperationEvent,
    handleOps,
} from "@owlprotocol/contracts-account-abstraction/artifacts/IEntryPoint";
import {
    PackedUserOperation,
    UserOperationReceiptWithBigIntAsHex,
    UserOperationWithBigIntAsHex,
    UserOperationWithBigIntAsHexPartialGas,
    toPackedUserOperation,
    decodeUserOp,
    decodeUserOpPartialGas,
    toUserOperationEncoded,
    BundlerRpcSchema,
    estimateUserOperationGas,
} from "@owlprotocol/contracts-account-abstraction";

export type OnSendUserOperation = (params: {
    chainId: number;
    userOpHash: Hash;
    userOp: UserOperationWithBigIntAsHex<"v0.7">;
}) => any;

export type OnGetUserOperationByHash = (params: {
    chainId: number;
    userOpHash: Hash;
    userOp: UserOperationWithBigIntAsHex<"v0.7">;
    transaction: GetTransactionReturnType;
}) => any;

export type OnGetUserOperationReceipt = (params: {
    chainId: number;
    userOpHash: Hash;
    userOpEvent: Log<bigint, number, false, typeof UserOperationEvent, true>;
    logs: Log<Hex, Hex, false>[];
    receipt: RpcTransactionReceipt;
}) => any;

/**
 * Local bundler config
 * @field entryPoint contract address
 * @field entryPointSimulations EntryPoint simulations address (only v0.7 supported)
 * @field publicClient (optional) Public client override. Use this instead of instantiating a new one
 * @field walletClient (optional) Wallet client override. Use this instead of instantiating a new one
 * @field rpcMaxBlockRange (optional) Rpc max block range. Max block range for fetching logs. Used by `eth_getUserOperationByHash`
 * @field topupWalletClient (optional) topup wallet
 * @field minBalance for topup trigger
 * @field targetBalance for topup
 */
export type BundlerBackendConfig = ClientConfig<Transport, Chain, Account> & {
    /** EntryPoint address (only v0.7 supported) */
    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    /** EntryPoint simulations addres (only v0.7 supported) */
    entryPointSimulations: Address;
    /** Chain config */
    chain: Chain;
    /** Public client override. Use this instead of instantiating a new one */
    publicClient?: PublicClient<Transport, Chain>;
    /** Wallet client override. Use this instead of instantiating a new one */
    walletClient?: WalletClient<Transport, Chain, Account>;
    /** EIP1559 support */
    eip1559?: boolean;
    /** Rpc max block range. Max block range for fetching logs. Used by `eth_getUserOperationByHash` */
    rpcMaxBlockRange?: bigint;
    /** Middleware for custom logic when user is created or fetched  */
    onSendUserOperation?: OnSendUserOperation;
    onGetUserOperationByHash?: OnGetUserOperationByHash;
    onGetUserOperationReceipt?: OnGetUserOperationReceipt;
};

/**
 * Creates a local bundler EIP1193 client that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to submit transactions.
 */
export function createBundlerBackend(
    parameters: BundlerBackendConfig,
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
    client.request = createBundlerBackendEIP1193Request({ ...parameters, request: client.request });

    return client.extend(bundlerActions(parameters.entryPoint)).extend(pimlicoBundlerActions(parameters.entryPoint));
}

//TODO: Add BundlerRPCSchema
/**
 * Creates a local bundler EIP1193 function that can be used for
 * local testing or to get a minimal in-memory ERC4337 solution.
 * Needs an account to submit transactions.
 * Account is **assumed** to have unlimited funding.
 */
export function createBundlerBackendEIP1193Request(
    parameters: Omit<BundlerBackendConfig, "key" | "name"> & { request: EIP1193RequestFn },
): EIP1193RequestFn {
    const entryPointVersion = getEntryPointVersion(parameters.entryPoint);
    if (entryPointVersion != "v0.7" && entryPointVersion != "v0.6") {
        throw new Error(`Unknown entrypoint version ${entryPointVersion} for ${parameters.entryPoint}`);
    }
    if (entryPointVersion === "v0.6") {
        throw new Error(`Known but unsupported entrypoint version ${entryPointVersion}`);
    }
    const supportedEntryPoints = [parameters.entryPoint];

    const {
        entryPointSimulations: entryPointSimulationsAddress,
        chain,
        eip1559,
        rpcMaxBlockRange,
        request,
    } = parameters;
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

    const requestOverride: EIP1193RequestFn<BundlerRpcSchema<ENTRYPOINT_ADDRESS_V07_TYPE>> =
        async function requestOverride(args, options) {
            if (args.method === "eth_sendUserOperation") {
                const [userOp, entryPoint] = args.params as [
                    //TODO: We hardcode this for now, only support v0.7
                    userOp: UserOperationWithBigIntAsHex<"v0.7">,
                    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE,
                ];
                if (!supportedEntryPoints.includes(entryPoint)) {
                    throw new Error(`Unsupported entrypoint ${entryPoint}`);
                }

                const userOpPacked = toPackedUserOperation(userOp);
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

                //To get transactionHash and other post-execution data, call `eth_getUserOperationReceipt`
                if (parameters.onSendUserOperation) {
                    parameters.onSendUserOperation({
                        chainId: chain.id,
                        userOpHash,
                        userOp,
                    });
                }

                return userOpHash;
            } else if (args.method === "eth_estimateUserOperationGas") {
                const [userOpPartialGasHex, entryPoint] = args.params as [
                    //TODO: We hardcode this for now, only support v0.7
                    userOp: UserOperationWithBigIntAsHexPartialGas<"v0.7">,
                    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE,
                    //TODO: Support state overrides
                    stateOverrides?: StateOverride[number],
                ];
                if (!supportedEntryPoints.includes(entryPoint)) {
                    throw new Error(`Unsupported entrypoint ${entryPoint}`);
                }

                const userOpPartialGas = decodeUserOpPartialGas(userOpPartialGasHex);
                const userOpGas = await estimateUserOperationGas(
                    userOpPartialGas,
                    entryPoint,
                    publicClient,
                    entryPointSimulationsAddress,
                );
                //Get gas with overrides from input (if user already set some gas limit)
                const userOpData = {
                    ...userOpGas,
                    ...userOpPartialGas,
                };

                return {
                    callGasLimit: numberToHex(userOpData.callGasLimit),
                    verificationGasLimit: numberToHex(userOpData.verificationGasLimit),
                    preVerificationGas: numberToHex(userOpData.preVerificationGas),
                    paymasterVerificationGasLimit: userOpData.paymasterVerificationGasLimit
                        ? numberToHex(userOpData.paymasterVerificationGasLimit)
                        : null,
                    paymasterPostOpGasLimit: userOpData.paymasterPostOpGasLimit
                        ? numberToHex(userOpData.paymasterPostOpGasLimit)
                        : null,
                } as {
                    preVerificationGas: Hex;
                    verificationGasLimit: Hex;
                    callGasLimit: Hex;
                    paymasterVerificationGasLimit: Hex | null;
                    paymasterPostOpGasLimit: Hex | null;
                };
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
                    userOperation: toUserOperationEncoded(op),
                    entryPoint: parameters.entryPoint,
                    transactionHash: txHash,
                    blockHash: tx.blockHash ?? "0x",
                    blockNumber: numberToHex(tx.blockNumber ?? 0n),
                } as {
                    userOperation: UserOperationWithBigIntAsHex<"v0.7">;
                    entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
                    transactionHash: Hash;
                    blockHash: Hash;
                    blockNumber: Hex;
                };

                if (parameters.onGetUserOperationByHash) {
                    parameters.onGetUserOperationByHash({
                        chainId: chain.id,
                        userOpHash,
                        userOp: result.userOperation,
                        transaction: tx,
                    });
                }

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
                    strict: true,
                });

                if (filterResult.length === 0) {
                    return null;
                }

                const userOperationEvent = filterResult[0];
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

                if (parameters.onGetUserOperationReceipt) {
                    parameters.onGetUserOperationReceipt({
                        chainId: chain.id,
                        userOpHash,
                        userOpEvent: userOperationEvent,
                        logs: filteredLogs,
                        receipt,
                    });
                }

                return response;
            } else if (
                args.method === "eth_getUserOperationGasPrice" ||
                args.method === "pimlico_getUserOperationGasPrice"
            ) {
                // Default EIP1559
                const gasPrice = await publicClient.estimateFeesPerGas({
                    type: eip1559 === false ? "legacy" : "eip1559",
                });
                if (gasPrice.gasPrice) {
                    const gasPriceHex = {
                        maxFeePerGas: numberToHex(gasPrice.gasPrice),
                        maxPriorityFeePerGas: numberToHex(gasPrice.gasPrice),
                    } as {
                        maxFeePerGas: Hex;
                        maxPriorityFeePerGas: Hex;
                    };
                    return {
                        slow: gasPriceHex,
                        standard: gasPriceHex,
                        fast: gasPriceHex,
                    };
                } else if (gasPrice.maxFeePerGas && gasPrice.maxPriorityFeePerGas) {
                    const gasPriceHex = {
                        maxFeePerGas: numberToHex(gasPrice.maxFeePerGas),
                        maxPriorityFeePerGas: numberToHex(gasPrice.maxPriorityFeePerGas),
                    } as {
                        maxFeePerGas: Hex;
                        maxPriorityFeePerGas: Hex;
                    };
                    return {
                        slow: gasPriceHex,
                        standard: gasPriceHex,
                        fast: gasPriceHex,
                    };
                } else {
                    throw new Error("Invalid gas fee estimate");
                }
            } else if (
                args.method === "eth_getUserOperationStatus" ||
                args.method === "pimlico_getUserOperationStatus"
            ) {
                //TODO: Add support for getting UserOp status. For now pass down the request (will likely error)
                return request(args as any, options);
            } else if (
                args.method === "eth_sendCompressedUserOperation" ||
                args.method === "pimlico_sendCompressedUserOperation"
            ) {
                //TODO: Add support for sending compressed UserOps. For now pass down the request (will likely error)
                return request(args as any, options);
            }

            return request(args as any, options);
        } as EIP1193RequestFn<BundlerRpcSchema<ENTRYPOINT_ADDRESS_V07_TYPE>>;

    //Override request function
    return requestOverride;
}
