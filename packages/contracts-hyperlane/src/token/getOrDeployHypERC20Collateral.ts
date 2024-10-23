import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { getHypERC20CollateralDeployArgs } from "./getHypERC20CollateralDeployArgs.js";

export async function getOrDeployHypERC20Collateral(
    client: Client<Transport, Chain, Account>,
    parameters: {
        erc20Address: Address;
        mailboxAddress: Address;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const { salt = zeroHash } = parameters;
    const deployERC20Collateral = await getOrDeployContracts(client, zeroAddress, [
        {
            ...getHypERC20CollateralDeployArgs(parameters),
            salt,
        },
    ]);

    const erc20Collateral = deployERC20Collateral.addresses[0];
    return { hash: deployERC20Collateral.hash, address: erc20Collateral.address, exists: erc20Collateral.exists };
}
