import { writeZodValidatorFilesForContracts } from "@owlprotocol/zod-sol";
import { abis, abisInterface } from "../ethers/factories.js";
import { omit } from "../lodash.js";

writeZodValidatorFilesForContracts(
    {
        //TODO: Fix tuple zod
        ...omit(abis, ["AssetRouterCraft", "AssetRouterInput", "AssetRouterOutput"]),
        ...omit(abisInterface, ["IAssetRouterCraft", "IAssetRouterInput", "IAssetRouterOutput"]),
    } as any,
    "./src/zsol",
);
