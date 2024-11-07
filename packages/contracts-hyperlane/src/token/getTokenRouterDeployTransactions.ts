import { type Client, type Address, zeroHash, encodeFunctionData, Hash, Hex, encodeDeployData } from "viem";
import { getDeployAddress, getDeployFunctionData } from "@owlprotocol/contracts-create2factory";
import { getAction } from "viem/utils";
import { getDeployDeterministicAddress, getDeployDeterministicFunctionData } from "@owlprotocol/viem-utils";
import { getCode } from "viem/actions";
import {
    getHypERC20CollateralProxyDeployData,
    getHypERC20CollateralProxyInitData,
} from "./getHypERC20CollateralProxyDeployData.js";
import { getHypERC20ProxyDeployData, getHypERC20ProxyInitData } from "./getHypERC20ProxyDeployData.js";
import { getFastHypERC20ProxyDeployData, getFastHypERC20ProxyInitData } from "./getFastHypERC20ProxyDeployData.js";
import {
    getFastHypERC20CollateralProxyDeployData,
    getFastHypERC20CollateralProxyInitData,
} from "./getFastHypERC20CollateralProxyDeployData.js";
import { getHypFiatTokenProxyDeployData, getHypFiatTokenProxyInitData } from "./getHypFiatTokenProxyDeployData.js";
import { getHypNativeProxyDeployData, getHypNativeProxyInitData } from "./getHypNativeProxyDeployData.js";
import {
    getHypERC4626OwnerCollateralProxyDeployData,
    getHypERC4626OwnerCollateralProxyInitData,
} from "./getHypERC4626OwnerCollateralProxyDeployData.js";
import {
    getHypERC4626CollateralProxyDeployData,
    getHypERC4626CollateralProxyInitData,
} from "./getHypERC4626CollateralProxyDeployData.js";
import { ProxyAdmin } from "../artifacts/ProxyAdmin.js";
import { Ownable } from "../artifacts/Ownable.js";
import { TokenTypeExtended } from "../types/TokenTypeExtended.js";
import { HypNative } from "../artifacts/HypNative.js";
import { HypERC20 } from "../artifacts/HypERC20.js";
import { HypERC20Collateral } from "../artifacts/HypERC20Collateral.js";
import { FastHypERC20 } from "../artifacts/FastHypERC20.js";
import { FastHypERC20Collateral } from "../artifacts/FastHypERC20Collateral.js";
import { HypFiatToken } from "../artifacts/HypFiatToken.js";
import { HypERC4626OwnerCollateral } from "../artifacts/HypERC4626OwnerCollateral.js";
import { HypERC4626Collateral } from "../artifacts/HypERC4626Collateral.js";

const contractExists = async (client: Client, address: Address) => {
    const code = await getAction(client, getCode, "getCode")({ address });
    return !!code;
};

export interface GetTokenRouterDeployTransactionsParameters {
    account: Address;
    proxyAdminOwner?: Address;
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
        account,
        proxyAdminOwner = account,
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

    let proxyInitData: Hex;

    const proxyAdminDeployArgs = {
        salt: zeroHash,
        bytecode: ProxyAdmin.bytecode,
        initData: encodeFunctionData({ abi: Ownable.abi, functionName: "transferOwnership", args: [proxyAdminOwner] }),
    };
    const proxyAdminAddress = getDeployAddress(account, proxyAdminDeployArgs);

    const proxyAdminExists = await contractExists(client, proxyAdminAddress);

    if (!proxyAdminExists) {
        transactions.push(getDeployFunctionData(account, [proxyAdminDeployArgs]));
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
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });

            proxyInitData = getHypNativeProxyInitData({ account });
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
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
                totalSupply,
                name,
                symbol,
            });

            proxyInitData = getHypERC20ProxyInitData({ account, name, symbol, totalSupply });
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
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
                totalSupply,
                name,
                symbol,
            });

            proxyInitData = getFastHypERC20ProxyInitData({ account, name, symbol, totalSupply });
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
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });

            proxyInitData = getHypERC20CollateralProxyInitData({ account });
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
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });

            proxyInitData = getFastHypERC20CollateralProxyInitData({ account });
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
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });

            proxyInitData = getHypFiatTokenProxyInitData({ account });
            break;
        case TokenTypeExtended.collateralVault:
            if (!collateralAddress) {
                throw new Error("Collateral address required for this token type");
            }
            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypERC4626OwnerCollateral.abi,
                    bytecode: HypERC4626OwnerCollateral.bytecode,
                    args: [collateralAddress, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getHypERC4626OwnerCollateralProxyDeployData({
                salt: proxyDeploySalt,
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });

            proxyInitData = getHypERC4626OwnerCollateralProxyInitData({ account });
            break;
        case TokenTypeExtended.collateralVaultRebase:
            if (!collateralAddress) {
                throw new Error("Collateral address required for this token type");
            }
            tokenRouterImplDeployData = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: HypERC4626Collateral.abi,
                    bytecode: HypERC4626Collateral.bytecode,
                    args: [collateralAddress, mailboxAddress],
                }),
            };
            tokenRouterImplAddress = getDeployDeterministicAddress(tokenRouterImplDeployData);

            tokenRouterProxyDeployData = getHypERC4626CollateralProxyDeployData({
                salt: proxyDeploySalt,
                account,
                tokenRouterImplAddress,
                proxyAdminAddress,
            });

            proxyInitData = getHypERC4626CollateralProxyInitData({ account });
            break;
        default:
            throw new Error("Token type unsupported");
    }

    const tokenRouterImplExists = await contractExists(client, tokenRouterImplAddress);
    if (!tokenRouterImplExists) {
        transactions.push(getDeployDeterministicFunctionData(tokenRouterImplDeployData));
    }

    const tokenRouterProxyAddress = getDeployAddress(account, tokenRouterProxyDeployData);
    const tokenRouterProxyExists = await contractExists(client, tokenRouterProxyAddress);
    if (!tokenRouterProxyExists) {
        transactions.push(getDeployFunctionData(account, [tokenRouterProxyDeployData]));
    }

    return {
        proxyAdminAddress,
        tokenRouterImplAddress,
        tokenRouterProxyAddress,
        transactions,
        proxyInitData,
    };
}
