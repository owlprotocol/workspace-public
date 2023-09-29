import { generateBarrelFileForDir, writeFiles } from "@owlprotocol/utils";
import { generateBeaconFactoryExports } from "./generateFactoryExports.js";

export async function main() {
    const inputPath = "src/typechain/ethers/factories";
    const outputPath = "src/factories";
    const files = await generateBeaconFactoryExports(inputPath, outputPath, "../ethers/index.js");
    writeFiles(files);
    generateBarrelFileForDir(outputPath);
}

main();
