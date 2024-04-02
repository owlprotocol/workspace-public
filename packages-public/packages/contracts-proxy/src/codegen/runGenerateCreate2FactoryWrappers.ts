import { generateBarrelFileForDir, writeFiles } from "@owlprotocol/utils";
import { generateCreate2FactoryWrappers } from "./generateCreate2FactoryWrappers.js";

export async function main() {
    const inputPath = "src/typechain/ethers/factories";
    const outputPath = "src/factories";
    const files = await generateCreate2FactoryWrappers(inputPath, outputPath, "../utils/Create2Factory/getFactory.js");
    writeFiles(files);
    generateBarrelFileForDir(outputPath);
}

main();
