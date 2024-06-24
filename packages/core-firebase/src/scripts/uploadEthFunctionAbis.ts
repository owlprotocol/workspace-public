export {}
/*
import { asyncGeneratorToArray } from "@owlprotocol/utils";
import { utils } from "ethers";
import { Hash } from "viem";
import { opendir } from "fs/promises";
import { readFileSync } from "fs";
import { join } from "path";
import { EthFunctionAbi } from "../models/index.js";
import { ethFunctionAbiResource } from "../admin/index.js";

export const DEFAULT_4BYTES_DIR = "../../../packages-public/packages/web3-database/build/4bytes";

export function getFunctionFormatsFromFile(path: string): string[] {
    const topicDefs = readFileSync(path, "utf-8").split(";");
    return topicDefs;
}

export async function* getEthFunctionAbisFromDirGen(
    topicsDir = DEFAULT_4BYTES_DIR,
): AsyncGenerator<EthFunctionAbi, void, unknown> {
    for await (const d of await opendir(topicsDir)) {
        if (d.isFile()) {
            const topicFile = join(topicsDir, d.name);
            for (const e of getFunctionFormatsFromFile(topicFile)) {
                try {
                    const functionFragment = utils.FunctionFragment.from(e);
                    const ethFunctionAbi: EthFunctionAbi = {
                        functionFormat: e,
                        functionName: functionFragment.name,
                        functionSighash: ("0x" + d.name) as Hash,
                    };
                    yield ethFunctionAbi;
                } catch (error) {
                    //Simply ignore, avoid spamming console
                    //console.error(`Could not create FunctionFragment for ${e}`);
                }
            }
        }
    }
}

export async function getEthFunctionAbisFromDir(topicsDir = DEFAULT_4BYTES_DIR): Promise<EthFunctionAbi[]> {
    return await asyncGeneratorToArray(getEthFunctionAbisFromDirGen(topicsDir));
}

export async function uploadEthFunctionAbis(topicsDir = DEFAULT_4BYTES_DIR) {
    const ethFunctionAbis = await getEthFunctionAbisFromDir(topicsDir);

    return await Promise.all([
        ethFunctionAbiResource.setBatch(ethFunctionAbis.slice(0, 10000)),
        ethFunctionAbiResource.setBatch(ethFunctionAbis.slice(10000)),
    ]);
}
*/
