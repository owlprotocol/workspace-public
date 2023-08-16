import { genZodValidatorFilesForContracts, writeFiles } from "@owlprotocol/zod-sol";
import { abis, abisInterface } from "../ethers/factories.js";
import { omit } from "../lodash.js";

const files = genZodValidatorFilesForContracts(
    {
        //TODO: Fix tuple zod
        ...omit(abis, ["AssetRouterCraft", "AssetRouterInput", "AssetRouterOutput"]),
        ...omit(abisInterface, ["IAssetRouterCraft", "IAssetRouterInput", "IAssetRouterOutput"]),
    } as any,
    "./src/zsol",
);
writeFiles(files);
