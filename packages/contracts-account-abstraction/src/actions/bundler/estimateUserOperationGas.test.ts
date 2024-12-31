import { describe, test, beforeEach, expect } from "vitest";
import { createPublicClient, http, PrivateKeyAccount, encodeFunctionData } from "viem";
import { localhost } from "viem/chains";
import { UserOperation } from "viem/account-abstraction";

import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { estimateUserOperationGas } from "./estimateUserOperationGas.js";
import { port } from "../../test/constants.js";
import { getSimpleAccountAddress } from "../../SimpleAccount.js";

import { ERC1967Proxy } from "../../artifacts/ERC1967Proxy.js";
import { erc4337Contracts } from "../../setupERC4337Contracts.js";
import { SimpleAccountFactory } from "../../artifacts/SimpleAccountFactory.js";

describe("actions/bundler/estimateUserOperationGas.test.ts", function () {
    const chain = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const transport = http(chain.rpcUrls.default.http[0]);
    const publicClient = createPublicClient({
        chain,
        transport,
    });

    // Contracts
    const entryPointSimulationsAddress = erc4337Contracts.pimlicoEntrypointSimulations;
    const factoryAddress = erc4337Contracts.simpleAccountFactory;

    // Generated account on each test
    let owner: PrivateKeyAccount;

    beforeEach(async () => {
        owner = privateKeyToAccount(generatePrivateKey());
    });

    //TODO: Test with larger UserOp that deploys a contract
    test("estimateUserOperationGas - gas price zero", async () => {
        // Estimate gas with 0 balance on smart account and no paymaster, gas price MUST be set to 0
        const smartAccountAddress = getSimpleAccountAddress(
            {
                owner: owner.address,
                salt: 0n,
            },
            {
                factoryAddress,
                proxyBytecode: ERC1967Proxy.bytecode,
            },
        );

        const factoryData = encodeFunctionData({
            abi: SimpleAccountFactory.abi,
            functionName: "createAccount",
            args: [owner.address, 0n],
        });

        // Encode smart account tx, send to random address
        const to = privateKeyToAccount(generatePrivateKey()).address;
        const value = 0n;
        const data = "0x";
        const callData = encodeFunctionData({
            abi: [
                {
                    inputs: [
                        { name: "dest", type: "address" },
                        { name: "value", type: "uint256" },
                        { name: "func", type: "bytes" },
                    ],
                    name: "execute",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
            args: [to, value, data],
        });

        // Create UserOperation
        // const gasPrice = await publicClient.estimateFeesPerGas();
        const gasPrice = { maxFeePerGas: 0n, maxPriorityFeePerGas: 0n };
        const userOp: Omit<UserOperation<"0.7">, "callGasLimit" | "preVerificationGas" | "verificationGasLimit"> = {
            sender: smartAccountAddress,
            //TODO: Update nonce
            nonce: 0n,
            signature:
                "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
            callData,
            maxFeePerGas: gasPrice.maxFeePerGas!,
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
            factory: factoryAddress,
            factoryData,
        };

        const result = await estimateUserOperationGas({ ...publicClient, entryPointSimulationsAddress }, userOp);
        expect(result).toBeDefined();
    });
});
