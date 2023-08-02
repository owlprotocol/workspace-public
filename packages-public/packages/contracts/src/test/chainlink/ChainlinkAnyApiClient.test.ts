import { ethers } from "ethers";

/**
 * Testing out encode/decode for ChainlinkAnyApiClient
 */
function main() {
    console.debug("bytes32(1): ", ethers.utils.defaultAbiCoder.encode(["uint256"], [1]));

    const fulfillFragment = ethers.utils.Fragment.from(
        "function fulfill(bytes calldata fulfillPrefixData, bytes calldata fulfillResponseData)",
    );
    const fulfillInterface = new ethers.utils.Interface([fulfillFragment]);
    const fulfillSelector = fulfillInterface.getSighash(fulfillFragment);
    console.debug("fulfillSelector: ", fulfillSelector);

    const prefixData = ethers.utils.defaultAbiCoder.encode(["uint256", "string"], [255, "hello"]);
    const responseData = ethers.utils.defaultAbiCoder.encode(["uint256", "string"], [65535, "world"]);

    console.debug("prefixData: ", prefixData);
    console.debug("responseData: ", responseData);
}

main();
