import { describe, test, beforeAll, expect } from "vitest";
import {
    Transport,
    Chain,
    WalletClient,
    Account,
    createPublicClient,
    createWalletClient,
    http,
    zeroAddress,
    bytesToHex,
    Address,
    padHex,
    parseEventLogs,
    Hex,
    stringToHex,
    PublicClient,
} from "viem";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { localhost } from "viem/chains";
import { randomBytes } from "crypto";
import { localhostRemote, port, port2 } from "./constants.js";
import { getOrDeployTestRecipient, setupTestMailboxContracts } from "./mailboxTestHelpers.js";
import { Mailbox } from "../artifacts/Mailbox.js";
import { MailboxClient } from "../artifacts/MailboxClient.js";
import { TestRecipient } from "../artifacts/TestRecipient.js";
import { getOrDeployMailbox } from "../mailbox/getOrDeployMailbox.js";
import { getMessageIdFromReceipt } from "../mailbox/getMessageIdFromReceipt.js";
import { getMessageFromReceipt } from "../mailbox/getMessageFromReceipt.js";
import { relayMessage } from "../relayer/relayMessage.js";

async function dispatchMessage(params: {
    walletClient: WalletClient<Transport, Chain, Account>;
    recipient: Address;
    destination: number;
    mailboxAddress: Address;
    message: Hex;
}) {
    const { walletClient, recipient, destination, mailboxAddress, message } = params;
    return await walletClient.writeContract({
        address: mailboxAddress,
        abi: Mailbox.abi,
        functionName: "dispatch",
        args: [destination, padHex(recipient, { size: 32 }), message],
    });
}

describe("mailbox.test.ts", function () {
    let clientsOrigin: {
        publicClient: PublicClient<Transport, Chain>;
        walletClient: WalletClient<Transport, Chain, Account>;
    };
    let clientsRemote: {
        publicClient: PublicClient<Transport, Chain>;
        walletClient: WalletClient<Transport, Chain, Account>;
    };

    let testIsmAddressOrigin: Address;
    let testHookAddressOrigin: Address;

    let mailboxAddressOrigin: Address;
    let mailboxAddressRemote: Address;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        const transportRemote = http(`http://127.0.0.1:${port2}`);

        clientsOrigin = {
            publicClient: createPublicClient({ chain: localhost, transport }),
            walletClient: createWalletClient({ account: getLocalAccount(0), chain: localhost, transport }),
        };
        clientsRemote = {
            publicClient: createPublicClient({ chain: localhostRemote, transport: transportRemote }),
            walletClient: createWalletClient({
                account: getLocalAccount(0),
                chain: localhostRemote,
                transport: transportRemote,
            }),
        };

        const mailboxContractsOrigin = await setupTestMailboxContracts(clientsOrigin.walletClient);
        testIsmAddressOrigin = mailboxContractsOrigin.testIsm.address;
        testHookAddressOrigin = mailboxContractsOrigin.testHook.address;
        mailboxAddressOrigin = mailboxContractsOrigin.mailbox.address;

        const mailboxContractsRemote = await setupTestMailboxContracts(clientsRemote.walletClient);
        mailboxAddressRemote = mailboxContractsRemote.mailbox.address;
    });

    test("Deploy Mailbox and dispatch a mesasge", async () => {
        const randomSalt = bytesToHex(randomBytes(32));

        const { address: mailboxAddressOrigin, hash: mailboxHashOrigin } = await getOrDeployMailbox(
            clientsOrigin.walletClient,
            {
                ismAddress: testIsmAddressOrigin,
                defaultHookAddress: testHookAddressOrigin,
                requiredHookAddress: testHookAddressOrigin,
                salt: randomSalt,
            },
        );
        if (mailboxHashOrigin) {
            await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: mailboxHashOrigin });
        }

        const mailboxOwner = await clientsOrigin.publicClient.readContract({
            address: mailboxAddressOrigin,
            abi: MailboxClient.abi,
            functionName: "owner",
        });
        expect(mailboxOwner).toEqual(clientsOrigin.walletClient.account.address);

        const hash = await dispatchMessage({
            walletClient: clientsOrigin.walletClient,
            destination: localhostRemote.id,
            mailboxAddress: mailboxAddressOrigin,
            message: "0x",
            recipient: zeroAddress,
        });
        const receipt = await clientsOrigin.publicClient.waitForTransactionReceipt({ hash });

        const messageId = getMessageIdFromReceipt(receipt);
        expect(messageId).toBeDefined();
    });

    test("Relay a message with mailboxes", async () => {
        const { address: recipient, hash: testRecipientHash } = await getOrDeployTestRecipient(
            clientsRemote.walletClient,
        );
        if (testRecipientHash) {
            await clientsRemote.publicClient.waitForTransactionReceipt({ hash: testRecipientHash });
        }

        const messageBody = "Test message";
        const messageHex = stringToHex(messageBody);

        const dispatchHash = await dispatchMessage({
            walletClient: clientsOrigin.walletClient,
            recipient,
            destination: clientsRemote.publicClient.chain.id,
            mailboxAddress: mailboxAddressOrigin,
            message: messageHex,
        });
        const dispatchReceipt = await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: dispatchHash });

        const messageId = getMessageIdFromReceipt(dispatchReceipt);
        expect(messageId).toBeDefined();

        const message = getMessageFromReceipt(dispatchReceipt);
        expect(message).toBeDefined();

        const emptyMetadata = "0x0";

        const relayHash = await relayMessage({
            walletClient: clientsRemote.walletClient,
            message,
            metadata: emptyMetadata,
            mailboxAddress: mailboxAddressRemote,
        });
        const relayReceipt = await clientsRemote.publicClient.waitForTransactionReceipt({ hash: relayHash });

        // Check that the TestRecipient received the message
        const receivedMessageLog = parseEventLogs({
            abi: TestRecipient.abi,
            eventName: "ReceivedMessage",
            logs: relayReceipt.logs,
        })[0];

        expect(receivedMessageLog).toBeDefined();
        expect(receivedMessageLog.args).toStrictEqual({
            origin: clientsOrigin.publicClient.chain.id,
            sender: padHex(clientsOrigin.walletClient.account.address, { size: 32 }).toLowerCase(),
            message: messageBody,
            value: 0n,
        });

        // Check mailbox on remote
        const processedAt = await clientsRemote.publicClient.readContract({
            address: mailboxAddressRemote,
            abi: Mailbox.abi,
            functionName: "processedAt",
            args: [messageId!],
        });

        expect(processedAt).toBeGreaterThan(0);
    });
});
