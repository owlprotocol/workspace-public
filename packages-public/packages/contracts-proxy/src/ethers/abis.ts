import { contractFactoriesWithZod, contractFactoriesWithZod2 } from "@owlprotocol/zod-sol";
import { factoryClasses, factoryInterfaceClasses } from "./factories.js";
import { merge } from "../lodash.js";
import { factoriesAll } from "./index.js";

const abisWithZodBase = contractFactoriesWithZod(factoryClasses);
export const abisWithZod = merge(abisWithZodBase, factoriesAll);

export const factoriesInterfaceWithZod = contractFactoriesWithZod2(factoryInterfaceClasses);
