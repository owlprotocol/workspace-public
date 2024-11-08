import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { FastHypERC20 } from "../artifacts/FastHypERC20.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getFastHypERC20ProxyDeployData({
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
                getFastHypERC20ProxyInitData({ account, totalSupply, name, symbol, hookAddress, ismAddress }),
            ],
        }),
        initData: "0x" as const,
    };
}

export function getFastHypERC20ProxyInitData({
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
        abi: FastHypERC20.abi,
        functionName: "initialize",
        args: [totalSupply, name, symbol, hookAddress, ismAddress, account],
    });
}
