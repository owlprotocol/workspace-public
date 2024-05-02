import {
    Account,
    Address,
    Chain,
    ClientConfig,
    EIP1193RequestFn,
    Hex,
    LocalAccount,
    PublicClient,
    PublicRpcSchema,
    RpcTransactionRequest,
    TransactionSerializable,
    Transport,
    WalletClient,
    WalletRpcSchema,
    createClient,
    numberToHex,
    walletActions,
} from "viem";
import {
    projectUserWalletDfnsResource,
    projectUserWalletDfnsGroupQuery,
    ProjectUserWalletDfns,
} from "@owlprotocol/core-firebase/admin";
import { omit } from "lodash-es";
import { transactionRequestDecodeZod } from "@owlprotocol/zod-sol";
import { createDfnsWallet, dfnsClient, getDfnsAccount } from "./controllers/dfns.js";

export type WalletRpcMethod = (typeof walletRpcMethods)[number];

export const walletRpcMethods = [
    "eth_accounts",
    "eth_requestAccounts",
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

export type DfnsAccountConfig = ClientConfig<Transport, Chain, Account> & {
    /** Public client override. Use this instead of instantiating a new one */
    publicClient?: PublicClient<Transport, Chain>;
    /** userId to fetch wallets */
    userId: string;
    /** projectId to fetch wallets, if not specified all wallets supported */
    projectId?: string;
};

export function createDfnsAccountClient(): Account {
    throw new Error("Unimplemented");
}

export async function createDfnsWalletClient(parameters: DfnsAccountConfig): Promise<WalletClient> {
    const { key = "wallet", name = "Wallet Client" } = parameters;

    //Remove non-standard keys from config, doesn't break anything but more aligned with original
    const clientConfig: ClientConfig<Transport, Chain, Account> = omit(parameters, ["publicClient"]) as any;

    //We use unknown to speedup type inference. Does this help?
    const client = createClient({
        ...clientConfig,
        key,
        name,
        type: "walletClient",
    });
    client.request = await createDfnsWalletEIP1193Request({ ...parameters, request: client.request });

    return client.extend(walletActions) as unknown as WalletClient;
}

export type DfnsWalletEIP1193Config = {
    request: EIP1193RequestFn<PublicRpcSchema>;
    chain?: Chain;
    chainId?: number;
    /** userId to fetch wallets */
    userId: string;
    /** projectId to fetch wallets, if not specified all wallets supported */
    projectId?: string;
};
//TODO: Add support for developer wallets
//TODO: Add WalletRPCSchema
export async function createDfnsWalletEIP1193Request(
    parameters: DfnsWalletEIP1193Config,
): Promise<EIP1193RequestFn<[...PublicRpcSchema, ...WalletRpcSchema]>> {
    const { request, userId, projectId } = parameters;

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

    //TODO: Optional caching for `eth_accounts` since this is used for other rpc calls as well?
    async function getAccounts(): Promise<ProjectUserWalletDfns[]> {
        if (projectId) {
            //Fetch user wallets in specific project
            const wallets = await projectUserWalletDfnsResource.getWhere({ projectId, userId });

            //If wallets.length === 0, create a wallet
            if (wallets.length === 0) {
                const externalId = `${projectId}-project-${userId}-wallet-${0}`;
                const walletResponse = await createDfnsWallet(dfnsClient, externalId);
                const wallet = {
                    projectId,
                    walletId: walletResponse.id,
                    status: walletResponse.status as any,
                    userId,
                    address: walletResponse.address as Address,
                };
                await projectUserWalletDfnsResource.set(wallet);

                return [wallet];
            }

            return wallets;
        } else {
            //Fetch all user wallets across all projects
            const wallets = await projectUserWalletDfnsGroupQuery.getWhere({ userId });
            return wallets;
        }
    }

    async function getAccount(account: Address): Promise<LocalAccount> {
        const accountInfo = (await getAccounts()).find((a) => a.address === account);
        if (!accountInfo) {
            throw new Error(`Account ${account} not found!`);
        }
        //TODO: DFNS Wallet as EIP1193?
        return getDfnsAccount(dfnsClient, accountInfo.walletId);
    }

    async function getAddresses(): Promise<Address[]> {
        return (await getAccounts()).map((w) => w.address).filter((a) => !!a) as Address[];
    }

    async function signTransaction(transaction: RpcTransactionRequest): Promise<Hex> {
        const { from } = transaction;
        const account = await getAccount(from);
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
            const signedTx = await signTransaction(transaction);

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
            const account = await getAccount(address);
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

            return null;
        } else if (args.method === "wallet_watchAsset") {
            //Watch an asset, updates ERC20Balance, ERC721, ERC1155Balance accordingly
            // const [type, options] = args.params as [type: "ERC20" | "ERC721" | "ERC1155", options: { address: Address, symbol?: string, decimals?: number, image?: string, tokenId?: string}]
            throw new Error(`Unimplemented method ${args.method}`);
        }

        return request(args as any, options);
    };

    return requestOverride;
}
