import { ProxyFactoryDeploy } from "../deploy/ProxyFactory.js";
import { HRE } from "../utils.js";

const deploy = async ({ ethers, network, deployments }: HRE) => {
    const cloneFactoryAddress = await ProxyFactoryDeploy({
        provider: ethers.provider,
        network,
    });

    //TODO: Add back additional artifact info for verification?
    const { abi } = await deployments.getExtendedArtifact("ERC1167Factory");
    const { save, getOrNull } = deployments;
    const submission = await getOrNull(ProxyFactoryDeploy.tags[0]);
    if (submission?.address != cloneFactoryAddress) {
        await save(ProxyFactoryDeploy.tags[0], {
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

deploy.tags = ProxyFactoryDeploy.tags;
deploy.dependencies = ProxyFactoryDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
