import type { Artifact } from "@owlprotocol/viem-utils/codegen";
import { zeroAddress, zeroHash } from "viem";
import { getDeployDeterministicAddress } from "@owlprotocol/viem-utils";
import invariant from "tiny-invariant";
import { CREATE2_FACTORY_ADDRESS } from "../Create2Factory/constants.js";
import { getDeployAddress } from "../Create2Factory/getAddress.js";

/**
 * Default function that computes artifact implementation address
 * @param artifact
 * @returns
 */
export function getArtifactImplementationCreate2Factory(artifact: Artifact) {
    if (artifact.contractName === "Create2Factory") {
        const address = getDeployDeterministicAddress({
            salt: zeroHash,
            bytecode: artifact.bytecode,
        });

        invariant(
            address === CREATE2_FACTORY_ADDRESS,
            `Create2Factory.implementation ${address} != ${CREATE2_FACTORY_ADDRESS} (expected) Compiled bytecode may have changed which may cause inconsistencies with deployed contracts.`,
        );

        return address;
    } else {
        return getDeployAddress(zeroAddress, {
            salt: zeroHash,
            bytecode: artifact.bytecode,
            initData: "0x",
        });
    }
}
