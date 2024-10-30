import { VerifyEtherscanParameters } from "../types/buildinfo.js";

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
    if (guid === "Contract source code already verified") {
        console.log("Contract is already verified. Skipping verification.");
        return;
    }
    if (!guid || guid.length < 10) {
        throw new Error("Invalid GUID provided.");
    }

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
