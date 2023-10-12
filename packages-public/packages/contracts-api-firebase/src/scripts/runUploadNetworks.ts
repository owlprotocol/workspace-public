import { uploadNetworks } from "./uploadNetworks.js";

export async function main() {
    await uploadNetworks();
}

main().catch(console.error);
