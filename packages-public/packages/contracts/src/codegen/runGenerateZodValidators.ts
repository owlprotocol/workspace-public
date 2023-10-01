import { writeZodValidatorFilesForContracts } from "@owlprotocol/zod-sol";
import * as factoryClassesInitializable from "../ethers/factoryClassesInitializable.js";
import * as factoryInterfaceClasses from "../ethers/factoryInterfaceClasses.js";
import { mapValues } from "../lodash.js";

const abis = mapValues({ ...factoryClassesInitializable, ...factoryInterfaceClasses }, (f) => {
    return f.abi;
});

writeZodValidatorFilesForContracts(abis, "./src/zsol");
