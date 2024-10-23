import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import { Account, Address, Chain, Client, Hex, Transport, zeroAddress, zeroHash } from "viem";
import { getHypNativeDeployArgs } from "./getHypNativeDeployArgs.js";

export async function getOrDeployHypNative(
    client: Client<Transport, Chain, Account>,
    parameters: {
        mailboxAddress: Address;
        hookAddress?: Address;
        ismAddress?: Address;
        owner: Address;
        salt?: Hex;
    },
) {
    const { salt = zeroHash } = parameters;
    const deployNative = await getOrDeployContracts(client, zeroAddress, [
        {
            ...getHypNativeDeployArgs(parameters),
            salt,
        },
    ]);

    const native = deployNative.addresses[0];
    return { hash: deployNative.hash, address: native.address, exists: native.exists };
}
