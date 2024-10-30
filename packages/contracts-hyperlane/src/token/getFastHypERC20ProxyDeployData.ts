import { encodeDeployData, encodeFunctionData, Hash, Address, zeroAddress, zeroHash } from "viem";
import { FastHypERC20 } from "../artifacts/FastHypERC20.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";

export function getFastHypERC20ProxyDeployData({
    salt = zeroHash,
    owner,
    tokenRouterImplAddress,
    proxyAdminAddress,
    hookAddress = zeroAddress,
    ismAddress = zeroAddress,
    totalSupply = 0n,
    name,
    symbol,
}: {
    salt?: Hash;
    owner: Address;
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
                encodeFunctionData({
                    abi: FastHypERC20.abi,
                    functionName: "initialize",
                    args: [totalSupply, name, symbol, hookAddress, ismAddress, owner],
                }),
            ],
        }),
        initData: "0x" as const,
    };
}
