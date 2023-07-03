import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ERC20MintableDeploy } from "../../../deploy/assets/ERC20/ERC20Mintable.js";

//https://github.com/wighawag/hardhat-deploy/blob/master/types.ts#L358
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC20MintableDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        tokens: 10,
        balanceTarget: 1,
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

deploy.tags = ERC20MintableDeploy.tags;
deploy.dependencies = ERC20MintableDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
