import { getChainWithData, getChainByChainId } from "@owlprotocol/chains";
import { getChainWithDataByChainId } from "@owlprotocol/envvars";
import { networksPrivateCRUD, networksReadOnlyCRUD } from "../admin/crudWrappers.js";

async function main() {
    const blastPublic = {
        ...getChainWithData(getChainByChainId(168587773)),
        enabled: true,
        rank: 3,
        id: `${168587773}`,
        default: false,
    };

    const blastPrivate = {
        ...getChainWithDataByChainId(168587773),
        enabled: true,
        rank: 3,
        id: `${168587773}`,
        default: false,
    };

    await Promise.all([networksReadOnlyCRUD._set(blastPublic), networksPrivateCRUD._set(blastPrivate)]);
}

main();
