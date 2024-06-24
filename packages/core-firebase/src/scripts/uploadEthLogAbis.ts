export {}
/*
import { asyncGeneratorToArray } from "@owlprotocol/utils";
import { utils } from "ethers";
import { Hash } from "viem";
import { opendir } from "fs/promises";
import { readFileSync } from "fs";
import { join } from "path";
import { EthLogAbi } from "../models/index.js";
import { ethLogAbiResource } from "../admin/index.js";

export const DEFAULT_TOPICS_DIR = "../../../packages-public/packages/web3-database/build/topic0";

export function getEventFormatsFromFile(path: string): string[] {
    const topicDefs = readFileSync(path, "utf-8").split(";");
    return topicDefs;
}

export async function* getEthLogAbisFromDirGen(
    topicsDir = DEFAULT_TOPICS_DIR,
): AsyncGenerator<EthLogAbi, void, unknown> {
    for await (const d of await opendir(topicsDir)) {
        if (d.isFile()) {
            const topicFile = join(topicsDir, d.name);
            for (const e of getEventFormatsFromFile(topicFile)) {
                try {
                    const eventFragment = utils.EventFragment.from(e);
                    const indexedFieldsCount = eventFragment.inputs.filter((input) => input.indexed).length;
                    const ethLogAbi: EthLogAbi = {
                        eventFormat: e,
                        eventName: eventFragment.name,
                        eventSighash: ("0x" + d.name) as Hash,
                        indexedFieldsCount,
                    };
                    yield ethLogAbi;
                } catch (error) {
                    //Simply ignore, avoid spamming console
                    //console.error(`Could not create EventFragment for ${e}`);
                }
            }
        }
    }
}

export async function getEthLogAbisFromDir(topicsDir = DEFAULT_TOPICS_DIR): Promise<EthLogAbi[]> {
    return await asyncGeneratorToArray(getEthLogAbisFromDirGen(topicsDir));
}

export async function uploadEthLogAbis(topicsDir = DEFAULT_TOPICS_DIR) {
    const ethLogAbis = await getEthLogAbisFromDir(topicsDir);
    return ethLogAbiResource.setBatch(ethLogAbis);
}
*/
