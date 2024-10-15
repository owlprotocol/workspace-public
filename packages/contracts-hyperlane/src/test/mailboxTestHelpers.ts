import { getOrDeployDeterministicContract, getOrDeployDeterministicDeployer } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, Client, Hex, Transport, zeroHash } from "viem";
import { getOrDeployCreate2Factory } from "@owlprotocol/contracts-create2factory";
import { waitForTransactionReceipt } from "viem/actions";
import { getAction } from "viem/utils";
import { NoopIsm } from "../artifacts/NoopIsm.js";
import { PausableHook } from "../artifacts/PausableHook.js";
import { TestRecipient } from "../artifacts/TestRecipient.js";
import { getOrDeployMailboxImpl } from "../mailbox/getOrDeployMailboxImpl.js";
import { getOrDeployMailboxProxy } from "../mailbox/getOrDeployMailboxProxy.js";

export async function getOrDeployTestIsm(client: Client<Transport, Chain, Account>) {
    return getOrDeployDeterministicContract(client, { salt: zeroHash, bytecode: NoopIsm.bytecode });
}

export async function getOrDeployTestHook(client: Client<Transport, Chain, Account>) {
    return getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: PausableHook.bytecode,
    });
}

export async function setupTestMailboxContracts(client: Client<Transport, Chain, Account>) {
    const deterministicDeployer = await getOrDeployDeterministicDeployer(client);
    if (deterministicDeployer.hash) {
        await getAction(
            client,
            waitForTransactionReceipt,
            "waitForTransactionReceipt",
        )({ hash: deterministicDeployer.hash });
    }

    const create2Factory = await getOrDeployCreate2Factory(client);
    if (create2Factory.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: create2Factory.hash });
    }

    const testIsm = await getOrDeployTestIsm(client);
    if (testIsm.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: testIsm.hash });
    }

    const testHook = await getOrDeployTestHook(client);
    if (testHook.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: testHook.hash });
    }

    const mailboxImpl = await getOrDeployMailboxImpl(client);
    if (mailboxImpl.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: mailboxImpl.hash });
    }

    return { deterministicDeployer, create2Factory, testIsm, testHook, mailboxImpl };
}

export async function setupTestMailboxContractsWithProxy(client: Client<Transport, Chain, Account>) {
    const deterministicDeployer = await getOrDeployDeterministicDeployer(client);
    if (deterministicDeployer.hash) {
        await getAction(
            client,
            waitForTransactionReceipt,
            "waitForTransactionReceipt",
        )({ hash: deterministicDeployer.hash });
    }

    const create2Factory = await getOrDeployCreate2Factory(client);
    if (create2Factory.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: create2Factory.hash });
    }

    const testIsm = await getOrDeployTestIsm(client);
    if (testIsm.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: testIsm.hash });
    }

    const testHook = await getOrDeployTestHook(client);
    if (testHook.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: testHook.hash });
    }

    const mailboxImpl = await getOrDeployMailboxImpl(client);
    if (mailboxImpl.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: mailboxImpl.hash });
    }

    const mailbox = await getOrDeployMailboxProxy(client, {
        mailboxImplAddress: mailboxImpl.address,
        ismAddress: testIsm.address,
        defaultHookAddress: testHook.address,
        requiredHookAddress: testHook.address,
    });
    if (mailbox.hash) {
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash: mailbox.hash });
    }

    return { deterministicDeployer, create2Factory, testIsm, testHook, mailboxImpl, mailbox };
}

export async function getOrDeployTestRecipient(
    client: Client<Transport, Chain, Account>,
    parameters?: {
        salt?: Hex;
    },
): Promise<{ hash?: Hex; address: Address }> {
    const { salt = zeroHash } = parameters ?? {};
    return getOrDeployDeterministicContract(client, { salt, bytecode: TestRecipient.bytecode });
}
