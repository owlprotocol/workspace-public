import { constants } from "ethers";
import type { ERC1155Mintable } from "../typechain/ethers/contracts/assets/ERC1155/ERC1155Mintable.js";

export interface ERC1155MintableInitializeArgs {
    admin: Parameters<ERC1155Mintable["initialize"]>[0];
    contractUri?: Parameters<ERC1155Mintable["initialize"]>[1];
    gsnForwarder?: Parameters<ERC1155Mintable["initialize"]>[2];
    uri: Parameters<ERC1155Mintable["initialize"]>[3];
    feeReceiver?: Parameters<ERC1155Mintable["initialize"]>[4];
    feeNumerator?: Parameters<ERC1155Mintable["initialize"]>[5];
}

export function flattenInitArgsERC1155Mintable(args: ERC1155MintableInitializeArgs) {
    const { admin, contractUri, gsnForwarder, uri, feeReceiver, feeNumerator } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        uri,
        feeReceiver ?? admin,
        feeNumerator ?? 0,
    ] as [
            Parameters<ERC1155Mintable["initialize"]>[0],
            Parameters<ERC1155Mintable["initialize"]>[1],
            Parameters<ERC1155Mintable["initialize"]>[2],
            Parameters<ERC1155Mintable["initialize"]>[3],
            Parameters<ERC1155Mintable["initialize"]>[4],
            Parameters<ERC1155Mintable["initialize"]>[5],
        ];
}
