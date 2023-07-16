import * as ZodValidators from "@owlprotocol/zod-sol";
import { mapValues } from "../lodash.js";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";

export const abis = {
    ERC20Mintable: contracts.assets.erc20.ERC20Mintable__factory.abi,
    ERC721Mintable: contracts.assets.erc721.ERC721Mintable__factory.abi,
    ERC721MintableAutoId: contracts.assets.erc721.ERC721MintableAutoId__factory.abi,
    ERC1155Mintable: contracts.assets.erc1155.ERC1155Mintable__factory.abi,
    TokenURI: contracts.plugins.tokenUri.TokenURI__factory.abi,
    TokenURIBaseURI: contracts.plugins.tokenUri.TokenURIBaseURI__factory.abi,
    TokenURIDna: contracts.plugins.tokenUri.TokenURIDna__factory.abi,
    ERC2981Setter: contracts.plugins.erc2981.ERC2981Setter__factory.abi,
    TokenDna: contracts.plugins.tokenDna.TokenDna__factory.abi,
    //Problematic due to nested tuples
    //AssetRouterCraft: contracts.plugins.assetRouter.AssetRouterCraft__factory.abi,
    //AssetRouterInput: contracts.plugins.assetRouter.AssetRouterInput__factory.abi,
    //AssetRouterOutput: contracts.plugins.assetRouter.AssetRouterOutput__factory.abi
} as const

const abisFunctions = mapValues(abis, (abi) => {
    return ZodValidators.abiWithFunctionsOnly(abi)
}) as {
        [K in keyof typeof abis]: ReturnType<typeof ZodValidators.abiWithFunctionsOnly<typeof abis[K]>>
    }

export const abisWithZod = mapValues(abisFunctions, (abi) => {
    return ZodValidators.abiWithZod(abi)
}) as {
        [K in keyof typeof abisFunctions]: ReturnType<typeof ZodValidators.abiWithZod<typeof abisFunctions[K]>>
    }
