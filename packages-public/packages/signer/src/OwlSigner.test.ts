import { ERC20Mintable__factory__create2 } from "@owlprotocol/contracts/factories";
import { IERC20 } from "@owlprotocol/contracts/ethers/factoryInterfaceClasses";
import { beforeAllSetup } from "@owlprotocol/contracts-api/scripts";
import { apiKeysPersonalCRUD, ethLogsCRUD, ethTransactionsCRUD } from "@owlprotocol/contracts-api-firebase/admin";
import { sleep } from "@owlprotocol/utils";
import { BigNumber, providers, ethers } from "ethers";
import { describe, beforeAll, beforeEach, test, expect } from "vitest";
import { CREATE2_FACTORY_ADDRESS, TypechainEthers } from "@owlprotocol/contracts-proxy";
import { testNetworkId } from "@owlprotocol/utils-ethers";
import { ZodValidators } from "@owlprotocol/contracts-api/factories";
import { OwlSigner } from "./OwlSigner.js";

// TODO: look into mocking api with https://vitest.dev/guide/mocking.html#requests
describe("OwlSigner.test.ts", async () => {
    let users: Awaited<ReturnType<typeof beforeAllSetup>>["users"];
    let provider: providers.Web3Provider;

    beforeAll(async () => {
        const deploySafe = true;
        ({ users, provider } = await beforeAllSetup(deploySafe));
        await sleep(500);
    }, 50000);

    beforeEach(async () => {
        await ethLogsCRUD._deleteAll();
        await ethTransactionsCRUD._deleteAll();
    });

    // TODO: make this test weork, getting this error:
    // TRPCClientError: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="nonce()", data="0x", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.7.0)
    test.skip("signTransaction ERC20 deploy", async () => {
        const contractName = "ERC20Mintable";
        const methodName = "initialize";
        const erc20InputsDefinedArrayify = ZodValidators[contractName][methodName].inputsDefinedArrayify;

        const userSafeAddress = users[1].safeWallet!.address;
        // Default msgSender & admin
        const msgSender = userSafeAddress;

        const contractParams = {
            admin: userSafeAddress,
            name: "My ERC20",
            symbol: "MY",
            contractUri: "",
        };

        const salt = "0x" + Buffer.from(ethers.utils.randomBytes(32)).toString("hex");

        const initArgs = erc20InputsDefinedArrayify.parse(contractParams);

        const Create2FactoryInterface = TypechainEthers.ICreate2Factory__factory.createInterface();
        const contractCodeDataInitData = ERC20Mintable__factory__create2.getDeployCodeDataInitData(initArgs);

        const data = Create2FactoryInterface.encodeFunctionData("deployDeterministic", [
            salt,
            msgSender,
            [contractCodeDataInitData.codeData],
            [contractCodeDataInitData.initData],
        ]);

        const apiKeyPersonal = await apiKeysPersonalCRUD._getWhereFirst({ owner: users[1].user.id });
        expect(apiKeyPersonal).toBeDefined();
        const apiKey = apiKeyPersonal!.apiKey;
        const apiUrl = "http://localhost:3000/api/trpc";
        const txWait = 1;
        const signer = new OwlSigner(apiKey, apiUrl, txWait, provider);
        const result = await signer.sendTransaction({ data, to: CREATE2_FACTORY_ADDRESS });

        expect(result).toBeDefined();
        expect(result.hash).toBeDefined();
        expect(result.chainId).toBeDefined();
        expect(result.chainId).toEqual(testNetworkId);
        expect(result.wait).toBeDefined();
        const txReceipt = await result.wait();
        expect(txReceipt).toBeDefined();

        const contractAddress = ERC20Mintable__factory__create2.getDeployAddress(initArgs, { msgSender, salt });

        const contract = IERC20.connect(contractAddress, provider);

        await expect(contract.totalSupply()).resolves.not.toThrowError();
        const totalSupply = await contract.totalSupply();
        expect(totalSupply).toEqual(BigNumber.from(0));
    });
});
