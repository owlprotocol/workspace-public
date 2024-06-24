import { mapValues, omit } from "lodash-es";
import { writeZodValidatorFilesForContracts } from "@owlprotocol/zod-sol/zod-codegen";
import * as Artifacts from "../artifacts/index.js";

const abis = mapValues(omit(Artifacts, "functions", "events", "errors"), (f) => {
    return f.abi;
});

writeZodValidatorFilesForContracts(abis as any, "./src/zsol");
