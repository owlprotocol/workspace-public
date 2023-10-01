import { RunTimeEnvironment, deployImplementationsAndBeacons } from "@owlprotocol/contracts-proxy";
import { migration0, migration1 } from "../ethers/migrations.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const ImplementationsDeploy = async ({ signer, network }: RunTimeEnvironment) => {
    const response0 = await deployImplementationsAndBeacons(signer, network.name, migration0 as any);
    const response1 = await deployImplementationsAndBeacons(signer, network.name, migration1 as any);

    return {
        contracts: [...response0.contracts, ...response1.contracts],
        tx: [response0.tx, response1.tx],
        txResponse: [response0.txResponse, response1.txResponse],
    };
};

ImplementationsDeploy.tags = ["Implementations"];
ImplementationsDeploy.dependencies = ["Create2Factory"];
