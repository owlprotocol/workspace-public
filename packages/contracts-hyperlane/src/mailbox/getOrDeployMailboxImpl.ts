import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { zeroHash, Transport, Chain, Account, Hash, Address, encodeDeployData, Client } from "viem";
import { Mailbox } from "../artifacts/Mailbox.js";

export async function getOrDeployMailboxImpl(
    client: Client<Transport, Chain, Account>,
    parameters?: {
        salt?: Hash;
    },
): Promise<{ hash?: Hash; address: Address }> {
    const { salt = zeroHash } = parameters ?? {};
    return getOrDeployDeterministicContract(client, {
        salt,
        bytecode: encodeDeployData({
            abi: Mailbox.abi,
            bytecode: Mailbox.bytecode,
            args: [client.chain.id],
        }),
    });
}
