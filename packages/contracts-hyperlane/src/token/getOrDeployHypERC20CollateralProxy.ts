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
import { initialize as initializeAbi } from "../artifacts/HypERC20Collateral.js";

export async function getOrDeployHypERC20CollateralProxy({
    walletClient,
    publicClient,
    hypERC20CollateralImplAddress,
    hookAddress,
    ismAddress,
    owner,
    salt = zeroHash,
}: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
    hypERC20CollateralImplAddress: Address;
    hookAddress: Address;
    ismAddress: Address;
    owner: Address;
    salt?: Hex;
}) {
    const deployERC20Collateral = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
        {
            bytecode: getCloneDeterministicBytecode(hypERC20CollateralImplAddress),
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
