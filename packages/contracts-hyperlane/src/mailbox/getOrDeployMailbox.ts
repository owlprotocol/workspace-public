import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import {
    zeroHash,
    Transport,
    Chain,
    Account,
    Address,
    Hash,
    zeroAddress,
    encodeFunctionData,
    Client,
    encodeDeployData,
} from "viem";
import { Mailbox, initialize as initializeAbi } from "../artifacts/Mailbox.js";

export async function getOrDeployMailbox(
    client: Client<Transport, Chain, Account>,
    parameters: {
        ismAddress: Address;
        defaultHookAddress: Address;
        requiredHookAddress: Address;
        salt?: Hash;
    },
): Promise<{ hash?: Hash; address: Address; exists: boolean }> {
    const { ismAddress, defaultHookAddress, requiredHookAddress, salt = zeroHash } = parameters;
    const deployMailbox = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: encodeDeployData({
                abi: Mailbox.abi,
                bytecode: Mailbox.bytecode,
                args: [client.chain.id],
            }),
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
