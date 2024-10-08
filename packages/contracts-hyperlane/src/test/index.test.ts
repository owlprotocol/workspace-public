import { describe, test, beforeAll } from "vitest";
import {
    PublicClient,
    Transport,
    Chain,
    WalletClient,
    Account,
    createPublicClient,
    createWalletClient,
    http,
    encodeDeployData,
    encodeFunctionData,
    zeroHash,
    zeroAddress,
    bytesToHex,
    Address,
} from "viem";
import {
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import {
    getOrDeployCreate2Factory,
    getCloneDeterministicBytecode,
    CREATE2_FACTORY_ADDRESS,
} from "@owlprotocol/contracts-create2factory";
import { localhost } from "viem/chains";
import { AddressEmptyCode, InvalidSender } from "@owlprotocol/contracts-create2factory/artifacts/Create2Factory";
import { ICreate2Factory } from "@owlprotocol/contracts-create2factory/artifacts";
import { randomBytes } from "crypto";
import { port } from "./constants.js";
import { Mailbox, initialize as initializeAbi } from "../artifacts/Mailbox.js";
import { NoopIsm } from "../artifacts/NoopIsm.js";
import { PausableHook } from "../artifacts/PausableHook.js";

// const localhostRemote = { ...localhost, id: chainId2 } as Chain;

export async function getOrDeployTestIsmAndHook(params: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
}): Promise<{ ismAddress: Address; hookAddress: Address }> {
    const { walletClient, publicClient } = params;
    const { address: ismAddress, hash: ismHash } = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        { salt: zeroHash, bytecode: NoopIsm.bytecode },
    );

    if (ismHash) {
        await publicClient.waitForTransactionReceipt({ hash: ismHash });
    }

    const { address: hookAddress, hash: hookHash } = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: PausableHook.bytecode,
        },
    );

    if (hookHash) {
        await publicClient.waitForTransactionReceipt({ hash: hookHash });
    }

    return { ismAddress, hookAddress };
}

export async function getOrDeployDeployers(params: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
}) {
    const { walletClient, publicClient } = params;

    const { hash: hashDeployer } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
    if (hashDeployer) {
        await publicClient.waitForTransactionReceipt({ hash: hashDeployer });
    }

    const { hash: hashCreate2Factory } = await getOrDeployCreate2Factory({ publicClient, walletClient });
    if (hashCreate2Factory) {
        await publicClient.waitForTransactionReceipt({ hash: hashCreate2Factory });
    }
}

describe("index.test.ts", function () {
    let publicClientOrigin: PublicClient<Transport, Chain>;
    let walletClientOrigin: WalletClient<Transport, Chain, Account>;

    // let publicClientRemote: PublicClient<Transport, Chain>;
    // let walletClientRemote: WalletClient<Transport, Chain, Account>;

    let noopIsmAddressOrigin: Address;
    let pausableHookAddressOrigin: Address;

    // let noopIsmAddressRemote: Address;
    // let pausableHookAddressRemote: Address;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        // const transportRemote = http(`http://127.0.0.1:${port2}`);

        publicClientOrigin = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClientOrigin = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });

        // publicClientRemote = createPublicClient({
        //     chain: localhostRemote,
        //     transport: transportRemote,
        // });
        // walletClientRemote = createWalletClient({
        //     account: getLocalAccount(0),
        //     chain: localhostRemote,
        //     transport: transportRemote,
        // });

        await getOrDeployDeployers({ publicClient: publicClientOrigin, walletClient: walletClientOrigin });
        // await getOrDeployDeployers({ publicClient: publicClientRemote, walletClient: walletClientRemote });

        const ismAndHookOrigin = await getOrDeployTestIsmAndHook({
            walletClient: walletClientOrigin,
            publicClient: publicClientOrigin,
        });
        noopIsmAddressOrigin = ismAndHookOrigin.ismAddress;
        pausableHookAddressOrigin = ismAndHookOrigin.hookAddress;

        // const ismAndHookRemote = await getOrDeployTestIsmAndHook({
        //     walletClient: walletClientRemote,
        //     publicClient: publicClientRemote,
        // });
        // noopIsmAddressRemote = ismAndHookRemote.ismAddress;
        // pausableHookAddressRemote = ismAndHookRemote.hookAddress;
    });

    test("Deploy Mailbox infra", async () => {
        const { address: mailboxImplAddressOrigin, hash: mailboxImplHashOrigin } =
            await getOrDeployDeterministicContract(
                { publicClient: publicClientOrigin, walletClient: walletClientOrigin },
                {
                    salt: zeroHash,
                    bytecode: encodeDeployData({
                        abi: Mailbox.abi,
                        bytecode: Mailbox.bytecode,
                        args: [localhost.id],
                    }),
                },
            );

        if (mailboxImplHashOrigin) {
            await publicClientOrigin.waitForTransactionReceipt({ hash: mailboxImplHashOrigin });
        }

        console.log("aaaaaaaaaaaa");
        console.log({ mailboxImplAddressOrigin, pausableHookAddressOrigin, noopIsmAddressOrigin });
        const data = await publicClientOrigin.simulateContract({
            account: walletClientOrigin.account.address,
            address: CREATE2_FACTORY_ADDRESS,
            abi: [...ICreate2Factory.abi, AddressEmptyCode, InvalidSender],
            functionName: "create",
            args: [
                // zeroAddress,
                walletClientOrigin.account.address,
                [
                    {
                        bytecode: getCloneDeterministicBytecode(mailboxImplAddressOrigin),
                        initData: encodeFunctionData({
                            abi: [initializeAbi],
                            functionName: "initialize",
                            args: [
                                walletClientOrigin.account.address,
                                noopIsmAddressOrigin,
                                pausableHookAddressOrigin,
                                pausableHookAddressOrigin,
                            ],
                        }),
                        salt: bytesToHex(randomBytes(32)),
                    },
                ],
            ],
        });
        console.log({ data });

        // const deployMailboxOrigin = await getOrDeployContracts(
        //     { publicClient: publicClientOrigin, walletClient: walletClientOrigin },
        //     zeroAddress,
        //     [
        //         {
        //             bytecode: getCloneDeterministicBytecode(mailboxImplAddressOrigin),
        //             initData: encodeFunctionData({
        //                 abi: [initializeAbi],
        //                 functionName: "initialize",
        //                 args: [
        //                     walletClientOrigin.account.address,
        //                     noopIsmAddressOrigin,
        //                     pausableHookAddressOrigin,
        //                     pausableHookAddressOrigin,
        //                 ],
        //             }),
        //             salt: bytesToHex(randomBytes(32)),
        //         },
        //     ],
        // );
        // const mailboxAddressOrigin = deployMailboxOrigin.addresses[0].address;

        // await walletClientOrigin.writeContract({
        //     address: mailboxAddressOrigin,
        //     abi: Router.abi,
        //     functionName: "enrollRemoteRouter",
        //     args: [localhostRemote.id, padHex(mailboxAddressRemote, { size: 32 })],
        // });
    });

    // test.skip("Pass a message with mailboxes", async () => {
    //     const randomSalt = bytesToHex(randomBytes(32));
    //
    //     const { address: mailboxImplAddressOrigin, hash: mailboxImplHashOrigin } =
    //         await getOrDeployDeterministicContract(
    //             { publicClient: publicClientOrigin, walletClient: walletClientOrigin },
    //             {
    //                 salt: zeroHash,
    //                 bytecode: encodeDeployData({
    //                     abi: Mailbox.abi,
    //                     bytecode: Mailbox.bytecode,
    //                     args: [localhost.id],
    //                 }),
    //             },
    //         );
    //
    //     if (mailboxImplHashOrigin) {
    //         await publicClientOrigin.waitForTransactionReceipt({ hash: mailboxImplHashOrigin });
    //     }
    //
    //     const { address: mailboxImplAddressRemote, hash: mailboxImplHashRemote } =
    //         await getOrDeployDeterministicContract(
    //             { publicClient: publicClientRemote, walletClient: walletClientRemote },
    //             {
    //                 salt: zeroHash,
    //                 bytecode: encodeDeployData({
    //                     abi: Mailbox.abi,
    //                     bytecode: Mailbox.bytecode,
    //                     args: [localhostRemote.id],
    //                 }),
    //             },
    //         );
    //
    //     if (mailboxImplHashRemote) {
    //         await publicClientRemote.waitForTransactionReceipt({ hash: mailboxImplHashRemote });
    //     }
    //
    //     const deployMailboxOrigin = await getOrDeployContracts(
    //         { publicClient: publicClientOrigin, walletClient: walletClientOrigin },
    //         zeroAddress,
    //         [
    //             {
    //                 bytecode: getCloneDeterministicBytecode(mailboxImplAddressOrigin),
    //                 initData: encodeFunctionData({
    //                     abi: [initializeAbi],
    //                     functionName: "initialize",
    //                     args: [
    //                         walletClientOrigin.account.address,
    //                         noopIsmAddressOrigin,
    //                         pausableHookAddressOrigin,
    //                         pausableHookAddressOrigin,
    //                     ],
    //                 }),
    //                 salt: bytesToHex(randomBytes(32)),
    //             },
    //         ],
    //     );
    //     const mailboxAddressOrigin = deployMailboxOrigin.addresses[0].address;
    //
    //     const deployMailboxRemote = await getOrDeployContracts(
    //         { publicClient: publicClientRemote, walletClient: walletClientRemote },
    //         zeroAddress,
    //         [
    //             {
    //                 bytecode: getCloneDeterministicBytecode(mailboxImplAddressRemote),
    //                 initData: encodeFunctionData({
    //                     abi: [initializeAbi],
    //                     functionName: "initialize",
    //                     args: [
    //                         walletClientRemote.account.address,
    //                         noopIsmAddressRemote,
    //                         pausableHookAddressRemote,
    //                         pausableHookAddressRemote,
    //                     ],
    //                 }),
    //                 salt: randomSalt,
    //             },
    //         ],
    //     );
    //     const mailboxAddressRemote = deployMailboxRemote.addresses[0].address;
    //
    //     await walletClientOrigin.writeContract({
    //         address: mailboxAddressOrigin,
    //         abi: Router.abi,
    //         functionName: "enrollRemoteRouter",
    //         args: [localhostRemote.id, padHex(mailboxAddressRemote, { size: 32 })],
    //     });
    //
    //     await walletClientRemote.writeContract({
    //         address: mailboxAddressRemote,
    //         abi: Router.abi,
    //         functionName: "enrollRemoteRouter",
    //         args: [localhost.id, padHex(mailboxAddressOrigin, { size: 32 })],
    //     });
    // });
});
