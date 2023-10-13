import { generateBarrelFileForDir, writeFiles } from "@owlprotocol/utils";
import { generateCreate2FactoryWrappers, DEFAULT_EXCLUDE_CONTRACTS } from "@owlprotocol/contracts-proxy";

export async function main() {
    const inputPath = "src/typechain/ethers/factories";
    const outputPath = "src/factories";
    const includeContractsInitializable = [
        "ChainlinkAnyApiClient",
        "ERC20Mintable",
        "ERC721Mintable",
        "ERC721MintableAutoId",
        "ERC1155Mintable",
        "ERC2981Setter",
        "TokenDna",
        "TokenURI",
        "TokenURIBaseURI",
        "TokenURIDna",
    ];
    const includeContractsImplementations = [
        "SafeL2",
        "SafeProxyFactory",
        "MultiSend",
        "MultiSendCallOnly",
        "CompatibilityFallbackHandler",
        "SignMessageLib",
        "CreateCall",
        "ERC1820Registry",
    ];
    const includeContracts = [...includeContractsInitializable, ...includeContractsImplementations];
    const files = await generateCreate2FactoryWrappers(
        inputPath,
        outputPath,
        "@owlprotocol/contracts-proxy",
        DEFAULT_EXCLUDE_CONTRACTS,
        includeContracts,
    );
    writeFiles(files);
    generateBarrelFileForDir(outputPath);
}

main();
