import { getOrDeployContracts, getCloneDeterministicBytecode } from "@owlprotocol/contracts-create2factory";
import {
    zeroHash,
    PublicClient,
    Transport,
    Chain,
    WalletClient,
    Account,
    Address,
    Hash,
    zeroAddress,
    encodeFunctionData,
} from "viem";
import { initialize as initializeAbi } from "../artifacts/Mailbox.js";

export async function getOrDeployMailboxProxy({
    publicClient,
    walletClient,
    mailboxImplAddress,
    ismAddress,
    defaultHookAddress,
    requiredHookAddress,
    salt = zeroHash,
}: {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
    mailboxImplAddress: Address;
    ismAddress: Address;
    defaultHookAddress: Address;
    requiredHookAddress: Address;
    salt?: Hash;
}): Promise<{ hash?: Hash; address: Address; exists: boolean }> {
    const deployMailbox = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
        {
            bytecode: getCloneDeterministicBytecode(mailboxImplAddress),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [walletClient.account.address, ismAddress, defaultHookAddress, requiredHookAddress],
            }),
            salt,
        },
    ]);

    const mailbox = deployMailbox.addresses[0];
    return { hash: deployMailbox.hash, address: mailbox.address, exists: mailbox.exists };
}
