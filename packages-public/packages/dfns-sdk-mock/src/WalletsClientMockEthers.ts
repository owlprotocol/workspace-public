/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    BroadcastTransactionRequest,
    BroadcastTransactionResponse,
    CreateWalletRequest,
    CreateWalletResponse,
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
import { Signature, ethers, utils } from "ethers";
import { WalletsClientInterface, isSign } from "./WalletsClientMock.js";

/**
 * Mock dfns wallet client implementation using ethers
 * @warning Sign Message does not work properly, prefer using viem implementation
 */
export class WalletsClientMockEthers implements WalletsClientInterface {
    private hdNode: utils.HDNode;
    private signaturesCount = 0;
    private walletsCount = 0;
    private wallets: Record<string, CreateWalletResponse | undefined> = {};
    private privateKeys: Record<string, string | undefined> = {};
    private signatures: Record<string, GenerateSignatureResponse | undefined> = {};

    /**
     * Create mock wallet client
     * @param mnemonic key generation mnemonic
     * @param createTimeout wallet creation timeout in ms
     */
    constructor(mnemonic?: string) {
        this.hdNode = mnemonic ? utils.HDNode.fromMnemonic(mnemonic) : utils.HDNode.fromSeed(utils.randomBytes(32));
    }

    /**
     * Add hard-coded wallet
     * @param wallet
     * @param privateKey
     */
    addWallet(
        wallet: Omit<CreateWalletResponse, "signingKey" | "tags" | "custodial"> & {
            signingKey?: CreateWalletResponse["signingKey"];
        },
        privateKey: string,
    ): CreateWalletResponse {
        if (this.wallets[wallet.id]) {
            throw new Error(`Wallet ${wallet.id} exists! Use different id or get wallet with getWallet()`);
        }
        const signer = new ethers.Wallet(privateKey);
        let signingKey = wallet.signingKey;
        if (!signingKey) {
            const { curve, compressedPublicKey } = signer._signingKey();
            signingKey = {
                //TODO: Support EdDSA
                scheme: "ECDSA",
                curve: curve as "secp256k1",
                publicKey: compressedPublicKey.substring(2), //strip 0x prefix
            };
        }
        const walletResponse = { ...wallet, signingKey, custodial: true };
        this.wallets[wallet.id] = walletResponse;
        this.privateKeys[wallet.id] = privateKey.replace("0x", "");
        this.walletsCount++;

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
        //mod to max key derivation index
        const keyDerivation = externalId
            ? ethers.BigNumber.from(utils.keccak256(utils.toUtf8Bytes(externalId)))
                  .mod(1000000000)
                  .toString()
            : `${walletsCount}`;
        //Signing Key
        const pkey = this.hdNode.derivePath(`m/44'/60'/0'/0/${keyDerivation}`).privateKey;
        const signer = new ethers.Wallet(pkey);
        //curve hard coded as secp256k1 on ethers
        //privateKey only returned in mock (not required once signing mock SDK is implemented)
        const { curve, compressedPublicKey } = signer._signingKey();
        const signingKey = {
            //TODO: Support EdDSA
            scheme: "ECDSA",
            curve: curve as "secp256k1",
            publicKey: compressedPublicKey.substring(2), //strip 0x prefix
        } as const;
        //Similar to API behaviour, address undefined for non-blockchain network
        //TODO: Removed so can work with Viem properly
        //const address = network === "KeyECDSA" || network === "KeyEdDSA" ? undefined : await signer.getAddress();
        const address = await signer.getAddress();

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
        this.privateKeys[id] = pkey;
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
        const signer = new ethers.Wallet(privateKey);
        const signingKey = signer._signingKey();

        let ethersSignature: Signature;
        if (isSign("Hash", body)) {
            const { hash } = body;
            //See Note on signing hashes https://docs.ethers.org/v5/api/signer/#Signer--signing-methods
            const hashBytes = utils.arrayify(hash);
            ethersSignature = signingKey.signDigest(hashBytes);
        } else if (isSign("Transaction", body)) {
            const { transaction } = body;
            const hash = utils.keccak256(transaction);
            const hashBytes = utils.arrayify(hash);
            ethersSignature = signingKey.signDigest(hashBytes);
        } else if (isSign("Message", body)) {
            //TODO: Is this correct? Not a big deal rn as not actually used to submit tx. Just for dummy UserOp
            const hash = utils.keccak256(body.message);
            const hashBytes = utils.arrayify(hash);
            ethersSignature = signingKey.signDigest(hashBytes);
        } else if (isSign("Eip712", body)) {
            throw new Error("WalletsClientMockl.generateSignature Eip721 Unimplemented");
        } else {
            throw new Error(`Invalid signature kind ${(body as any).kind}`);
        }

        const dateSigned = new Date().toISOString();
        const status = "Signed";
        const { r, s, recoveryParam /*, compact*/ } = ethersSignature;

        const signature: GenerateSignatureResponse["signature"] = {
            r,
            s,
            recid: recoveryParam,
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
            signature,
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
