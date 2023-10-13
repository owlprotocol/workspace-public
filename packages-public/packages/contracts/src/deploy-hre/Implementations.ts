import { HRE } from "@owlprotocol/contracts-proxy";
import { ImplementationsDeploy } from "../deploy/Implementations.js";

const deploy = async ({ ethers, network, deployments }: HRE) => {
    const { save, getOrNull } = deployments;

    const { contracts } = await ImplementationsDeploy({
        network,
        signer: (await ethers.getSigners())[0],
    });

    contracts.map(async ({ address, name }) => {
        const submission = await getOrNull(name!);
        if (!!submission) await deployments.delete(name!);

        return save(name!, { address: address!, abi: [] });
    });

    return contracts;
};

deploy.tags = ImplementationsDeploy.tags;
deploy.dependencies = ImplementationsDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
