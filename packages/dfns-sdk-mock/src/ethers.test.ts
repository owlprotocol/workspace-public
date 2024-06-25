import { describe, expect, test } from "vitest";
import { ethers } from "ethers";

describe("ethers tests", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const walletId = 1;

    test("signer.getAddress()", async () => {
        const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId}`).privateKey;
        const signer = new ethers.Wallet(pkey);
        const signerAddress = await signer.getAddress();
        //Example of how to compute address using signingKey
        const signerAddressComputed = ethers.utils.computeAddress(signer._signingKey().compressedPublicKey);
        expect(signerAddress).toBe(signerAddressComputed);
    });

    test("signer.signTransaction()", async () => {
        const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId}`).privateKey;
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
