import { WalletClient, Transport, Chain, Account, Hex, Address } from "viem";
import { Mailbox } from "../artifacts/Mailbox.js";

export async function relayMessage(params: {
    walletClient: WalletClient<Transport, Chain, Account>;
    mailboxAddress: Address;
    message: Hex;
    metadata: Hex;
}) {
    const { walletClient, message, metadata, mailboxAddress } = params;

    const hash = await walletClient.writeContract({
        address: mailboxAddress,
        abi: Mailbox.abi,
        functionName: "process",
        args: [metadata, message],
    });
    return hash;
}
