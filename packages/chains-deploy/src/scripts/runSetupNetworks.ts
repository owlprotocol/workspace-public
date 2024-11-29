import { setupNetworksForEnv } from "../setupNetworks.js";

await setupNetworksForEnv().then(() => console.log("Done"));
