import { Create2FactoryDeploy } from "../deploy/Create2Factory.js";
import { HRE } from "../utils.js";

const deploy = async ({ ethers, network, deployments }: HRE) => {
    const cloneFactoryAddress = await Create2FactoryDeploy({
        provider: ethers.provider,
        network,
    });

    //TODO: Add back additional artifact info for verification?
    const { abi } = await deployments.getExtendedArtifact("Create2Factory");
    const { save, getOrNull } = deployments;
    const submission = await getOrNull(Create2FactoryDeploy.tags[0]);
    if (submission?.address != cloneFactoryAddress) {
        await save(Create2FactoryDeploy.tags[0], {
            address: cloneFactoryAddress,
            //args: [],
            abi,
            /*
            bytecode,
            deployedBytecode,
            devdoc,
            solcInputHash,
            metadata,
            storageLayout,
            */
        });
    }

    return cloneFactoryAddress;
};

deploy.tags = Create2FactoryDeploy.tags;
deploy.dependencies = Create2FactoryDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
