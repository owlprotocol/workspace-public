/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    BroadcastTransactionRequest,
    BroadcastTransactionResponse,
    CreateWalletRequest,
    CreateWalletResponse,
    GenerateSignatureBody,
    GenerateSignatureRequest,
    GenerateSignatureResponse,
    GetSignatureRequest,
    GetSignatureResponse,
    GetTransactionRequest,
    GetTransactionResponse,
    GetTransferRequest,
    GetTransferResponse,
    GetWalletAssetsRequest,
    GetWalletAssetsResponse,
    GetWalletHistoryRequest,
    GetWalletHistoryResponse,
    GetWalletNftsRequest,
    GetWalletNftsResponse,
    GetWalletRequest,
    GetWalletResponse,
    ListSignaturesRequest,
    ListSignaturesResponse,
    ListTransactionsRequest,
    ListTransactionsResponse,
    ListTransfersRequest,
    ListTransfersResponse,
    ListWalletsRequest,
    ListWalletsResponse,
    TransferAssetRequest,
    TransferAssetResponse,
} from "@dfns/sdk/generated/wallets/types.js";
import { Hex, isHex, keccak256, hexToSignature, toHex, Signature } from "viem";
import { english, generateMnemonic, mnemonicToAccount, privateKeyToAccount, sign } from "viem/accounts";

export function isSign<T extends GenerateSignatureBody["kind"]>(
    kind: T,
    body: GenerateSignatureBody,
): body is GenerateSignatureBody & { kind: T } {
    return body.kind === kind;
}

/**
 * Dfns wallet client interface
 */
export interface WalletsClientInterface {
    createWallet(request: CreateWalletRequest): Promise<CreateWalletResponse>;
    getWallet(request: GetWalletRequest): Promise<GetWalletResponse>;
    getWalletAssets(request: GetWalletAssetsRequest): Promise<GetWalletAssetsResponse>;
    getWalletNfts(request: GetWalletNftsRequest): Promise<GetWalletNftsResponse>;
    listWallets(request: ListWalletsRequest): Promise<ListWalletsResponse>;
    getWalletHistory(request: GetWalletHistoryRequest): Promise<GetWalletHistoryResponse>;
    transferAsset(request: TransferAssetRequest): Promise<TransferAssetResponse>;
    getTransfer(request: GetTransferRequest): Promise<GetTransferResponse>;
    listTransfers(request: ListTransfersRequest): Promise<ListTransfersResponse>;
    broadcastTransaction(request: BroadcastTransactionRequest): Promise<BroadcastTransactionResponse>;
    getTransaction(request: GetTransactionRequest): Promise<GetTransactionResponse>;
    listTransactions(request: ListTransactionsRequest): Promise<ListTransactionsResponse>;
    generateSignature(request: GenerateSignatureRequest): Promise<GenerateSignatureResponse>;
    getSignature(request: GetSignatureRequest): Promise<GetSignatureResponse>;
    listSignatures(request: ListSignaturesRequest): Promise<ListSignaturesResponse>;
}

/**
 * Mock dfns wallet client implementation using viem
 */
export class WalletsClientMock implements WalletsClientInterface {
    private mnemonic: string;
    private signaturesCount = 0;
    private walletsCount = 0;

    private wallets: Record<string, CreateWalletResponse | undefined> = {};
    private signatures: Record<string, GenerateSignatureResponse | undefined> = {};

    private privateKeys: Record<string, Hex | undefined> = {};

    /**
     * Create mock wallet client
     * @param mnemonic key generation mnemonic
     * @param createTimeout wallet creation timeout in ms
     */
    constructor(mnemonic?: string) {
        this.mnemonic = mnemonic ?? generateMnemonic(english);
    }

    /**
     * Add hard-coded wallet
     * @param wallet
     * @param privateKey
     */
    addWallet(
        wallet: Omit<CreateWalletResponse, "signingKey" | "tags" | "custodial" | "status" | "dateCreated"> & {
            signingKey?: CreateWalletResponse["signingKey"];
        },
        privateKey: Hex,
    ): CreateWalletResponse {
        if (this.wallets[wallet.id]) {
            throw new Error(`Wallet ${wallet.id} exists! Use different id or get wallet with getWallet()`);
        }
        const signer = privateKeyToAccount(privateKey);
        const dateCreated = new Date().toISOString();
        const status = "Active" as const;

        const signingKey = {
            //TODO: Support EdDSA
            scheme: "ECDSA" as const,
            curve: "secp256k1" as const,
            //TODO: Is this the same as compressedPublicKey? (used in ethers)
            publicKey: signer.publicKey.substring(2), //strip 0x prefix to align with DFNS
        };
        const walletResponse = { ...wallet, dateCreated, status, signingKey, custodial: true };
        this.wallets[wallet.id] = walletResponse;
        this.walletsCount++;

        this.privateKeys[wallet.id] = privateKey;

        return walletResponse;
    }

    /**
     * Create wallet similar to DFNS request, uses stored hdNode
     * @param request (if externalId passed, pkey is deterministic)
     * @returns
     */
    async createWallet(request: CreateWalletRequest): Promise<CreateWalletResponse> {
        //Request Body
        const { network, externalId, tags, name } = request.body;
        //Id: if external id, derive address deterministically, else bump wallets count
        const walletsCount = this.walletsCount++;
        const id = externalId ?? `${walletsCount}`;
        if (this.wallets[id]) {
            return this.wallets[id]!;
        }
        const dateCreated = new Date().toISOString();

        //Private Key

        let keyDerivation: number;
        if (externalId) {
            const utf8Encode = new TextEncoder();
            //External id given, generate deteministic pseudo-random key derivation index
            //mod to max (1000000000n) key derivation index to avoid breaking
            keyDerivation = Number(BigInt(keccak256(utf8Encode.encode(externalId))) % 1000000000n);
        } else {
            //No external id, use wallets count as key derivation index
            keyDerivation = walletsCount;
        }
        //Signing Key
        const signer = mnemonicToAccount(this.mnemonic, { accountIndex: keyDerivation });
        const privateKey = toHex(signer.getHdKey().privateKey!);
        const signingKey = {
            //TODO: Support EdDSA
            scheme: "ECDSA" as const,
            curve: "secp256k1" as const,
            //TODO: Is this the same as compressedPublicKey? (used in ethers)
            publicKey: signer.publicKey.substring(2), //strip 0x prefix to align with DFNS
        };
        //Similar to API behaviour, address undefined for non-blockchain network
        //TODO: Removed so can work with Viem properly
        //const address = network === "KeyECDSA" || network === "KeyEdDSA" ? undefined : await signer.getAddress();
        const address = await signer.address;

        //No timeout
        const status = "Active";

        const wallet = {
            id,
            network,
            status,
            signingKey,
            address,
            name,
            externalId,
            tags: tags ?? [],
            dateCreated,
            custodial: true,
        } as const;

        this.wallets[id] = wallet;
        this.privateKeys[id] = privateKey;
        return wallet;
    }

    //TODO: implement this
    async getWallet(request: GetWalletRequest): Promise<GetWalletResponse> {
        const { walletId } = request;
        const wallet = this.wallets[walletId];
        if (!wallet) throw new Error(`Wallet ${walletId} not found!`);

        return wallet;
    }
    async getWalletAssets(_: GetWalletAssetsRequest): Promise<GetWalletAssetsResponse> {
        throw new Error("Unimplemented");
    }
    async getWalletNfts(_: GetWalletNftsRequest): Promise<GetWalletNftsResponse> {
        throw new Error("Unimplemented");
    }
    async listWallets(_: ListWalletsRequest): Promise<ListWalletsResponse> {
        throw new Error("Unimplemented");
    }
    async getWalletHistory(_: GetWalletHistoryRequest): Promise<GetWalletHistoryResponse> {
        throw new Error("Unimplemented");
    }
    async transferAsset(_: TransferAssetRequest): Promise<TransferAssetResponse> {
        throw new Error("Unimplemented");
    }
    async getTransfer(_: GetTransferRequest): Promise<GetTransferResponse> {
        throw new Error("Unimplemented");
    }
    async listTransfers(_: ListTransfersRequest): Promise<ListTransfersResponse> {
        throw new Error("Unimplemented");
    }
    async broadcastTransaction(_: BroadcastTransactionRequest): Promise<BroadcastTransactionResponse> {
        throw new Error("Unimplemented");
    }
    async getTransaction(_: GetTransactionRequest): Promise<GetTransactionResponse> {
        throw new Error("Unimplemented");
    }
    async listTransactions(_: ListTransactionsRequest): Promise<ListTransactionsResponse> {
        throw new Error("Unimplemented");
    }
    async generateSignature(request: GenerateSignatureRequest): Promise<GenerateSignatureResponse> {
        const dateRequested = new Date().toISOString();

        const { walletId, body } = request;
        const wallet = this.wallets[walletId];
        if (!wallet) throw new Error(`Wallet ${walletId} not found!`);

        const privateKey = this.privateKeys[walletId];
        if (!privateKey) throw new Error(`Private key for wallet ${walletId} not found!`);
        const signer = privateKeyToAccount(privateKey);

        let signature: Signature;
        if (isSign("Hash", body)) {
            const { hash } = body;
            //TODO: Is this 0x prefixed?
            signature = await sign({ privateKey, hash: hash as Hex });
        } else if (isSign("Transaction", body)) {
            signature = await sign({
                hash: keccak256(body.transaction as Hex),
                privateKey,
            });
        } else if (isSign("Message", body)) {
            const { message } = body;
            if (isHex(message)) {
                //Sign byte representation
                const signatureHex = await signer.signMessage({ message: { raw: message } });
                signature = hexToSignature(signatureHex);
            } else {
                //Sign utf-8 representation
                const signatureHex = await signer.signMessage({ message });
                signature = hexToSignature(signatureHex);
            }
        } else if (isSign("Eip712", body)) {
            // const signature = await signer.signTypedData()
            throw new Error("WalletsClientMockl.generateSignature Eip721 Unimplemented");
        } else {
            throw new Error(`Invalid signature kind ${(body as any).kind}`);
        }

        const dateSigned = new Date().toISOString();
        const status = "Signed";
        const { r, s, yParity } = signature;

        const signatureResponse: GenerateSignatureResponse["signature"] = {
            r,
            s,
            recid: yParity!,
            //TODO: What is this for?
            //encoded: compact,
        };
        const signatureId = `${this.signaturesCount++}`;
        const response: GenerateSignatureResponse = {
            id: signatureId,
            network: "KeyECDSA",
            walletId: walletId,
            requester: { userId: "mock" },
            requestBody: body,
            signature: signatureResponse,
            status,
            dateRequested,
            dateSigned,
        };

        //TODO: We just return empty, unclear what this is and if it breaks anything
        if (isSign("Transaction", body)) response.signedData = "0x0";

        this.signatures[signatureId] = response;
        return response;
    }
    async getSignature(request: GetSignatureRequest): Promise<GetSignatureResponse> {
        const { walletId, signatureId } = request;
        const wallet = this.wallets[walletId];
        if (!wallet) throw new Error(`Wallet ${walletId} not found!`);
        const response = this.signatures[signatureId];
        if (!response) throw new Error(`Signature ${signatureId} not found!`);

        return response;
    }
    async listSignatures(_: ListSignaturesRequest): Promise<ListSignaturesResponse> {
        throw new Error("Unimplemented");
    }
}
