import { mapValues } from "lodash-es";
import { writeZodValidatorFilesForContracts } from "@owlprotocol/zod-sol/zod-codegen";
import * as Artifacts from "../artifacts/index.js";

const abis = mapValues(Artifacts, (f) => {
    return f.abi;
});

writeZodValidatorFilesForContracts(abis as any, "./src/zsol");
