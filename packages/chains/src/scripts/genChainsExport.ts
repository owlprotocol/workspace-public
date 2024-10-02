import { generateBarrelFileForDir } from "@owlprotocol/utils";

function main() {
    generateBarrelFileForDir("./src/chains");
    generateBarrelFileForDir("./src/currencies");
}

main();
