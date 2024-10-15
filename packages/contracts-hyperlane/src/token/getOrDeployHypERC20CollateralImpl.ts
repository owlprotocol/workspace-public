import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, Client, encodeDeployData, Hex, Transport, zeroHash } from "viem";
import { HypERC20Collateral } from "../artifacts/HypERC20Collateral.js";

export async function getOrDeployHypERC20CollateralImpl(
    client: Client<Transport, Chain, Account>,
    parameters: {
        erc20Address: Address;
        mailboxAddress: Address;
        decimals?: number;
        salt?: Hex;
    },
) {
    const { erc20Address, mailboxAddress, salt = zeroHash } = parameters;
    return getOrDeployDeterministicContract(client, {
        salt,
        bytecode: encodeDeployData({
            abi: HypERC20Collateral.abi,
            bytecode: HypERC20Collateral.bytecode,
            args: [erc20Address, mailboxAddress],
        }),
    });
}
