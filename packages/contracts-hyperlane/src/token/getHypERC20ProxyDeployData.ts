import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { HypERC20 } from "../artifacts/HypERC20.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getHypERC20ProxyDeployData({
    salt = zeroHash,
    account,
    tokenRouterImplAddress,
    proxyAdminAddress,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
    totalSupply = 0n,
    name,
    symbol,
}: {
    salt?: Hash;
    account: Address;
    tokenRouterImplAddress: Address;
    proxyAdminAddress: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    totalSupply?: bigint;
    name: string;
    symbol: string;
}) {
    return {
        salt,
        bytecode: encodeDeployData({
            abi: TransparentUpgradeableProxy.abi,
            bytecode: TransparentUpgradeableProxy.bytecode,
            args: [
                tokenRouterImplAddress,
                proxyAdminAddress,
                getHypERC20ProxyInitData({ account, hookAddress, ismAddress, totalSupply, name, symbol }),
            ],
        }),
        initData: "0x" as const,
    };
}

export function getHypERC20ProxyInitData({
    account,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
    totalSupply = 0n,
    name,
    symbol,
}: {
    account: Address;
    hookAddress?: Address;
    ismAddress?: Address;
    totalSupply?: bigint;
    name: string;
    symbol: string;
}) {
    return encodeFunctionData({
        abi: HypERC20.abi,
        functionName: "initialize",
        args: [totalSupply, name, symbol, hookAddress, ismAddress, account],
    });
}
