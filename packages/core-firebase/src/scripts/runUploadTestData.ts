import { uploadTestData } from "../data/dev-local.js";

export async function main() {
    await uploadTestData();
}

main()
    .then(() => console.log("Done"))
    .catch(console.error);
