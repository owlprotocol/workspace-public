import { uploadCreate2FactoryTransactions, uploadNetworks } from "./uploadNetworks.js";

export async function main() {
    await uploadNetworks();
    await uploadCreate2FactoryTransactions();
}

main().catch(console.error);
