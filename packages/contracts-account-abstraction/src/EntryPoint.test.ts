import { describe, test, expect, beforeAll } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
} from "viem";
import { localhost } from "viem/chains";
import {
    getOrDeployDeterministicDeployer,
    getOrDeployDeterministicContract,
    getDeployDeterministicAddress,
    getLocalAccount,
} from "@owlprotocol/viem-utils";
import { entryPoint07Address } from "viem/account-abstraction";
import { port } from "./test/constants.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { ENTRYPOINT_SALT_V07 } from "./constants.js";

describe("EntryPoint.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            //TODO: viem mismatch
            account: getLocalAccount(0) as unknown as Account,
            chain: localhost,
            transport,
        });

        //Deploy DeterministicDeployer
        //TODO: viem type mismatch
        const { hash } = await getOrDeployDeterministicDeployer({
            publicClient: publicClient as any,
            walletClient: walletClient as any,
        });
        if (hash) {
            await publicClient.waitForTransactionReceipt({ hash });
        }
    });

    test("EntryPoint", async () => {
        const deployParams = {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        };
        const address = getDeployDeterministicAddress(deployParams);
        expect(address).toBe(entryPoint07Address);

        //Deploy new
        //TODO: viem type mismatch
        const resultDeploy = await getOrDeployDeterministicContract(
            { publicClient: publicClient as any, walletClient: walletClient as any },
            deployParams,
        );
        expect(resultDeploy.address).toBe(address);

        //Wait for receipt
        const hash = resultDeploy.hash;
        if (hash) {
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);
        }

        //Get existing
        //TODO: viem type mismatch
        const resultGet = await getOrDeployDeterministicContract(
            { publicClient: publicClient as any, walletClient: walletClient as any },
            deployParams,
        );
        expect(resultGet.existed).toBe(true);
        expect(resultGet.hash).toBeUndefined();
        expect(resultGet.address).toBe(address);
    });
});
