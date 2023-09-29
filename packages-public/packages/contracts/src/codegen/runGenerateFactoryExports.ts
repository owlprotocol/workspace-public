import { generateBarrelFileForDir, writeFiles } from "@owlprotocol/utils";
import { generateBeaconFactoryExports } from "@owlprotocol/contracts-proxy";

export async function main() {
    const inputPath = "src/typechain/ethers/factories";
    const outputPath = "src/factories";
    const files = await generateBeaconFactoryExports(inputPath, outputPath, "@owlprotocol/contracts-proxy");
    writeFiles(files);
    generateBarrelFileForDir(outputPath);
}

main();
