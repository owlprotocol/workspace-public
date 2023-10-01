import * as Create2Factories from "../factories/index.js";
import { pick } from "../lodash.js";

/**
 * Migrations define a batch of contracts that are deployed.
 * We MUST split this into chunks to avoid hitting the block gas limit as it can get quite large if deploying
 * many contracts and beacons.
 */

//Split into 2 migrations due to gas limit
export const migration0 = pick(
    Create2Factories,
    "ChainlinkAnyApiClient",
    "ERC20Mintable__factory__create2",
    "ERC721Mintable__factory__create2",
    "ERC721MintableAutoId__factory__create2",
    "ERC1155Mintable__factory__create2",
    "ERC2981Setter__factory__create2",
    "TokenDna__factory__create2",
    "TokenURI__factory__create2",
    "TokenURIBaseURI__factory__create2",
    "TokenURIDna__factory__create2",
);
export const migration1 = pick(
    Create2Factories,
    "SafeL2__factory__create2",
    "SafeProxyFactory__factory__create2",
    "MultiSend__factory__create2",
    "MultiSendCallOnly__factory__create2",
    "CompatibilityFallbackHandler__factory__create2",
    "SignMessageLib__factory__create2",
    "CreateCall__factory__create2",
);
