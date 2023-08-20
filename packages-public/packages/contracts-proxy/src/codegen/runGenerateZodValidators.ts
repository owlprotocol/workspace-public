import { writeZodValidatorFilesForContracts } from "@owlprotocol/zod-sol";
import { abis, abisInterface } from "../ethers/factories.js";

writeZodValidatorFilesForContracts({ ...abis, ...abisInterface }, "./src/zsol");
