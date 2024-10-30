import { Address } from "viem";
import { readFileSync } from "fs";
import { BuildInfo, HardhatMetadata, StandardJSONInput } from "./types/buildinfo.js";
import { etherscanGetAbi, etherscanVerifySourceCode, waitForEtherscanVerifyStatus } from "./utils/etherscanUtils.js";

// From hardhat-core
/**
 * A BuildInfo is a file that contains all the information of a solc run. It
 * includes all the necessary information to recreate that exact same run, and
 * all of its output.
 */

export async function main() {
    const buildInfoPath = "artifacts/build-info/1afa25cf92de5ec814b300b7ef4c7ee1.json";
    const buildInfo: BuildInfo = JSON.parse(readFileSync(buildInfoPath, "utf-8"));

    // file name key
    const name = "contracts/Create2Factory.sol";
    const contract = buildInfo.output.contracts[name];
    // contract name (inside of file)
    const Create2Factory = contract.Create2Factory;

    const metadata: HardhatMetadata =
        typeof Create2Factory.metadata === "string" ? JSON.parse(Create2Factory.metadata) : Create2Factory.metadata;

    const compilerVersion = "v" + metadata.compiler.version;
    const contractName = `${name}:Create2Factory`;

    const apiUrl = "https://api-sepolia.etherscan.io/api";

    //TODO: Add api key here
    const apiKey = "xxx";
    //TODO: Already verified on Polygonscan, but try with different chain?
    const contractAddress: Address = "0x57318Dc30FE4da0a1b20eBbD4Dfd16aa66cfDB46";

    const abiCheck = await etherscanGetAbi({ apiUrl, apiKey, contractAddress });

    console.debug(abiCheck);

    if (abiCheck) {
        console.log("Contract already verified.");
        return;
    } else {
        console.log("ABI not found or contract not verified.");
    }

    // Delete extranuous "license" key disliked by Etherscan
    Object.values(metadata.sources).forEach((source: any) => {
        delete source.license;
    });
    //https://gist.github.com/0xV4L3NT1N3/974d6bfb58070e0fe4e38d626cdf1c44
    const settings = {
        metadata: metadata.settings.metadata,
        optimizer: metadata.settings.optimizer,
        evmVersion: metadata.settings.evmVersion,
        viaIR: metadata.settings.viaIR,
        outputSelection: {
            "*": {
                "*": ["abi", "evm.bytecode", "evm.deployedBytecode", "evm.methodIdentifiers", "metadata"],
                "": ["ast"],
            },
        },
    };

    const standardJSONInput: StandardJSONInput = {
        language: metadata.language,
        sources: metadata.sources,
        settings,
    };

    const sourceCode = JSON.stringify(standardJSONInput);
    const evmVersion = metadata.settings.evmVersion;

    const response = await etherscanVerifySourceCode({
        apiUrl,
        apiKey,
        contractAddress,
        contractName,
        sourceCode,
        compilerVersion,
        evmVersion,
    });

    const { result: guid } = (await response.json()) as { result: string };
    console.debug(guid);

    await waitForEtherscanVerifyStatus({ apiUrl, apiKey, guid });
}

/**
 * TODO: Refactor verification
 * - ✅ api wrappers, add url parameter (rn hard-coded)
 * - ✅ types for metadata & sourceCode (not exactly the same)
 *
 * - ✅ etherscanVerifySourceCode (rename & refactor)
 * - ✅ etherscanCheckVerifyStatus (rename & refactor)
 * - ✅ waitForEtherscanVerifyStatus - retry logic for when checkVerifyStatus returns "pending" (maybe check logic of viem waitForTransactionReceipt)
 *
 * - ✅ etherscanGetAbi (used to check if verified)
 * https://docs.polygonscan.com/api-endpoints/contracts#get-contract-abi-for-verified-contract-source-codes
 *
 * - Final higher level function that does the following steps
 * 1. Check if contract at address is verified, if so return
 * 2. Send verification request
 * 3. Wait for verification request to succeed
 *
 */

main().catch((error) => console.error("Error:", error));
