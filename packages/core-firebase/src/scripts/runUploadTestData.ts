import { uploadTestData } from "../data/dev-local.js";

export async function main() {
    await uploadTestData();
}

main().catch(console.error);
