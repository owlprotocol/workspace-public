import { kaiaTestnet } from "@owlprotocol/chains";
import { networkPrivateResource } from "@owlprotocol/core-firebase/admin";

import { getUtilityAccount, getRelayerAccount, getPaymasterSignerAccount } from "@owlprotocol/viem-utils";
import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { setupChain } from "../setupChain.js";
import { extendWalletClient } from "../extendWalletClient.js";

export async function main() {
    // Accounts
    //Load viem utility account
    const utilityAccount = getUtilityAccount();
    // Load viem bundler account
    const bundlerAccount = getRelayerAccount();
    //Load viem paymaster signer account
    const paymasterSignerAccount = getPaymasterSignerAccount();

    //Network to deploy
    const network = kaiaTestnet;

    const chain = { id: network.chainId, ...network } as Chain;
    const publicClient = createPublicClient({
        transport: http(chain.rpcUrls.default.http[0]),
        chain,
    });
    const walletClient = extendWalletClient(
        createWalletClient({
            transport: http(chain.rpcUrls.default.http[0]),
            chain,
            account: utilityAccount,
        }),
    );

    // L1 (opstack)
    const networkL1 = chain.sourceId ? await networkPrivateResource.getOrNull({ chainId: chain.sourceId }) : null;
    const chainL1 = networkL1 ? ({ id: networkL1.chainId, ...networkL1 } as Chain) : undefined;
    const publicClientL1 = chainL1
        ? createPublicClient({
              transport: http(chainL1.rpcUrls.default.http[0]),
              chain: chainL1,
          })
        : undefined;
    const walletClientL1 = chainL1
        ? extendWalletClient(
              createWalletClient({
                  transport: http(chainL1.rpcUrls.default.http[0]),
                  chain,
                  account: utilityAccount,
              }),
          )
        : undefined;

    console.debug(`🛠️  Deploying ${network.name}`);

    const result = await setupChain({
        publicClient,
        walletClient,
        bundlerAddress: bundlerAccount.address,
        verifyingSignerAddress: paymasterSignerAccount.address,
        publicClientL1: publicClientL1 as any,
        walletClientL1: walletClientL1 as any,
        bundlerTargetBalance: network.targetRelayerBalance as bigint,
        bundlerMinBalance: network.minRelayerBalance as bigint,
        paymasterTargetBalance: network.targetPaymasterBalance as bigint,
        paymasterMinBalance: network.minPaymasterBalance as bigint,
        paymasterGasBudget: 1_000_000_000n,
        utilityTargetBalance: network.targetUtilityBalance as bigint,
        utilityMinBalance: network.minUtilityBalance as bigint,
    });

    console.debug({ bundlerTopup: result.bundlerTopup, paymasterTopup: result.paymasterTopup });
}

// await main();
