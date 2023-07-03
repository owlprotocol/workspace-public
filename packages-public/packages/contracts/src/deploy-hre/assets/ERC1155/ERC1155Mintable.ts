import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ERC1155MintableDeploy } from "../../../deploy/assets/ERC1155/ERC1155Mintable.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC1155MintableDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        tokens: 10,
        balanceTarget: 10,
    });

    const { save, getOrNull } = deployments;

    await Promise.all(
        Object.entries(results).map(async ([k, v]) => {
            const submission = await getOrNull(k);
            if (submission?.address != v.address) {
                return save(k, { address: v.address, abi: [] });
            }
        }),
    );

    return results;
};

deploy.tags = ERC1155MintableDeploy.tags;
deploy.dependencies = ERC1155MintableDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
