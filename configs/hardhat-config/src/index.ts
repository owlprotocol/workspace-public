import { Address } from "viem";
import { localhost } from "viem/chains";

//TODO: Add more networks (removed since was causing issues with Typescript)
//TODO: Return type or as const
export function getHardhatConfig() {
    //const chains = networkIds.map((id) => getChainWithDataByChainId(id)).filter((c) => c.rpcDefault != undefined);
    const chains = [localhost];
    const networkEntries = chains.map((c) => {
        //TODO: For now we do not use hardhat for deployment
        const accounts = [] as Address[];
        //TODO: Using localhost viem
        const eip1559 = true; //!!c.features?.find((f: any) => f.name === "EIP1559");
        const slug = c.name.toLowerCase();
        const network = {
            chainId: c.id,
            url: c.rpcUrls.default.http[0],
            testnet: c.testnet,
            eip1559,
            accounts,
        };
        return [slug, network] as const;
    });
    const networks = Object.fromEntries(networkEntries);

    const etherscanApiKey = Object.fromEntries(
        chains.map((c) => {
            const slug = c.name.toLowerCase();
            return [slug, undefined] as const;
        }),
    );

    const etherscanCustomChains = chains.map((c) => {
        const network = {
            network: c.name.toLowerCase(),
            chainId: c.id,
            urls: {
                apiURL: undefined, //c.explorerApi,
                browserURL: undefined, //c.explorer,
            },
        };
        return network;
    });

    return {
        defaultNetwork: "localhost",
        paths: {
            sources: "./contracts",
            tests: "test/hardhat",
            artifacts: "./artifacts",
            deploy: "./lib/cjs/deploy-hre",
            deployments: "./src/deployments",
            scripts: "./lib/cjs/scripts",
        },
        solidity: {
            version: "0.8.23",
            settings: {
                evmVersion: "paris",
                viaIR: true,
                optimizer: {
                    enabled: true,
                    runs: 1000000,
                    details: { yul: true },
                },
            },
        },
        mocha: {
            timeout: 1000000,
        },
        docgen: {
            outputDir: "./docs-contracts-reference/",
            pages: "files",
            exclude: [],
            templates: "./docs-templates/",
        },
        networks,
        etherscan: {
            apiKey: etherscanApiKey,
            customChains: etherscanCustomChains,
        },
    };
}

// eslint-disable-next-line import/no-default-export
export default getHardhatConfig();
