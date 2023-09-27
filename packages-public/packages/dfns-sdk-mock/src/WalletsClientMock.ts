/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as T from "@dfns/sdk/codegen/Wallets/types.js";
import type {
    GenerateSignatureBody,
    KeyCurve,
    KeyScheme,
    SignEip712TypedData,
    SignHash,
    SignMessage,
    SignatureKind,
    Signature,
    Wallet,
    WalletStatus,
    SignatureRequest,
    SignatureStatus,
} from "@dfns/sdk/codegen/datamodel/Wallets/types.js";
import { Signature as EthersSignature, ethers } from "ethers";
import { utils } from "ethers";

//Type Guards
export function isSignHash(body: GenerateSignatureBody): body is SignHash {
    return body.kind === ("Hash" as SignatureKind.Hash);
}
export function isSignMessage(body: GenerateSignatureBody): body is SignMessage {
    return body.kind === ("Message" as SignatureKind.Message);
}
export function isSignEip721TypedData(body: GenerateSignatureBody): body is SignEip712TypedData {
    return body.kind === ("Eip721" as SignatureKind.Eip712);
}

//Wallet
export interface WalletsClientInterface {
    createWallet(request: T.CreateWalletRequest): Promise<T.CreateWalletResponse>;
    getWallet(request: T.GetWalletRequest): Promise<T.GetWalletResponse>;
    getWalletAssets(request: T.GetWalletAssetsRequest): Promise<T.GetWalletAssetsResponse>;
    getWalletNfts(request: T.GetWalletNftsRequest): Promise<T.GetWalletNftsResponse>;
    listWallets(request: T.ListWalletsRequest): Promise<T.ListWalletsResponse>;
    getWalletHistory(request: T.GetWalletHistoryRequest): Promise<T.GetWalletHistoryResponse>;
    transferAsset(request: T.TransferAssetRequest): Promise<T.TransferAssetResponse>;
    getTransfer(request: T.GetTransferRequest): Promise<T.GetTransferResponse>;
    listTransfers(request: T.ListTransfersRequest): Promise<T.ListTransfersResponse>;
    broadcastTransaction(request: T.BroadcastTransactionRequest): Promise<T.BroadcastTransactionResponse>;
    getTransaction(request: T.GetTransactionRequest): Promise<T.GetTransactionResponse>;
    listTransactions(request: T.ListTransactionsRequest): Promise<T.ListTransactionsResponse>;
    generateSignature(request: T.GenerateSignatureRequest): Promise<T.GenerateSignatureResponse>;
    getSignature(request: T.GetSignatureRequest): Promise<T.GetSignatureResponse>;
    listSignatures(request: T.ListSignaturesRequest): Promise<T.ListSignaturesResponse>;
}

export class WalletsClientMock implements WalletsClientInterface {
    private hdNode: utils.HDNode;
    private signaturesCount = 0;
    private walletsCount = 0;
    private wallets: Record<string, Wallet | undefined> = {};
    private privateKeys: Record<string, string | undefined> = {};
    private signatures: Record<string, SignatureRequest | undefined> = {};

    constructor(mnemonic?: string) {
        this.hdNode = mnemonic ? utils.HDNode.fromMnemonic(mnemonic) : utils.HDNode.fromSeed(utils.randomBytes(32));
    }

    /**
     * Add hard-coded wallet
     * @param wallet
     * @param privateKey
     */
    addWallet(wallet: Wallet, privateKey: string): T.CreateWalletResponse {
        if (this.wallets[wallet.id]) {
            throw new Error(`Wallet ${wallet.id} exists! Use different id or get wallet with getWallet()`);
        }
        const signer = new ethers.Wallet(privateKey);
        let signingKey = wallet.signingKey;
        if (wallet.status === "Active" && !signingKey) {
            const { curve, compressedPublicKey } = signer._signingKey();
            signingKey = {
                //TODO: Support EdDSA
                scheme: "ECDSA" as KeyScheme,
                curve: curve as KeyCurve,
                publicKey: compressedPublicKey.substring(2), //strip 0x prefix
            };
        }
        const walletResponse = { ...wallet, signingKey };
        this.wallets[wallet.id] = walletResponse;
        this.privateKeys[wallet.id] = privateKey.replace("0x", "");
        this.walletsCount++;

        return walletResponse;
    }

    /**
     * Create wallet similar to DFNS request, uses stored hdNode
     * @param request
     * @returns
     */
    async createWallet(request: T.CreateWalletRequest): Promise<T.CreateWalletResponse> {
        //Request Body
        const { network, externalId, tags, name } = request.body;
        //Id
        const id = `${this.walletsCount++}`;
        //Status
        const status = "Active" as WalletStatus.Active;
        //Signing Key
        const pkey = this.hdNode.derivePath(`m/44'/60'/0'/0/${id}`).privateKey;
        const signer = new ethers.Wallet(pkey);
        //curve hard coded as secp256k1 on ethers
        //privateKey only returned in mock (not required once signing mock SDK is implemented)
        const { curve, compressedPublicKey } = signer._signingKey();
        const signingKey = {
            //TODO: Support EdDSA
            scheme: "ECDSA" as KeyScheme,
            curve: curve as KeyCurve,
            publicKey: compressedPublicKey.substring(2), //strip 0x prefix
        };
        //Similar to API behaviour, address undefined for non-blockchain network
        const address = network === "KeyECDSA" || network === "KeyEdDSA" ? undefined : await signer.getAddress();
        const dateCreated = new Date().toISOString();
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
        };

        this.wallets[id] = wallet;
        this.privateKeys[id] = pkey;

        return wallet;
    }
    //TODO: implement this
    async getWallet(request: T.GetWalletRequest): Promise<T.GetWalletResponse> {
        const { walletId } = request;
        const wallet = this.wallets[walletId];
        if (!wallet) throw new Error(`Wallet ${walletId} not found!`);

        return wallet;
    }
    async getWalletAssets(request: T.GetWalletAssetsRequest): Promise<T.GetWalletAssetsResponse> {
        throw new Error("Unimplemented");
    }
    async getWalletNfts(request: T.GetWalletNftsRequest): Promise<T.GetWalletNftsResponse> {
        throw new Error("Unimplemented");
    }
    async listWallets(request: T.ListWalletsRequest): Promise<T.ListWalletsResponse> {
        throw new Error("Unimplemented");
    }
    async getWalletHistory(request: T.GetWalletHistoryRequest): Promise<T.GetWalletHistoryResponse> {
        throw new Error("Unimplemented");
    }
    async transferAsset(request: T.TransferAssetRequest): Promise<T.TransferAssetResponse> {
        throw new Error("Unimplemented");
    }
    async getTransfer(request: T.GetTransferRequest): Promise<T.GetTransferResponse> {
        throw new Error("Unimplemented");
    }
    async listTransfers(request: T.ListTransfersRequest): Promise<T.ListTransfersResponse> {
        throw new Error("Unimplemented");
    }
    async broadcastTransaction(request: T.BroadcastTransactionRequest): Promise<T.BroadcastTransactionResponse> {
        throw new Error("Unimplemented");
    }
    async getTransaction(request: T.GetTransactionRequest): Promise<T.GetTransactionResponse> {
        throw new Error("Unimplemented");
    }
    async listTransactions(request: T.ListTransactionsRequest): Promise<T.ListTransactionsResponse> {
        throw new Error("Unimplemented");
    }
    async generateSignature(request: T.GenerateSignatureRequest): Promise<T.GenerateSignatureResponse> {
        const dateRequested = new Date().toISOString();

        const { walletId, body } = request;
        const wallet = this.wallets[walletId];
        if (!wallet) throw new Error(`Wallet ${walletId} not found!`);
        const privateKey = this.privateKeys[walletId];
        if (!privateKey) throw new Error(`Private key for wallet ${walletId} not found!`);
        const signer = new ethers.Wallet(privateKey);
        const signingKey = signer._signingKey();

        let ethersSignature: EthersSignature;
        if (isSignHash(body)) {
            const { hash } = body;
            //See Note on signing hashes https://docs.ethers.org/v5/api/signer/#Signer--signing-methods
            const hashBytes = utils.arrayify(hash);
            ethersSignature = signingKey.signDigest(hashBytes);
        } else if (isSignMessage(body)) {
            throw new Error("Unimplemented");
        } else if (isSignEip721TypedData(body)) {
            throw new Error("Unimplemented");
        } else {
            throw new Error(`Invalid signature kind ${(body as any).kind}`);
        }

        const dateSigned = new Date().toISOString();
        const status = "Signed" as SignatureStatus;
        const { r, s, recoveryParam /*, compact*/ } = ethersSignature;

        const signature: Signature = {
            r,
            s,
            recid: recoveryParam,
            //TODO: What is this for?
            //encoded: compact,
        };
        const signatureId = `${this.signaturesCount++}`;
        const response: SignatureRequest = {
            id: signatureId,
            walletId: walletId,
            requester: { userId: "mock" },
            requestBody: body,
            signature,
            status,
            dateRequested,
            dateSigned,
        };

        this.signatures[signatureId] = response;
        return response;
    }
    async getSignature(request: T.GetSignatureRequest): Promise<T.GetSignatureResponse> {
        const { walletId, signatureId } = request;
        const wallet = this.wallets[walletId];
        if (!wallet) throw new Error(`Wallet ${walletId} not found!`);
        const response = this.signatures[signatureId];
        if (!response) throw new Error(`Signature ${signatureId} not found!`);

        return response;
    }
    async listSignatures(request: T.ListSignaturesRequest): Promise<T.ListSignaturesResponse> {
        throw new Error("Unimplemented");
    }
}
