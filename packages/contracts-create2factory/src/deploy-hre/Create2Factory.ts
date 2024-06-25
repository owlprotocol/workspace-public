import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { getOrDeployCreate2Factory } from "../Create2Factory/deployCreate2Factory.js";
import { logDeployment } from "../utils/index.js";

const name = "Create2Factory";
const deploy = async ({ viem, deployments }: HardhatRuntimeEnvironment) => {
    const publicClient = await viem.getPublicClient();
    const walletClient = (await viem.getWalletClients())[0];

    //TODO: Deploy DeterminsiticDeployer beforehand
    const result = await getOrDeployCreate2Factory({ publicClient, walletClient });
    logDeployment(
        publicClient.chain.name,
        "Create2Factory",
        result.address,
        "deterministic",
        result.existed ? "exists" : "deployed",
    );

    //TODO: Add back additional artifact info for verification?
    const { abi } = await deployments.getExtendedArtifact(name);
    const { save, getOrNull } = deployments;
    const submission = await getOrNull(name);
    if (submission?.address != result.address) {
        await save(name, {
            address: result.address,
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
};

deploy.tags = [name];
deploy.dependencies = [] as string[];
// eslint-disable-next-line import/no-default-export
export default deploy;
