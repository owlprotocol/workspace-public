import { Artifact } from "@owlprotocol/viem-utils";
import { zeroAddress, zeroHash } from "viem";
import { CREATE2_FACTORY_ADDRESS } from "../Create2Factory/constants.js";
import { getDeployAddress } from "../Create2Factory/getAddress.js";

/**
 * Default function that computes artifact implementation address
 * @param artifact
 * @returns
 */
export function getArtifactImplementationCreate2Factory(artifact: Artifact) {
    if (artifact.contractName === "Create2Factory") {
        return CREATE2_FACTORY_ADDRESS;
    } else {
        return getDeployAddress(zeroAddress, {
            salt: zeroHash,
            bytecode: artifact.bytecode,
            initData: "0x",
        });
    }
}
