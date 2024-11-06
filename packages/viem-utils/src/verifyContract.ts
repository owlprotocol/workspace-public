import { Address } from "viem";
import { SlocMetadata, StandardJSONInput, VerifyEtherscanParameters } from "./types/buildinfo.js";

export async function verifyContract({
    apiUrl,
    apiKey,
    contractAddress,
    constructorArguments,
    metadata,
}: {
    apiUrl: string;
    apiKey: string;
    contractAddress: Address;
    /** A hex-encoded string without the '0x' prefix */
    constructorArguments?: string;
    metadata: SlocMetadata;
}) {
    const contractName = Object.entries(metadata.settings.compilationTarget)[0].join(":");

    const abiCheck = await etherscanGetAbi({ apiUrl, apiKey, contractAddress });

    if (abiCheck) {
        console.log(`Contract '${contractName}' at address ${contractAddress} is already verified.`);
        return;
    } else {
        console.log(
            `ABI not found or contract '${contractName}' at address ${contractAddress} is not verified. Proceeding with verification.`,
        );
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

    const compilerVersion = "v" + metadata.compiler.version;

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
        constructorArguments,
        evmVersion,
    });

    const { result: guid } = (await response.json()) as { result: string };
    if (!guid || guid === "Contract source code already verified") {
        console.debug("Contract source code already verified or invalid GUID.");
        return;
    }

    await waitForEtherscanVerifyStatus({ apiUrl, apiKey, guid });
}

export async function etherscanVerifySourceCode({
    apiUrl,
    apiKey,
    contractAddress,
    sourceCode,
    contractName,
    compilerVersion,
    constructorArguments,
    evmVersion,
}: VerifyEtherscanParameters) {
    const params = {
        apikey: apiKey,
        module: "contract",
        action: "verifysourcecode",
        contractaddress: contractAddress,
        sourceCode,
        codeformat: "solidity-standard-json-input",
        contractname: contractName,
        compilerversion: compilerVersion,
    } as any;

    if (constructorArguments) params.constructorArguements = constructorArguments;
    if (evmVersion) params.evmversion = evmVersion;

    const parameters = new URLSearchParams(params);
    const url = new URL(apiUrl);

    const response = await fetch(url, {
        method: "POST",
        body: parameters,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response;
}

export async function etherscanCheckVerifyStatus({
    apiUrl,
    apiKey,
    guid,
}: {
    apiUrl: string;
    apiKey: string;
    guid: string;
}) {
    const params = {
        apikey: apiKey,
        module: "contract",
        action: "checkverifystatus",
        guid,
    };
    const parameters = new URLSearchParams(params);
    const url = new URL(apiUrl);

    const response = await fetch(url, {
        method: "POST",
        body: parameters,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const status = await response.json();
    console.debug("Verification Status:", status);
    return status;
}

export async function waitForEtherscanVerifyStatus({
    apiUrl,
    apiKey,
    guid,
    retries = 10,
    interval = 5000,
}: {
    apiUrl: string;
    apiKey: string;
    guid: string;
    retries?: number;
    interval?: number;
}): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const status = await etherscanCheckVerifyStatus({ apiUrl, apiKey, guid });

        if (status.result === "Pass - Verified") {
            console.log("Contract verified successfully!");
            return;
        }
        if (status.result !== "Pending in queue") {
            throw new Error(`Verification failed: ${status.result}`);
        }

        if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error("Verification timed out after maximum retries.");
}

export async function etherscanGetAbi({
    apiUrl,
    apiKey,
    contractAddress,
}: {
    apiUrl: string;
    apiKey: string;
    contractAddress: string;
}) {
    const params = {
        apikey: apiKey,
        module: "contract",
        action: "getabi",
        address: contractAddress,
    };

    const parameters = new URLSearchParams(params);
    const url = `${apiUrl}?${parameters.toString()}`;

    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await response.json();

    if (data.status === "0") {
        console.error("Error fetching ABI:", data.result);
        return null;
    }

    return data.result;
}
