import * as factories from "@owlprotocol/contracts/ethers/factoryClasses";
import { utils } from "ethers";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function generateForContracts(path = "./build") {
    if (!existsSync(path)) {
        mkdirSync(path);
    }

    const functionSigDir = join(path, "4bytes");
    const eventTopic0Dir = join(path, "topic0");
    if (!existsSync(join(functionSigDir))) {
        mkdirSync(functionSigDir);
    }
    if (!existsSync(join(eventTopic0Dir))) {
        mkdirSync(eventTopic0Dir);
    }

    Object.values(factories).forEach((factory) => {
        const iface = factory.createInterface();
        iface.fragments.forEach((fragment) => {
            if (fragment.type === "function") {
                //Parse function fragment
                const formatRaw = fragment.format(utils.FormatTypes.full).replace("function ", "");
                //Remove view/return modifiers as not relevant to sighash
                const format = formatRaw.substring(0, formatRaw.indexOf(")")) + ")";
                //Remove the "0x" prefix to match same data structure as 4bytes
                const sighash = new utils.Interface([fragment])
                    .getSighash(fragment as utils.FunctionFragment)
                    .substring(2);

                //Write to file
                const sighashFile = join(functionSigDir, sighash);
                let formats: string[] = [];
                if (existsSync(sighashFile)) {
                    //Load alternative formats
                    formats = readFileSync(sighashFile, "utf-8").split(";");
                }
                if (!formats.includes(format)) {
                    //Write new format to file
                    formats.push(format);
                    writeFileSync(sighashFile, formats.join(";"));
                }
            } else if (fragment.type === "event") {
                const format = fragment.format(utils.FormatTypes.full).replace("event ", "");
                ///Remove the "0x" prefix to match same data structure as topic0
                const topic0 = new utils.Interface([fragment])
                    .getEventTopic(fragment as utils.EventFragment)
                    .substring(2);

                //Write to file
                const topic0File = join(eventTopic0Dir, topic0);
                let formats: string[] = [];
                if (existsSync(topic0File)) {
                    //Load alternative formats
                    formats = readFileSync(topic0File, "utf-8").split(";");
                }
                if (!formats.includes(format)) {
                    //Write new format to file
                    formats.push(format);
                    writeFileSync(topic0File, formats.join(";"));
                }
            }
        });
    });
}
