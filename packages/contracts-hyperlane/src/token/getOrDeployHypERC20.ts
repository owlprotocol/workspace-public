import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { getHypERC20DeployArgs } from "./getHypERC20DeployArgs.js";

export async function getOrDeployHypERC20(
    client: Client<Transport, Chain, Account>,
    parameters: {
        mailboxAddress: Address;
        decimals?: number;
        totalSupply?: bigint;
        name: string;
        symbol: string;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const { salt = zeroHash } = parameters;
    const deployERC20 = await getOrDeployContracts(client, zeroAddress, [
        {
            ...getHypERC20DeployArgs(parameters),
            salt,
        },
    ]);

    const erc20 = deployERC20.addresses[0];
    return { hash: deployERC20.hash, address: erc20.address, exists: erc20.exists };
}
