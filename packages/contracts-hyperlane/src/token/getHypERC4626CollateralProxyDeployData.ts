import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { HypERC4626Collateral } from "../artifacts/HypERC4626Collateral.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getHypERC4626CollateralProxyDeployData({
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
                getHypERC4626CollateralProxyInitData({ hookAddress, ismAddress, account }),
            ],
        }),
        initData: "0x" as const,
    };
}

export function getHypERC4626CollateralProxyInitData({
    account,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
}: {
    account: Address;
    hookAddress?: Address;
    ismAddress?: Address;
}) {
    return encodeFunctionData({
        abi: HypERC4626Collateral.abi,
        functionName: "initialize",
        args: [hookAddress, ismAddress, account],
    });
}
