import { getDeployDeterministicAddress, getOrPrepareDeterministicContract } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, Client, encodeDeployData, TransactionRequest, Transport, zeroHash } from "viem";

import { HypERC20 } from "./artifacts/HypERC20.js";
import { FastHypERC20 } from "./artifacts/FastHypERC20.js";
import { HypNative } from "./artifacts/HypNative.js";

/**
 * Get Hyperlane contract implementation addresses
 * @warning We only deploy implementations that have only static variables in the constructor (eg. mailbox)
 * @returns addresses
 */
export function getHyperlaneContracts({ mailboxAddress }: { mailboxAddress: Address }) {
    const [hypErc20, hypErc20Fast, hypNative] = [
        getDeployDeterministicAddress({
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: HypERC20.abi,
                bytecode: HypERC20.bytecode,
                args: [18, mailboxAddress],
            }),
        }),
        getDeployDeterministicAddress({
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: FastHypERC20.abi,
                bytecode: FastHypERC20.bytecode,
                args: [18, mailboxAddress],
            }),
        }),
        getDeployDeterministicAddress({
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: HypNative.abi,
                bytecode: HypNative.bytecode,
                args: [mailboxAddress],
            }),
        }),
    ];

    return {
        hypErc20,
        hypErc20Fast,
        hypNative,
    };
}

/**
 * Prepare Hyperlane implementation contract deployment transactions. Useful to do gas estimations before sending transaction
 * @warning We only deploy implementations that have only static variables in the constructor (eg. mailbox)
 * @param client with account
 */
export async function prepareHyperlaneContracts(
    client: Client<Transport, Chain, Account>,
    { mailboxAddress }: { mailboxAddress: Address },
) {
    const requests: TransactionRequest[] = [];

    //Tokens
    const [hypErc20, hypErc20Fast, hypNative] = await Promise.all([
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: HypERC20.abi,
                bytecode: HypERC20.bytecode,
                args: [18, mailboxAddress],
            }),
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: FastHypERC20.abi,
                bytecode: FastHypERC20.bytecode,
                args: [18, mailboxAddress],
            }),
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: HypNative.abi,
                bytecode: HypNative.bytecode,
                args: [mailboxAddress],
            }),
        }),
    ]);
    if (hypErc20.request) requests.push(hypErc20.request);
    if (hypErc20Fast.request) requests.push(hypErc20Fast.request);
    if (hypNative.request) requests.push(hypNative.request);

    return {
        requests,
        hypErc20,
        hypErc20Fast,
        hypNative,
    };
}
