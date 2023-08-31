import { describe, test, expect, beforeAll } from "vitest";
import { ethers, Signer } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
import ganache from "ganache";
import { PRIVATE_KEY_0_LOCAL } from "@owlprotocol/envvars";
import { sleep } from "@owlprotocol/utils";
import { Deploy as DeployProxy } from "@owlprotocol/contracts-proxy";
import { ImplementationsDeploy } from "../deploy/index.js";
import {
    createSafeTransaction,
    parseProxyCreationEvent,
    deploySafe,
    signSafeTransaction,
    executeSafeTransaction,
} from "../safe.js";

describe("safe.test.ts", async () => {
    let provider: BaseProvider;
    let signer: Signer;
    let signerAddress: string;

    const chainId = 1337;
    let salt = 1;
    const networkId = `${chainId}`;
    const network = { name: "localhost", config: { chainId, accounts: [PRIVATE_KEY_0_LOCAL] } };

    beforeAll(async () => {
        const ganacheProvider = ganache.provider({
            logging: {
                quiet: true,
            },
            chain: {
                chainId,
            },
            wallet: {
                mnemonic: "test test test test test test test test test test test junk",
            },
        }) as any;
        provider = new ethers.providers.Web3Provider(ganacheProvider);
        //console.debug(provider);
        signer = new ethers.Wallet(PRIVATE_KEY_0_LOCAL, provider);
        signerAddress = await signer.getAddress();

        //Fund address
        await DeployProxy.BalancesDeploy({ provider, network });
        //Deploy Proxy Factory
        await DeployProxy.ProxyFactoryDeploy({ provider, network });
        await ImplementationsDeploy({ provider, signer, network });

        await sleep(1000);
    });

    describe("Safe", () => {
        test.skip("send tx", async () => {
            const tx = await signer.sendTransaction({
                to: signerAddress,
                data: "0x",
                value: "1",
            });
            console.debug(tx);
        });

        test("deploy", async () => {
            //Deploy Safe
            const safeAccountConfig = {
                owners: [signerAddress],
                threshold: 1,
            };
            const safeDeployTx = await deploySafe({ signer, networkId, safeAccountConfig, saltNonce: `0x${salt++}` });
            const safeDeployTxReceipt = await safeDeployTx.wait();
            const proxyCreationEvent = safeDeployTxReceipt.logs
                .map(parseProxyCreationEvent)
                .find((e) => e != undefined);
            const safeAddress = proxyCreationEvent!.proxy;
            expect(safeAddress).toBeDefined();
        });

        test("send transaction", async () => {
            //Deploy Safe
            const safeAccountConfig = {
                owners: [signerAddress],
                threshold: 1,
            };
            const safeDeployTx = await deploySafe({ signer, networkId, safeAccountConfig, saltNonce: `0x${salt++}` });
            const safeDeployTxReceipt = await safeDeployTx.wait();
            const proxyCreationEvent = safeDeployTxReceipt.logs
                .map(parseProxyCreationEvent)
                .find((e) => e != undefined);
            const safeAddress = proxyCreationEvent!.proxy;
            expect(safeAddress).toBeDefined();

            //Fund Safe
            await (
                await signer.sendTransaction({
                    from: signerAddress,
                    to: safeAddress,
                    value: "1",
                })
            ).wait();
            const balancePre = await provider.getBalance(safeAddress);

            //Transaction Safe
            const safeTxUnsigned = await createSafeTransaction({
                provider,
                networkId,
                safeAddress,
                data: {
                    to: signerAddress,
                    data: "0x",
                    value: "1",
                },
            });
            const safeTx = await signSafeTransaction({
                signer,
                networkId,
                safeAddress,
                safeTransaction: safeTxUnsigned,
            });
            const safeTxResponse = await executeSafeTransaction({
                signer,
                networkId,
                safeAddress,
                safeTransaction: safeTx,
            });
            expect(safeTxResponse).toBeDefined();

            const balancePost = await provider.getBalance(safeAddress);
            expect(balancePost.toNumber()).lessThan(balancePre.toNumber());
        });
    });
});
