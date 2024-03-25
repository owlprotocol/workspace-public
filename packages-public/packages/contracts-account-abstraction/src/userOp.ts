//viem
import {
    Address,
    Hex,
    Hash,
    PublicClient,
    WalletClient,
    Transport,
    Chain,
    Account,
    zeroAddress,
    encodeFunctionData,
    formatEther,
    pad,
    concatHex,
} from "viem";
//permissionles
import { GetUserOperationReceiptReturnType, UserOperation, getAccountNonce } from "permissionless";
import { getUserOperationHash, signUserOperationHashWithECDSA } from "permissionless/utils";
import { PimlicoBundlerClient, PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { SponsorUserOperationReturnType } from "permissionless/actions/pimlico";
import { EntryPointVersion } from "permissionless/types";
import { abi as SimpleAccountAbi } from "./artifacts/SimpleAccount.js";
import { ENTRYPOINT_ADDRESS_V07 } from "./constants.js";

export type UserOperationWithBigIntAsHex<entryPointVersion extends EntryPointVersion> = entryPointVersion extends "v0.6"
    ? {
          sender: Address;
          nonce: Hex;
          initCode: Hex;
          callData: Hex;
          callGasLimit: Hex;
          verificationGasLimit: Hex;
          preVerificationGas: Hex;
          maxFeePerGas: Hex;
          maxPriorityFeePerGas: Hex;
          paymasterAndData: Hex;
          signature: Hex;
          factory?: never;
          factoryData?: never;
          paymaster?: never;
          paymasterVerificationGasLimit?: never;
          paymasterPostOpGasLimit?: never;
          paymasterData?: never;
      }
    : {
          sender: Address;
          nonce: Hex;
          factory: Address;
          factoryData: Hex;
          callData: Hex;
          callGasLimit: Hex;
          verificationGasLimit: Hex;
          preVerificationGas: Hex;
          maxFeePerGas: Hex;
          maxPriorityFeePerGas: Hex;
          paymaster: Address;
          paymasterVerificationGasLimit: Hex;
          paymasterPostOpGasLimit: Hex;
          paymasterData: Hex;
          signature: Hex;
          initCode?: never;
          paymasterAndData?: never;
      };

/**
 * PackedUserOp suitable for call to EntryPoint contract
 */
export interface PackedUserOperation {
    sender: Address;
    nonce: bigint;
    initCode: Hex;
    callData: Hex;
    accountGasLimits: Hash;
    preVerificationGas: bigint;
    gasFees: Hash;
    paymasterAndData: Hex;
    signature: Hex;
}

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
    console.debug(userOp);
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
export interface GetUserOpClients {
    publicClient: PublicClient<Transport, Chain>;
    bundlerClient: PimlicoBundlerClient<typeof ENTRYPOINT_ADDRESS_V07>;
    paymasterClient: PimlicoPaymasterClient<typeof ENTRYPOINT_ADDRESS_V07>;
}

/**
 * Create userOp for smart account address
 *  - if account does not exist, add initialization data to userOp
 *  - populate userOp with gas data using paymaster
 * @param publicClient
 * @param args
 */
export async function createUserOp(
    clients: GetUserOpClients,
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

    //If running on localhost (1337), we mock certain bundler operations
    const isERC4337 = publicClient.chain.id != 1337;
    // If ERC4337 with Pimlico, compute sponsored userOp
    // Else execute call directly, return defaults (so we can still mock same return data)
    const userOpSponsorResult: SponsorUserOperationReturnType<typeof ENTRYPOINT_ADDRESS_V07> = isERC4337
        ? await paymasterClient.sponsorUserOperation({
              userOperation: userOpData,
          })
        : {
              callGasLimit: 0n,
              verificationGasLimit: 0n,
              preVerificationGas: 0n,
              paymaster: zeroAddress,
              paymasterVerificationGasLimit: 0n,
              paymasterPostOpGasLimit: 0n,
              paymasterData: "0x",
          };
    const userOp: UserOperation<"v0.7"> = { ...userOpData, ...userOpSponsorResult };
    return userOp;
}

export interface SubmitUserOpClients {
    bundlerClient: PimlicoBundlerClient<typeof ENTRYPOINT_ADDRESS_V07>;
}
/**
 * Submit UserOp to bundler
 * @param clients
 * @param userOp
 * @param account
 */
export async function submitUserOp(
    clients: SubmitUserOpClients,
    userOp: UserOperation<"v0.7">,
): Promise<GetUserOperationReceiptReturnType> {
    const { bundlerClient } = clients;
    // If ERC4337 with Pimlico, compute sponsored userOp
    const userOpHash = await bundlerClient.sendUserOperation({
        userOperation: userOp,
    });
    return bundlerClient.waitForUserOperationReceipt({
        hash: userOpHash,
    });
}

export interface SubmitUserOpMockClients {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
    utilityWalletClient: WalletClient<Transport, Chain, Account>;
}
/**
 * Submit UserOp as regular transaction. Useful for testing and local development
 * @param clients walletClient (owner of smart account), utilityClient (fund walletClient if necessary)
 * @param userOp
 * @param account
 */
export async function submitUserOpMock(
    clients: SubmitUserOpMockClients,
    userOp: UserOperation<"v0.7">,
): Promise<GetUserOperationReceiptReturnType> {
    const { publicClient, walletClient, utilityWalletClient: utilityClient } = clients;
    //Check if smart account needs deployment (since not using ERC4337 where this can be done atomically)
    if (userOp.factoryData) {
        //Utility wallet can send this immediately since anyone can deploy smart wallet
        const hash = await utilityClient.sendTransaction({
            to: userOp.factory,
            data: userOp.factoryData,
        });
        await publicClient.waitForTransactionReceipt({ hash });
    }
    //TODO: Right now need to prefund before gas estimate, replace this with state overrides
    // This is an active issue on viem, consider using raw RPC call
    // https://github.com/wevm/viem/discussions/1418
    // https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-eth#eth-call
    //Check gas, MUST have funded address BEFORE calling prepareTransactionRequest

    // const gas = await publicClient.estimateGas({
    //     account: walletClient.account,
    //     to: userOp.sender,
    //     data: userOp.callData,
    // });
    // WARNING: Hack, see above
    // Override to block gas limit (for now)
    const gas = 30_000_000n;
    const gasPrice = await publicClient.getGasPrice();
    const ethCost = gas * gasPrice;
    const walletBalance = await publicClient.getBalance({ address: walletClient.account.address });
    if (ethCost > walletBalance) {
        console.debug(`Funding ${walletClient.account.address} to fund ${formatEther(ethCost)} ETH deficit`);
        //Fund wallet if needed
        const ethDeficit = ethCost - walletBalance;
        const hash = await utilityClient.sendTransaction({
            to: walletClient.account.address,
            value: ethDeficit,
        });
        await publicClient.waitForTransactionReceipt({ hash });
    }

    const userOpTransactionRequest = await walletClient.prepareTransactionRequest({
        to: userOp.sender,
        data: userOp.callData,
    });
    //Execute main transaction
    const userOpTransactionHash = await walletClient.sendTransaction(userOpTransactionRequest);
    const userOpTransactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: userOpTransactionHash,
    });
    const userOpHash = getUserOperationHash({
        userOperation: userOp,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        chainId: publicClient.chain.id,
    });
    const receipt: GetUserOperationReceiptReturnType = {
        userOpHash,
        sender: userOp.sender,
        nonce: userOp.nonce,
        actualGasUsed: userOpTransactionReceipt.gasUsed,
        actualGasCost: userOpTransactionReceipt.effectiveGasPrice,
        success: true,
        receipt: { ...userOpTransactionReceipt, transactionIndex: BigInt(userOpTransactionReceipt.transactionIndex) },
        logs: userOpTransactionReceipt.logs.map((l) => {
            return {
                ...l,
                transactionIndex: BigInt(l.transactionIndex),
                logIndex: BigInt(l.logIndex),
            };
        }),
    };

    return receipt;
}

/**
 * Combines logic from `submitUserOp` and `submitUserOpMock` to submit
 * a UserOp to a bundler or execute directly using the account owner
 * and the utilityWallet with `PRIVATE_KEY_RELAYER`
 */
export function submitUserOpOrMock(
    clients: SubmitUserOpClients & SubmitUserOpMockClients,
    userOp: UserOperation<"v0.7">,
): Promise<GetUserOperationReceiptReturnType> {
    const { publicClient, walletClient, utilityWalletClient, bundlerClient } = clients;
    const isERC4337 = publicClient.chain.id != 1337;

    let receiptPromise: Promise<GetUserOperationReceiptReturnType>;
    if (isERC4337) {
        receiptPromise = submitUserOp({ bundlerClient }, userOp);
    } else {
        receiptPromise = submitUserOpMock({ publicClient, walletClient, utilityWalletClient }, userOp);
    }
    return receiptPromise;
}

/**
 * High level wrapper around `SimpleAccount.executeBatch` function.
 *   -
 */
export async function executeBatchUserOp(
    clients: GetUserOpClients & SubmitUserOpClients & SubmitUserOpMockClients,
    smartAccount: {
        address: Address;
        factoryAddress: Address;
        factoryData: Hex;
    },
    calls: { address: Address; value: bigint; bytes: Hex }[],
) {
    if (calls.length == 0) throw new Error("calls.length == 0! No data for UserOp");

    const { publicClient, walletClient, utilityWalletClient, bundlerClient, paymasterClient } = clients;
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
    console.debug({
        sender: smartAccount.address,
        callData: callData.length,
    });

    const userOp = await createUserOp({ publicClient, bundlerClient, paymasterClient }, smartAccount, callData);
    console.debug({ ...userOp, callData: userOp.callData.length, factoryData: userOp.factoryData?.length });

    const userOpSignature: Hex = await signUserOperationHashWithECDSA({
        account: walletClient.account,
        userOperation: userOp,
        chainId: publicClient.chain.id,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
    userOp.signature = userOpSignature;
    const userOpHash = getUserOperationHash({
        userOperation: userOp,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        chainId: publicClient.chain.id,
    });

    const receiptPromise = submitUserOpOrMock(
        { publicClient, walletClient, utilityWalletClient, bundlerClient },
        userOp,
    );

    return { userOp, userOpHash, receiptPromise };
}
