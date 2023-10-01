import { generateInterfaceIds } from "@owlprotocol/contracts-proxy";
import * as factoryInterfaceClasses from "../ethers/factoryInterfaceClasses.js";

generateInterfaceIds(factoryInterfaceClasses as any);
