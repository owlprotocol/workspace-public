import { join } from "path";
import { uploadEthLogAbis } from "./uploadEthLogAbis.js";
import { uploadEthFunctionAbis } from "./uploadEthFunctionAbis.js";
import { uploadNetworks } from "./uploadNetworks.js";
//TODO: Fix this with local package, no submodule
//import { uploadERC20s } from "./uploadERC20.js";

export function uploadFirebaseData(pathToSubmodules = "../../../packages-public/packages/web3-database/build") {
    return Promise.all([
        uploadNetworks(),
        uploadEthLogAbis(join(pathToSubmodules, "topic0")),
        uploadEthFunctionAbis(join(pathToSubmodules, "4bytes")),
        //uploadERC20s(join(pathToSubmodules, "tokenlists/all_tokens/all.json")),
    ]);
}
