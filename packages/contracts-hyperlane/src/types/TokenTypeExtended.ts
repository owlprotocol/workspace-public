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

export const TOKEN_TYPE_EXTENDED_TO_STANDARD: Record<
    TokenTypeExtended,
    TokenStandardExtended
> = {
    [TokenTypeExtended.native]: TokenStandardExtended.EvmHypNative,
    [TokenTypeExtended.collateral]: TokenStandardExtended.EvmHypCollateral,
    [TokenTypeExtended.collateralFiat]:
        TokenStandardExtended.EvmHypCollateralFiat,
    [TokenTypeExtended.XERC20]: TokenStandardExtended.EvmHypXERC20,
    [TokenTypeExtended.XERC20Lockbox]:
        TokenStandardExtended.EvmHypXERC20Lockbox,
    [TokenTypeExtended.collateralVault]:
        TokenStandardExtended.EvmHypOwnerCollateral,
    [TokenTypeExtended.collateralVaultRebase]:
        TokenStandardExtended.EvmHypRebaseCollateral,
    [TokenTypeExtended.collateralUri]: TokenStandardExtended.EvmHypCollateral,
    [TokenTypeExtended.fastCollateral]: TokenStandardExtended.EvmHypCollateral,
    [TokenTypeExtended.synthetic]: TokenStandardExtended.EvmHypSynthetic,
    [TokenTypeExtended.syntheticRebase]:
        TokenStandardExtended.EvmHypSyntheticRebase,
    [TokenTypeExtended.syntheticUri]: TokenStandardExtended.EvmHypSynthetic,
    [TokenTypeExtended.fastSynthetic]: TokenStandardExtended.EvmHypSynthetic,
    [TokenTypeExtended.nativeScaled]: TokenStandardExtended.EvmHypNative,
};
