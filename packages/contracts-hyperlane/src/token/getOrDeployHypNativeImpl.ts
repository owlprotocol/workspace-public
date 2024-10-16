import { getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, Client, encodeDeployData, Hex, Transport, zeroHash } from "viem";
import { HypNative } from "../artifacts/HypNative.js";

export async function getOrDeployHypNativeImpl(
    client: Client<Transport, Chain, Account>,
    parameters: {
        mailboxAddress: Address;
        decimals?: number;
        salt?: Hex;
    },
) {
    const { mailboxAddress, salt = zeroHash } = parameters;
    return getOrDeployDeterministicContract(client, {
        salt,
        bytecode: encodeDeployData({
            abi: HypNative.abi,
            bytecode: HypNative.bytecode,
            args: [mailboxAddress],
        }),
    });
}
