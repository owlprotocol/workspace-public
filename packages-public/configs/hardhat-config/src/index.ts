import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

import "hardhat-deploy";
import "hardhat-deploy-ethers";

import "solidity-docgen";
import "solidity-coverage";

//@ts-expect-error
import { PRIVATE_KEY_CONTRACT_DEPLOYER, getChainWithDataByChainId } from "@owlprotocol/envvars";
import { allChains } from "@owlprotocol/chains";

/** Default config */
/*
const defaultNetworkIds = [
    //Ethereum
    1,
    5, //goerli
    11155111, //sepolia
    1337, //localhost
    //Linea
    59144,
    59140,
    //Polygon
    137,
    80001,
    //BNB
    56,
    //Arbitrum
    42161,
    //Optimism
    10,
];
*/

const defaultNetworkIds = allChains.map((c) => c.chainId);

export function getHardhatConfig(
    networkIds: number[] = defaultNetworkIds,
    accountsProduction: string[] = PRIVATE_KEY_CONTRACT_DEPLOYER ? [PRIVATE_KEY_CONTRACT_DEPLOYER] : [],
) {
    const chains = networkIds.map((id) => getChainWithDataByChainId(id)).filter((c) => c.rpcDefault != undefined);
    const networkEntries = chains.map((c) => {
        const accounts =
            c.slug === "localhost"
                ? {
                      mnemonic: "test test test test test test test test test test test junk",
                      path: "m/44'/60'/0'/0",
                      initialIndex: 0,
                      count: 10,
                      passphrase: "",
                  }
                : accountsProduction;
        const eip1559 = !!c.features?.find((f: any) => f.name === "EIP1559");
        const slug = c.slug;
        const network = {
            chainId: c.chainId,
            url: c.rpcDefault,
            testnet: c.testnet,
            eip1559,
            accounts,
        };
        return [slug, network] as const;
    });
    const networks = Object.fromEntries(networkEntries);

    const etherscanApiKey = Object.fromEntries(
        chains.map((c) => {
            const slug = c.slug;
            return [slug, c.explorerApiKey] as const;
        }),
    );

    const etherscanCustomChains = chains.map((c) => {
        const network = {
            network: c.slug,
            chainId: c.chainId,
            urls: {
                apiURL: c.explorerApi,
                browserURL: c.explorer,
            },
        };
        return network;
    });

    return {
        defaultNetwork: "localhost",
        paths: {
            sources: "./contracts",
            tests: "test/hardhat",
            artifacts: "./src/artifacts",
            deploy: "./lib/cjs/deploy-hre",
            deployments: "./src/deployments",
            scripts: "./lib/cjs/scripts",
        },
        solidity: {
            version: "0.8.14",
            settings: {
                viaIR: true,
                optimizer: {
                    enabled: true,
                    runs: 100,
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
