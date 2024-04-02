import * as Create2Factories from "../factories/index.js";
import { deployImplementationsAndBeacons } from "../utils/Create2Factory/getTransaction.js";
import { RunTimeEnvironment } from "../utils.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const ImplementationsDeploy = async ({ signer, network }: Omit<RunTimeEnvironment, "provider">) => {
    return deployImplementationsAndBeacons(signer, network.name, Create2Factories as any);
};

ImplementationsDeploy.tags = ["Implementations"];
ImplementationsDeploy.dependencies = ["Create2Factory"];
