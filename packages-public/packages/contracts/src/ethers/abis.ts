import { contractFactoriesWithZod, contractFactoriesWithZod2 } from "@owlprotocol/zod-sol";
import { factoryClasses, factoryInterfaceClasses, factoriesAll } from "./factories.js";
import { omit, merge } from "../lodash.js";

//TODO: Remove as any
const abisWithZodBase = contractFactoriesWithZod(
    omit(factoryClasses, "AssetRouterCraft", "AssetRouterInput", "AssetRouterOutput"),
) as any;

export const abisWithZod = merge(
    abisWithZodBase,
    omit(factoriesAll, "AssetRouterCraft", "AssetRouterInput", "AssetRouterOutput"),
) as any;

export const factoriesInterfaceWithZod = contractFactoriesWithZod2(
    omit(factoryInterfaceClasses, "IAssetRouterCraft", "IAssetRouterInput", "IAssetRouterOutput"),
) as any;
