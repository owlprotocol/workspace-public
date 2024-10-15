import { getCloneDeterministicBytecode, getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, encodeFunctionData, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { initialize as initializeAbi } from "../artifacts/HypERC20.js";

export async function getOrDeployHypERC20Proxy(
    client: Client<Transport, Chain, Account>,
    parameters: {
        hypERC20ImplAddress: Address;
        totalSupply: bigint;
        name: string;
        symbol: string;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const {
        hypERC20ImplAddress,
        totalSupply,
        name,
        symbol,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
        salt = zeroHash,
    } = parameters;
    const deployERC20 = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: getCloneDeterministicBytecode(hypERC20ImplAddress),
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
