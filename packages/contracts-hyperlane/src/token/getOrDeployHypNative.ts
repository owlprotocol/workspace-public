import { getOrDeployContracts } from "@owlprotocol/contracts-create2factory";
import {
    Account,
    Address,
    Chain,
    Client,
    encodeDeployData,
    encodeFunctionData,
    Hex,
    Transport,
    zeroAddress,
    zeroHash,
} from "viem";
import { HypNative, initialize as initializeAbi } from "../artifacts/HypNative.js";

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
    const { mailboxAddress, hookAddress = zeroAddress, ismAddress = zeroAddress, owner, salt = zeroHash } = parameters;
    const deployNative = await getOrDeployContracts(client, zeroAddress, [
        {
            bytecode: encodeDeployData({
                abi: HypNative.abi,
                bytecode: HypNative.bytecode,
                args: [mailboxAddress],
            }),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [hookAddress, ismAddress, owner],
            }),
            salt,
        },
    ]);

    const native = deployNative.addresses[0];
    return { hash: deployNative.hash, address: native.address, exists: native.exists };
}
