import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { HypFiatToken } from "../artifacts/HypFiatToken.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getHypFiatTokenProxyDeployData({
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
                getHypFiatTokenProxyInitData({ hookAddress, ismAddress, account }),
            ],
        }),
        initData: "0x" as const,
    };
}

export function getHypFiatTokenProxyInitData({
    account,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
}: {
    account: Address;
    hookAddress?: Address;
    ismAddress?: Address;
}) {
    return encodeFunctionData({
        abi: HypFiatToken.abi,
        functionName: "initialize",
        args: [hookAddress, ismAddress, account],
    });
}
