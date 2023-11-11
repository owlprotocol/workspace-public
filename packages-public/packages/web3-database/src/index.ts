import { generateForContracts } from "./generateForContracts.js";

function main() {
    return Promise.all([generateForContracts()]);
}

main();
