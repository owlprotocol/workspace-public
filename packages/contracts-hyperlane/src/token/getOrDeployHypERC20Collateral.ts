import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import {
    Account,
    Address,
    Chain,
    Client,
    encodeDeployData,
    encodeFunctionData,
    Hex,
    Transport,
    zeroAddress,
    zeroHash,
} from "viem";
import { HypERC20Collateral, initialize as initializeAbi } from "../artifacts/HypERC20Collateral.js";

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
    const {
        erc20Address,
        mailboxAddress,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
        salt = zeroHash,
    } = parameters;
    const deployERC20Collateral = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: encodeDeployData({
                abi: HypERC20Collateral.abi,
                bytecode: HypERC20Collateral.bytecode,
                args: [erc20Address, mailboxAddress],
            }),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [hookAddress, ismAddress, owner],
            }),
            salt,
        },
    ]);

    const erc20Collateral = deployERC20Collateral.addresses[0];
    return { hash: deployERC20Collateral.hash, address: erc20Collateral.address, exists: erc20Collateral.exists };
}
