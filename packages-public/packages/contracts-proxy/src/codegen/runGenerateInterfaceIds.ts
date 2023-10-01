import { generateInterfaceIds } from "./generateInterfaceIds.js";
import * as factoryInterfaceClasses from "../ethers/factoryInterfaceClasses.js";

generateInterfaceIds(factoryInterfaceClasses as any);
