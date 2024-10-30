export enum TokenStandardExtended {
    // EVM
    ERC20 = "ERC20",
    ERC721 = "ERC721",
    EvmNative = "EvmNative",
    EvmHypNative = "EvmHypNative",
    EvmHypCollateral = "EvmHypCollateral",
    EvmHypOwnerCollateral = "EvmHypOwnerCollateral",
    EvmHypRebaseCollateral = "EvmHypRebaseCollateral",
    EvmHypCollateralFiat = "EvmHypCollateralFiat",
    EvmHypSynthetic = "EvmHypSynthetic",
    EvmHypSyntheticRebase = "EvmHypSyntheticRebase",
    EvmHypXERC20 = "EvmHypXERC20",
    EvmHypXERC20Lockbox = "EvmHypXERC20Lockbox",

    // Sealevel (Solana)
    SealevelSpl = "SealevelSpl",
    SealevelSpl2022 = "SealevelSpl2022",
    SealevelNative = "SealevelNative",
    SealevelHypNative = "SealevelHypNative",
    SealevelHypCollateral = "SealevelHypCollateral",
    SealevelHypSynthetic = "SealevelHypSynthetic",

    // Cosmos
    CosmosIcs20 = "CosmosIcs20",
    CosmosIcs721 = "CosmosIcs721",
    CosmosNative = "CosmosNative",
    CosmosIbc = "CosmosIbc",

    // CosmWasm
    CW20 = "CW20",
    CWNative = "CWNative",
    CW721 = "CW721",
    CwHypNative = "CwHypNative",
    CwHypCollateral = "CwHypCollateral",
    CwHypSynthetic = "CwHypSynthetic",
}
