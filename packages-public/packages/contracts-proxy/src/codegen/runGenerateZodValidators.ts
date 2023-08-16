import { genZodValidatorFilesForContracts, writeFiles } from "@owlprotocol/zod-sol";
import { abis, abisInterface } from "../ethers/factories.js";

const files = genZodValidatorFilesForContracts({ ...abis, ...abisInterface }, "./src/zsol");
writeFiles(files);
