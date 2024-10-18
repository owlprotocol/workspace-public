import {
    getOrDeployDeterministicContract,
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getDeployDeterministicAddress,
    getOrPrepareDeterministicContract,
} from "@owlprotocol/viem-utils";
import {
    Address,
    Hash,
    encodeDeployData,
    formatEther,
    zeroHash,
    Account,
    Chain,
    Client,
    Transport,
    TransactionRequest,
} from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import {
    getCode,
    readContract,
    sendTransaction,
    simulateContract,
    waitForTransactionReceipt,
    writeContract,
} from "viem/actions";
import { getAction } from "viem/utils";
import { ENTRYPOINT_SALT_V07 } from "./constants.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { VerifyingPaymaster } from "./artifacts/VerifyingPaymaster.js";
import { EntryPointSimulations } from "./artifacts/EntryPointSimulations.js";
import { PimlicoEntryPointSimulations } from "./artifacts/PimlicoEntryPointSimulations.js";

/**
 * Get public ERC4337 contracts.
 * @returns
 */
export function getERC4337Contracts() {
    const deterministicDeployer = DETERMINISTIC_DEPLOYER_ADDRESS;
    const entrypoint = getDeployDeterministicAddress({ salt: ENTRYPOINT_SALT_V07, bytecode: EntryPoint.bytecode });
    const simpleAccountFactory = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: encodeDeployData({
            abi: SimpleAccountFactory.abi,
            bytecode: SimpleAccountFactory.bytecode,
            args: [entrypoint],
        }),
    });
    const entrypointSimulations = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: encodeDeployData({
            abi: EntryPointSimulations.abi,
            bytecode: EntryPointSimulations.bytecode,
            args: [],
        }),
    });

    const pimlicoEntrypointSimulations = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: encodeDeployData({
            abi: PimlicoEntryPointSimulations.abi,
            bytecode: PimlicoEntryPointSimulations.bytecode,
            args: [entrypointSimulations],
        }),
    });

    return {
        deterministicDeployer,
        entrypoint: entrypoint as typeof entryPoint07Address,
        simpleAccountFactory,
        entrypointSimulations,
        pimlicoEntrypointSimulations,
    };
}

export const erc4337Contracts = getERC4337Contracts();

/**
 * Prepare erc4337 deployment transactions. Useful to do gas estimations before sending transaction
 * @param client with account
 */
export async function prepareERC4337Contracts(client: Client<Transport, Chain, Account>) {
    const requests: TransactionRequest[] = [];
    const [entrypoint, simpleAccountFactory, entrypointSimulations, pimlicoEntrypointSimulations] = await Promise.all([
        getOrPrepareDeterministicContract(
            client,
            //Extracted salt (first 32 bytes) from original tx
            //https://etherscan.io/tx/0x5c81ea86f6c54481d3e21c78675b4f1d985c1fa62b678dcdfdf7934ddd6e127e
            {
                salt: ENTRYPOINT_SALT_V07,
                bytecode: EntryPoint.bytecode,
            },
        ),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: SimpleAccountFactory.abi,
                bytecode: SimpleAccountFactory.bytecode,
                args: [erc4337Contracts.entrypoint],
            }),
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: EntryPointSimulations.abi,
                bytecode: EntryPointSimulations.bytecode,
                args: [],
            }),
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: PimlicoEntryPointSimulations.abi,
                bytecode: PimlicoEntryPointSimulations.bytecode,
                args: [erc4337Contracts.entrypointSimulations],
            }),
        }),
    ]);

    if (entrypoint.address != entryPoint07Address) {
        throw new Error(
            `Entrypoint v0.7 deployed address ${entryPoint07Address} (expected) != ${entrypoint.address} (actual)`,
        );
    }

    if (entrypoint.request) requests.push(entrypoint.request);
    if (simpleAccountFactory.request) requests.push(simpleAccountFactory.request);
    if (entrypointSimulations.request) requests.push(entrypointSimulations.request);
    if (pimlicoEntrypointSimulations.request) requests.push(pimlicoEntrypointSimulations.request);

    return {
        requests,
        entrypoint: entrypoint as {
            address: typeof entryPoint07Address;
            request: TransactionRequest | undefined;
            existed: boolean;
        },
        simpleAccountFactory,
        entrypointSimulations,
        pimlicoEntrypointSimulations,
    };
}

/**
 * Deploy public ERC4337 contracts.
 * These have no permissions system whatsoever and are shared contract infrastructure.
 * These are often pre-deployed on certain frameworks (eg. OPStack) and can be used by anyone.
 * This guarantees compatibility on any EVM chain.
 *   - DeterministicDeployer (0x4e59b44847b379578588920cA78FbF26c0B4956C)
 *   - EntryPointV07  (0x0000000071727De22E5E9d8BAf0edAc6f37da032)
 *   - SimpleAccountFactory (0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985)
 * @param client Client with chain & account for deploying contracts
 * @returns contract info
 */
export async function setupERC4337Contracts(client: Client<Transport, Chain, Account>) {
    const erc4337Contracts = await prepareERC4337Contracts(client);
    const transactions = await Promise.all(
        erc4337Contracts.requests.map((request) =>
            getAction(client, sendTransaction, "sendTransaction")(request as any),
        ),
    );
    const receipts = await Promise.all(
        transactions.map((hash) => getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash })),
    );

    return {
        ...erc4337Contracts,
        transactions,
        receipts,
    };
}

/**
 * Get VerifyingPaymaster contract.
 * @param param0
 * @return  TODO: <address> (production) | 0x2e23ef1375aA642504bED97676A566F5A3E4ae5A (staging)
 */
export function getVerifyingPaymaster(params: { verifyingSignerAddress: Address }): Address {
    const { verifyingSignerAddress } = params;

    return getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: encodeDeployData({
            abi: VerifyingPaymaster.abi,
            bytecode: VerifyingPaymaster.bytecode,
            args: [entryPoint07Address, verifyingSignerAddress],
        }),
    });
}

/**
 * Deploy ERC4337 VerifyingPaymaster.
 * This contracts stores a balance of ETH to sponsor UserOps (aka "Paymaster").
 * It approves UserOp sponsorship if these are signed by the `verifyingSignerAddress` (the "Verifying" part).
 *   - VerifyingPaymaster () //TODO: TBD after research if we should deploy AA stack.
 * @param client Client with chain & account for deploying contracts, verifyingSignerAddress address for paymaster
 * @returns contract info
 *
 */
export async function setupVerifyingPaymaster(
    client: Client<Transport, Chain, Account>,
    parameters: {
        verifyingSignerAddress: Address;
    },
) {
    const { verifyingSignerAddress } = parameters;
    const entrypointBytecode = await getAction(client, getCode, "getCode")({ address: entryPoint07Address });
    if (!entrypointBytecode) {
        throw new Error(
            `EntryPoint v0.7 ${entryPoint07Address} not deployed. Consider deploying with setupERC4337Contracts()`,
        );
    }

    //If no VerifyingPaymaster, wait for deploy (mostly used for local testing)
    //EntryPoint MUST be deployed for this to work
    const verifyingPaymaster = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: encodeDeployData({
            abi: VerifyingPaymaster.abi,
            bytecode: VerifyingPaymaster.bytecode,
            args: [entryPoint07Address, verifyingSignerAddress],
        }),
    });
    // console.debug(verifyingPaymaster);
    if (verifyingPaymaster.hash) {
        await getAction(
            client,
            waitForTransactionReceipt,
            "waitForTransactionReceipt",
        )({ hash: verifyingPaymaster.hash });
    }

    return verifyingPaymaster;
}

/**
 * Topup Paymaster contract with funds if balance is below `minBalance` (0 = Always topup)
 *
 * Funds are deposited to reach `targetBalance` (defaults to `minBalance`)
 * @param parameters publicClient, walletClient **with funds**, minBalance, targetBalance
 * @returns current paymaster balance & transaction hash for topup (if required)
 */
export async function topupPaymaster(
    client: Client<Transport, Chain, Account>,
    parameters: {
        paymaster: Address;
        minBalance: bigint;
        targetBalance?: bigint;
    },
): Promise<{ balance: bigint; hash?: Hash }> {
    const { paymaster, minBalance } = parameters;
    if (minBalance == 0n && parameters.targetBalance === undefined) {
        //Ensure invariant targetBalance ALWAYS defined with minBalance = 0
        throw new Error(`topupAddressL2: minBalance 0, targetBalance MUST be defined`);
    }

    const targetBalance = parameters.targetBalance ?? minBalance;
    if (minBalance > targetBalance) {
        //Ensure invariant targetBalance >= minBalance
        throw new Error(
            `topupPaymaster: minBalance (${formatEther(minBalance)}) > targetBalance (${formatEther(targetBalance)})`,
        );
    }

    if (0n >= targetBalance) {
        //Ensure invariant targetBalance > 0
        throw new Error(`topupPaymaster: 0 >= targetBalance (${formatEther(targetBalance)})`);
    }

    const balance = await getAction(
        client,
        readContract,
        "readContract",
    )({
        address: entryPoint07Address,
        abi: EntryPoint.abi,
        functionName: "balanceOf",
        args: [paymaster],
    });

    // Amount to topup
    const targetDeficit = targetBalance - balance;

    if (targetDeficit > 0n && (balance < minBalance || minBalance == 0n)) {
        //Paymaster under-funded => deposit from wallet account
        const paymasterDeposit = await getAction(
            client,
            simulateContract,
            "simulateContract",
        )({
            account: client.account,
            chain: client.chain,
            address: paymaster,
            abi: VerifyingPaymaster.abi,
            functionName: "deposit",
            value: targetDeficit,
            args: [],
        });
        const paymasterDepositHash = await getAction(client, writeContract, "writeContract")(paymasterDeposit.request);
        return { balance, hash: paymasterDepositHash };
    }

    return { balance };
}
