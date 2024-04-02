import { uploadFirebaseData } from "./uploadFirebaseData.js";

export async function main() {
    await uploadFirebaseData();
}

main().catch(console.error);
