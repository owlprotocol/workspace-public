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
import { HypERC20, initialize as initializeAbi } from "../artifacts/HypERC20.js";

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
    const {
        mailboxAddress,
        decimals = 18,
        totalSupply = 0n,
        name,
        symbol,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
        salt = zeroHash,
    } = parameters;
    const deployERC20 = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: encodeDeployData({
                abi: HypERC20.abi,
                bytecode: HypERC20.bytecode,
                args: [decimals, mailboxAddress],
            }),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [totalSupply, name, symbol, hookAddress, ismAddress, owner],
            }),
            salt,
        },
    ]);

    const erc20 = deployERC20.addresses[0];
    return { hash: deployERC20.hash, address: erc20.address, exists: erc20.exists };
}
