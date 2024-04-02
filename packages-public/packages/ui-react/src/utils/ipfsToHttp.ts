import { IPFS_GATEWAY_URL } from "@owlprotocol/envvars/browser";

export function ipfsToHttp(url: string, gateway = IPFS_GATEWAY_URL) {
    if (url.startsWith("ipfs://")) {
        return gateway + "/ipfs/" + url.replace("ipfs://", "");
    }

    return url;
}
