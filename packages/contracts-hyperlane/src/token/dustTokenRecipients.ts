import {
    Account,
    Address,
    Chain,
    Client,
    formatEther,
    Hash,
    PublicClient,
    sliceHex,
    Transport,
    WalletClient,
} from "viem";
import { ReceivedTransferRemote } from "../artifacts/TokenRouter.js";

export interface DustTokenRecipientsParams {
    /** Clients by chain id which will be extended with public/wallet actions */
    clients: Client;
    /** Account that will be used to create wallet clients*/
    account: Account;
    /** Tokens */
    tokens: { chainId: number; address: Address }[];
}

/**
 * Dust Warp Token Recipients across multiple chains
 * @param params
 */

/*
export function dustTokenRecipients(_params: DustTokenRecipientsParams) {
    const { clients, tokens } = params;
    const clientsByChainId = groupBy(client);
    const tokensByChainId = groupBy(tokens, "chainId");
}
*/

export interface DustTokenRecipientsForChain {
    /** Public client for chain, preferably a websocket client to avoid polling */
    publicClient: PublicClient;
    /**
     * Wallet client for chain
     * @warning MUST have a `nonceManager` or some mechanism for concurrent transactions
     */
    walletClient: WalletClient<Transport, Chain, Account>;
    tokens: { address: Address }[];
    /** Amount in native tokens to dust */
    amount: bigint;
    /** onTransaction handler */
    onTransaction?: ({ hash, to }: { hash: Hash; to: Address }) => any;
}

/**
 * Dust Warp Token Recipients on one chain
 * This is done efficiently using 1 log filter for `ReceivedTransferRemote` event log
 * @param params publicClient, walletClient (with `nonceManager`)
 * @returns A function that can be invoked to stop watching for new Event Logs.
 */
export function dustTokenRecipientsForChain(params: DustTokenRecipientsForChain): () => void {
    const { publicClient, walletClient, tokens, amount } = params;

    // chain metadata (for logging)
    const chain = publicClient.chain;
    const symbol = chain?.nativeCurrency.symbol ?? "ETH";
    const blockExplorer = chain?.blockExplorers?.default;

    const defaultOnTransaction = ({ hash, to }: { hash: Hash; to: Address }) => {
        console.debug(
            `Dusting ${to} with ${formatEther(amount)} ${symbol}: ${
                blockExplorer ? `${blockExplorer}/tx/${hash}` : hash
            }`,
        );
    };
    const onTransaction = params.onTransaction ?? defaultOnTransaction;

    //TODO: Refactor to LRU cache
    // Cache recipient balances
    const balances: Record<Address, bigint | undefined> = {};
    // Track pending dust transactions
    const pendingTx: Record<Address, Hash | undefined> = {};

    return publicClient.watchEvent({
        address: tokens.map((t) => t.address),
        event: ReceivedTransferRemote,
        onLogs: async (logs) => {
            await Promise.allSettled(
                logs.map(async (l) => {
                    // Encoded as bytes32
                    const recipientBytes32: Hash | undefined = l.args.recipient;

                    if (recipientBytes32) {
                        // convert to Address
                        const recipient = sliceHex(recipientBytes32, 12, 32, { strict: true });
                        // recipient balance
                        const balance = balances[recipient] ?? (await publicClient.getBalance({ address: recipient }));

                        if (balance === 0n && !pendingTx[recipient]) {
                            // Avoid race condition (async call to get tx hash)
                            pendingTx[recipient] = "0x";
                            // Send dust transaction (assumes wallet is funded)
                            const hash = await walletClient.sendTransaction({
                                to: recipient,
                                value: amount,
                            });
                            pendingTx[recipient] = hash;

                            onTransaction({ hash, to: recipient });
                        }
                    }
                }),
            );
        },
    });
}
