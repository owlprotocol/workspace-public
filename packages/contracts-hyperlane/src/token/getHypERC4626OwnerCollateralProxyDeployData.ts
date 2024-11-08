import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { HypERC4626OwnerCollateral } from "../artifacts/HypERC4626OwnerCollateral.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getHypERC4626OwnerCollateralProxyDeployData({
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
                getHypERC4626OwnerCollateralProxyInitData({ hookAddress, ismAddress, account }),
            ],
        }),
        initData: "0x" as const,
    };
}

export function getHypERC4626OwnerCollateralProxyInitData({
    account,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
}: {
    account: Address;
    hookAddress?: Address;
    ismAddress?: Address;
}) {
    return encodeFunctionData({
        abi: HypERC4626OwnerCollateral.abi,
        functionName: "initialize",
        args: [hookAddress, ismAddress, account],
    });
}
