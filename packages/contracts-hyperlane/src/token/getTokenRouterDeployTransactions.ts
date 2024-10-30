import {
    type Client,
    type Address,
    zeroHash,
    encodeFunctionData,
    Hash,
    Hex,
    encodeDeployData,
    zeroAddress,
} from "viem";
import {
    getDeployAddress,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
    getDeployFunctionData,
} from "@owlprotocol/contracts-create2factory";
import { getAction } from "viem/utils";
import { getCode } from "viem/actions";
import { ProxyAdmin } from "../artifacts/ProxyAdmin.js";
import { Ownable } from "../artifacts/Ownable.js";
import { TokenTypeExtended } from "../types/TokenTypeExtended.js";
import { HypNative } from "../artifacts/HypNative.js";
import { TransparentUpgradeableProxy } from "../artifacts/TransparentUpgradeableProxy.js";
import { HypERC20 } from "../artifacts/HypERC20.js";

const contractExists = async (client: Client, address: Address) => {
    const code = await getAction(client, getCode, "getCode")({ address });
    return !!code;
};

export async function getTokenRouterDeployTransactions(
    client: Client,
    {
        owner,
        mailboxAddress,
        collateralAddress,
        tokenType,
        tokenMetadata,
        totalSupply = 0n,
        proxyDeploySalt = zeroHash,
    }: {
        owner: Address;
        mailboxAddress: Address;
        collateralAddress?: Address;
        tokenType: TokenTypeExtended;
        tokenMetadata?: { name: string; symbol: string; decimals?: number };
        totalSupply?: bigint;
        proxyDeploySalt?: Hex;
    },
) {
    const transactions: { to: Address; data: Hex }[] = [];

    let tokenRouterImplAddress: Address;
    let tokenRouterImplDeployData: { salt: Hash; bytecode: Hex };

    let tokenRouterProxyAddress: Address;
    let tokenRouterProxyDeployData: { salt: Hash; bytecode: Hex; initData: Hex };

    const proxyAdminDeployArgs = {
        salt: zeroHash,
        bytecode: ProxyAdmin.bytecode,
        initData: encodeFunctionData({ abi: Ownable.abi, functionName: "transferOwnership", args: [owner] }),
    };
    const proxyAdminAddress = getDeployAddress(owner, proxyAdminDeployArgs);

    const proxyAdminExists = await contractExists(client, proxyAdminAddress);

    if (!proxyAdminExists) {
        transactions.push(getDeployFunctionData(owner, [proxyAdminDeployArgs]));
    }

    switch (tokenType) {
        case TokenTypeExtended.native:
            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypNative.abi,
                    bytecode: HypNative.bytecode,
                    args: [mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = {
                salt: proxyDeploySalt,
                bytecode: encodeDeployData({
                    abi: TransparentUpgradeableProxy.abi,
                    bytecode: TransparentUpgradeableProxy.bytecode,
                    args: [
                        tokenRouterImplAddress,
                        proxyAdminAddress,
                        encodeFunctionData({
                            abi: HypNative.abi,
                            functionName: "initialize",
                            args: [zeroAddress, zeroAddress, owner],
                        }),
                    ],
                }),
                initData: "0x",
            };

            tokenRouterProxyAddress = getDeployAddress(owner, tokenRouterProxyDeployData);
            break;
        case TokenTypeExtended.synthetic:
            if (!tokenMetadata) {
                throw new Error("Token metadata required for this token type");
            }
            const { name, symbol, decimals = 18 } = tokenMetadata;

            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypERC20.abi,
                    bytecode: HypERC20.bytecode,
                    args: [decimals, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = {
                salt: proxyDeploySalt,
                bytecode: encodeDeployData({
                    abi: TransparentUpgradeableProxy.abi,
                    bytecode: TransparentUpgradeableProxy.bytecode,
                    args: [
                        tokenRouterImplAddress,
                        proxyAdminAddress,
                        encodeFunctionData({
                            abi: HypERC20.abi,
                            functionName: "initialize",
                            args: [totalSupply, name, symbol, zeroAddress, zeroAddress, owner],
                        }),
                    ],
                }),
                initData: "0x",
            };

            tokenRouterProxyAddress = getDeployAddress(owner, tokenRouterProxyDeployData);
            break;
        default:
            throw new Error("Token type unsupported");
    }

    const tokenRouterImplExists = await contractExists(client, tokenRouterImplAddress);
    if (!tokenRouterImplExists) {
        transactions.push(getDeployDeterministicFunctionData(tokenRouterImplDeployData));
    }

    const tokenRouterProxyExists = await contractExists(client, tokenRouterProxyAddress);
    if (!tokenRouterProxyExists) {
        transactions.push(getDeployFunctionData(owner, [tokenRouterProxyDeployData]));
    }

    return {
        proxyAdminAddress,
        tokenRouterImplAddress,
        tokenRouterProxyAddress,
        transactions,
    };
}
