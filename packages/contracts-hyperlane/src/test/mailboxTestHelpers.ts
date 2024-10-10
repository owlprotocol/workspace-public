import { Clients, getOrDeployDeterministicContract, getOrDeployDeterministicDeployer } from "@owlprotocol/viem-utils";
import { Account, Address, Chain, Hex, PublicClient, Transport, WalletClient, zeroHash } from "viem";
import { getOrDeployCreate2Factory } from "@owlprotocol/contracts-create2factory";
import { NoopIsm } from "../artifacts/NoopIsm.js";
import { PausableHook } from "../artifacts/PausableHook.js";
import { TestRecipient } from "../artifacts/TestRecipient.js";
import { getOrDeployMailboxImpl } from "../mailbox/getOrDeployMailboxImpl.js";

export async function getOrDeployTestIsm(params: Clients) {
    const { walletClient, publicClient } = params;
    return getOrDeployDeterministicContract(
        { publicClient, walletClient },
        { salt: zeroHash, bytecode: NoopIsm.bytecode },
    );
}

export async function getOrDeployTestHook(params: Clients) {
    const { walletClient, publicClient } = params;
    return getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: PausableHook.bytecode,
        },
    );
}

export async function setupTestMailboxContracts(clients: Clients) {
    const { publicClient } = clients;

    const deterministicDeployer = await getOrDeployDeterministicDeployer(clients);
    if (deterministicDeployer.hash) {
        await publicClient.waitForTransactionReceipt({ hash: deterministicDeployer.hash });
    }

    const create2Factory = await getOrDeployCreate2Factory(clients);
    if (create2Factory.hash) {
        await publicClient.waitForTransactionReceipt({ hash: create2Factory.hash });
    }

    const testIsm = await getOrDeployTestIsm(clients);
    if (testIsm.hash) {
        await publicClient.waitForTransactionReceipt({ hash: testIsm.hash });
    }

    const testHook = await getOrDeployTestHook(clients);
    if (testHook.hash) {
        await publicClient.waitForTransactionReceipt({ hash: testHook.hash });
    }

    const mailboxImpl = await getOrDeployMailboxImpl(clients);
    if (mailboxImpl.hash) {
        await publicClient.waitForTransactionReceipt({ hash: mailboxImpl.hash });
    }

    return { deterministicDeployer, create2Factory, testIsm, testHook, mailboxImpl };
}
export async function getOrDeployTestRecipient({
    walletClient,
    publicClient,
    salt = zeroHash,
}: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
    salt?: Hex;
}): Promise<{ hash?: Hex; address: Address }> {
    return getOrDeployDeterministicContract({ publicClient, walletClient }, { salt, bytecode: TestRecipient.bytecode });
}
