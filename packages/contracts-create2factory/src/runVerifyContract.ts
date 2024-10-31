import { Address } from "viem";
import { verifyContract } from "@owlprotocol/viem-utils";
import { Create2Factory } from "./solc-metadata/index.js";

export async function main() {
    const apiUrl = "https://api.arbiscan.io/api";

    //TODO: Add api key here
    const apiKey = "8ERM92GJ7TWZH4XBAX86U28DKD74TU9C76";
    //TODO: Already verified on Polygonscan, but try with different chain?
    const contractAddress: Address = "0x57318Dc30FE4da0a1b20eBbD4Dfd16aa66cfDB46";

    await verifyContract({ apiUrl, apiKey, contractAddress, metadata: Create2Factory });
}

main().catch((error) => console.error("Error:", error));
