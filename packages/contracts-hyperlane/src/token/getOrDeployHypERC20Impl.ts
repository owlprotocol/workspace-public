import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, Client, encodeDeployData, Hex, Transport, zeroHash } from "viem";
import { HypERC20 } from "../artifacts/HypERC20.js";

export async function getOrDeployHypERC20Impl(
    client: Client<Transport, Chain, Account>,
    parameters: {
        mailboxAddress: Address;
        decimals?: number;
        salt?: Hex;
    },
) {
    const { mailboxAddress, decimals = 18, salt = zeroHash } = parameters;
    return getOrDeployDeterministicContract(client, {
        salt,
        bytecode: encodeDeployData({
            abi: HypERC20.abi,
            bytecode: HypERC20.bytecode,
            args: [decimals, mailboxAddress],
        }),
    });
}
