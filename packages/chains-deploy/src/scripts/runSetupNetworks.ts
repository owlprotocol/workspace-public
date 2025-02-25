import { setupNetworksForEnv } from "../setupNetworks.js";

setupNetworksForEnv().then(() => {
    console.log("Done");

    // Stop the script from hanging
    // eslint-disable-next-line no-process-exit
    process.exit();
});
