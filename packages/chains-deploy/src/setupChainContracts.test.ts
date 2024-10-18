import { expect } from "vitest";

import { DETERMINISTIC_DEPLOYER_ADDRESS, getLocalAccount, getPaymasterSignerAccount } from "@owlprotocol/viem-utils";
import { createPublicClient, createWalletClient, http, nonceManager } from "viem";
import { localhost } from "viem/chains";
import { describe, test } from "vitest";
import { port } from "./test/constants.js";
import { prepareChainContracts, setupChainContracts } from "./setupChainContracts.js";

describe("setupChainContracts.test.ts", function () {
    const chain = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const transport = http(chain.rpcUrls.default.http[0]);

    /*
    const chain = {
        ...linea,
        id: linea.chainId,
    } as Chain;
    const transport = webSocket(chain.rpcUrls.private.webSocket![0]);
    */

    const publicClient = createPublicClient({
        chain,
        transport,
    });
    const walletClient = createWalletClient({
        account: getLocalAccount(0, { nonceManager }),
        chain,
        transport,
    });
    /*
    const walletClient = createWalletClient({
        account: getUtilityAccount({ nonceManager }),
        chain,
        transport,
    });
    */

    test("prepareChainContracts", async () => {
        const contracts = await prepareChainContracts(walletClient);
        const contractsGas = contracts.requests.reduce((acc, request) => acc + (request.gas ?? 0n), 0n);
        expect(contractsGas).toBeGreaterThan(0n);
    });

    test("setupChainContracts", async () => {
        //Load viem paymaster signer account
        const paymasterSignerAccount = getPaymasterSignerAccount();
        const result = await setupChainContracts(walletClient, {
            verifyingSignerAddress: paymasterSignerAccount.address,
        });
        expect(result).toBeDefined();

        // Determininistic Deployer
        expect(await publicClient.getCode({ address: DETERMINISTIC_DEPLOYER_ADDRESS })).toBeDefined();

        // ERC4337
        expect(await publicClient.getCode({ address: result.entrypoint.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.entrypointSimulations.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.pimlicoEntrypointSimulations.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.simpleAccountFactory.address })).toBeDefined();

        // Diamond
        expect(await publicClient.getCode({ address: result.diamondCut.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.diamondLoupe.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.diamondInit.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.diamondInitMulti.address })).toBeDefined();

        expect(await publicClient.getCode({ address: result.erc165.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.accessControlRecursive.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.contractUri.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc2981.address })).toBeDefined();

        expect(await publicClient.getCode({ address: result.erc721.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc721BaseUri.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc721MintableAutoId.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc721PresetInit.address })).toBeDefined();

        // Create2Factory
        expect(await publicClient.getCode({ address: result.create2Factory.address })).toBeDefined();

        // Verifying Payaster
        expect(await publicClient.getCode({ address: result.verifyingPaymaster.address })).toBeDefined();
    });
});
