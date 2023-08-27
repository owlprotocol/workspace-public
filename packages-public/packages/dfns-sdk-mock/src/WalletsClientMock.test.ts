import { describe, expect, test } from "vitest";
import type { BlockchainNetwork, SignatureKind } from "@dfns/sdk/codegen/datamodel/Wallets/types.js";
import { ethers } from "ethers";
import { WalletsClientMock } from "./WalletsClientMock.js";

describe("ethers tests", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    let walletId = 0;

    test("signer.getAddress()", async () => {
        const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
        const signer = new ethers.Wallet(pkey);
        const signerAddress = await signer.getAddress();
        //Example of how to compute address using signingKey
        const signerAddressComputed = ethers.utils.computeAddress(signer._signingKey().compressedPublicKey);
        expect(signerAddress).toBe(signerAddressComputed);
    });

    test("signer.signTransaction()", async () => {
        const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
        const signer = new ethers.Wallet(pkey);
        const txUnsigned = {
            to: ethers.constants.AddressZero,
            data: "0x",
            value: "0x0",
        };

        const txSerialized = ethers.utils.serializeTransaction(txUnsigned);
        const hash = ethers.utils.keccak256(txSerialized);
        //Sign using digest
        const hashBytes = ethers.utils.arrayify(hash);
        const signature = signer._signingKey().signDigest(hashBytes);
        const signatureEncoded = ethers.utils.joinSignature({
            r: signature.r,
            s: signature.s,
            recoveryParam: signature.recoveryParam,
        });
        const txSignedDigest = ethers.utils.serializeTransaction(txUnsigned, signatureEncoded);
        //Sign request directly
        const txSigned = await signer.signTransaction(txUnsigned);
        //Both should match
        expect(txSignedDigest, "join(r,s,v) != signer.signTransaction").toBe(txSigned);
    });
});

describe("WalletClient.test.ts", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const client = new WalletsClientMock(mnemonic);
    let walletId = 0;

    describe("network: Ethereum", () => {
        const network = "Ethereum" as BlockchainNetwork.Ethereum;

        test("createWallet", async () => {
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });
            expect(walletCreate).toBeDefined();

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
            expect(walletCreate.address).toBe(await signer.getAddress());
        });

        test("getWallet", async () => {
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });
            const walletGet = await client.getWallet({ walletId: walletCreate.id });
            expect(walletGet).toBeDefined();

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
            expect(walletGet.address).toBe(await signer.getAddress());
        });

        test("generateSignature", async () => {
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
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
                walletId: walletCreate.id,
                body: {
                    kind: "Hash" as SignatureKind.Hash,
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
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
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
                walletId: walletCreate.id,
                body: {
                    kind: "Hash" as SignatureKind.Hash,
                    hash,
                },
            });
            const signatureGet = await client.getSignature({
                walletId: walletCreate.id,
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
        const network = "KeyECDSA" as BlockchainNetwork.KeyECDSA;

        test("createWallet", async () => {
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });
            expect(walletCreate).toBeDefined();

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
            const signerAddress = await signer.getAddress();

            //KeyECDSA does not generate address
            expect(walletCreate.address).toBeUndefined();
            //Generate address client-side
            const walletAddress = ethers.utils.computeAddress(`0x${walletCreate.signingKey?.publicKey}`);
            expect(walletAddress).toBe(signerAddress);
        });

        test("getWallet", async () => {
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });
            const walletGet = await client.getWallet({ walletId: walletCreate.id });
            expect(walletGet).toBeDefined();

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
            const signerAddress = await signer.getAddress();
            //KeyECDSA does not generate address
            expect(walletGet.address).toBeUndefined();
            //Generate address client-side
            const walletAddress = ethers.utils.computeAddress(`0x${walletGet.signingKey?.publicKey}`);
            expect(walletAddress).toBe(signerAddress);
        });

        test("generateSignature", async () => {
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
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
                walletId: walletCreate.id,
                body: {
                    kind: "Hash" as SignatureKind.Hash,
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
            const walletCreate = await client.createWallet({
                body: {
                    network,
                },
            });

            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            const signer = new ethers.Wallet(pkey);
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
                walletId: walletCreate.id,
                body: {
                    kind: "Hash" as SignatureKind.Hash,
                    hash,
                },
            });
            const signatureGet = await client.getSignature({
                walletId: walletCreate.id,
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
