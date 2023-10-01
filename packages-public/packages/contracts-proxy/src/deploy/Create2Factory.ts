import { RunTimeEnvironment } from "../utils.js";
import { deployCreate2Factory } from "../utils/Create2Factory/deployCreate2Factory.js";

export const Create2FactoryDeploy = async ({ provider, network }: Omit<RunTimeEnvironment, "signer">) => {
    return deployCreate2Factory(provider, network.name, network.config.chainId);
};

Create2FactoryDeploy.tags = ["Create2Factory"];
Create2FactoryDeploy.dependencies = [] as string[];
