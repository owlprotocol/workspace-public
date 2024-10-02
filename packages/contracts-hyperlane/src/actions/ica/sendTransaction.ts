import type { Chain, Client, EstimateGasParameters, Hash, SendTransactionParameters, Transport } from "viem";
import { getAction, parseEther } from "viem/utils";
import { estimateGas, getChainId, sendTransaction as sendTransactionDefault } from "viem/actions";
import { AccountNotFoundError } from "../../errors/index.js";
import { InterchainAccount } from "../../accounts/interchainAccount.js";
import { encodeCallRemoteWithOverrides } from "../../InterchainAccountRouter.js";

/**
 * Creates, signs, and sends a new transaction to the network.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/sendTransaction.html
 * - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions
 * - JSON-RPC Methods:
 *   - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
 *   - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)
 *
 * @param client - Client to use
 * @param parameters - {@link SendTransactionParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) hash.
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { sendTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const hash = await sendTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { sendTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const hash = await sendTransaction(client, {
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 */
export async function sendTransaction<
    account extends InterchainAccount | undefined,
    chain extends Chain | undefined,
    accountOverride extends InterchainAccount | undefined = undefined,
    chainOverride extends Chain | undefined = Chain | undefined,
>(
    client: Client<Transport, chain, account>,
    args: SendTransactionParameters<chain, account, chainOverride>,
): Promise<Hash> {
    const { account: account_ = client.account, to, gas } = args;

    if (!account_) {
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction",
        });
    }

    const account = account_ as accountOverride; //parseAccount(account_) as SmartAccount;

    if (!to) throw new Error("Missing to address");

    const request = { ...args, ...(account ? { from: account?.address } : {}) };

    // get gas
    if (typeof gas === "undefined") {
        request.gas = await getAction(
            client,
            estimateGas,
            "estimateGas",
        )({
            ...request,
            account: account ? { address: account.address, type: "json-rpc" } : undefined,
        } as EstimateGasParameters);
    }

    // quote gas

    // re-encode call to origin
    const chainId = await getAction(client, getChainId, "getChainId")({});

    const icaRouterData = encodeCallRemoteWithOverrides({
        destination: chainId,
        router: account!.router,
        ism: account!.ism,
        calls: [{ to: request.to!, value: request.value, data: request.data }],
    });

    // get gas on origin
    const originClient = account!.originClient;

    //TODO: hard-coded fee
    const icaRouterFee = parseEther("0.001");
    const icaRouterRequest = {
        to: account!.originRouter,
        value: icaRouterFee,
        data: icaRouterData,
    };

    //TODO: This is inaccurate, technically we should be waiting for message delivery to get the
    // hash of the transaction that relayed the message
    //@ts-expect-error
    const hash = await getAction(originClient, sendTransactionDefault, "sendTransaction")(icaRouterRequest);

    return hash;
}
