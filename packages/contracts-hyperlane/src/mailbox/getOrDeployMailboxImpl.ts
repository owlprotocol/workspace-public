import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { zeroHash, PublicClient, Transport, Chain, WalletClient, Account, Hash, Address, encodeDeployData } from "viem";
import { Mailbox } from "../artifacts/Mailbox.js";

export async function getOrDeployMailboxImpl({
    publicClient,
    walletClient,
    salt = zeroHash,
}: {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
    salt?: Hash;
}): Promise<{ hash?: Hash; address: Address }> {
    return getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt,
            bytecode: encodeDeployData({
                abi: Mailbox.abi,
                bytecode: Mailbox.bytecode,
                args: [publicClient.chain.id],
            }),
        },
    );
}
