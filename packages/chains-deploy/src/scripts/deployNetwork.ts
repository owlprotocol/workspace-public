import { opBNBTestnet } from "@owlprotocol/chains";
import { networkPrivateResource } from "@owlprotocol/core-firebase/admin";

import { getUtilityAccount, getRelayerAccount, getPaymasterSignerAccount } from "@owlprotocol/viem-utils";
import { Chain, createWalletClient, http, nonceManager } from "viem";
import { setupChain } from "../setupChain.js";

export async function main() {
    // Accounts
    //Load viem utility account
    const utilityAccount = getUtilityAccount({ nonceManager });
    // Load viem bundler account
    const bundlerAccount = getRelayerAccount({ nonceManager });
    //Load viem paymaster signer account
    const paymasterSignerAccount = getPaymasterSignerAccount({ nonceManager });

    //Network to deploy
    const network = opBNBTestnet;

    const chain = { id: network.chainId, ...network } as Chain;
    const walletClient = createWalletClient({
        transport: http(chain.rpcUrls.default.http[0]),
        chain,
        account: utilityAccount,
    });
    // L1 (opstack)
    const networkL1 = chain.sourceId ? await networkPrivateResource.getOrNull({ chainId: chain.sourceId }) : null;
    const chainL1 = networkL1 ? ({ id: networkL1.chainId, ...networkL1 } as Chain) : undefined;
    const walletClientL1 = chainL1
        ? createWalletClient({
              transport: http(chainL1.rpcUrls.default.http[0]),
              chain: chainL1,
              account: utilityAccount,
          })
        : undefined;

    console.debug(`🛠️  Deploying ${network.name}`);

    const result = await setupChain(walletClient, {
        bundlerAddress: bundlerAccount.address,
        verifyingSignerAddress: paymasterSignerAccount.address,
        clientL1: walletClientL1 as any,
        bundlerTargetBalance: network.targetRelayerBalance as bigint,
        bundlerMinBalance: network.minRelayerBalance as bigint,
        paymasterTargetBalance: network.targetPaymasterBalance as bigint,
        paymasterMinBalance: network.minPaymasterBalance as bigint,
        // paymasterGasBudget: 1_000_000_000n,
        utilityTargetBalance: network.targetUtilityBalance as bigint,
        utilityMinBalance: network.minUtilityBalance as bigint,
    });

    console.debug({ bundlerTopup: result.bundlerTopup, paymasterTopup: result.paymasterTopup });
}

// await main();
