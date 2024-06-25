import { hardhatArtifactsExport, getArtifactImplementationFactory } from "@owlprotocol/viem-utils";
import {
    ENTRYPOINT_ADDRESS_V07,
    SIMPLE_ACCOUNT_FACTORY_ADDRESS,
    SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS,
} from "../constants.js";

/**
import {SimpleAccount} from "@account-abstraction/contracts/samples/SimpleAccount.sol";
import {SimpleAccountFactory} from "@account-abstraction/contracts/samples/SimpleAccountFactory.sol";
import {VerifyingPaymaster} from "@account-abstraction/contracts/samples/VerifyingPaymaster.sol";
 */

hardhatArtifactsExport(
    "./src/artifacts",
    "./cache",
    [
        //EntryPoint Simulation Contracts
        //TODO: hardhatArtifactsExport caching doesn't work anymore 'EntryPoint', 'IEntryPoint' getting recompiled
        "artifacts/contracts/**/*.json",
        //Optimized re-builds with 1000000 runs + viaIR + yul optimizer
        //We specify contracts explicitly (to exclude any other contracts that might get re-compiled)
        "artifacts/@account-abstraction/contracts/samples/SimpleAccount.sol/SimpleAccount.json",
        "artifacts/@account-abstraction/contracts/samples/SimpleAccountFactory.sol/SimpleAccountFactory.json",
        "artifacts/@account-abstraction/contracts/samples/VerifyingPaymaster.sol/VerifyingPaymaster.json",
        "artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json",
        //Cached official builds so we can get official entrypoint address
        "node_modules/@account-abstraction/contracts/artifacts/EntryPoint.json",
        "node_modules/@account-abstraction/contracts/artifacts/IEntryPoint.json",
        "node_modules/@account-abstraction/contracts/artifacts/EntryPointSimulation.json",
        "node_modules/@account-abstraction/contracts/artifacts/IEntryPointSimulation.json",
    ],
    getArtifactImplementationFactory({
        Entrypoint: ENTRYPOINT_ADDRESS_V07,
        SimpleAccountFactory: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        SimpleAccount: SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS,
    }),
);
