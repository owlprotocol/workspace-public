import {
    Account,
    Address,
    Chain,
    ClientConfig,
    EIP1193RequestFn,
    Hex,
    LocalAccount,
    PrepareTransactionRequestRequest,
    PublicClient,
    PublicRpcSchema,
    RpcTransactionRequest,
    TransactionSerializable,
    Transport,
    WalletClient,
    WalletRpcSchema,
    createClient,
    createWalletClient,
    custom,
    numberToHex,
    walletActions,
} from "viem";
import { omit } from "lodash-es";
import { transactionRequestDecodeZod } from "@owlprotocol/zod-sol";

export type WalletRpcMethod = (typeof walletRpcMethods)[number];

export const walletRpcMethods = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData_v4",
    "personal_sign",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_switchEthereumChain",
    "wallet_watchAsset",
] as const;

/**
 * Check if RPC method is for wallets.
 * @param method
 * @returns true if wallet rpc method
 */
export function isWalletRpcMethod(method: string): method is WalletRpcMethod {
    return walletRpcMethods.includes(method as any);
}

export type MultiAccountConfig = ClientConfig<Transport, Chain, Account> & {
    /** Public client override. Use this instead of instantiating a new one */
    publicClient?: PublicClient<Transport, Chain>;
    localAccounts: LocalAccount[];
};

export async function createMultiAccountWalletClient(parameters: MultiAccountConfig): Promise<WalletClient> {
    const { key = "wallet", name = "Wallet Client" } = parameters;

    if (parameters.localAccounts.length == 0) {
        throw new Error(`At least one local account must be provided`);
    }

    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, ["publicClient"]) as any;

    //We use unknown to speedup type inference. Does this help?
    const client = createClient({
        ...clientConfig,
        key,
        name,
        type: "walletClient",
    });
    client.request = await createMultiAccountWalletEIP1193Request({ ...parameters, request: client.request });

    return client.extend(walletActions) as unknown as WalletClient;
}

export type MultiAccountWalletEIP1193Config = {
    request: EIP1193RequestFn<PublicRpcSchema>;
    chain?: Chain;
    chainId?: number;
    localAccounts: LocalAccount[];
};

//TODO: Add WalletRPCSchema
export async function createMultiAccountWalletEIP1193Request(
    parameters: MultiAccountWalletEIP1193Config,
): Promise<EIP1193RequestFn<[...PublicRpcSchema, ...WalletRpcSchema]>> {
    const { request, localAccounts } = parameters;

    if (localAccounts.length == 0) {
        throw new Error(`At least one local account must be provided`);
    }

    let chain: Chain;
    if (parameters.chain) {
        chain = parameters.chain;
    } else {
        chain = {
            id: parameters.chainId ?? parseInt(await request({ method: "eth_chainId" })),
            name: "internal",
            nativeCurrency: {
                decimals: 18,
                name: "Ether",
                symbol: "ETH",
            },
            rpcUrls: {
                default: { http: [] },
            },
        };
    }
    //Get chainId to encode data properly
    const chainId = chain.id;

    function getAccount(address: Address): LocalAccount {
        const { localAccounts } = parameters;
        const account = localAccounts.find((a) => a.address === address);
        if (!account) {
            throw new Error(`Account ${address} not found!`);
        }
        return account;
    }

    function getAddresses(): Address[] {
        return parameters.localAccounts.map((a) => a.address);
    }

    async function signTransaction(transaction: RpcTransactionRequest): Promise<Hex> {
        const { from } = transaction;
        const account = getAccount(from);
        //Decode hex to expected types
        const request = { ...transactionRequestDecodeZod.parse(transaction), chainId } as TransactionSerializable;
        return account.signTransaction(request);
    }

    // Most methods are from the following sources
    // - https://docs.metamask.io/wallet/reference
    // - https://eips.ethereum.org/EIPS/eip-1193
    //TODO: Implement proper error codes from https://eips.ethereum.org/EIPS/eip-1193#errors
    //@ts-expect-error
    const requestOverride: EIP1193RequestFn<[...PublicRpcSchema, ...WalletRpcSchema]> = async function requestOverride(
        args,
        options,
    ) {
        if (args.method === "eth_chainId") {
            return numberToHex(chainId);
        } else if (args.method === "eth_accounts") {
            return getAddresses();
        } else if (args.method === "eth_requestAccounts") {
            //All accounts are considered accessible, security should be implemented at server level
            return getAddresses();
        } else if (args.method === "eth_sendTransaction") {
            const [transaction] = args.params as [transaction: RpcTransactionRequest];

            const walletClient = createWalletClient({
                chain,
                transport: custom({ request }),
                account: transaction.from ? getAccount(transaction.from) : localAccounts[0],
            });

            const transactionDecoded = transactionRequestDecodeZod.parse(
                transaction,
            ) as PrepareTransactionRequestRequest;

            const preparedTransaction = await walletClient.prepareTransactionRequest(transactionDecoded);
            const signedTx = await walletClient.account.signTransaction(preparedTransaction);

            return request({ method: "eth_sendRawTransaction", params: [signedTx] }, options);
        } else if (args.method === "eth_signTransaction") {
            const [transaction] = args.params as [transaction: RpcTransactionRequest];
            return signTransaction(transaction);
        } else if (args.method === "eth_signTypedData_v4") {
            //TODO: Implement this
            // const [address, typedData] = args.params as [address: Address, typedData: any];
            throw new Error(`Unimplemented method ${args.method}`);
        } else if (args.method === "eth_sign" || args.method === "personal_sign") {
            const [challenge, address] = args.params as [challenge: Hex, address: Address];
            const account = getAccount(address);
            return account.signMessage({ message: { raw: challenge } });
        } else if (args.method === "eth_decrypt") {
            //Not supported by DFNS
            throw new Error(`Unsupported method ${args.method}`);
        } else if (args.method === "eth_getEncryptionPublicKey") {
            //Not supported by DFNS (since decryption impossible)
            throw new Error(`Unsupported method ${args.method}`);
        } else if (args.method === "wallet_addEthereumChain") {
            //Not supported as chains are added through Firebase
            throw new Error(`Unsupported method ${args.method}`);
        } else if (args.method === "wallet_switchEthereumChain") {
            throw new Error(`Unsupported method ${args.method}`);
            //TODO: Single chain for now
            //Set chainId, this will enforce all eth_sendTransaction/eth_signTransaction sign
            //with proper chainId
            // const [chainIdHex] = args.params as [chainIdHex: Hex];

            //TODO: Throw 4902 error on unrecognized chainId
            //https://docs.metamask.io/wallet/reference/wallet_switchethereumchain/
            // chainId = BigInt(chainIdHex);
            //
            // return null;
        } else if (args.method === "wallet_watchAsset") {
            //Watch an asset, updates ERC20Balance, ERC721, ERC1155Balance accordingly
            // const [type, options] = args.params as [type: "ERC20" | "ERC721" | "ERC1155", options: { address: Address, symbol?: string, decimals?: number, image?: string, tokenId?: string}]
            throw new Error(`Unimplemented method ${args.method}`);
        }

        return request(args as any, options);
    };

    return requestOverride;
}
