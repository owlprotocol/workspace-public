import { utils } from "ethers";
import { genCreate2FactoryTransactionFiles } from "./generateCreate2FactoryTx.js";

const gwei = "100";
const [, , startEnd] = process.argv;
const [start, end] = startEnd.split(",");
genCreate2FactoryTransactionFiles(
    `../../../../create2factory/${gwei}gwei/`,
    parseInt(start),
    parseInt(end),
    utils.parseUnits(`${gwei}`, "gwei"),
);
