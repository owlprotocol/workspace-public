import { getOrDeployDeterministicDeployer, getOrDeployDeterministicContract, Clients } from "@owlprotocol/viem-utils";
import { Address, Hash, encodeDeployData, formatEther, zeroHash } from "viem";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_SALT_V07 } from "./constants.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { VerifyingPaymaster } from "./artifacts/VerifyingPaymaster.js";
import { EntryPointSimulations } from "./artifacts/EntryPointSimulations.js";
import { PimlicoEntryPointSimulations } from "./artifacts/PimlicoEntryPointSimulations.js";

/**
 * Deploy public ERC4337 contracts. These have no permissions system whatsoever and are shared contract infrastructure.
 * These are often pre-deployed on certain frameworks (eg. OPStack) and can be used by anyone.
 * This guarantees compatibility on any EVM chain.
 *   - DeterministicDeployer (0x4e59b44847b379578588920cA78FbF26c0B4956C)
 *   - EntryPointV07  (0x0000000071727De22E5E9d8BAf0edAc6f37da032)
 *   - SimpleAccountFactory (0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985)
 * @param clients publicClient, walletClient for deploying contracts
 * @returns contract info
 */
export async function setupERC4337Contracts(clients: Clients) {
    const { publicClient, walletClient } = clients;
    //Step 1 - Deterministic Deployer
    //If no DeterminsticDeployer, wait for deploy (mostly used for local testing)
    const deterministicDeployer = await getOrDeployDeterministicDeployer({
        publicClient,
        walletClient,
    });
    // console.debug(deterministicDeployer);
    if (deterministicDeployer.hash) {
        await publicClient.waitForTransactionReceipt({ hash: deterministicDeployer.hash });
    }

    //Step 2 - EntryPoint
    //If no EntryPoint v0.7, wait for deploy (mostly used for local testing)
    const entrypoint = (await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        //Extracted salt (first 32 bytes) from original tx
        //https://etherscan.io/tx/0x5c81ea86f6c54481d3e21c78675b4f1d985c1fa62b678dcdfdf7934ddd6e127e
        {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        },
    )) as { address: ENTRYPOINT_ADDRESS_V07_TYPE; hash: Hash | undefined; existed: boolean };
    // console.debug(entrypoint);
    if (entrypoint.address != ENTRYPOINT_ADDRESS_V07) {
        throw new Error(
            `Entrypoint v0.7 deployed address ${ENTRYPOINT_ADDRESS_V07} (expected) != ${entrypoint.address} (actual)`,
        );
    }
    if (entrypoint.hash) {
        await publicClient.waitForTransactionReceipt({ hash: entrypoint.hash });
    }

    //Step 3 - SimpleAccountFactory
    //If no SimpleAccountFactory, wait for deploy (mostly used for local testing)
    const simpleAccountFactory = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: SimpleAccountFactory.abi,
                bytecode: SimpleAccountFactory.bytecode,
                args: [entrypoint.address],
            }),
        },
    );
    // console.debug(simpleAccountFactory);
    if (simpleAccountFactory.hash) {
        await publicClient.waitForTransactionReceipt({ hash: simpleAccountFactory.hash });
    }

    //Step 4 - EntryPointSimulations
    const entrypointSimulations = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: EntryPointSimulations.abi,
                bytecode: EntryPointSimulations.bytecode,
                args: [],
            }),
        },
    );
    // console.debug(entrypointSimulations);
    if (entrypointSimulations.hash) {
        await publicClient.waitForTransactionReceipt({ hash: entrypointSimulations.hash });
    }

    //Step 5 - EntryPointSimulations
    const pimlicoEntrypointSimulations = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: PimlicoEntryPointSimulations.abi,
                bytecode: PimlicoEntryPointSimulations.bytecode,
                args: [entrypointSimulations.address],
            }),
        },
    );
    // console.debug(entrypointSimulations);
    if (pimlicoEntrypointSimulations.hash) {
        await publicClient.waitForTransactionReceipt({ hash: pimlicoEntrypointSimulations.hash });
    }

    //EntryPoint & SimpleAccountFactory & PimlicoEntryPointSimulations can be deployed concurrently
    //TODO: For when walletClient supports concurrent transactions
    /*
    const transactions: Hash[] = [];
    if (entrypoint.hash) transactions.push(entrypoint.hash);
    if (simpleAccountFactory.hash) transactions.push(simpleAccountFactory.hash);

    if (transactions.length > 0) {
        await Promise.all(transactions.map((hash) => publicClient.waitForTransactionReceipt({ hash })));
    }
    */

    return {
        deterministicDeployer,
        entrypoint,
        simpleAccountFactory,
        entrypointSimulations,
        pimlicoEntrypointSimulations,
    };
}

/**
 * Deploy ERC4337 VerifyingPaymaster.
 * This contracts stores a balance of ETH to sponsor UserOps (aka "Paymaster").
 * It approves UserOp sponsorship if these are signed by the `verifyingSignerAddress` (the "Verifying" part).
 *   - VerifyingPaymaster () //TODO: TBD after research if we should deploy AA stack.
 * @param clients publicClient, walletClient for deploying contracts, verifyingSignerAddress address for paymaster
 * @returns contract info
 *
 */
export async function setupVerifyingPaymaster(clients: Clients & { verifyingSignerAddress: Address }) {
    const { publicClient, walletClient, verifyingSignerAddress } = clients;
    const entrypointBytecode = await publicClient.getBytecode({ address: ENTRYPOINT_ADDRESS_V07 });
    if (!entrypointBytecode) {
        throw new Error(
            `EntryPoint v0.7 ${ENTRYPOINT_ADDRESS_V07} not deployed. Consider deploying with setupERC4337Contracts()`,
        );
    }

    //If no VerifyingPaymaster, wait for deploy (mostly used for local testing)
    //EntryPoint MUST be deployed for this to work
    const verifyingPaymaster = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: VerifyingPaymaster.abi,
                bytecode: VerifyingPaymaster.bytecode,
                args: [ENTRYPOINT_ADDRESS_V07, verifyingSignerAddress],
            }),
        },
    );
    // console.debug(verifyingPaymaster);
    if (verifyingPaymaster.hash) {
        await publicClient.waitForTransactionReceipt({ hash: verifyingPaymaster.hash });
    }

    return verifyingPaymaster;
}

/**
 * Topup Paymaster contract with funds if its balance is below a certain minimum.
 * If a topup is required (balance < `minBalance`), funds are deposited to reach `targetBalance`
 * @param clients publicClient, walletClient with funds, minBalance (to trigger topup), targetBalance (topup amount)
 * @returns current paymaster balance & transaction hash for topup (if required)
 */
export async function topupPaymaster(
    clients: Clients & { paymaster: Address; minBalance: bigint; targetBalance: bigint },
): Promise<{ balance: bigint; hash?: Hash }> {
    const { publicClient, walletClient, paymaster, minBalance, targetBalance } = clients;

    if (minBalance > targetBalance) {
        //Ensure invariant minBalance <= targetBalance
        throw new Error(
            `topupPaymaster: minBalance (${formatEther(minBalance)}) > targetBalance (${formatEther(targetBalance)})`,
        );
    }

    const balance = await publicClient.readContract({
        address: ENTRYPOINT_ADDRESS_V07,
        abi: EntryPoint.abi,
        functionName: "balanceOf",
        args: [paymaster],
    });

    if (balance < minBalance) {
        //Paymaster under-funded => deposit from wallet account
        const depositAmount = targetBalance - balance;
        const paymasterDeposit = await publicClient.simulateContract({
            account: walletClient.account,
            address: paymaster,
            abi: VerifyingPaymaster.abi,
            functionName: "deposit",
            value: depositAmount,
            args: [],
        });
        const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
        return { balance, hash: paymasterDepositHash };
    }

    return { balance };
}
