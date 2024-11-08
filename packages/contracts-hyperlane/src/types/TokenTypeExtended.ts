import { TokenStandardExtended } from "./TokenStandardExtended.js";

export enum TokenTypeExtended {
    synthetic = "synthetic",
    syntheticRebase = "syntheticRebase",
    fastSynthetic = "fastSynthetic",
    syntheticUri = "syntheticUri",
    collateral = "collateral",
    collateralVault = "collateralVault",
    collateralVaultRebase = "collateralVaultRebase",
    XERC20 = "xERC20",
    XERC20Lockbox = "xERC20Lockbox",
    collateralFiat = "collateralFiat",
    fastCollateral = "fastCollateral",
    collateralUri = "collateralUri",
    native = "native",
    nativeScaled = "nativeScaled",
}

export const TOKEN_TYPE_EXTENDED_TO_STANDARD: Record<TokenTypeExtended, TokenStandardExtended> = {
    [TokenTypeExtended.native]: TokenStandardExtended.EvmHypNative,
    [TokenTypeExtended.collateral]: TokenStandardExtended.EvmHypCollateral,
    [TokenTypeExtended.collateralFiat]: TokenStandardExtended.EvmHypCollateralFiat,
    [TokenTypeExtended.XERC20]: TokenStandardExtended.EvmHypXERC20,
    [TokenTypeExtended.XERC20Lockbox]: TokenStandardExtended.EvmHypXERC20Lockbox,
    [TokenTypeExtended.collateralVault]: TokenStandardExtended.EvmHypOwnerCollateral,
    [TokenTypeExtended.collateralVaultRebase]: TokenStandardExtended.EvmHypRebaseCollateral,
    [TokenTypeExtended.collateralUri]: TokenStandardExtended.EvmHypCollateral,
    [TokenTypeExtended.fastCollateral]: TokenStandardExtended.EvmHypCollateral,
    [TokenTypeExtended.synthetic]: TokenStandardExtended.EvmHypSynthetic,
    [TokenTypeExtended.syntheticRebase]: TokenStandardExtended.EvmHypSyntheticRebase,
    [TokenTypeExtended.syntheticUri]: TokenStandardExtended.EvmHypSynthetic,
    [TokenTypeExtended.fastSynthetic]: TokenStandardExtended.EvmHypSynthetic,
    [TokenTypeExtended.nativeScaled]: TokenStandardExtended.EvmHypNative,
};

export const TOKEN_TYPE_TO_CONTRACT_NAME: Record<TokenTypeExtended, string> = {
    [TokenTypeExtended.native]: "HypNative",
    [TokenTypeExtended.collateral]: "HypERC20Collateral",
    [TokenTypeExtended.collateralFiat]: "HypFiatToken",
    [TokenTypeExtended.XERC20]: "HypXERC20",
    [TokenTypeExtended.XERC20Lockbox]: "HypXERC20Lockbox",
    [TokenTypeExtended.collateralVault]: "HypERC4626OwnerCollateral",
    [TokenTypeExtended.collateralVaultRebase]: "HypERC4626Collateral",
    // TODO find correct name
    [TokenTypeExtended.collateralUri]: "",
    [TokenTypeExtended.fastCollateral]: "FastHypERC20Collateral",
    [TokenTypeExtended.synthetic]: "HypERC20",
    // TODO find correct name
    [TokenTypeExtended.syntheticRebase]: "",
    // TODO find correct name
    [TokenTypeExtended.syntheticUri]: "",
    [TokenTypeExtended.fastSynthetic]: "FastHypERC20",
    [TokenTypeExtended.nativeScaled]: "HypNativeScaled",
};
