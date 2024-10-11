import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, encodeDeployData, Hex, PublicClient, Transport, WalletClient, zeroHash } from "viem";
import { HypERC20Collateral } from "../artifacts/HypERC20Collateral.js";

export async function getOrDeployHypERC20CollateralImpl({
    walletClient,
    publicClient,
    erc20Address,
    mailboxAddress,
    salt = zeroHash,
}: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
    erc20Address: Address;
    mailboxAddress: Address;
    decimals?: number;
    salt?: Hex;
}) {
    return getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt,
            bytecode: encodeDeployData({
                abi: HypERC20Collateral.abi,
                bytecode: HypERC20Collateral.bytecode,
                args: [erc20Address, mailboxAddress],
            }),
        },
    );
}
