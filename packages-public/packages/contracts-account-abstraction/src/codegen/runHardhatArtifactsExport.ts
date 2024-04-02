import { hardhatArtifactsExport } from "@owlprotocol/contracts-create2factory";
import {
    ENTRYPOINT_ADDRESS_V07,
    SIMPLE_ACCOUNT_FACTORY_ADDRESS,
    SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS,
} from "../constants.js";

hardhatArtifactsExport(
    "./src/artifacts",
    "./cache",
    [
        //Optimized re-builds with 1000000 runs + viaIR + yul optimizer
        "artifacts/@account-abstraction/contracts/**/*.json",
        "artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json",
        //Cached official builds so we can get official entrypoint address
        "node_modules/@account-abstraction/contracts/artifacts/EntryPoint.json",
        "node_modules/@account-abstraction/contracts/artifacts/IEntryPoint.json",
        "node_modules/@account-abstraction/contracts/artifacts/EntryPointSimulation.json",
        "node_modules/@account-abstraction/contracts/artifacts/IEntryPointSimulation.json",
    ],
    "DeterministicDeployer",
    {
        Entrypoint: ENTRYPOINT_ADDRESS_V07,
        SimpleAccountFactory: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        SimpleAccount: SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS,
    },
);
