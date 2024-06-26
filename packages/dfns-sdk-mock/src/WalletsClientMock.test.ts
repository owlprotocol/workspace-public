import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { ethers } from "ethers";
import { CreateWalletResponse } from "@dfns/sdk/generated/wallets/types.js";
import { Hex } from "viem";
import { WalletsClientMock } from "./WalletsClientMock.js";

describe("WalletClient.test.ts", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    //Always 0

    let client: WalletsClientMock;

    const walletId = 0;
    let wallet: CreateWalletResponse;
    const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId}`).privateKey;
    const signer = new ethers.Wallet(pkey);
    let signerAddress: string;

    beforeAll(async () => {
        signerAddress = await signer.getAddress();
    });

    beforeEach(() => {
        client = new WalletsClientMock(mnemonic);
    });

    describe("deterministic wallet using external id", () => {
        test("externalId", async () => {
            const network = "Ethereum";
            //Wallet Create Test
            const wallet = await client.createWallet({
                body: {
                    network,
                    externalId: "wallet-1",
                },
            });
            expect(wallet).toBeDefined();
            expect(wallet.address).not.toBe(signerAddress);
        });
    });

    describe("add hardcoded wallet", () => {
        const network = "KeyECDSA";

        beforeEach(async () => {
            //Wallet Create Test
            const walletData = {
                id: `${walletId}`,
                network,
                status: "Active",
                tags: [],
                dateCreated: "1970-01-01T00:00:00Z",
            } as const;
            wallet = await client.addWallet(walletData, pkey as Hex);

            //KeyECDSA does not generate address
            expect(wallet.address).toBeUndefined();
            //Generate address client-side
            const walletAddress = ethers.utils.computeAddress(`0x${wallet.signingKey?.publicKey}`);
            expect(walletAddress).toBe(signerAddress);
        });

        test("getWallet", async () => {
            const walletGet = await client.getWallet({ walletId: wallet.id });
            expect(walletGet).toBeDefined();

            //KeyECDSA does not generate address
            expect(walletGet.address).toBeUndefined();
            //Generate address client-side
            const walletAddress = ethers.utils.computeAddress(`0x${walletGet.signingKey?.publicKey}`);
            expect(walletAddress).toBe(signerAddress);
        });

        test("generateSignature", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };

            const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
            const hash = ethers.utils.keccak256(txSerialized);
            //Sign using digest
            const hashBytes = ethers.utils.arrayify(hash);
            const signatureEthers = signer._signingKey().signDigest(hashBytes);
            const signatureEncodedEthers = ethers.utils.joinSignature({
                r: signatureEthers.r,
                s: signatureEthers.s,
                recoveryParam: signatureEthers.recoveryParam,
            });
            const txSignedDigestEthers = ethers.utils.serializeTransaction(txUnsigned, signatureEncodedEthers);
            //Sign request directly
            const txSignedEthers = await signer.signTransaction(txUnsigned);
            //Both should match
            expect(txSignedDigestEthers, "join(r,s,v) != signer.signTransaction").toBe(txSignedEthers);

            //Sign using DFNS
            const signatureGenerate = await client.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash,
                },
            });
            expect(signatureGenerate, "response undefined").toBeDefined();
            expect(signatureGenerate.signature, "response.signature undefined").toBeDefined();
            const signatureDfns = signatureGenerate.signature!;

            const signatureDfnsEncodedJoin = ethers.utils.joinSignature({
                r: signatureDfns.r,
                s: signatureDfns.s,
                recoveryParam: signatureDfns.recid,
            });
            const txSignedDfns = ethers.utils.serializeTransaction(txUnsigned, signatureDfnsEncodedJoin);
            //Signature matches but has some suffix?
            //expect(`${signatureDfnsEncoded}1b`, "signature.encoded != join(r,s,v)").toBe(signatureDfnsEncodedJoin);
            expect(signatureDfnsEncodedJoin, "signatureDfns.join(r,s,v) != signatureEncoded").toBe(
                signatureEncodedEthers,
            );
            expect(txSignedDfns, "tsSignedDfns != txSignedEthers").toBe(txSignedEthers);
        });

        test("getSignature", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };

            const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
            const hash = ethers.utils.keccak256(txSerialized);
            //Sign using digest
            const hashBytes = ethers.utils.arrayify(hash);
            const signatureEthers = signer._signingKey().signDigest(hashBytes);
            const signatureEncodedEthers = ethers.utils.joinSignature({
                r: signatureEthers.r,
                s: signatureEthers.s,
                recoveryParam: signatureEthers.recoveryParam,
            });
            const txSignedDigestEthers = ethers.utils.serializeTransaction(txUnsigned, signatureEncodedEthers);
            //Sign request directly
            const txSignedEthers = await signer.signTransaction(txUnsigned);
            //Both should match
            expect(txSignedDigestEthers, "join(r,s,v) != signer.signTransaction").toBe(txSignedEthers);

            //Sign using DFNS
            const signatureGenerate = await client.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash,
                },
            });
            const signatureGet = await client.getSignature({
                walletId: wallet.id,
                signatureId: signatureGenerate.id,
            });
            expect(signatureGet, "response undefined").toBeDefined();
            expect(signatureGet.signature, "response.signature undefined").toBeDefined();
            const signatureDfns = signatureGet.signature!;

            const signatureDfnsEncodedJoin = ethers.utils.joinSignature({
                r: signatureDfns.r,
                s: signatureDfns.s,
                recoveryParam: signatureDfns.recid,
            });
            const txSignedDfns = ethers.utils.serializeTransaction(txUnsigned, signatureDfnsEncodedJoin);

            expect(signatureDfnsEncodedJoin, "signatureDfns.join(r,s,v) != signatureEncoded").toBe(
                signatureEncodedEthers,
            );
            expect(txSignedDfns, "tsSignedDfns != txSignedEthers").toBe(txSignedEthers);
        });
    });

    describe("network: Ethereum", () => {
        const network = "Ethereum";

        beforeEach(async () => {
            //Wallet Create Test
            wallet = await client.createWallet({
                body: {
                    network,
                },
            });
            expect(wallet).toBeDefined();
            expect(wallet.address).toBe(signerAddress);
        });

        test("getWallet", async () => {
            const walletGet = await client.getWallet({ walletId: wallet.id });
            expect(walletGet).toBeDefined();
            expect(walletGet.address).toBe(signerAddress);
        });

        test("generateSignature", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };

            const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
            const hash = ethers.utils.keccak256(txSerialized);
            //Sign using digest
            const hashBytes = ethers.utils.arrayify(hash);
            const signatureEthers = signer._signingKey().signDigest(hashBytes);
            const signatureEncodedEthers = ethers.utils.joinSignature({
                r: signatureEthers.r,
                s: signatureEthers.s,
                recoveryParam: signatureEthers.recoveryParam,
            });
            const txSignedDigestEthers = ethers.utils.serializeTransaction(txUnsigned, signatureEncodedEthers);
            //Sign request directly
            const txSignedEthers = await signer.signTransaction(txUnsigned);
            //Both should match
            expect(txSignedDigestEthers, "join(r,s,v) != signer.signTransaction").toBe(txSignedEthers);

            //Sign using DFNS
            const signatureGenerate = await client.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash,
                },
            });
            expect(signatureGenerate, "response undefined").toBeDefined();
            expect(signatureGenerate.signature, "response.signature undefined").toBeDefined();
            const signatureDfns = signatureGenerate.signature!;

            const signatureDfnsEncodedJoin = ethers.utils.joinSignature({
                r: signatureDfns.r,
                s: signatureDfns.s,
                recoveryParam: signatureDfns.recid,
            });
            const txSignedDfns = ethers.utils.serializeTransaction(txUnsigned, signatureDfnsEncodedJoin);
            //Signature matches but has some suffix?
            //expect(`${signatureDfnsEncoded}1b`, "signature.encoded != join(r,s,v)").toBe(signatureDfnsEncodedJoin);
            expect(signatureDfnsEncodedJoin, "signatureDfns.join(r,s,v) != signatureEncoded").toBe(
                signatureEncodedEthers,
            );
            expect(txSignedDfns, "tsSignedDfns != txSignedEthers").toBe(txSignedEthers);
        });

        test("getSignature", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };

            const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
            const hash = ethers.utils.keccak256(txSerialized);
            //Sign using digest
            const hashBytes = ethers.utils.arrayify(hash);
            const signatureEthers = signer._signingKey().signDigest(hashBytes);
            const signatureEncodedEthers = ethers.utils.joinSignature({
                r: signatureEthers.r,
                s: signatureEthers.s,
                recoveryParam: signatureEthers.recoveryParam,
            });
            const txSignedDigestEthers = ethers.utils.serializeTransaction(txUnsigned, signatureEncodedEthers);
            //Sign request directly
            const txSignedEthers = await signer.signTransaction(txUnsigned);
            //Both should match
            expect(txSignedDigestEthers, "join(r,s,v) != signer.signTransaction").toBe(txSignedEthers);

            //Sign using DFNS
            const signatureGenerate = await client.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash,
                },
            });
            const signatureGet = await client.getSignature({
                walletId: wallet.id,
                signatureId: signatureGenerate.id,
            });
            expect(signatureGet, "response undefined").toBeDefined();
            expect(signatureGet.signature, "response.signature undefined").toBeDefined();
            const signatureDfns = signatureGet.signature!;

            const signatureDfnsEncodedJoin = ethers.utils.joinSignature({
                r: signatureDfns.r,
                s: signatureDfns.s,
                recoveryParam: signatureDfns.recid,
            });
            const txSignedDfns = ethers.utils.serializeTransaction(txUnsigned, signatureDfnsEncodedJoin);

            expect(signatureDfnsEncodedJoin, "signatureDfns.join(r,s,v) != signatureEncoded").toBe(
                signatureEncodedEthers,
            );
            expect(txSignedDfns, "tsSignedDfns != txSignedEthers").toBe(txSignedEthers);
        });
    });

    describe("network: KeyECDSA", () => {
        const network = "KeyECDSA";

        beforeEach(async () => {
            //Wallet Create Test
            wallet = await client.createWallet({
                body: {
                    network,
                },
            });
            expect(wallet).toBeDefined();

            //KeyECDSA does not generate address
            //TODO: Skip, removed this behaviour to enable working with viem
            //expect(wallet.address).toBeUndefined();
            expect(wallet.address).toBe(signerAddress);
            //Generate address client-side
            const walletAddress = ethers.utils.computeAddress(`0x${wallet.signingKey?.publicKey}`);
            expect(walletAddress).toBe(signerAddress);
        });

        test("getWallet", async () => {
            const walletGet = await client.getWallet({ walletId: wallet.id });
            expect(walletGet).toBeDefined();

            //KeyECDSA does not generate address
            //expect(walletGet.address).toBeUndefined();
            //TODO: Skip, removed this behaviour to enable working with viem
            //expect(wallet.address).toBeUndefined();
            expect(wallet.address).toBe(signerAddress);
            //Generate address client-side
            const walletAddress = ethers.utils.computeAddress(`0x${walletGet.signingKey?.publicKey}`);
            expect(walletAddress).toBe(signerAddress);
        });

        test("generateSignature", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };

            const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
            const hash = ethers.utils.keccak256(txSerialized);
            //Sign using digest
            const hashBytes = ethers.utils.arrayify(hash);
            const signatureEthers = signer._signingKey().signDigest(hashBytes);
            const signatureEncodedEthers = ethers.utils.joinSignature({
                r: signatureEthers.r,
                s: signatureEthers.s,
                recoveryParam: signatureEthers.recoveryParam,
            });
            const txSignedDigestEthers = ethers.utils.serializeTransaction(txUnsigned, signatureEncodedEthers);
            //Sign request directly
            const txSignedEthers = await signer.signTransaction(txUnsigned);
            //Both should match
            expect(txSignedDigestEthers, "join(r,s,v) != signer.signTransaction").toBe(txSignedEthers);

            //Sign using DFNS
            const signatureGenerate = await client.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash,
                },
            });
            expect(signatureGenerate, "response undefined").toBeDefined();
            expect(signatureGenerate.signature, "response.signature undefined").toBeDefined();
            const signatureDfns = signatureGenerate.signature!;

            const signatureDfnsEncodedJoin = ethers.utils.joinSignature({
                r: signatureDfns.r,
                s: signatureDfns.s,
                recoveryParam: signatureDfns.recid,
            });
            const txSignedDfns = ethers.utils.serializeTransaction(txUnsigned, signatureDfnsEncodedJoin);
            //Signature matches but has some suffix?
            //expect(`${signatureDfnsEncoded}1b`, "signature.encoded != join(r,s,v)").toBe(signatureDfnsEncodedJoin);
            expect(signatureDfnsEncodedJoin, "signatureDfns.join(r,s,v) != signatureEncoded").toBe(
                signatureEncodedEthers,
            );
            expect(txSignedDfns, "tsSignedDfns != txSignedEthers").toBe(txSignedEthers);
        });

        test("getSignature", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };

            const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
            const hash = ethers.utils.keccak256(txSerialized);
            //Sign using digest
            const hashBytes = ethers.utils.arrayify(hash);
            const signatureEthers = signer._signingKey().signDigest(hashBytes);
            const signatureEncodedEthers = ethers.utils.joinSignature({
                r: signatureEthers.r,
                s: signatureEthers.s,
                recoveryParam: signatureEthers.recoveryParam,
            });
            const txSignedDigestEthers = ethers.utils.serializeTransaction(txUnsigned, signatureEncodedEthers);
            //Sign request directly
            const txSignedEthers = await signer.signTransaction(txUnsigned);
            //Both should match
            expect(txSignedDigestEthers, "join(r,s,v) != signer.signTransaction").toBe(txSignedEthers);

            //Sign using DFNS
            const signatureGenerate = await client.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash,
                },
            });
            const signatureGet = await client.getSignature({
                walletId: wallet.id,
                signatureId: signatureGenerate.id,
            });
            expect(signatureGet, "response undefined").toBeDefined();
            expect(signatureGet.signature, "response.signature undefined").toBeDefined();
            const signatureDfns = signatureGet.signature!;

            const signatureDfnsEncodedJoin = ethers.utils.joinSignature({
                r: signatureDfns.r,
                s: signatureDfns.s,
                recoveryParam: signatureDfns.recid,
            });
            const txSignedDfns = ethers.utils.serializeTransaction(txUnsigned, signatureDfnsEncodedJoin);

            expect(signatureDfnsEncodedJoin, "signatureDfns.join(r,s,v) != signatureEncoded").toBe(
                signatureEncodedEthers,
            );
            expect(txSignedDfns, "tsSignedDfns != txSignedEthers").toBe(txSignedEthers);
        });
    });
});
