import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ERC1820Deploy } from "../../deploy/common/ERC1820.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    const pkey0 = network.config.accounts[0];
    if (!pkey0) throw new Error(`pkey0 ${pkey0}`);

    const wallet = new ethers.Wallet(pkey0, ethers.provider);
    const { address } = await ERC1820Deploy({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [wallet],
        network,
    });

    const { save, getOrNull } = deployments;
    const submission = await getOrNull(ERC1820Deploy.tags[0]);
    if (submission?.address != address) {
        await save(ERC1820Deploy.tags[0], { address, abi: [] });
    }

    return { address };
};

deploy.tags = ERC1820Deploy.tags;
deploy.dependencies = ERC1820Deploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
