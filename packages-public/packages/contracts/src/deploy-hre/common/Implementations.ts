import { HRE } from "@owlprotocol/contracts-proxy";
import { mapValues, zipObject } from "../../lodash.js";
import { ImplementationsDeploy } from "../../deploy/common/Implementations.js";

const deploy = async ({ ethers, network, deployments }: HRE) => {
    const { save, getOrNull } = deployments;

    console.debug(network);

    const results = await ImplementationsDeploy({
        provider: ethers.provider,
        signer: (await ethers.getSigners())[0],
        network,
    });

    const promises = mapValues(results, async (v, k) => {
        const subName = k + "Implementation";
        const submission = await getOrNull(subName);
        if (!!submission) await deployments.delete(subName);

        if (!v.error && v.address) {
            //const { abi } = await deployments.getExtendedArtifact(k);
            return save(subName, {
                address: v.address,
                abi: [],
                /*
                args: [],
                bytecode
                deployedBytecode,
                devdoc,
                solcInputHash,
                metadata,
                storageLayout,
                */
            });
        }
    });

    const results2 = zipObject(Object.keys(results), await Promise.all(Object.values(promises)));
    return results2;
};

deploy.tags = ImplementationsDeploy.tags;
deploy.dependencies = ImplementationsDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
