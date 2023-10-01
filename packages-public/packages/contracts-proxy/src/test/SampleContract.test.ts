import { Provider } from "@ethersproject/providers";
import { getGanacheProvider, testNetwork, testSigner } from "@owlprotocol/utils-ethers";
import { describe, test, beforeAll, expect } from "vitest";
import { Signer } from "ethers";
import * as Create2Factories from "../factories/index.js";
import { SimpleContract__factory__create2 } from "../factories/SimpleContract.js";
import { SimpleContract__factory } from "../typechain/ethers/factories/contracts/SimpleContract__factory.js";
import { ICreate2Factory__factory } from "../typechain/ethers/factories/contracts/Create2Factory/ICreate2Factory__factory.js";
import { DEFAULT_MSG_SENDER, DEFAULT_SALT } from "../utils/Create2Factory/getSalt.js";
import { deployImplementationsAndBeacons } from "../utils/Create2Factory/getTransaction.js";
import { deployCreate2Factory } from "../utils/Create2Factory/deployCreate2Factory.js";

describe("SampleContract.test.ts", () => {
    let provider: Provider;
    let signer: Signer;
    let signerAddress: string;
    let Create2Factory: ReturnType<(typeof ICreate2Factory__factory)["connect"]>;

    beforeAll(async () => {
        provider = await getGanacheProvider();
        signer = testSigner.connect(provider);
        signerAddress = await signer.getAddress();

        const create2FactoryAddress = await deployCreate2Factory(
            provider,
            testNetwork.name,
            testNetwork.config.chainId,
        );
        Create2Factory = ICreate2Factory__factory.connect(create2FactoryAddress, signer);
        await deployImplementationsAndBeacons(signer, testNetwork.name, Create2Factories as any);
    });

    describe("default salt 0x, default msgSender address(0)", () => {
        test("deploy", async () => {
            const { codeData, initData } = SimpleContract__factory__create2.getDeployCodeDataInitData(["42"]);
            const address = SimpleContract__factory__create2.getDeployAddress(["42"]);

            const code0 = await provider.getCode(address);
            expect(code0).toBe("0x");
            await Create2Factory.deployDeterministic(DEFAULT_SALT, DEFAULT_MSG_SENDER, [codeData], [initData]);
            const code1 = await provider.getCode(address);
            expect(code1).not.toBe("0x");

            const contract = SimpleContract__factory.connect(address, signer);
            const value = (await contract.getValue()).toNumber();
            expect(value).toBe(42);
        });

        test("clone", async () => {
            const { codeData, initData } = SimpleContract__factory__create2.getCloneCodeDataInitData(["42"]);
            const address = SimpleContract__factory__create2.getCloneAddress(["42"]);

            const code0 = await provider.getCode(address);
            expect(code0).toBe("0x");
            await Create2Factory.deployDeterministic(DEFAULT_SALT, DEFAULT_MSG_SENDER, [codeData], [initData]);
            const code1 = await provider.getCode(address);
            expect(code1).not.toBe("0x");

            const contract = SimpleContract__factory.connect(address, signer);
            const value = (await contract.getValue()).toNumber();
            expect(value).toBe(42);
        });

        test("proxy", async () => {
            const { codeData, initData } = SimpleContract__factory__create2.getProxyCodeDataInitData(signerAddress, [
                "42",
            ]);
            const address = SimpleContract__factory__create2.getProxyAddress(signerAddress, ["42"]);

            const code0 = await provider.getCode(address);
            expect(code0).toBe("0x");
            await Create2Factory.deployDeterministic(DEFAULT_SALT, DEFAULT_MSG_SENDER, [codeData], [initData]);
            const code1 = await provider.getCode(address);
            expect(code1).not.toBe("0x");

            const contract = SimpleContract__factory.connect(address, signer);
            const value = (await contract.getValue()).toNumber();
            expect(value).toBe(42);
        });
    });
});
