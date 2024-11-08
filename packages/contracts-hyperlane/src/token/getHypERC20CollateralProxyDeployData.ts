import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { HypERC20Collateral } from "../artifacts/HypERC20Collateral.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getHypERC20CollateralProxyDeployData({
    salt = zeroHash,
    account,
    tokenRouterImplAddress,
    proxyAdminAddress,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
}: {
    salt?: Hash;
    account: Address;
    tokenRouterImplAddress: Address;
    proxyAdminAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
}) {
    return {
        salt,
        bytecode: encodeDeployData({
            abi: TransparentUpgradeableProxy.abi,
            bytecode: TransparentUpgradeableProxy.bytecode,
            args: [
                tokenRouterImplAddress,
                proxyAdminAddress,
                getHypERC20CollateralProxyInitData({ ismAddress, hookAddress, account }),
            ],
        }),
        initData: "0x" as const,
    };
}
export function getHypERC20CollateralProxyInitData({
    account,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
}: {
    account: Address;
    hookAddress?: Address;
    ismAddress?: Address;
}) {
    return encodeFunctionData({
        abi: HypERC20Collateral.abi,
        functionName: "initialize",
        args: [hookAddress, ismAddress, account],
    });
}
