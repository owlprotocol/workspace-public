import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, encodeDeployData, Hex, PublicClient, Transport, WalletClient, zeroHash } from "viem";
import { HypERC20 } from "../artifacts/HypERC20.js";

export async function getOrDeployHypERC20Impl({
    walletClient,
    publicClient,
    mailboxAddress,
    decimals = 18,
    salt = zeroHash,
}: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
    mailboxAddress: Address;
    decimals?: number;
    salt?: Hex;
}) {
    return getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt,
            bytecode: encodeDeployData({
                abi: HypERC20.abi,
                bytecode: HypERC20.bytecode,
                args: [decimals, mailboxAddress],
            }),
        },
    );
}
