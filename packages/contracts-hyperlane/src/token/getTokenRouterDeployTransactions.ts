import { type Client, type Address, zeroHash, encodeFunctionData, Hash, Hex, encodeDeployData } from "viem";
import {
    getDeployAddress,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
    getDeployFunctionData,
} from "@owlprotocol/contracts-create2factory";
import { getAction } from "viem/utils";
import { getCode } from "viem/actions";
import { getHypERC20CollateralProxyDeployData } from "./getHypERC20CollateralProxyDeployData.js";
import { getHypERC20ProxyDeployData } from "./getHypERC20ProxyDeployData.js";
import { getFastHypERC20ProxyDeployData } from "./getFastHypERC20ProxyDeployData.js";
import { getFastHypERC20CollateralProxyDeployData } from "./getFastHypERC20CollateralProxyDeployData.js";
import { getHypFiatTokenProxyDeployData } from "./getHypFiatTokenProxyDeployData.js";
import { getHypNativeProxyDeployData } from "./getHypNativeProxyDeployData.js";
import { ProxyAdmin } from "../artifacts/ProxyAdmin.js";
import { Ownable } from "../artifacts/Ownable.js";
import { TokenTypeExtended } from "../types/TokenTypeExtended.js";
import { HypNative } from "../artifacts/HypNative.js";
import { HypERC20 } from "../artifacts/HypERC20.js";
import { HypERC20Collateral } from "../artifacts/HypERC20Collateral.js";
import { FastHypERC20 } from "../artifacts/FastHypERC20.js";
import { FastHypERC20Collateral } from "../artifacts/FastHypERC20Collateral.js";
import { HypFiatToken } from "../artifacts/HypFiatToken.js";

const contractExists = async (client: Client, address: Address) => {
    const code = await getAction(client, getCode, "getCode")({ address });
    return !!code;
};

export interface GetTokenRouterDeployTransactionsParameters {
    owner: Address;
    mailboxAddress: Address;
    collateralAddress?: Address;
    tokenType: TokenTypeExtended;
    totalSupply?: bigint;
    name?: string;
    symbol?: string;
    decimals?: number;
    proxyDeploySalt?: Hex;
}

export async function getTokenRouterDeployTransactions(
    client: Client,
    {
        owner,
        mailboxAddress,
        collateralAddress,
        tokenType,
        totalSupply = 0n,
        name,
        symbol,
        decimals = 18,
        proxyDeploySalt = zeroHash,
    }: GetTokenRouterDeployTransactionsParameters,
) {
    const transactions: { to: Address; data: Hex }[] = [];

    let tokenRouterImplAddress: Address;
    let tokenRouterImplDeployData: { salt: Hash; bytecode: Hex };

    let tokenRouterProxyDeployData: { salt: Hash; bytecode: Hex; initData: "0x" };

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

            tokenRouterProxyDeployData = getHypNativeProxyDeployData({
                salt: proxyDeploySalt,
                owner,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });
            break;
        case TokenTypeExtended.synthetic:
            if (!name || !symbol) {
                throw new Error("Name and symbol required for this token type");
            }

            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypERC20.abi,
                    bytecode: HypERC20.bytecode,
                    args: [decimals, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getHypERC20ProxyDeployData({
                salt: proxyDeploySalt,
                owner,
                tokenRouterImplAddress,
                proxyAdminAddress,
                totalSupply,
                name,
                symbol,
            });
            break;
        case TokenTypeExtended.fastSynthetic:
            if (!name || !symbol) {
                throw new Error("Name and symbol required for this token type");
            }

            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: FastHypERC20.abi,
                    bytecode: FastHypERC20.bytecode,
                    args: [decimals, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getFastHypERC20ProxyDeployData({
                salt: proxyDeploySalt,
                owner,
                tokenRouterImplAddress,
                proxyAdminAddress,
                totalSupply,
                name,
                symbol,
            });
            break;
        case TokenTypeExtended.collateral:
            if (!collateralAddress) {
                throw new Error("Collateral address required for this token type");
            }
            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypERC20Collateral.abi,
                    bytecode: HypERC20Collateral.bytecode,
                    args: [collateralAddress, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getHypERC20CollateralProxyDeployData({
                salt: proxyDeploySalt,
                owner,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });
            break;
        case TokenTypeExtended.fastCollateral:
            if (!collateralAddress) {
                throw new Error("Collateral address required for this token type");
            }
            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: FastHypERC20Collateral.abi,
                    bytecode: FastHypERC20Collateral.bytecode,
                    args: [collateralAddress, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getFastHypERC20CollateralProxyDeployData({
                salt: proxyDeploySalt,
                owner,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });
            break;
        case TokenTypeExtended.collateralFiat:
            if (!collateralAddress) {
                throw new Error("Collateral address required for this token type");
            }
            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypFiatToken.abi,
                    bytecode: HypFiatToken.bytecode,
                    args: [collateralAddress, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getHypFiatTokenProxyDeployData({
                salt: proxyDeploySalt,
                owner,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });
            break;
        // TODO 4626 cases
        case TokenTypeExtended.collateralVault:
        case TokenTypeExtended.collateralVaultRebase:
        default:
            throw new Error("Token type unsupported");
    }

    const tokenRouterImplExists = await contractExists(client, tokenRouterImplAddress);
    if (!tokenRouterImplExists) {
        transactions.push(getDeployDeterministicFunctionData(tokenRouterImplDeployData));
    }

    const tokenRouterProxyAddress = getDeployAddress(owner, tokenRouterProxyDeployData);
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
