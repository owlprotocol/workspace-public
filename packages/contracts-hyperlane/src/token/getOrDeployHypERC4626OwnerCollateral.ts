import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { getHypERC4626OwnerCollateralDeployArgs } from "./getHypERC4626OwnerCollateralDeployArgs.js";

export async function getOrDeployHypERC4626OwnerCollateral(
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
    const deployERC4626OwnerCollateral = await getOrDeployContracts(client, zeroAddress, [
        {
            ...getHypERC4626OwnerCollateralDeployArgs(parameters),
            salt,
        },
    ]);

    const erc4626OwnerCollateral = deployERC4626OwnerCollateral.addresses[0];
    return {
        hash: deployERC4626OwnerCollateral.hash,
        address: erc4626OwnerCollateral.address,
        exists: erc4626OwnerCollateral.exists,
    };
}
