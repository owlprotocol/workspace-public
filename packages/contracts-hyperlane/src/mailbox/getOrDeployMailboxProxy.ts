import { getOrDeployContracts, getCloneDeterministicBytecode } from "@owlprotocol/contracts-create2factory";
import { zeroHash, Transport, Chain, Account, Address, Hash, zeroAddress, encodeFunctionData, Client } from "viem";
import { initialize as initializeAbi } from "../artifacts/Mailbox.js";

export async function getOrDeployMailboxProxy(
    client: Client<Transport, Chain, Account>,
    parameters: {
        mailboxImplAddress: Address;
        ismAddress: Address;
        defaultHookAddress: Address;
        requiredHookAddress: Address;
        salt?: Hash;
    },
): Promise<{ hash?: Hash; address: Address; exists: boolean }> {
    const { mailboxImplAddress, ismAddress, defaultHookAddress, requiredHookAddress, salt = zeroHash } = parameters;
    const deployMailbox = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: getCloneDeterministicBytecode(mailboxImplAddress),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [client.account.address, ismAddress, defaultHookAddress, requiredHookAddress],
            }),
            salt,
        },
    ]);

    const mailbox = deployMailbox.addresses[0];
    return { hash: deployMailbox.hash, address: mailbox.address, exists: mailbox.exists };
}
