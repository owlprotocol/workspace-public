import { getCoreContractFacets, getDiamondFacets, getERC721Facets } from "@owlprotocol/contracts-diamond";
import { getERC4337Contracts } from "@owlprotocol/contracts-account-abstraction";
import { Address } from "viem";

import { getCreate2FactoryAddresses } from "@owlprotocol/contracts-create2factory";
import { getHyperlaneContracts } from "@owlprotocol/contracts-hyperlane";

export function getAllContractAddresses({
    mailboxAddress,
}: {
    mailboxAddress: Address | null;
}): Record<string, Address> {
    const diamondAddresses = getDiamondFacets();
    const ERC721Addresses = getERC721Facets();
    const erc4337Addresses = getERC4337Contracts();
    const coreContractAddresses = getCoreContractFacets();
    const create2Addresses = getCreate2FactoryAddresses();

    const hyperlaneAddresses = mailboxAddress ? getHyperlaneContracts({ mailboxAddress }) : {};

    return {
        ...diamondAddresses,
        ...erc4337Addresses,
        ...ERC721Addresses,
        ...coreContractAddresses,
        ...create2Addresses,
        ...hyperlaneAddresses,
    };
}
