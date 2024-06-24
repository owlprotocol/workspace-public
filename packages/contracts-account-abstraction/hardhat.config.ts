import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import "solidity-docgen";
import "hardhat-deploy";

import hhConfigDefault from "@owlprotocol/hardhat-config";

//TODO: Error on contract code size limit
const hhConfig = {
    ...hhConfigDefault,
    solidity: {
        compilers: [hhConfigDefault.solidity],
        overrides: {
            //Reduce optimizer runs on EntryPoint estimations
            "contracts/PimlicoEntryPointSimulations/EntryPointSimulations.sol": {
                version: "0.8.23",
                settings: {
                    evmVersion: "paris",
                    viaIR: true,
                    optimizer: {
                        enabled: true,
                        runs: 10000,
                        details: { yul: true },
                    },
                },
            },
        },
    },
} as HardhatUserConfig;

export default hhConfig;
