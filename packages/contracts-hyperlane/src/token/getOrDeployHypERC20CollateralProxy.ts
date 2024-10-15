import { getCloneDeterministicBytecode, getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, encodeFunctionData, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { initialize as initializeAbi } from "../artifacts/HypERC20Collateral.js";

export async function getOrDeployHypERC20CollateralProxy(
    client: Client<Transport, Chain, Account>,
    parameters: {
        hypERC20CollateralImplAddress: Address;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const {
        hypERC20CollateralImplAddress,
        hookAddress = zeroAddress,
        ismAddress = zeroAddress,
        owner,
        salt = zeroHash,
    } = parameters;
    const deployERC20Collateral = await getOrDeployContracts(client, zeroAddress, [
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
