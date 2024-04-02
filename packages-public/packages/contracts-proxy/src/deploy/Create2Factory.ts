import { RunTimeEnvironment } from "../utils.js";
import { deployCreate2Factory } from "../utils/Create2Factory/deployCreate2Factory.js";

export const Create2FactoryDeploy = async ({ signer, network }: Omit<RunTimeEnvironment, "provider">) => {
    return deployCreate2Factory(signer, network.name, network.config.chainId);
};

Create2FactoryDeploy.tags = ["Create2Factory"];
Create2FactoryDeploy.dependencies = [] as string[];
