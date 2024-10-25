import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { getHypERC4626CollateralDeployArgs } from "./getHypERC4626CollateralDeployArgs.js";

export async function getOrDeployHypERC4626Collateral(
    client: Client<Transport, Chain, Account>,
    parameters: {
        vault: Address;
        mailboxAddress: Address;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const { salt = zeroHash } = parameters;
    const deployERC4626Collateral = await getOrDeployContracts(client, zeroAddress, [
        {
            ...getHypERC4626CollateralDeployArgs(parameters),
            salt,
        },
    ]);

    const erc4626Collateral = deployERC4626Collateral.addresses[0];
    return { hash: deployERC4626Collateral.hash, address: erc4626Collateral.address, exists: erc4626Collateral.exists };
}
