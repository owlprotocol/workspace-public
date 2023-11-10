import { join } from "path";
import { uploadEthLogAbis } from "./uploadEthLogAbis.js";
import { uploadEthFunctionAbis } from "./uploadEthFunctionAbis.js";
import { uploadCreate2FactoryTransactions, uploadNetworks } from "./uploadNetworks.js";
import { uploadERC20s } from "./uploadERC20.js";

export function uploadFirebaseData(pathToSubmodules = "../../../submodules") {
    return Promise.all([
        uploadNetworks(),
        uploadCreate2FactoryTransactions(),
        uploadEthLogAbis(join(pathToSubmodules, "topic0/with_parameter_names")),
        uploadEthFunctionAbis(join(pathToSubmodules, "4bytes/with_parameter_names")),
        uploadERC20s(join(pathToSubmodules, "tokenlists/all_tokens/all.json")),
    ]);
}
