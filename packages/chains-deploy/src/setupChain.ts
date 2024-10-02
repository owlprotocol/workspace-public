import { Address, Transport, Chain, PublicClient, WalletClient, Account } from "viem";
import { topupAddress } from "@owlprotocol/viem-utils";
import { topupPaymaster } from "@owlprotocol/contracts-account-abstraction";
import { topupUtilityAccount } from "./topupUtilityAccount.js";
import { setupChainContracts } from "./setupChainContracts.js";

/**
 * Setup network end to end.
 * The balance configs computed via the `gasBudget` or hard-coded
 * 1. Topup Utility Account
 * 2. Deploy Contracts
 * 3. Topup Bundler
 * 4. Topup Paymaster
 */
export type SetupChainParams = {
    /** Public Client */
    publicClient: PublicClient<Transport, Chain>;
    /** Wallet Client */
    walletClient: WalletClient<Transport, Chain, Account>;
    /** Bundler relayer */
    bundlerAddress: Address;
    /** Paymaster signer */
    verifyingSignerAddress: Address;
    /** Bundler gas budget */
    bundlerGasBudget?: bigint;
    /** Bundler target balance */
    bundlerTargetBalance?: bigint;
    /** Bundler min balance */
    bundlerMinBalance?: bigint;
    /** Paymaster gas budget */
    paymasterGasBudget?: bigint;
    /** Paymaster target balance */
    paymasterTargetBalance?: bigint;
    /** Paymaster min balance */
    paymasterMinBalance?: bigint;
    /** Target utility balance for topup */
    utilityTargetBalance?: bigint;
    /** Min utility balance to trigger topup */
    utilityMinBalance?: bigint;
} & (
    | { publicClientL1: PublicClient<Transport, Chain>; walletClientL1: WalletClient<Transport, Chain, Account> }
    | { publicClientL1?: undefined; walletClientL1?: undefined }
);

/**
 * Topup chain utility account
 * @param params
 */
export async function setupChain(params: SetupChainParams) {
    const { publicClient, walletClient, publicClientL1, walletClientL1 } = params;

    //0. Topup amounts
    const gasPrice = await publicClient.getGasPrice();

    // bundler gets refunded by paymaster, no need for large
    const bundlerGasBudget = params.bundlerGasBudget ?? 50_00_000n;
    const bundlerTargetBalance = params.bundlerTargetBalance ?? bundlerGasBudget * gasPrice;
    // topup at 1/3
    const bundlerMinBalance = params.bundlerMinBalance ?? bundlerTargetBalance / 3n;

    const paymasterGasBudget = params.paymasterGasBudget ?? 100_000_000n;
    const paymasterTargetBalance = params.paymasterTargetBalance ?? paymasterGasBudget * gasPrice;
    // topup at 1/4
    const paymasterMinBalance = params.paymasterMinBalance ?? paymasterTargetBalance / 4n;

    // only applies for L2
    const utilityDefaultTargetBalance = 100_000_000n * gasPrice + 4n * (paymasterTargetBalance + bundlerTargetBalance);
    const utilityTargetBalance = params.utilityTargetBalance ?? utilityDefaultTargetBalance;
    // topup at 1/2
    const utilityMinBalance = params.utilityMinBalance ?? utilityTargetBalance / 2n;

    //1. Topup utility account (local development & L2)
    const utilityTopup = await topupUtilityAccount({
        address: walletClient.account.address,
        minBalance: utilityMinBalance,
        targetBalance: utilityTargetBalance,
        publicClient,
        // any cast required because of complex union
        publicClientL1: publicClientL1 as any,
        walletClientL1: walletClientL1 as any,
    });

    //2. Contracts
    const { verifyingSignerAddress } = params;
    const contracts = await setupChainContracts({ publicClient, walletClient, verifyingSignerAddress });

    //3. Bundler Topup
    const { bundlerAddress } = params;

    const bundlerTopup = await topupAddress({
        publicClient,
        walletClient,
        address: bundlerAddress,
        minBalance: bundlerMinBalance,
        targetBalance: bundlerTargetBalance,
    });
    if (bundlerTopup.hash) {
        await publicClient.waitForTransactionReceipt({ hash: bundlerTopup.hash });
    }

    //4. Paymaster Topup
    const paymasterTopup = await topupPaymaster({
        publicClient,
        walletClient,
        paymaster: contracts.verifyingPaymaster.address,
        minBalance: paymasterMinBalance,
        targetBalance: paymasterTargetBalance,
    });
    if (paymasterTopup.hash) {
        await publicClient.waitForTransactionReceipt({ hash: paymasterTopup.hash });
    }

    return { ...contracts, utilityTopup, bundlerTopup, paymasterTopup };
}
