import { FormatTypes } from "@ethersproject/abi";
import { writeFileSync, existsSync, mkdirSync } from "fs";

import { interfaceId } from "./IERC165.js";
import { factories } from "../ethers/factories.js";

export function generateInterfaceIds() {
    const interfaceIdFolder = "interfaceId";
    if (!existsSync(interfaceIdFolder)) {
        mkdirSync(interfaceIdFolder);
    }

    const ifaceIds: string[] = [];
    Object.entries(factories).forEach(([factoryName, factory]) => {
        if (!(factory as any).bytecode) {
            const name = factoryName.replace("__factory", "");

            //@ts-expect-error
            const iface = factory.createInterface();
            const ifaceId = interfaceId(iface.fragments);
            ifaceIds.push(ifaceId);
            const abi = iface.format(FormatTypes.json) as any;

            generateInterfaceId(ifaceId, name, JSON.parse(abi));
        }
    });

    writeFileSync("./interfaceId/index", JSON.stringify({ result: ifaceIds }));
}

export function generateInterfaceId(interfaceId: string, name: string, abi: any[]) {
    writeFileSync(`./interfaceId/${interfaceId}`, JSON.stringify({ name, interfaceId, abi }));
}

function main() {
    generateInterfaceIds();
}

main();
