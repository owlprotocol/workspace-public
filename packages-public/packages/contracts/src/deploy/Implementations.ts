import { RunTimeEnvironment, deployImplementationsAndBeacons } from "@owlprotocol/contracts-proxy";
import { migration0, migration1, migration2, migration3, migration4 } from "../ethers/migrations.js";
import { flatten } from "../lodash.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const ImplementationsDeploy = async ({ signer, network }: Omit<RunTimeEnvironment, "provider">) => {
    const response0 = await deployImplementationsAndBeacons(signer, network.name, migration0 as any);
    const response1 = await deployImplementationsAndBeacons(signer, network.name, migration1 as any);
    const response2 = await deployImplementationsAndBeacons(signer, network.name, migration2 as any);
    const response3 = await deployImplementationsAndBeacons(signer, network.name, migration3 as any);
    const response4 = await deployImplementationsAndBeacons(signer, network.name, migration4 as any);
    const responses = [response0, response1, response2, response3, response4];

    return {
        contracts: flatten(responses.map((r) => r.contracts)),
        tx: responses.map((r) => r.tx),
        txResponse: responses.map((r) => r.txResponse),
    };
};

ImplementationsDeploy.tags = ["Implementations"];
ImplementationsDeploy.dependencies = ["Create2Factory"];
