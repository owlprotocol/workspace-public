import { getCloneDeterministicBytecode, getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import {
    Account,
    Address,
    Chain,
    encodeFunctionData,
    Hex,
    PublicClient,
    Transport,
    WalletClient,
    zeroAddress,
    zeroHash,
} from "viem";
import { initialize as initializeAbi } from "../artifacts/HypERC20.js";

export async function getOrDeployHypERC20Proxy({
    walletClient,
    publicClient,
    hypERC20ImplAddress,
    totalSupply,
    name,
    symbol,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
    owner,
    salt = zeroHash,
}: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
    hypERC20ImplAddress: Address;
    totalSupply: bigint;
    name: string;
    symbol: string;
    hookAddress?: Address;
    ismAddress?: Address;
    owner: Address;
    salt?: Hex;
}) {
    const deployERC20 = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
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
