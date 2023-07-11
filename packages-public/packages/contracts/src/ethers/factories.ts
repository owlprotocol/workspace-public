import { getFactoriesWithSigner, Utils } from "@owlprotocol/contracts-proxy";
import * as contracts from "../typechain/ethers/factories/contracts/index.js";

export interface DeployedLinkReferences {
    [libraryFileName: string]: {
        [libraryName: string]: string;
    };
}

//Replace placeholders with libraries, numbers are 2x as bytes are represented as hex, offset by 2 for initial 0x
/*
export function linkLibraryBytecode(artifact: Artifact, deployedLinkReferences: DeployedLinkReferences) {
    let bytecode = artifact.bytecode;
    Object.entries(artifact.linkReferences).forEach(([linkRefFile, linkRef]) => {
        Object.entries(linkRef).forEach(([linkRefName, values]) => {
            values.forEach(({ length, start }) => {
                const linkDeployedAddress = deployedLinkReferences[linkRefFile][linkRefName];
                bytecode =
                    bytecode.substring(0, 2 + start * 2) +
                    linkDeployedAddress.replace("0x", "") +
                    bytecode.substring(2 + start * 2 + length * 2);
            });
        });
    });
    return bytecode;
}
*/

//Static Libraries
/*
const ERC721TopDownLib = new ContractFactory(ERC721TopDownLibArtifact.abi, ERC721TopDownLibArtifact.bytecode);
export const ERC721TopDownLibAddress = deployDeterministicAddress({
    contractInterface: ERC721TopDownLib.interface,
    bytecode: ERC721TopDownLib.bytecode,
    cloneFactoryAddress: ERC1167FactoryAddress,
});

const ERC721TopDownDnaLib = new ContractFactory(ERC721TopDownDnaLibArtifact.abi, ERC721TopDownDnaLibArtifact.bytecode);
export const ERC721TopDownDnaLibAddress = deployDeterministicAddress({
    contractInterface: ERC721TopDownDnaLib.interface,
    bytecode: ERC721TopDownDnaLib.bytecode,
    cloneFactoryAddress: ERC1167FactoryAddress,
});

export const deployedLinkReferences: DeployedLinkReferences = {
    "contracts/assets/ERC721/ERC721TopDownLib.sol": { ERC721TopDownLib: ERC721TopDownLibAddress },
    "contracts/assets/ERC721/ERC721TopDownDnaLib.sol": { ERC721TopDownDnaLib: ERC721TopDownDnaLibAddress },
};

const ERC721TopDownMintableBytecode = linkLibraryBytecode(ERC721TopDownMintableArtifact, deployedLinkReferences);
const ERC721TopDownMintable = new ContractFactory(
    ERC721TopDownMintableArtifact.abi,
    ERC721TopDownMintableBytecode,
) as ERC721TopDownMintable__factory;
*/

//ERC1820 Registry
export const ERC1820RegistryFactory = new contracts.common.erc1820.erc1820Sol.ERC1820Registry__factory();
//Proxies
export const FallbackFactory = new contracts.utils.Fallback__factory();
export const Multicall2Factory = new contracts.utils.Multicall2__factory();

//Assets
export const ERC20MintableFactory = new contracts.assets.erc20.ERC20Mintable__factory();
export const ERC721MintableFactory = new contracts.assets.erc721.ERC721Mintable__factory();
export const ERC721MintableAutoIdFactory = new contracts.assets.erc721.ERC721MintableAutoId__factory();
export const ERC1155MintableFactory = new contracts.assets.erc1155.ERC1155Mintable__factory();

//Metadata
export const TokenURIFactory = new contracts.plugins.tokenUri.TokenURI__factory();
export const TokenURIBaseURIFactory = new contracts.plugins.tokenUri.TokenURIBaseURI__factory();
export const TokenURIDnaFactory = new contracts.plugins.tokenUri.TokenURIDna__factory();

//Royalty
export const ERC2981SetterFactory = new contracts.plugins.erc2981.ERC2981Setter__factory();

//Dna
export const TokenDnaFactory = new contracts.plugins.tokenDna.TokenDna__factory();

export const AssetRouterCraftFactory = new contracts.plugins.assetRouter.AssetRouterCraft__factory();
export const AssetRouterInputFactory = new contracts.plugins.assetRouter.AssetRouterInput__factory();
export const AssetRouterOutputFactory = new contracts.plugins.assetRouter.AssetRouterOutput__factory();

//Utils
export const BlockNumberFactory = new contracts.utils.BlockNumber__factory();

//WARNING: ONLY add contracts that support initialize pattern
export const factories = {
    ERC20Mintable: ERC20MintableFactory,
    ERC721Mintable: ERC721MintableFactory,
    ERC721MintableAutoId: ERC721MintableAutoIdFactory,
    ERC1155Mintable: ERC1155MintableFactory,
    TokenURI: TokenURIFactory,
    TokenURIBaseURI: TokenURIBaseURIFactory,
    TokenURIDna: TokenURIDnaFactory,
    ERC2981Setter: ERC2981SetterFactory,
    TokenDna: TokenDnaFactory,
    AssetRouterCraft: AssetRouterCraftFactory,
    AssetRouterInput: AssetRouterInputFactory,
    AssetRouterOutput: AssetRouterOutputFactory,
};

//Can't deploy with these but useful for getting addresses
const factories2 = getFactoriesWithSigner(factories);
const factoriesImplementationsBase = factories2.factoriesImplementations;
export const factoriesDeterministic = factories2.factoriesDeterministic;
export const factoriesClone = factories2.factoriesClone;
export const factoriesBeacons = factories2.factoriesBeacons;
export const factoriesBeaconProxies = factories2.factoriesBeaconProxies;

//Add non-initializable contract implementations
export const factoriesImplementations = {
    ...factoriesImplementationsBase,
    ERC1820Registry: Utils.deployDeterministicFactory({ contractFactory: ERC1820RegistryFactory }),
    Multicall2: Utils.deployDeterministicFactory({ contractFactory: Multicall2Factory }),
    BlockNumber: Utils.deployDeterministicFactory({ contractFactory: BlockNumberFactory }),
};
