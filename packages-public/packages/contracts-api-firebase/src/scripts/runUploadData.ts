import { uploadEthLogAbis } from "./uploadEthLogAbis.js";
import { uploadEthFunctionAbis } from "./uploadEthFunctionAbis.js";
import { uploadCreate2FactoryTransactions, uploadNetworks } from "./uploadNetworks.js";

export async function main() {
    await uploadNetworks();
    await uploadCreate2FactoryTransactions();
    await uploadEthLogAbis();
    await uploadEthFunctionAbis();
}

main().catch(console.error);
